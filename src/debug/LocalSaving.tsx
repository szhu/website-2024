"use client";

import mimeTypes from "mime-types";

let saveDirectory: FileSystemDirectoryHandle | undefined;

export async function setSaveDirectory(testThatSubdirectoryExists: string) {
  while (saveDirectory == null) {
    try {
      saveDirectory = await window.showDirectoryPicker({ mode: "readwrite" });
    } catch {
      return false;
    }

    // Make sure we've selected the correct directory.
    try {
      await saveDirectory.getDirectoryHandle(testThatSubdirectoryExists);
    } catch {
      window.alert("Incorrect folder selected. Try again.");
      saveDirectory = undefined;
    }
  }

  return true;
}

export async function saveIntoDirectory(path: string, content: string | Blob) {
  if (saveDirectory == null) {
    return false;
  }

  const fileHandle = //
    await getNested(saveDirectory, path.split("/"), "file", true);
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();

  return true;
}

async function getNested(
  start: FileSystemDirectoryHandle,
  pathParts: string[],
  type: "directory",
  create: boolean,
): Promise<FileSystemDirectoryHandle>;
async function getNested(
  start: FileSystemDirectoryHandle,
  pathParts: string[],
  type: "file",
  create: boolean,
): Promise<FileSystemFileHandle>;
async function getNested(
  start: FileSystemDirectoryHandle,
  pathParts: string[],
  type: "directory" | "file",
  create: boolean,
) {
  let current = start;
  // for (const part of pathParts) {
  //   const isLast = part === pathParts[pathParts.length - 1];
  //   current = await current.getDirectoryHandle(part, { create: true });
  // }
  for (let index = 0; index < pathParts.length; index++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const part = pathParts[index]!;
    const isLast = index === pathParts.length - 1;

    if (isLast && type === "file") {
      return await current.getFileHandle(part, { create });
    }

    current = await current.getDirectoryHandle(part, { create });
  }
  return current;
}

async function getHashFromBlob(blob: Blob) {
  // https://stackoverflow.com/a/61823010/782045
  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
  const hash = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hash;
}

export async function saveBlobByHash(
  directoryName: string,
  fileNamePrefix: string,
  blob: Blob,
) {
  const autoExtension = mimeTypes.extension(blob.type);
  const extension = typeof autoExtension === "string" ? autoExtension : "bin";
  const hash = await getHashFromBlob(blob);
  const fileName = `${fileNamePrefix}${hash.slice(0, 16)}.${extension}`;
  const path = `${directoryName}/${fileName}`;

  if (await saveIntoDirectory(path, blob)) {
    return fileName;
  }
}

export async function getBlobFromImg(
  img: HTMLImageElement,
): Promise<Blob | undefined> {
  try {
    const response = await window.fetch(img.src);
    const blob = await response.blob();
    return blob;
  } catch {
    return;
  }
}
