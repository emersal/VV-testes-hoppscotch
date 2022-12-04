import { isJSONContentType } from "../contenttypes"

describe("isJSONContentType", () => {
  test("verificar content types JSON", () => {
    expect(isJSONContentType("application/json")).toBe(true)
    expect(isJSONContentType("application/vnd.api+json")).toBe(true)
    expect(isJSONContentType("application/hal+json")).toBe(true)
    expect(isJSONContentType("application/ld+json")).toBe(true)
  })

  test("verificar content types diferentes de JSON", () => {
    expect(isJSONContentType("application/xml")).toBe(false)
    expect(isJSONContentType("text/html")).toBe(false)
    expect(isJSONContentType("application/x-www-form-urlencoded")).toBe(false)
    expect(isJSONContentType("foo/jsoninword")).toBe(false)
  })


  test("Verificar inválidos", () => {
    expect(isJSONContentType(null)).toBe(false)
    expect(isJSONContentType(undefined)).toBe(false)
  })
})
