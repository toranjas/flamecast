import { PcmFloat32Samples } from './../samples/PcmFloat32Samples';
import { MediaControlProvider, MeteringCallback } from './MediaControlProvider';
import { MediaControlUtils } from './MediaControlUtils';

export class WebAudioApiMediaControlProvider implements MediaControlProvider {
  private videoComponentSelector = '#video-control-for-media-control-provider';

  // ██ ███    ██ ██████  ██    ██ ████████
  // ██ ████   ██ ██   ██ ██    ██    ██
  // ██ ██ ██  ██ ██████  ██    ██    ██
  // ██ ██  ██ ██ ██      ██    ██    ██
  // ██ ██   ████ ██       ██████     ██

  // Device
  private _audioInputId: string | null = 'default';

  get audioInputId(): string | null {
    return this._audioInputId;
  }

  set audioInputId(deviceId: string | null) {
    this._audioInputId = deviceId;
  }

  // Gain
  private _audioInputGain = 1.0;

  get audioInputGain(): number {
    return this._audioInputGain;
  }

  set audioInputGain(value: number) {
    this._audioInputGain = value;
    this.setupInputGainNode();
  }

  // Mute
  private _audioInputIsMuted = false;

  get audioInputIsMuted(): boolean {
    return this._audioInputIsMuted;
  }

  set audioInputIsMuted(mute: boolean) {
    this._audioInputIsMuted = mute;
    this.setupInputGainNode();
  }

  // Metering
  private _inputMeteringCallback: MeteringCallback | null = null;

  get inputMeteringCallback(): MeteringCallback | null {
    return this._inputMeteringCallback;
  }

  set inputMeteringCallback(fn: MeteringCallback | null) {
    this._inputMeteringCallback = fn;
  }

  // Helpers
  private setupInputGainNode = () => {
    if (this._audioContext && this._inputGainNode) {
      this._inputGainNode.gain.setValueAtTime(
        this.audioInputIsMuted ? 0 : this._audioInputGain,
        this._audioContext.currentTime,
      );
    }
  };

  //  ██████  ██    ██ ████████ ██████  ██    ██ ████████
  // ██    ██ ██    ██    ██    ██   ██ ██    ██    ██
  // ██    ██ ██    ██    ██    ██████  ██    ██    ██
  // ██    ██ ██    ██    ██    ██      ██    ██    ██
  //  ██████   ██████     ██    ██       ██████     ██

  private _audioOutputId: string | null = 'default';

  get audioOutputId(): string | null {
    return this._audioOutputId;
  }

  set audioOutputId(deviceId: string | null) {
    this._audioOutputId = deviceId;
  }

  //  █████  ██    ██ ██████  ██  ██████       ██████  ██████   █████  ██████  ██   ██
  // ██   ██ ██    ██ ██   ██ ██ ██    ██     ██       ██   ██ ██   ██ ██   ██ ██   ██
  // ███████ ██    ██ ██   ██ ██ ██    ██     ██   ███ ██████  ███████ ██████  ███████
  // ██   ██ ██    ██ ██   ██ ██ ██    ██     ██    ██ ██   ██ ██   ██ ██      ██   ██
  // ██   ██  ██████  ██████  ██  ██████       ██████  ██   ██ ██   ██ ██      ██   ██

  // Input
  private _audioContext: AudioContext | null = null;
  private _inputNode: MediaStreamAudioSourceNode | null = null;
  private _inputGainNode: GainNode | null = null;
  private _inputScriptProcessorNode: ScriptProcessorNode | null = null;
  // There is a bug where ScriptProcessorNode doesn't work unless it has an output path to the audio destination
  // The work-around is hooking the output of ScriptProcessorNode to the input of a gain node and setting the gain to 0.
  // Then connect that gain node to the destination node.
  // This is a Chrome issue, not an issue with the Web Audio API spec.
  // Since ScriptProcessorNode is depricated, the Chrome team WILL NOT fix this.
  // https://github.com/WebAudio/web-audio-api/issues/345
  private _inputScriptProcessorNodeZeroGain: GainNode | null = null;

