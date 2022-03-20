import { InputDevice, OutputDevice } from './Devices.models';

export class Devices {
  static initialize = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      throw new Error('enumerateDevices() not supported.');
    }
    await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };

  static getAllDevices = async (): Promise<MediaDeviceInfo[]> => {
    await Devices.initialize();
    return await navigator.mediaDevices.enumerateDevices();
  };

  static getAvailableInputs = async (): Promise<InputDevice[]> => {
    const devices = await Devices.getAllDevices();
    return devices
      .filter((d) => d.kind === 'audioinput')
      .map((d) => ({ id: d.deviceId, name: d.label }));
  };

  static getAvailableOutputs = async (): Promise<OutputDevice[]> => {
    const devices = await Devices.getAllDevices();
    return devices
      .filter((d) => d.kind === 'audiooutput')
      .map((d) => ({ id: d.deviceId, name: d.label }));
  };
}
