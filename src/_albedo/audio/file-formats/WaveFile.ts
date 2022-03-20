// SH: Use this instead: https://www.npmjs.com/package/wavefile

// http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
// https://docs.fileformat.com/audio/wav/
// https://johnloomis.org/cpe102/asgn/asgn1/riff.html

// import { DataViewUtils } from "../DataViewUtils";

// export module WaveFile {

//   export const writeHeaderToDataView = (
//     dataView: DataView,
//     numberOfChannels: number,
//     sampleRate: number,
//     numberOfSamples: number,
//     bytesPerSample: number
//   ) => {

//     // SH: After examining various documents on the file format, I've found that
//     // a whole WAV file can be called a "chunk". I assume that this is because the
//     // WAV format could be used internally within some other format so it might be a "chunk"
//     // of that thing but not the whole file itself.
//     // For Toranja's purposes, "chunk" and "file" are interchangeable.

//     const length = numberOfSamples * bytesPerSample;

//     /* Chunk Id: RIFF */
//     /* 4 Bytes */
//     /* String literal "RIFF" in ASCII */
//     /* Marks the file as a riff file. Characters are each 1 byte long. */
//     DataViewUtils.writeString(dataView, 0, "RIFF");

//     /* Chunk Size */
//     /* 4 Bytes, Unsigned 32-Bit Integer, Little Endian */

//     // SH: I don't fully understand this and there *seems* to be conflicting information.
//     // On fileformat.com: "file size (integer). 	Size of the overall file - 8 bytes, in bytes (32-bit integer). Typically, you’d fill this in after creation."
//     // On mcgill.ca:      "Chunk size: 4+n." n appears to be everything after "WAVE".
//     // On johnloomis.org: ""
//     // Example on github: "36 + length"
//     // SH: Might need to make some WAV files in various programs and look at them with a hex editor.
//     // SH: Maybe FlameCast needs some built-in utilities to help us develop & test. Like... a WAV file inspector that would read and display a WAV's information.
//     dataView.setUint32(4, 36 + length, true);

//     /* RIFF type */
//     /* In this case, it's "WAVE". RIFF has other possible formats as well. */
//     DataViewUtils.writeString(dataView, 8, "WAVE");

//     /* Format Chunk Identifier */
//     /* Includes a trailing space. This is very important. */
//     DataViewUtils.writeString(dataView, 12, "fmt ");

//     /* format chunk length */
//     /* Length of format data as listed above */
//     dataView.setUint32(16, 16, true);

//     /* sample format (raw) */
//     /* Type of format (1 is PCM) - 2 byte integer */
//     dataView.setUint16(20, 1, true);

//     /* channel count */
//     /* Number of Channels - 2 byte intege */
//     dataView.setUint16(22, numberOfChannels, true);

//     /* sample rate */
//     /* Sample Rate - 32 byte integer. */
//     /* Common values are 44100 (CD), 48000 (DAT).*/
//     /* Sample Rate = Number of Samples per second, or Hertz. */
//     dataView.setUint32(24, sampleRate, true);

//     /* byte rate (sample rate * block align)          */
//     /* (Sample Rate * BitsPerSample * Channels) / 8.  */
//     dataView.setUint32(28, sampleRate * 4, true);

//     /* block align (channel count * bytes per sample) */
//     /* (BitsPerSample * Channels) / 8.  1 - 8 bit mono 2 - 8 bit stereo/16 bit mono 4 - 16 bit stereo */
//     dataView.setUint16(32, numberOfChannels * 2, true);

//     /* bits per sample */
//     /* Bits per sample */
//     dataView.setUint16(34, 16, true);

//   }

// }
