import { identifierModuleUrl } from "@angular/compiler";
import { DeviceBase, InputDevice, OutputDevice } from "./Devices.models";

export module Devices {

  const initialize = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      throw new Error('enumerateDevices() not supported.');
    }
    await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };

  const getAllDevices = async (): Promise<MediaDeviceInfo[]> => {
    await initialize();
    return await navigator.mediaDevices.enumerateDevices();
  };

  export const getAvailableInputs = async (): Promise<InputDevice[]> => {
    const devices = await getAllDevices();
    return devices
      .filter((d) => d.kind === 'audioinput')
      .map((d) => ({ id: d.deviceId, name: d.label }));
  };

  export const getAvailableOutputs = async (): Promise<OutputDevice[]> => {
    const devices = await getAllDevices();
    return devices
      .filter((d) => d.kind === 'audiooutput')
      .map((d) => ({ id: d.deviceId, name: d.label }));
  };

}