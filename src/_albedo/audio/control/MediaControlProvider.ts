export interface MeteringData {
  leftCurrentPeakDBFS: number,
  rightCurrentPeakDBFS: number,

  leftHoldPeakDBFS: number,
  rightHoldPeakDBFS: number,

  leftIsClipping: boolean,
  rightIsClipping: boolean
}

export interface MeteringCallback {
  (meteringData: MeteringData): void;
}

export interface MediaControlProvider {

  // Input
  audioInputId: string | null;
  audioInputGain: number;
  audioInputIsMuted: boolean;
  inputMeteringCallback: MeteringCallback | null;

  // Output
  audioOutputId: string | null;

  // Gain & Mute
  

  // Setup
  setupAudioGraph: () => Promise<void>;

}