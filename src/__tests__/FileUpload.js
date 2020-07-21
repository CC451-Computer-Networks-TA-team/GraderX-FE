import { validateExtension } from "../components/grader/FileUpload";

// letterly useless
describe("Extension Validation", () => {
  it("should accept the extension", () => {
    let extension = validateExtension("application/zip");
    expect(extension).toBeTruthy();

    extension = validateExtension("application/vnd.rar");
    expect(extension).toBeTruthy();

    extension = validateExtension("application/x-7z-compressed");
    expect(extension).toBeTruthy();
  });

  it("should reject the extension", () => {
    let extension = validateExtension("text/plain");
    expect(extension).toBeFalsy();

    extension = validateExtension("text/x-python");
    expect(extension).toBeFalsy();

    extension = validateExtension("anything");
    expect(extension).toBeFalsy();
  });
});
