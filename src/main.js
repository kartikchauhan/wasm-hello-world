(async () => {
  const codePromise = fetch('../out/main.wasm');
  const { instance } = await WebAssembly.instantiateStreaming(codePromise);
  
  console.log(instance);
  const buffer = new Uint8Array(instance.exports.memory.buffer);
  const functionPointer = instance.exports.helloWorld();

  let str = "";

  for(let i = functionPointer; buffer[i]; i++) {
    str += String.fromCharCode(buffer[i]);
  }

  document.getElementById('container').textContent = str;
})();