  // Output
  private _outputNode: AudioDestinationNode | null = null;
  private _outputVideoElement: HTMLVideoElement = document.querySelector(
    this.videoComponentSelector,
  );

  // Initialization
  private _isInitialized = false;
  private _lastAudioInputId: string | null = null;
  private _lastAudioOutputId: string | null = null;

  setupAudioGraph = async () => {
    console.log('Setting up audio pipeline.');

    if (this._audioInputId === null) {
      console.log('Audio input id is null');
      throw new Error('Audio input id is null');
    }

    if (this._audioOutputId === null) {
      console.log('Audio output id is null');
      throw new Error('Audio output id is null');
    }

    // Set it to the videoElement. This is what allows us to change the output.
    if (!this._outputVideoElement) {
      console.log(`Creating reference to video element "${this.videoComponentSelector}"`);
      this._outputVideoElement = document.querySelector(this.videoComponentSelector);
      if (!this._outputVideoElement) {
        throw new Error(`video element "${this.videoComponentSelector}" not defined.`);
      }
    }

    // Perform a full or partial initialization
    if (!this._isInitialized) {
      console.log('Attempting full initialization.');
      await this.fullInitialize();
    } else {
      console.log('Checking if partial initialization is needed.');
      if (this._audioInputId !== this._lastAudioInputId) {
        console.log('Attempting to set up the input element.');
        await this.setupInputElement();
      }
      if (this._audioOutputId !== this._lastAudioOutputId) {
        console.log('Attempting to set up the output element.');
        await this.setupOutputElement();
      }
    }

    // Set the variables for next time setupAudioGraph() is called
    this._isInitialized = true;
    this._lastAudioInputId = this._audioInputId;
    this._lastAudioOutputId = this._audioOutputId;
  };

  private fullInitialize = async () => {
    // Build an Audio Context
    console.log('Building audio context.');
    this._audioContext = new window.AudioContext({
      latencyHint: 'interactive',
      // TODO: sampleRate
    });

    // Create the Media Streams
    console.log('Create media streams.');
    const inputMediaStream = await this.getInputMediaStream();
    const outputMediaStream = this._audioContext.createMediaStreamDestination();

    // Build Nodes
    console.log('Building nodes.');
    this._inputNode = this._audioContext.createMediaStreamSource(inputMediaStream);
    this._inputGainNode = this._audioContext.createGain();
    this._inputScriptProcessorNode = this._audioContext.createScriptProcessor(4096 * 2, 2, 2);
    this._inputScriptProcessorNodeZeroGain = this._audioContext.createGain();
    this._inputScriptProcessorNodeZeroGain.gain.value = 0;

    // TODO: For output
    // //this._inputMeterNode = new AudioWorkletNode(this._audioContext, "vu-meter-processor");
    // this._inputAnalyzerNode = this._audioContext.createAnalyser();

    // this._inputRecordScriptProcessorNode = this._audioContext.createScriptProcessor(4096, 2, 2);

    // this._monitoringGainNode = this._audioContext.createGain();
    this._outputNode = this._audioContext.destination;

    // Connect Nodes
    console.log('Connecting nodes.');
    this._inputNode.connect(this._inputGainNode);
    this._inputGainNode.connect(this._inputScriptProcessorNode);
    this._inputScriptProcessorNode.connect(this._inputScriptProcessorNodeZeroGain);
    this._inputScriptProcessorNodeZeroGain.connect(this._outputNode);

    // Configure Nodes
    console.log('Configuring nodes.');
    this.setupInputGainNode();
    this.setupInputScriptProcessorNode();
    // TODO: For output
    // this.setupMonitoringGain();

    // TODO: For extra features
    // this._inputGainNode.connect(this._inputAnalyzerNode);
    // this._inputGainNode.connect(this._monitoringGainNode);

    // this._inputGainNode.connect(this._inputRecordScriptProcessorNode);

    // this._inputRecordScriptProcessorNode.connect(this._inputScriptProcessorNodeZeroGain);

    // this._monitoringGainNode.connect(this._outputNode);

    // TODO:
    // Metering
    // this.setupMetering();

    // Setup Output
    console.log('Configuring output video element.');
    this._outputVideoElement.srcObject = outputMediaStream.stream;
    await this.setupOutputElement();
  };

