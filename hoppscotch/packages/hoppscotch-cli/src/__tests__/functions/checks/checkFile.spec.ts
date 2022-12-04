import { HoppCLIError } from "../../../types/errors";
import { checkFile } from "../../../utils/checks";

import "@relmify/jest-fp-ts";

describe("checkFile", () => {
  test("Arquivo não existe", () => {
    return expect(
      checkFile("./src/samples/this-file-not-exists.json")()
    ).resolves.toSubsetEqualLeft(<HoppCLIError>{
      code: "FILE_NOT_FOUND",
    });
  });

  test("Arquivo não é um tipo JSON", () => {
    return expect(
      checkFile("./src/__tests__/samples/notjson.txt")()
    ).resolves.toSubsetEqualLeft(<HoppCLIError>{
      code: "INVALID_FILE_TYPE",
    });
  });

  test("Arquivo JSON existente", () => {
    return expect(
      checkFile("./src/__tests__/samples/passes.json")()
    ).resolves.toBeRight();
  });
});
