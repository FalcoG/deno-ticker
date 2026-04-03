export function add(a: number, b: number): number {
  return a + b;
}

export async function server() {
  const kvPath = Deno.env.get('PROJECT_KV_PATH')
  if (!kvPath) throw new Error('Kv path is required')
  const kv = await Deno.openKv(kvPath);
  // const kv = await Deno.openKv(':memory:');

  const server = Deno.serve(async (_req) => {
    const currentEntry = await kv.get<number>(['stats', 'hits'])
    const currentValue = currentEntry.value

    const nextValue = (currentValue || 0) + 1

    void kv.atomic()
      .check(currentEntry) // Ensure the data entry has not been mutated
      .set(['stats', 'hits'], nextValue) // Update the sender's balance.
      .commit();

    return new Response(`Hello. You are visitor ${nextValue}`);
  });

  console.log('Server started', server.addr)

  return server.addr
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  server()
}

// export async function connect() {
//   const kv = await Deno.openKv(Deno.env.get('PROJECT_KV_PATH'));
//   const result = await kv.get(['sys', 'last-client'])
//   console.log('kv result', result)

//   await kv.set(["sys", "last-client"], Deno.hostname());

//   console.log('kv established?', kv)

//   kv.close()

//   console.log(kv.list)
//   return true
// }
