export module dBFullScaleSamples {


  /**
   * Determines if a dBFS sample is clipping by hitting or exceeding 0.0.
   * @param linearValue A single dBFS sample
   * @returns True if the sample is clipping. Otherwise, false.
   */
   export const isClipping = (sample: number): boolean => {
    return sample >= 0.0;
  }



  export const toVisualMeterRange = (
    dBFS: number, 
    minMeterValue: number, 
    maxMeterValue: number): number => {

      // Audacity goes from -60dBFS to 0dBFS.
      // Probably good enough for us.
      const dBFSMin = -60.0;

      if (dBFS < dBFSMin) {
        dBFS = dBFSMin;
      }

      // Convert dBFS to Percentage
      const percentage = (dBFS + Math.abs(dBFSMin)) / Math.abs(dBFSMin);

      // Make into value between min and max meter value.
      // Remember... minMeterValue might not be 0 for whatever UI reason.
      return ((maxMeterValue - minMeterValue) * percentage) + minMeterValue;


  }

}