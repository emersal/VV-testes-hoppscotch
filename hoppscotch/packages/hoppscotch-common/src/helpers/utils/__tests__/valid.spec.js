import { wsValid, httpValid, socketioValid } from "../valid"

describe("HTTP Válido", () => {
  test("retornar true para URL com IP válido", () => {
    expect(httpValid("http://174.129.224.73/")).toBe(true)
    expect(httpValid("http://174.129.224.73")).toBe(true)
  })

  test("rretornar true para URL com Host válido", () => {
    expect(httpValid("http://echo.websocket.org/")).toBe(true)
    expect(httpValid("http://echo.websocket.org")).toBe(true)
  })

  test("retornar true para URL com IP inválido", () => {
    expect(httpValid("http://174.129./")).toBe(false)
    expect(httpValid("http://174.129.")).toBe(false)
  })

  test("retornar true para URL com Host inválido", () => {
    expect(httpValid("http://echo.websocket./")).toBe(false)
    expect(httpValid("http://echo.websocket.")).toBe(false)
  })

  test("retornar false para os que não são HTTP", () => {
    expect(httpValid("wss://echo-websocket.hoppscotch.io/")).toBe(false)
    expect(httpValid("wss://echo-websocket.hoppscotch.io")).toBe(false)
    expect(httpValid("wss://174.129.224.73/")).toBe(false)
    expect(httpValid("wss://174.129.224.73")).toBe(false)
  })

})

