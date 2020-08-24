(async () => {
	const codePromise = fetch('../out/main.wasm');

	// `instantiateStreaming` function compiles and instantiates a WebAssembly module directly from a streamed underlying source.
	// This is the most efficient, optimized way to load wasm code.
	// Source: A response object or a promise that will fulfill with one, representing the underlying source of a .wasm module you want to stream, compile and instantiate.
	// Return Value:
	// A Promise that resolves to a ResultObject which contains two fields:
	//   module: A WebAssembly.Module object representing the compiled WebAssembly module.
	//   instance: A WebAssembly.Instance object that contains all the Exported WebAssembly functions.

	const { instance } = await WebAssembly.instantiateStreaming(codePromise);

	const buffer = new Uint8Array(instance.exports.memory.buffer);
	const helloWorldPointer = instance.exports.helloWorld();

	let str = "";

	for (let i = helloWorldPointer; buffer[i]; i++) {
		str += String.fromCharCode(buffer[i]);
	}

	document.getElementById('container').textContent = str;
})();