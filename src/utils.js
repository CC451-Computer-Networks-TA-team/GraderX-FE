export function validateExtension(extension) {
    const supportedTypes = [
      "application/zip",
      "application/vnd.rar",
      "application/x-7z-compressed"
    ];
    return supportedTypes.includes(extension);
  }