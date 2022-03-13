import { DeviceBase } from "./../../_albedo/audio"

//  ██████  ██████  ███    ███ ██████   █████  ██████  ███████
// ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ ██
// ██      ██    ██ ██ ████ ██ ██████  ███████ ██████  █████
// ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ ██
//  ██████  ██████  ██      ██ ██      ██   ██ ██   ██ ███████

export const compareDeviceName = (a: DeviceBase, b: DeviceBase) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};