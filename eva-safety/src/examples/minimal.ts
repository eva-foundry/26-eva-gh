import { PolicyEngine, getDefaultPolicy } from "../policy/engine.js";

async function main() {
  const engine = new PolicyEngine(getDefaultPolicy());
  const input = "Email: a@b.com; CC 4111 1111 1111 1111; token ghp_abcdefghijklmnopqrstuvwxyz1234";
  const ev = engine.evaluate(input);
  console.log(ev);
}
void main();