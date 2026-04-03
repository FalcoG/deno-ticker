import { assertEquals } from "@std/assert";
import { add, server } from "./main.ts";

// todo: never test the server, only the functions
let address: Awaited<ReturnType<typeof server>>


Deno.test.beforeAll(async () => {
  console.log('before all')
  address = await server()
})

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});

Deno.test("connection test", async () => {
  // const result = await connect()
  const response = await fetch(`http://${address.hostname}:${address.port}`);

  console.log('res', response)

  // Do something with the response

  assertEquals(response, "hello")

  await response.body?.cancel(); // <- Always cancel the body when you are done with it, if you didn't consume it otherwise



})

