export module DataViewUtils {

  export function writeString(dataView: DataView, offset: number, s: string) {
    for (let i = 0; i < s.length; i++) {
      dataView.setUint8(offset + i, s.charCodeAt(i));
    }
  }

}