import { parseUrlAndPath } from "../uri"

describe("Verificar URI", () => {
  test("Verificar URL e Path", () => {
    const result = parseUrlAndPath("https://hoppscotch.io/")

    expect(result).toHaveProperty("url")
    expect(result).toHaveProperty("path")
  })

  test("Enviar URL corretamente", () => {
    const result = parseUrlAndPath("https://hoppscotch.io/test/page")

    expect(result.url).toBe("https://hoppscotch.io")
  })
  test("Enviar Path corretamente", () => {
    const result = parseUrlAndPath("https://hoppscotch.io/test/page")

    expect(result.path).toBe("/test/page")
  })
})
