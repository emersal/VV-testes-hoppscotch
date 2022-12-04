import { isRESTCollection } from "../../../utils/checks";

describe("Verificar se é uma coleção REST", () => {
  test("Sem valor definido na coleção", () => {
    expect(isRESTCollection(undefined)).toBeFalsy();
  });

  test("ID não válido", () => {
    expect(
      isRESTCollection({
        v: 1,
        name: "test",
        id: 1,
      })
    ).toBeFalsy();
  });

  test("valor de requisição inválida", () => {
    expect(
      isRESTCollection({
        v: 1,
        name: "test",
        id: "1",
        requests: null,
      })
    ).toBeFalsy();
  });

  test("Pasta REST não válida.", () => {
    expect(
      isRESTCollection({
        v: 1,
        name: "test",
        id: "1",
        requests: [],
        folders: [
          {
            v: 1,
            name: "test1",
            id: "2",
            requests: undefined,
            folders: [],
          },
        ],
      })
    ).toBeFalsy();
  });


  test("Coleção REST aceita", () => {
    expect(
      isRESTCollection({
        v: 1,
        name: "test",
        id: "1",
        requests: [],
        folders: [],
      })
    ).toBeTruthy();
  });
});
