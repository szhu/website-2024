"use client";

let saveDirectory: FileSystemDirectoryHandle | undefined;

export async function saveIntoDirectory(
  testThatSubdirectoryExists: string,
  path: string,
  content: string,
) {
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
      window.alert("Incorrect folder.");
      saveDirectory = undefined;
    }
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
