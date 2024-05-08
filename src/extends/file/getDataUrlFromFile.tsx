export default async function getDataUrlFromFile(file: File | Blob) {
  const reader = new FileReader();
  const dataUrl = await new Promise<string>((resolve) => {
    reader.addEventListener("load", () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== "string") {
        throw new TypeError("Expected data URL to be a string.");
      }

      resolve(dataUrl);
    });
    reader.readAsDataURL(file);
  });
  return dataUrl;
}