  private setupInputElement = async () => {
    // This changes a bunch of things after initialization

    // Unhook the previous inputNode instance
    this._inputNode.disconnect(this._inputGainNode);

    // Create a new input media stream and new inputNode
    const inputMediaStream = await this.getInputMediaStream();
    this._inputNode = this._audioContext.createMediaStreamSource(inputMediaStream);

    // Hook the new inputNode instance
    this._inputNode.connect(this._inputGainNode);
  };

  private setupOutputElement = async () => {
    if (this._outputVideoElement) {
      await MediaControlUtils.attachSinkId(this._outputVideoElement, this._audioOutputId);
    } else {
      console.log('Could not setup output element. output element is null.');
    }
  };

  private _runningInputMediaStream: MediaStream | null = null;

  private getInputMediaStream = async (): Promise<MediaStream> => {
    // Stop any currently running stream.
    if (this._runningInputMediaStream) {
      console.log('Stopping current.');
      this._runningInputMediaStream.getTracks().forEach((track) => track.stop());
      this._runningInputMediaStream = null;
    }

    // Build the constraints
    const constraints: MediaStreamConstraints = {
      audio: {
        deviceId: this._audioInputId ? { exact: this._audioInputId } : undefined,
        // Trying to reduce latency
        latency: 0.02,
        echoCancellation: false,
      },
      video: { deviceId: undefined },
    };

    // Get the media
    console.log('Getting media stream.');
    this._runningInputMediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    // Done
    return this._runningInputMediaStream;
  };

  private setupInputScriptProcessorNode = () => {
    // https://jameshfisher.com/2021/01/18/measuring-audio-volume-in-javascript/

    // // Metering (Analyzer)
    // this._inputAnalyzerNode.fftSize = 256;

    // var bufferLength = this._inputAnalyzerNode.frequencyBinCount;
    // var dataArray = new Uint8Array(bufferLength);

    // this._inputAnalyzerNode.getByteFrequencyData(dataArray);

    // ScriptProcessorNode is depricated and considered bad practice.
    // However, there are the most number of examples using this method.
    // It also seems easiest.

    //https://www.oreilly.com/library/view/web-audio-api/9781449332679/ch03.html
    //https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode
    //https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor#example
    //http://www.playdotsound.com/portfolio-item/decibel-db-to-float-value-calculator-making-sense-of-linear-values-in-audio-tools/

    if (!this._inputScriptProcessorNode) return;

    console.log('Setting onaudioprocess function');
    this._inputScriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
      const inputBuffer = audioProcessingEvent.inputBuffer;
      let leftCurrentPeakDBFS = -100.0;
      let rightCurrentPeakDBFS = -100.0;
      let leftIsClipping = false;
      let rightIsClipping = false;

      for (let channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
        const inputData = inputBuffer.getChannelData(channel);
        const peak = PcmFloat32Samples.getPeak(inputData);

        if (channel === 0) {
          leftCurrentPeakDBFS = PcmFloat32Samples.toDBFS(peak);
          leftIsClipping = PcmFloat32Samples.isClipping(peak);
        } else if (channel === 1) {
          rightCurrentPeakDBFS = PcmFloat32Samples.toDBFS(peak);
          rightIsClipping = PcmFloat32Samples.isClipping(peak);
        }
      }

      if (this._inputMeteringCallback) {
        this._inputMeteringCallback({
          leftCurrentPeakDBFS,
          rightCurrentPeakDBFS,
          leftHoldPeakDBFS: 0, // TODO:
          rightHoldPeakDBFS: 0, // TODO:
          leftIsClipping,
          rightIsClipping,
        });
      }
    };
  };
}
