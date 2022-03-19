export module MediaControlUtils {

  // Attach audio output device to video element using device/sink ID.
  // https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
  export const attachSinkId = async (
    mediaElement: HTMLMediaElement,
    sinkId: string | null
  ) => {
    // To get around typescript not having the experimental sinkId and setSinkId definitions.
    const element: any = mediaElement;

    if (typeof element.sinkId === 'undefined') {
      throw new Error('Browser does not support output device selection.');
    }

    try {
      await element.setSinkId(sinkId);
      console.log(`Success, audio output device attached: ${sinkId}`);
    } catch (error: any) {
      let errorMessage = error;
      if (error.name === 'SecurityError') {
        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
      }
      throw new Error(errorMessage);
    }
  };

}