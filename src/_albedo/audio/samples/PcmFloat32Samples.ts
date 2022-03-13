/**
 * Utility functions for manipulating and converting IEEE754 32-bit floating-point PCM audio.
 * 32-bit PCM audio has a range of -1.0 to 1.0. Anything outside of these bounaries is clipping and distorted.
 * However, floating-point audio allows audio outside of the clipping boundaries to be salvaged into non-distorted audio by reducing the amplitude.
 * https://www.sounddevices.com/32-bit-float-files-explained/
 */

import { INT16 } from "../constants";

export module PcmFloat32Samples {

  /**
   * Determines the peak amplitude of an array audio samples.
   * @param data A single channel of IEEE754 32-bit floating-point PCM audio.
   * @returns Maximum absolute value from the data.
   */
  export const getPeak = (samples: Float32Array): number => {
    let peak = 0.0;
    for (let i = 0; i < samples.length; i++) {
      const value = Math.abs(samples[i]);
      if (value > peak) peak = value;
    }
    return peak;
  };

  /**
   * Determines if an audio sample is clipping. "Clipping" refers to hitting or exceeding maximum value.
   * @param sample A single sample of IEEE754 32-bit floating-point PCM audio. 
   * @returns True if the sample is clipping. Otherwise, false.
   */
  export const isClipping = (sample: number): boolean => {
    return Math.abs(sample) >= 1.0;
  };

  /**
   * Converts an audio sample from IEEE754 32-bit floating-point PCM audio (-1.0 to 1.0) to dBFS (Decibals Full Scale)
   * @param sample A single sample of IEEE754 32-bit floating point PCM audio.
   * @returns Value in dBFS (Decibals Full Scale).
   */
  export const toDBFS = (sample: number): number => {
    return (Math.log(sample) / Math.LN10) * 20;
  };

  /**
   * Interleaves the audio samples of two channels.
   * @param inputL Array of audio data from the Left channel
   * @param inputR Array of audio data from the Right channel
   * @returns A single interleaved array that alternates between data from Left and Right
   */
  export const interleave = (
    leftSamples: Float32Array,
    rightSamples: Float32Array): Float32Array => {
      let length = leftSamples.length + rightSamples.length;
      let result = new Float32Array(length);
  
      let index = 0;
      let inputIndex = 0;
  
      while (index < length) {
        result[index++] = leftSamples[inputIndex];
        result[index++] = rightSamples[inputIndex];
        inputIndex++;
      }
      return result;    
  }

  // ---------- EVERYTHING BELOW HERE MIGHT BE SOLVED BY https://www.npmjs.com/package/wavefile ---------- //


  /**
   * Converts IEEE754 32-bit floating-point PCM audio samples into 16-bit integer PCM audio samples.
   * @param samples Array of IEEE754 32-bit floating-point PCM audio samples.
   * @returns Array of 16-bit PCM audio samples.
   */
  export const samplesToPcmInt16 = (samples: Float32Array): Int16Array => {
    let result = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      result[i] = sampleToPcmInt16(samples[i]);
    }
    return result;
  }

  /**
   * Converts single IEEE754 32-bit floating-point PCM sample into single 16-bit integer PCM audio sample.
   * @param sample Single IEEE754 32-bit floating-point PCM audio sample.
   * @returns Single 16-bit integer PCM audio sample
   */
  export const sampleToPcmInt16 = (sample: number): number => {

    // Ensure the sample isn't outside of the range -1.0 to +1.0.
    // Float-32 audio allows for audio outside of the "clipping range".
    // By doing this in the conversion, the data outside of -1.0 to +1.0 is lost.
    // When converting to integer-based audio, we have no choice. There is no data beyond the clipping range.
    sample = Math.max(-1, Math.min(1, sample));

    // Convert from float to signed 16-bit integer.
    // 16-bit integer ranges from -32768 to +32767.
    // Since Float-32 audio only has positive values up to 1.0 and negative values down to -1.0, the math becomes easy.
    // For negative values (< 0 but >= -1.0), multiply by -32768.
    // For positive values or 0 (<= +1.0), multiply by +32767.
    // Note that this code contains no dithering. It is unclear whether we will need dithering or not.
    return sample < 0 ? sample * INT16.MIN_VALUE : sample * INT16.MAX_VALUE;

  }


}