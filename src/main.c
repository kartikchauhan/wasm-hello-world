#define WASM_EXPORT __attribute__((visibility("default")))

WASM_EXPORT
int main() {
  return 42;
}

// export function helloWorld
WASM_EXPORT
char* helloWorld() {
  return "Hello World";
}