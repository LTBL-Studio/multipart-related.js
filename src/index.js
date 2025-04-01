const DEFAULT_BOUNDARY = "multipart-boundary";
const ENDL = "\r\n";

/**
 * Build a multipart/related Blob using other blobs
 */
export class MultipartData extends Blob {
  /**
   * @param parts {(Object | Array | ArrayBuffer | ArrayBufferView | Blob | String)[]}
   * @param options {{
   *    type?: string,
   *    endings?: "transparent" | "native",
   *    boundary?: string
   * }}
   */
  constructor(parts, options) {
    let boundary = options?.boundary || DEFAULT_BOUNDARY;

    let blobParts = parts.flatMap((part) => {
      let type = part.type;

      let boundaryBefore = "--" + boundary + ENDL;
      if (type) {
        boundaryBefore += `Content-Type: ${type}${ENDL}`;
      }
      boundaryBefore += ENDL;

      return [boundaryBefore, part, ENDL];
    });
    blobParts.push("--" + boundary + "--" + ENDL);

    let blobOptions = {
      type: (options?.type || "multipart/related") + `;boundary="${boundary}"`,
      endings: options?.endings,
    };

    super(blobParts, blobOptions);

    this.parts = parts;
  }
}
