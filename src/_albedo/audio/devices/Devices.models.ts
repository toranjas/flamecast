// Suffixed with "Device" because Input and Output are classes in @angular/core

// Extending from base interface.
// I predict future differences between input and output devices.
// Input devices will probably have info about supported formats or something.


export interface DeviceBase {
  id: string;
  name: string;
}

export interface InputDevice extends DeviceBase {
  
}

export interface OutputDevice extends DeviceBase {

}