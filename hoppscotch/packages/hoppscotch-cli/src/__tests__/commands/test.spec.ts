import { ExecException } from "child_process";
import { HoppErrorCode } from "../../types/errors";
import { execAsync, getErrorCode, getTestJsonFilePath } from "../utils";

describe("Testar arquivos dentro da collection", () => {
  test("Nenhuma coleção foi adicionada", async () => {
    const cmd = `node ./bin/hopp test`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("INVALID_ARGUMENT");
  });

  test("Nenhuma coleção encontrada", async () => {
    const cmd = `node ./bin/hopp test notfound.json`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("FILE_NOT_FOUND");
  });

  test("Arquivo de coleção não suportado", async () => {
    const cmd = `node ./bin/hopp test ${getTestJsonFilePath(
      "malformed-collection.json"
    )}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("MALFORMED_COLLECTION");
  });

  test("Coleção não contem arquivo JSON válido", async () => {
    const cmd = `node ./bin/hopp test ${getTestJsonFilePath("notjson.txt")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("INVALID_FILE_TYPE");
  });

  test("Erros ocorreram (exit code 1).", async () => {
    const cmd = `node ./bin/hopp test ${getTestJsonFilePath("fails.json")}`;
    const { error } = await execAsync(cmd);

    expect(error).not.toBeNull();
    expect(error).toMatchObject(<ExecException>{
      code: 1,
    });
  });

  test("Sem erros ocorridos(exit code 0).", async () => {
    const cmd = `node ./bin/hopp test ${getTestJsonFilePath("passes.json")}`;
    const { error } = await execAsync(cmd);

    expect(error).toBeNull();
  });
});


