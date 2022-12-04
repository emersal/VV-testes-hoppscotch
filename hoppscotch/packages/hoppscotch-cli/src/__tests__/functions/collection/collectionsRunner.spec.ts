import { collectionsRunner } from "../../../utils/collections";
import { HoppRESTRequest } from "@hoppscotch/data";
import axios, { AxiosResponse } from "axios";

import "@relmify/jest-fp-ts";

jest.mock("axios");

const SAMPLE_HOPP_REQUEST = <HoppRESTRequest>{
  v: "1",
  name: "request",
  method: "GET",
  endpoint: "https://example.com",
  params: [],
  headers: [],
  preRequestScript: "",
  testScript: "",
  auth: {
    authActive: false,
    authType: "none",
  },
  body: {
    contentType: null,
    body: null,
  },
};

const SAMPLE_RESOLVED_RESPONSE = <AxiosResponse>{
  data: { body: 1 },
  status: 200,
  statusText: "OK",
  config: {
    url: "https://example.com",
    supported: true,
    method: "GET",
  },
  headers: [],
};

const SAMPLE_ENVS = { global: [], selected: [] };

describe("Testes de coleções ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Coleção vazia", () => {
    return expect(
      collectionsRunner({ collections: [], envs: SAMPLE_ENVS })()
    ).resolves.toStrictEqual([]);
  });

  test("Coleção sem requisições", () => {
    return expect(
      collectionsRunner({
        collections: [
          {
            v: 1,
            name: "name",
            folders: [],
            requests: [],
          },
        ],
        envs: SAMPLE_ENVS,
      })()
    ).resolves.toMatchObject([]);
  });

  test("Coleções com requisiçoes", () => {
    (axios as unknown as jest.Mock).mockResolvedValue(SAMPLE_RESOLVED_RESPONSE);

    return expect(
      collectionsRunner({
        collections: [
          {
            v: 1,
            name: "collection",
            folders: [],
            requests: [SAMPLE_HOPP_REQUEST],
          },
        ],
        envs: SAMPLE_ENVS,
      })()
    ).resolves.toMatchObject([
      {
        path: "collection/request",
        tests: [],
        errors: [],
        result: true,
      },
    ]);
  });
});
