export interface MeteringData {
  leftCurrentPeakDBFS: number;
  rightCurrentPeakDBFS: number;

  leftHoldPeakDBFS: number;
  rightHoldPeakDBFS: number;

  leftIsClipping: boolean;
  rightIsClipping: boolean;
}

export type MeteringCallback = (meteringData: MeteringData) => void;

export interface MediaControlProvider {
  // Input
  audioInputId: string | null;
  audioInputGain: number;
  audioInputIsMuted: boolean;
  inputMeteringCallback: MeteringCallback | null;

  // Output
  audioOutputId: string | null;

  // Setup
  setupAudioGraph: () => Promise<void>;
}
