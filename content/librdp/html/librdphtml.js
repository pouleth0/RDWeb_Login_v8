/*

OpenSSL
Copyright (c) 1998-2017 The OpenSSL Project. All rights reserved.
This product includes software developed by the OpenSSL Project for use in the OpenSSL Toolkit (http://www.openssl.org/)

Original SSLeay License
Copyright (C) 1995-1998 Eric Young (eay@cryptsoft.com)
All rights reserved.
This product includes software written by Tim Hudson (tjh@cryptsoft.com).

Boost
http://www.boost.org/LICENSE_1_0.txt

H.264/AVC Reference Software

**********************************************************************
 * Software Copyright Licensing Disclaimer
 *
 * This software module was originally developed by contributors to the
 * course of the development of ISO/IEC 14496-10 for reference purposes
 * and its performance may not have been optimized.  This software
 * module is an implementation of one or more tools as specified by
 * ISO/IEC 14496-10.  ISO/IEC gives users free license to this software
 * module or modifications thereof. Those intending to use this software
 * module in products are advised that its use may infringe existing
 * patents.  ISO/IEC have no liability for use of this software module
 * or modifications thereof.  The original contributors retain full
 * rights to modify and use the code for their own purposes, and to
 * assign or donate the code to third-parties.
 *
 * This copyright notice must be included in all copies or derivative
 * works.  Copyright (c) ISO/IEC 2004, 2005, 2006, 2007, 2008.
 **********************************************************************


***********************************************************************
* COPYRIGHT AND WARRANTY INFORMATION
*
* Copyright 2001, International Telecommunications Union, Geneva
*
* DISCLAIMER OF WARRANTY
*
* These software programs are available to the user without any
* license fee or royalty on an "as is" basis. The ITU disclaims
* any and all warranties, whether express, implied, or
* statutory, including any implied warranties of merchantability
* or of fitness for a particular purpose.  In no event shall the 
* contributor or the ITU be liable for any incidental, punitive, or
* consequential damages of any kind whatsoever arising from the
* use of these programs.
*
* This disclaimer of warranty extends to the user of these programs
* and user's customers, employees, agents, transferees, successors,
* and assigns.
*
* The ITU does not represent or warrant that the programs furnished
* hereunder are free of infringement of any third-party patents.
* Commercial implementations of ITU-T Recommendations, including
* shareware, may be subject to royalty fees to patent holders.
* Information regarding the ITU-T patent policy is available from
* the ITU Web site at http://www.itu.int.
*
* THIS IS NOT A GRANT OF PATENT RIGHTS - SEE THE ITU-T PATENT POLICY.
************************************************************************

Notice about H.264/ AVC Visual Standard

This software may include H.264/AVC visual compression technology. MPEG LA, L.L.C. requires this notice:

THIS PRODUCT IS LICENSED UNDER THE AVC VISUAL PATENT PORTFOLIO LICENSE FOR THE PERSONAL AND NON-COMMERCIAL
USE OF A CONSUMER TO (i) ENCODE VIDEO IN COMPLIANCE WITH THE ABOVE VIDEO STANDARD AND/ OR(ii) DECODE AVC
VIDEO THAT WAS ENCODED BY A CONSUMER ENGAGED IN A PERSONAL AND NON-COMMERCIAL ACTIVITY AND/ OR WAS OBTAINED
FROM A VIDEO PROVIDER LICENSED TO PROVIDE SUCH VIDEO. NO LICENSE IS GRANTED OR SHALL BE IMPLIED FOR ANY OTHER USE.
ADDITIONAL INFORMATION MAY BE OBTAINED FROM MPEG LA, L.L.C. REFER TO www.mpegla.com.

For clarification purposes, this notice does not limit or inhibit the use of the software for normal business
uses that are personal to that business which do not include (i) redistribution of the software to third parties,
or (ii) creation of content compliant with the VIDEO STANDARDS technologies for distribution to third parties.



*/
var Module = typeof Module !== "undefined" ? Module : {};
(function () {
	var attachingObject;
	if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
		self.webworkerMessageQueue = [];
		self.onmessage = function (message) {
			self.webworkerMessageQueue.push(message)
		};
		return
	}
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = window
	}
	if (!attachingObject.crypto && attachingObject.msCrypto && attachingObject.msCrypto.getRandomValues) {
		attachingObject.crypto = attachingObject.msCrypto
	}
	attachingObject.RDCORE_VERSION = "1.25.0"
})();
var moduleOverrides = {};
var key;
for (key in Module) {
	if (Module.hasOwnProperty(key)) {
		moduleOverrides[key] = Module[key]
	}
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = function (status, toThrow) {
	throw toThrow
};
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = "";

function locateFile(path) {
	if (Module["locateFile"]) {
		return Module["locateFile"](path, scriptDirectory)
	}
	return scriptDirectory + path
}
var read_, readAsync, readBinary, setWindowTitle;
var nodeFS;
var nodePath;
if (ENVIRONMENT_IS_NODE) {
	if (ENVIRONMENT_IS_WORKER) {
		scriptDirectory = require("path").dirname(scriptDirectory) + "/"
	} else {
		scriptDirectory = __dirname + "/"
	}
	read_ = function shell_read(filename, binary) {
		if (!nodeFS) nodeFS = require("fs");
		if (!nodePath) nodePath = require("path");
		filename = nodePath["normalize"](filename);
		return nodeFS["readFileSync"](filename, binary ? null : "utf8")
	};
	readBinary = function readBinary(filename) {
		var ret = read_(filename, true);
		if (!ret.buffer) {
			ret = new Uint8Array(ret)
		}
		assert(ret.buffer);
		return ret
	};
	if (process["argv"].length > 1) {
		thisProgram = process["argv"][1].replace(/\\/g, "/")
	}
	arguments_ = process["argv"].slice(2);
	if (typeof module !== "undefined") {
		module["exports"] = Module
	}
	process["on"]("uncaughtException", function (ex) {
		if (!(ex instanceof ExitStatus)) {
			throw ex
		}
	});
	process["on"]("unhandledRejection", abort);
	quit_ = function (status) {
		process["exit"](status)
	};
	Module["inspect"] = function () {
		return "[Emscripten Module object]"
	}
} else if (ENVIRONMENT_IS_SHELL) {
	if (typeof read != "undefined") {
		read_ = function shell_read(f) {
			return read(f)
		}
	}
	readBinary = function readBinary(f) {
		var data;
		if (typeof readbuffer === "function") {
			return new Uint8Array(readbuffer(f))
		}
		data = read(f, "binary");
		assert(typeof data === "object");
		return data
	};
	if (typeof scriptArgs != "undefined") {
		arguments_ = scriptArgs
	} else if (typeof arguments != "undefined") {
		arguments_ = arguments
	}
	if (typeof quit === "function") {
		quit_ = function (status) {
			quit(status)
		}
	}
	if (typeof print !== "undefined") {
		if (typeof console === "undefined") console = {};
		console.log = print;
		console.warn = console.error = typeof printErr !== "undefined" ? printErr : print
	}
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
	if (ENVIRONMENT_IS_WORKER) {
		scriptDirectory = self.location.href
	} else if (document.currentScript) {
		scriptDirectory = document.currentScript.src
	}
	if (scriptDirectory.indexOf("blob:") !== 0) {
		scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1)
	} else {
		scriptDirectory = ""
	} {
		read_ = function shell_read(url) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", url, false);
			xhr.send(null);
			return xhr.responseText
		};
		if (ENVIRONMENT_IS_WORKER) {
			readBinary = function readBinary(url) {
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, false);
				xhr.responseType = "arraybuffer";
				xhr.send(null);
				return new Uint8Array(xhr.response)
			}
		}
		readAsync = function readAsync(url, onload, onerror) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", url, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = function xhr_onload() {
				if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
					onload(xhr.response);
					return
				}
				onerror()
			};
			xhr.onerror = onerror;
			xhr.send(null)
		}
	}
	setWindowTitle = function (title) {
		document.title = title
	}
} else {}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
	if (moduleOverrides.hasOwnProperty(key)) {
		Module[key] = moduleOverrides[key]
	}
}
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (Module["quit"]) quit_ = Module["quit"];
var STACK_ALIGN = 16;

function dynamicAlloc(size) {
	var ret = HEAP32[DYNAMICTOP_PTR >> 2];
	var end = ret + size + 15 & -16;
	HEAP32[DYNAMICTOP_PTR >> 2] = end;
	return ret
}

function alignMemory(size, factor) {
	if (!factor) factor = STACK_ALIGN;
	return Math.ceil(size / factor) * factor
}

function warnOnce(text) {
	if (!warnOnce.shown) warnOnce.shown = {};
	if (!warnOnce.shown[text]) {
		warnOnce.shown[text] = 1;
		err(text)
	}
}
var asm2wasmImports = {
	"f64-rem": function (x, y) {
		return x % y
	},
	"debugger": function () {}
};
var functionPointers = new Array(0);
var tempRet0 = 0;
var setTempRet0 = function (value) {
	tempRet0 = value
};
var getTempRet0 = function () {
	return tempRet0
};
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
var noExitRuntime;
if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
if (typeof WebAssembly !== "object") {
	abort("no native wasm support detected")
}
var wasmMemory;
var wasmTable = new WebAssembly.Table({
	"initial": 19124,
	"maximum": 19124,
	"element": "anyfunc"
});
var ABORT = false;
var EXITSTATUS = 0;

function assert(condition, text) {
	if (!condition) {
		abort("Assertion failed: " + text)
	}
}

function getMemory(size) {
	if (!runtimeInitialized) return dynamicAlloc(size);
	return _malloc(size)
}
var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
	var endIdx = idx + maxBytesToRead;
	var endPtr = idx;
	while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
	if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
		return UTF8Decoder.decode(heap.subarray(idx, endPtr))
	} else {
		var str = "";
		while (idx < endPtr) {
			var u0 = heap[idx++];
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0);
				continue
			}
			var u1 = heap[idx++] & 63;
			if ((u0 & 224) == 192) {
				str += String.fromCharCode((u0 & 31) << 6 | u1);
				continue
			}
			var u2 = heap[idx++] & 63;
			if ((u0 & 240) == 224) {
				u0 = (u0 & 15) << 12 | u1 << 6 | u2
			} else {
				u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63
			}
			if (u0 < 65536) {
				str += String.fromCharCode(u0)
			} else {
				var ch = u0 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
			}
		}
	}
	return str
}

function UTF8ToString(ptr, maxBytesToRead) {
	return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
	if (!(maxBytesToWrite > 0)) return 0;
	var startIdx = outIdx;
	var endIdx = outIdx + maxBytesToWrite - 1;
	for (var i = 0; i < str.length; ++i) {
		var u = str.charCodeAt(i);
		if (u >= 55296 && u <= 57343) {
			var u1 = str.charCodeAt(++i);
			u = 65536 + ((u & 1023) << 10) | u1 & 1023
		}
		if (u <= 127) {
			if (outIdx >= endIdx) break;
			heap[outIdx++] = u
		} else if (u <= 2047) {
			if (outIdx + 1 >= endIdx) break;
			heap[outIdx++] = 192 | u >> 6;
			heap[outIdx++] = 128 | u & 63
		} else if (u <= 65535) {
			if (outIdx + 2 >= endIdx) break;
			heap[outIdx++] = 224 | u >> 12;
			heap[outIdx++] = 128 | u >> 6 & 63;
			heap[outIdx++] = 128 | u & 63
		} else {
			if (outIdx + 3 >= endIdx) break;
			heap[outIdx++] = 240 | u >> 18;
			heap[outIdx++] = 128 | u >> 12 & 63;
			heap[outIdx++] = 128 | u >> 6 & 63;
			heap[outIdx++] = 128 | u & 63
		}
	}
	heap[outIdx] = 0;
	return outIdx - startIdx
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
	return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
}

function lengthBytesUTF8(str) {
	var len = 0;
	for (var i = 0; i < str.length; ++i) {
		var u = str.charCodeAt(i);
		if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
		if (u <= 127) ++len;
		else if (u <= 2047) len += 2;
		else if (u <= 65535) len += 3;
		else len += 4
	}
	return len
}
var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
	var endPtr = ptr;
	var idx = endPtr >> 1;
	var maxIdx = idx + maxBytesToRead / 2;
	while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
	endPtr = idx << 1;
	if (endPtr - ptr > 32 && UTF16Decoder) {
		return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr))
	} else {
		var i = 0;
		var str = "";
		while (1) {
			var codeUnit = HEAP16[ptr + i * 2 >> 1];
			if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
			++i;
			str += String.fromCharCode(codeUnit)
		}
	}
}

function stringToUTF16(str, outPtr, maxBytesToWrite) {
	if (maxBytesToWrite === undefined) {
		maxBytesToWrite = 2147483647
	}
	if (maxBytesToWrite < 2) return 0;
	maxBytesToWrite -= 2;
	var startPtr = outPtr;
	var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
	for (var i = 0; i < numCharsToWrite; ++i) {
		var codeUnit = str.charCodeAt(i);
		HEAP16[outPtr >> 1] = codeUnit;
		outPtr += 2
	}
	HEAP16[outPtr >> 1] = 0;
	return outPtr - startPtr
}

function lengthBytesUTF16(str) {
	return str.length * 2
}

function UTF32ToString(ptr, maxBytesToRead) {
	var i = 0;
	var str = "";
	while (!(i >= maxBytesToRead / 4)) {
		var utf32 = HEAP32[ptr + i * 4 >> 2];
		if (utf32 == 0) break;
		++i;
		if (utf32 >= 65536) {
			var ch = utf32 - 65536;
			str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
		} else {
			str += String.fromCharCode(utf32)
		}
	}
	return str
}

function stringToUTF32(str, outPtr, maxBytesToWrite) {
	if (maxBytesToWrite === undefined) {
		maxBytesToWrite = 2147483647
	}
	if (maxBytesToWrite < 4) return 0;
	var startPtr = outPtr;
	var endPtr = startPtr + maxBytesToWrite - 4;
	for (var i = 0; i < str.length; ++i) {
		var codeUnit = str.charCodeAt(i);
		if (codeUnit >= 55296 && codeUnit <= 57343) {
			var trailSurrogate = str.charCodeAt(++i);
			codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023
		}
		HEAP32[outPtr >> 2] = codeUnit;
		outPtr += 4;
		if (outPtr + 4 > endPtr) break
	}
	HEAP32[outPtr >> 2] = 0;
	return outPtr - startPtr
}

function lengthBytesUTF32(str) {
	var len = 0;
	for (var i = 0; i < str.length; ++i) {
		var codeUnit = str.charCodeAt(i);
		if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
		len += 4
	}
	return len
}

function allocateUTF8(str) {
	var size = lengthBytesUTF8(str) + 1;
	var ret = _malloc(size);
	if (ret) stringToUTF8Array(str, HEAP8, ret, size);
	return ret
}

function allocateUTF8OnStack(str) {
	var size = lengthBytesUTF8(str) + 1;
	var ret = stackAlloc(size);
	stringToUTF8Array(str, HEAP8, ret, size);
	return ret
}

function writeArrayToMemory(array, buffer) {
	HEAP8.set(array, buffer)
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
	for (var i = 0; i < str.length; ++i) {
		HEAP8[buffer++ >> 0] = str.charCodeAt(i)
	}
	if (!dontAddNull) HEAP8[buffer >> 0] = 0
}
var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
	if (x % multiple > 0) {
		x += multiple - x % multiple
	}
	return x
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
	buffer = buf;
	Module["HEAP8"] = HEAP8 = new Int8Array(buf);
	Module["HEAP16"] = HEAP16 = new Int16Array(buf);
	Module["HEAP32"] = HEAP32 = new Int32Array(buf);
	Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
	Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
	Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
	Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
	Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
}
var DYNAMIC_BASE = 6447568,
	DYNAMICTOP_PTR = 1204464;
var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 100663296;
if (Module["wasmMemory"]) {
	wasmMemory = Module["wasmMemory"]
} else {
	wasmMemory = new WebAssembly.Memory({
		"initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
		"maximum": 2147483648 / WASM_PAGE_SIZE
	})
}
if (wasmMemory) {
	buffer = wasmMemory.buffer
}
INITIAL_INITIAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
	while (callbacks.length > 0) {
		var callback = callbacks.shift();
		if (typeof callback == "function") {
			callback(Module);
			continue
		}
		var func = callback.func;
		if (typeof func === "number") {
			if (callback.arg === undefined) {
				Module["dynCall_v"](func)
			} else {
				Module["dynCall_vi"](func, callback.arg)
			}
		} else {
			func(callback.arg === undefined ? null : callback.arg)
		}
	}
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
	if (Module["preRun"]) {
		if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
		while (Module["preRun"].length) {
			addOnPreRun(Module["preRun"].shift())
		}
	}
	callRuntimeCallbacks(__ATPRERUN__)
}

function initRuntime() {
	runtimeInitialized = true;
	if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
	TTY.init();
	callRuntimeCallbacks(__ATINIT__)
}

function preMain() {
	FS.ignorePermissions = false;
	callRuntimeCallbacks(__ATMAIN__)
}

function exitRuntime() {
	runtimeExited = true
}

function postRun() {
	if (Module["postRun"]) {
		if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
		while (Module["postRun"].length) {
			addOnPostRun(Module["postRun"].shift())
		}
	}
	callRuntimeCallbacks(__ATPOSTRUN__)
}

function addOnPreRun(cb) {
	__ATPRERUN__.unshift(cb)
}

function addOnPostRun(cb) {
	__ATPOSTRUN__.unshift(cb)
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
	return id
}

function addRunDependency(id) {
	runDependencies++;
	if (Module["monitorRunDependencies"]) {
		Module["monitorRunDependencies"](runDependencies)
	}
}

function removeRunDependency(id) {
	runDependencies--;
	if (Module["monitorRunDependencies"]) {
		Module["monitorRunDependencies"](runDependencies)
	}
	if (runDependencies == 0) {
		if (runDependencyWatcher !== null) {
			clearInterval(runDependencyWatcher);
			runDependencyWatcher = null
		}
		if (dependenciesFulfilled) {
			var callback = dependenciesFulfilled;
			dependenciesFulfilled = null;
			callback()
		}
	}
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};

function abort(what) {
	if (Module["onAbort"]) {
		Module["onAbort"](what)
	}
	what += "";
	err(what);
	ABORT = true;
	EXITSTATUS = 1;
	what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
	var e = new WebAssembly.RuntimeError(what);
	throw e
}

function hasPrefix(str, prefix) {
	return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0
}
var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
	return hasPrefix(filename, dataURIPrefix)
}
var fileURIPrefix = "file://";

function isFileURI(filename) {
	return hasPrefix(filename, fileURIPrefix)
}
var wasmBinaryFile = "librdphtml.9878873f.wasm";
if (!isDataURI(wasmBinaryFile)) {
	wasmBinaryFile = locateFile(wasmBinaryFile)
}

function getBinary() {
	try {
		if (wasmBinary) {
			return new Uint8Array(wasmBinary)
		}
		if (readBinary) {
			return readBinary(wasmBinaryFile)
		} else {
			throw "both async and sync fetching of the wasm failed"
		}
	} catch (err) {
		abort(err)
	}
}

function getBinaryPromise() {
	if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
		return fetch(wasmBinaryFile, {
			credentials: "same-origin"
		}).then(function (response) {
			if (!response["ok"]) {
				throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
			}
			return response["arrayBuffer"]()
		}).catch(function () {
			return getBinary()
		})
	}
	return new Promise(function (resolve, reject) {
		resolve(getBinary())
	})
}

function createWasm() {
	var info = {
		"env": asmLibraryArg,
		"wasi_snapshot_preview1": asmLibraryArg,
		"global": {
			"NaN": NaN,
			Infinity: Infinity
		},
		"global.Math": Math,
		"asm2wasm": asm2wasmImports
	};

	function receiveInstance(instance, module) {
		var exports = instance.exports;
		Module["asm"] = exports;
		removeRunDependency("wasm-instantiate")
	}
	addRunDependency("wasm-instantiate");

	function receiveInstantiatedSource(output) {
		receiveInstance(output["instance"])
	}

	function instantiateArrayBuffer(receiver) {
		return getBinaryPromise().then(function (binary) {
			return WebAssembly.instantiate(binary, info)
		}).then(receiver, function (reason) {
			err("failed to asynchronously prepare wasm: " + reason);
			abort(reason)
		})
	}

	function instantiateAsync() {
		if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
			fetch(wasmBinaryFile, {
				credentials: "same-origin"
			}).then(function (response) {
				var result = WebAssembly.instantiateStreaming(response, info);
				return result.then(receiveInstantiatedSource, function (reason) {
					err("wasm streaming compile failed: " + reason);
					err("falling back to ArrayBuffer instantiation");
					return instantiateArrayBuffer(receiveInstantiatedSource)
				})
			})
		} else {
			return instantiateArrayBuffer(receiveInstantiatedSource)
		}
	}
	if (Module["instantiateWasm"]) {
		try {
			var exports = Module["instantiateWasm"](info, receiveInstance);
			return exports
		} catch (e) {
			err("Module.instantiateWasm callback failed with error: " + e);
			return false
		}
	}
	instantiateAsync();
	return {}
}
Module["asm"] = createWasm;
var tempDouble;
var tempI64;
var ASM_CONSTS = [function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.WebSocketTransportJSBridgeFactory === "undefined") {
		attachingObject.WebSocketTransportJSBridgeFactory = function () {
			var WebSocketJSBridge = function (wsTransport, jsWebSocket) {
				var that = this;
				this.wsTransport = wsTransport;
				this.jsWebSocket = jsWebSocket;
				this.disposed = false;
				jsWebSocket.onopen = function (event) {
					if (that.wsTransport != null && !that.wsTransport.expired()) {
						var lockedTransport = that.wsTransport.lock();
						lockedTransport.OnOpenFromJS(event);
						lockedTransport.delete()
					}
				};
				jsWebSocket.onmessage = function (event) {
					if (that.wsTransport != null && !that.wsTransport.expired()) {
						var lockedTransport = that.wsTransport.lock();
						lockedTransport.OnMessageFromJS(event);
						lockedTransport.delete()
					}
				};
				jsWebSocket.onerror = function (event) {
					if (that.wsTransport != null && !that.wsTransport.expired()) {
						var lockedTransport = that.wsTransport.lock();
						lockedTransport.OnErrorFromJS(event);
						lockedTransport.delete()
					}
				};
				jsWebSocket.onclose = function (event) {
					if (that.wsTransport != null && !that.wsTransport.expired()) {
						var lockedTransport = that.wsTransport.lock();
						lockedTransport.OnCloseFromJS(event);
						lockedTransport.delete()
					}
				}
			};
			WebSocketJSBridge.prototype.dispose = function () {
				if (!this.disposed) {
					this.jsWebSocket.onopen = null;
					this.jsWebSocket.onmessage = null;
					this.jsWebSocket.onerror = null;
					this.jsWebSocket.onclose = null;
					this.wsTransport.delete();
					this.wsTransport = null
				}
			};
			return function (wsTransport, jsWebSocket) {
				return new WebSocketJSBridge(wsTransport, jsWebSocket)
			}
		}()
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.WebSocketTransportWSFactory === "undefined") {
		attachingObject.WebSocketTransportWSFactory = {
			createWebSocket: function (url, subprotocols) {
				return new WebSocket(url, subprotocols)
			}
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	attachingObject.CommonWebGL = function () {
		var size = function (w, h) {
			this.w = w;
			this.h = h;
			this.getHalfSize = function () {
				return new size(this.w >> 1, this.h >> 1)
			};
			this.getVExpandSize = function () {
				return new size(this.w, (this.h >> 1) + this.h)
			};
			this.length = function () {
				return this.w * this.h
			}
		};
		this.Size = size;
		this.text = function (str) {
			return str.join("\n")
		};

		function error(message) {
			console.error(message);
			console.trace()
		}

		function assert(condition, message) {
			if (!condition) {
				error(message)
			}
		}
		this.Script = function script() {
			var innerConstructor = function () {};
			innerConstructor.createFromElementId = function (id) {
				var script = document.getElementById(id);
				assert(script, "Could not find shader with ID: " + id);
				var source = "";
				var currentChild = script.firstChild;
				while (currentChild) {
					if (currentChild.nodeType == 3) {
						source += currentChild.textContent
					}
					currentChild = currentChild.nextSibling
				}
				var res = new innerConstructor;
				res.type = script.type;
				res.source = source;
				return res
			};
			innerConstructor.createFromSource = function (type, source) {
				var res = new innerConstructor;
				res.type = type;
				res.source = source;
				return res
			};
			return innerConstructor
		}();
		this.Shader = function shader() {
			var innerConstructor = function (gl, script) {
				if (script.type == "x-shader/x-fragment") {
					this.shader = gl.createShader(gl.FRAGMENT_SHADER)
				} else if (script.type == "x-shader/x-vertex") {
					this.shader = gl.createShader(gl.VERTEX_SHADER)
				} else {
					console.error("Unknown shader type: " + script.type);
					return
				}
				gl.shaderSource(this.shader, script.source);
				gl.compileShader(this.shader);
				if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
					console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(this.shader));
					return
				}
			};
			return innerConstructor
		}();
		this.Program = function () {
			var innerConstructor = function (gl) {
				this.gl = gl;
				this.program = this.gl.createProgram()
			};
			innerConstructor.prototype = {
				attach: function (shader) {
					this.gl.attachShader(this.program, shader.shader)
				},
				link: function () {
					this.gl.linkProgram(this.program);
					assert(this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS), "Unable to initialize the shader program.")
				},
				use: function () {
					this.gl.useProgram(this.program)
				},
				getAttributeLocation: function (name) {
					return this.gl.getAttribLocation(this.program, name)
				},
				setMatrixUniform: function (name, array) {
					var uniform = this.gl.getUniformLocation(this.program, name);
					this.gl.uniformMatrix4fv(uniform, false, array)
				},
				setVec2Uniform: function (name, x, y) {
					var uniform = this.gl.getUniformLocation(this.program, name);
					this.gl.uniform2f(uniform, x, y)
				},
				setFloatUniform: function (name, x) {
					var uniform = this.gl.getUniformLocation(this.program, name);
					this.gl.uniform1f(uniform, x)
				}
			};
			return innerConstructor
		}();
		this.FrameBuffer = function frameBuffer() {
			var innerConstructor = function (gl) {
				this.gl = gl;
				this.framebuffer = gl.createFramebuffer()
			};
			innerConstructor.prototype = {
				bind: function (tex) {
					var gl = this.gl;
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
					gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex.texture, 0)
				},
				unbind: function () {
					var gl = this.gl;
					gl.bindFramebuffer(gl.FRAMEBUFFER, null)
				},
				release: function () {
					var gl = this.gl;
					gl.deleteFramebuffer(this.framebuffer)
				}
			};
			return innerConstructor
		}();
		this.testTexData = new Uint8Array([8, 8, 8, 6, 8, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 8, 8, 8, 6, 8, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 6, 8, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 9, 9, 9, 5, 2, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 6, 6, 6, 5, 6, 5, 2, 2, 6, 3, 2, 6, 6, 2, 6, 3, 6, 6, 6, 5, 6, 5, 2, 2, 6, 3, 2, 6, 6, 2, 6, 3, 7, 7, 7, 2, 7, 2, 8, 8, 7, 6, 8, 7, 7, 8, 7, 6, 4, 4, 5, 0, 7, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 2, 2, 2, 3, 2, 3, 6, 6, 2, 5, 6, 2, 2, 6, 2, 5, 7, 7, 7, 2, 7, 2, 8, 8, 7, 6, 8, 7, 7, 8, 7, 6, 7, 7, 7, 2, 7, 2, 8, 8, 7, 6, 8, 7, 7, 8, 7, 6, 1, 1, 1, 1, 1, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 7, 7, 7, 2, 7, 2, 8, 8, 7, 6, 8, 7, 7, 8, 7, 6, 8, 8, 8, 6, 8, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2, 8, 8, 8, 6, 8, 6, 7, 7, 8, 2, 7, 8, 8, 7, 8, 2]);
		this.idctNumSlotsTest = 4;
		this.idctCofTest = new Int16Array([+4608, +1760, +640, +320, -2080, +1800, +320, -200, +768, -160, -384, -320, -480, +0, +320, +600]);
		this.idctPosTest = new Int16Array([0, 0, 0, 4096, 0, 8192, 0, 12288]);
		this.idctTestCof0 = new Int16Array([+4608, -2080, +768, -480]);
		this.idctTestCof1 = new Int16Array([+1760, +1800, -160, +0]);
		this.idctTestCof2 = new Int16Array([+640, +320, -384, +320]);
		this.idctTestCof3 = new Int16Array([+320, -200, -320, +600]);
		this.idctTestPosPack = new Int16Array([0, 0]);
		this.idctVerify = new Uint8Array([+113, +61, +11, +5, +108, +61, +15, +21, +114, +37, +63, +61, +113, +124, +124, +121]);
		this.CreateOrtho2D = function (left, right, bottom, top) {
			var near = -1;
			var far = 1;
			var hor = right - left;
			var ver = top - bottom;
			var dep = far - near;
			return [2 / hor, 0, 0, 0, 0, 2 / ver, 0, 0, 0, 0, -2 / dep, 0, -(right + left) / hor, -(top + bottom) / ver, -(far + near) / dep, 1]
		};
		this.Texture = function texture() {
			var innerConstructor = function (gl, size, format, type, sample, rect) {
				this.gl = gl;
				this.size = size;
				this.texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				this.format = format ? format : gl.LUMINANCE;
				this.type = type ? type : gl.UNSIGNED_BYTE;
				gl.texImage2D(gl.TEXTURE_2D, 0, this.format, size.w, size.h, 0, this.format, this.type, null);
				this.sample = sample ? sample : gl.LINEAR;
				this.rect = rect ? rect : gl.TEXTURE_2D;
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.sample);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.sample);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
			};
			var textureIDs = null;
			innerConstructor.prototype = {
				fill: function (textureData, useTexSubImage2D, w, h) {
					var gl = this.gl;
					assert(textureData.length >= this.size.w * this.size.h, "Texture size mismatch, data:" + textureData.length + ", texture: " + this.size.w * this.size.h);
					gl.bindTexture(gl.TEXTURE_2D, this.texture);
					if (useTexSubImage2D) {
						gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, w, h, this.format, this.type, textureData)
					} else {
						gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.size.w, this.size.h, 0, this.format, this.type, textureData)
					}
				},
				bind: function (n, program, name) {
					var gl = this.gl;
					if (!textureIDs) {
						textureIDs = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2]
					}
					gl.activeTexture(textureIDs[n]);
					gl.bindTexture(gl.TEXTURE_2D, this.texture);
					gl.uniform1i(gl.getUniformLocation(program.program, name), n)
				},
				release: function () {
					var gl = this.gl;
					gl.deleteTexture(this.texture)
				}
			};
			return innerConstructor
		}()
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var cwgl = new attachingObject.CommonWebGL;
	var text = cwgl.text;
	var inherit = cwgl.inherit;
	var Script = cwgl.Script;
	var Program = cwgl.Program;
	var Shader = cwgl.Shader;
	var Texture = cwgl.Texture;
	var FrameBuffer = cwgl.FrameBuffer;
	var makePerspective = cwgl.makePerspective;
	var CreateOrtho2D = cwgl.CreateOrtho2D;
	var Size = cwgl.Size;
	attachingObject.IDCTPackProc = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec2 aPos;", "attribute vec4 aCoord0;", "attribute vec4 aCoord1;", "attribute vec4 aCoord2;", "attribute vec4 aCoord3;", "uniform mat4 uMatrix;", "varying mediump vec4 dctCof0;", "varying mediump vec4 dctCof1;", "varying mediump vec4 dctCof2;", "varying mediump vec4 dctCof3;", "varying mediump float offset;", "void main(void) {", "  vec2 mbxy;", "  vec2 pointSize = vec2(4.0, 4.0);", "  offset = floor(aPos.x * 0.000244140625 + 0.5);", "  mbxy = vec2(aPos.x - offset * 4096.0, aPos.y);", "  mbxy.xy = mbxy.xy * pointSize + pointSize * 0.5;", "  offset = pow(2.0, offset - 6.0);", "  dctCof0 = aCoord0;", "  dctCof1 = aCoord1;", "  dctCof2 = aCoord2;", "  dctCof3 = aCoord3;", "  gl_Position = uMatrix * vec4(mbxy,0.0, 1.0);", "  gl_PointSize = pointSize.x;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec4 dctCof0;", "varying mediump vec4 dctCof1;", "varying mediump vec4 dctCof2;", "varying mediump vec4 dctCof3;", "varying mediump float offset;", "const mediump vec2 halfTexel = vec2(0.5, 0.5);", "uniform sampler2D TexIDCT;", "void main(void) {", "  vec2 coord = mod(gl_FragCoord.xy - halfTexel, 4.0) * 0.25;", "  vec4 bias = vec4(2.0, 2.0, 2.0, 2.0);", "  vec4 ker_v = floor(texture2D(TexIDCT,coord + halfTexel/4.0) * 255.0 + vec4(0.5, 0.5, 0.5, 0.5));", "  vec4 ker_h = floor(ker_v * 0.0625 + 0.5);", "  ker_v = (ker_v - ker_h * 16.0 - bias)/bias;", "  ker_h = (ker_h - bias)/bias;", "  bias = vec4(dot(ker_h, dctCof0), dot(ker_h, dctCof1), dot(ker_h, dctCof2), dot(ker_h, dctCof3));", "  bias.x = floor(dot(bias, ker_v) * offset + 0.5);", "  bias.xy =vec2(32.0 * (1.0 + sign(bias.x)), abs(bias.x));", "  bias.z = floor(bias.y * 0.00390625);", "  gl_FragColor = vec4(bias.x, bias.z, floor(bias.y - 256.0 * bias.z), 0.0)/255.0;", "}"]));

		function CreateDCTKernelTex() {
			var gl = this.gl;
			var dctSpecWidth = 4;
			var dctSpecHeight = 4;
			var size = new Size(dctSpecWidth, dctSpecHeight);
			var dctData = new Uint8Array([68, 68, 68, 51, 68, 67, 64, 48, 68, 65, 64, 52, 68, 64, 68, 49, 68, 52, 4, 3, 68, 51, 0, 0, 68, 49, 0, 4, 68, 48, 4, 1, 68, 20, 4, 67, 68, 19, 0, 64, 68, 17, 0, 68, 68, 16, 4, 65, 68, 4, 68, 19, 68, 3, 64, 16, 68, 1, 64, 20, 68, 0, 68, 17]);
			this.texIDCTKernel = new Texture(gl, size, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
			this.texIDCTKernel.fill(dctData)
		}

		function CreateResources() {
			var gl = this.gl;
			this.program = new Program(gl);
			this.program.attach(new Shader(gl, vertexShaderScript));
			this.program.attach(new Shader(gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute0 = this.program.getAttributeLocation("aCoord0");
			this.textureCoordAttribute1 = this.program.getAttributeLocation("aCoord1");
			this.textureCoordAttribute2 = this.program.getAttributeLocation("aCoord2");
			this.textureCoordAttribute3 = this.program.getAttributeLocation("aCoord3");
			this.idctPosBuf = gl.createBuffer();
			this.idctCofBuf0 = gl.createBuffer();
			this.idctCofBuf1 = gl.createBuffer();
			this.idctCofBuf2 = gl.createBuffer();
			this.idctCofBuf3 = gl.createBuffer();
			CreateDCTKernelTex.call(this)
		}
		var innerConstructor = function (gl, texResidue, size) {
			this.gl = gl;
			this.idctFrameBuf = new FrameBuffer(gl);
			this.texResidue = texResidue;
			this.size = size.getVExpandSize();
			this.orgSize = size;
			this.totalBlks = this.size.w * this.size.h / 16;
			this.texIDCTKernel;
			this.idctCof;
			this.idctPos;
			this.numSlots;
			this.program;
			this.drawOffset;
			this.initialzed = false;
			CreateResources.call(this)
		};

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctPos, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf0);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctCof0, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf1);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctCof1, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf2);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctCof2, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf3);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctCof3, gl.DYNAMIC_DRAW)
		}

		function UpdateBuf() {
			var gl = this.gl;
			var sizeShortInByte = 2;
			var posSizeVertex = 2;
			var cofSizeVertex = 4;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * posSizeVertex * sizeShortInByte, this.idctPos.subarray(this.drawOffset * posSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf0);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * cofSizeVertex * sizeShortInByte, this.idctCof0.subarray(this.drawOffset * cofSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf1);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * cofSizeVertex * sizeShortInByte, this.idctCof1.subarray(this.drawOffset * cofSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf2);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * cofSizeVertex * sizeShortInByte, this.idctCof2.subarray(this.drawOffset * cofSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf3);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * cofSizeVertex * sizeShortInByte, this.idctCof3.subarray(this.drawOffset * cofSizeVertex))
		}

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.UNSIGNED_SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute0);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf0);
			gl.vertexAttribPointer(this.textureCoordAttribute0, 4, gl.SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute1);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf1);
			gl.vertexAttribPointer(this.textureCoordAttribute1, 4, gl.SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute2);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf2);
			gl.vertexAttribPointer(this.textureCoordAttribute2, 4, gl.SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute3);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf3);
			gl.vertexAttribPointer(this.textureCoordAttribute3, 4, gl.SHORT, false, 0, 0);
			this.texIDCTKernel.bind(0, this.program, "TexIDCT")
		}
		innerConstructor.prototype = {
			SetBuf: function (idctPos, idctCof0, idctCof1, idctCof2, idctCof3, numSlots) {
				this.idctCof0 = idctCof0;
				this.idctCof1 = idctCof1;
				this.idctCof2 = idctCof2;
				this.idctCof3 = idctCof3;
				this.idctPos = idctPos;
				this.numSlots = numSlots
			},
			DrawIDCT: function () {
				var gl = this.gl;
				this.idctFrameBuf.bind(this.texResidue);
				gl.clearColor(0, 0, 0, 1);
				gl.clear(gl.COLOR_BUFFER_BIT);
				if (this.numSlots > 0) {
					this.drawOffset = this.totalBlks - this.numSlots;
					gl.viewport(0, 0, this.size.w, this.size.h);
					if (this.initialzed === false) {
						LoadBuf.call(this);
						this.initialzed = true
					} else {
						UpdateBuf.call(this)
					}
					SetScene.call(this);
					gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots)
				}
				this.idctFrameBuf.unbind()
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.idctPosBuf);
				gl.deleteBuffer(this.idctCofBuf);
				this.idctFrameBuf.release();
				this.texIDCTKernel.release();
				delete this.program
			}
		};
		return innerConstructor
	}();
	attachingObject.IDCTProc = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec2 aPos;", "attribute vec4 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec4 dctCof;", "varying mediump vec2 offset;", "void main(void) {", "  vec2 mbxy;", "  vec2 pointSize = vec2(4.0, 4.0);", "  offset = floor(aPos * 0.000244140625 + vec2(0.5, 0.5));", "  mbxy = aPos - offset * 4096.0;", "  mbxy.xy = mbxy.xy * pointSize + pointSize * 0.5;", "  offset.y = offset.y * 0.25;", "  offset.x = pow(2.0, offset.x);", "  dctCof = aCoord;", "  gl_Position = uMatrix * vec4(mbxy,0.0, 1.0);", "  gl_PointSize = pointSize.x;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec4 dctCof;", "varying mediump vec2 offset;", "uniform sampler2D TexIDCT;", "void main(void) {", "  vec2 coord = floor(mod(vec2(gl_FragCoord.x, gl_FragCoord.y), 4.0)) * 0.25;", "  coord = coord * vec2(0.25, 1.0) + vec2(offset.y, 0.0);", "  vec4 bias = vec4(4.0/255.0, 4.0/255.0, 4.0/255.0, 4.0/255.0);", "  vec4 kernTexel = texture2D(TexIDCT,coord);", "  kernTexel = (kernTexel - bias)/bias;", "  gl_FragColor = vec4(dot(dctCof, kernTexel) * offset.x, 0.0, 0.0, 0.0);", "}"]));

		function CreateDCTKernelTex() {
			var gl = this.gl;
			var dctSpecWidth = 16;
			var dctSpecHeight = 4;
			var size = new Size(dctSpecWidth, dctSpecHeight);
			var dctData = new Uint8Array([8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 6, 6, 6, 5, 6, 5, 2, 2, 6, 3, 2, 6, 6, 2, 6, 3, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 6, 6, 6, 5, 6, 5, 2, 2, 6, 3, 2, 6, 6, 2, 6, 3, 0, 0, 0, 2, 0, 2, 8, 8, 0, 6, 8, 0, 0, 8, 0, 6, 0, 0, 0, 2, 0, 2, 8, 8, 0, 6, 8, 0, 0, 8, 0, 6, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 2, 2, 2, 3, 2, 3, 6, 6, 2, 5, 6, 2, 2, 6, 2, 5, 0, 0, 0, 2, 0, 2, 8, 8, 0, 6, 8, 0, 0, 8, 0, 6, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 0, 0, 0, 2, 0, 2, 8, 8, 0, 6, 8, 0, 0, 8, 0, 6, 8, 8, 8, 6, 8, 6, 0, 0, 8, 2, 0, 8, 8, 0, 8, 2, 2, 2, 2, 3, 2, 3, 6, 6, 2, 5, 6, 2, 2, 6, 2, 5]);
			this.texIDCTKernel = new Texture(gl, size, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
			this.texIDCTKernel.fill(dctData)
		}

		function CreateResources() {
			var gl = this.gl;
			this.program = new Program(gl);
			this.program.attach(new Shader(gl, vertexShaderScript));
			this.program.attach(new Shader(gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("aCoord");
			this.idctPosBuf = gl.createBuffer();
			this.idctCofBuf = gl.createBuffer();
			CreateDCTKernelTex.call(this)
		}
		var innerConstructor = function (gl, texResidue, size) {
			this.gl = gl;
			this.idctFrameBuf = new FrameBuffer(gl);
			this.texResidue = texResidue;
			this.size = size.getVExpandSize();
			this.orgSize = size;
			this.totalBlks = this.size.w * this.size.h / 4;
			this.texIDCTKernel;
			this.idctCof;
			this.idctPos;
			this.numSlots;
			this.program;
			this.drawOffset;
			this.initialzed = false;
			CreateResources.call(this)
		};

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctPos, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.idctCof, gl.DYNAMIC_DRAW)
		}

		function UpdateBuf() {
			var gl = this.gl;
			var sizeShortInByte = 2;
			var posSizeVertex = 2;
			var cofSizeVertex = 4;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * posSizeVertex * sizeShortInByte, this.idctPos.subarray(this.drawOffset * posSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * cofSizeVertex * sizeShortInByte, this.idctCof.subarray(this.drawOffset * cofSizeVertex))
		}

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.UNSIGNED_SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.idctCofBuf);
			gl.vertexAttribPointer(this.textureCoordAttribute, 4, gl.SHORT, false, 0, 0);
			this.texIDCTKernel.bind(0, this.program, "TexIDCT");
			gl.enable(gl.BLEND);
			gl.blendEquation(gl.FUNC_ADD);
			gl.blendFunc(gl.ONE, gl.ONE)
		}
		innerConstructor.prototype = {
			SetBuf: function (idctPos, idctCof, numSlots) {
				this.idctCof = idctCof;
				this.idctPos = idctPos;
				this.numSlots = numSlots
			},
			DrawIDCT: function () {
				var gl = this.gl;
				this.drawOffset = this.totalBlks - this.numSlots;
				gl.viewport(0, 0, this.size.w, this.size.h);
				this.idctFrameBuf.bind(this.texResidue);
				if (this.initialzed === false) {
					LoadBuf.call(this);
					this.initialzed = true
				} else {
					UpdateBuf.call(this)
				}
				SetScene.call(this);
				gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots);
				gl.disable(gl.BLEND);
				this.idctFrameBuf.unbind()
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.idctPosBuf);
				gl.deleteBuffer(this.idctCofBuf);
				this.idctFrameBuf.release();
				this.texIDCTKernel.release();
				delete this.program
			}
		};
		return innerConstructor
	}();
	var UnitTestIDCT = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "  gl_Position = uMatrix * vec4(aPos, 1.0);", "  texCoord = aCoord;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform sampler2D TexTest;", "void main(void) {", "  gl_FragColor = texture2D(TexTest,  texCoord);", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program = new Program(this.gl);
			this.program.attach(new Shader(this.gl, vertexShaderScript));
			this.program.attach(new Shader(this.gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			this.program.setMatrixUniform("uMatrix", this.mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("aCoord")
		}
		var innerConstructor = function (gl, size, vertPos, texCoord) {
			this.gl = gl;
			this.size = size;
			this.mvp = CreateOrtho2D(0, size.w, 0, size.h);
			this.vertPos = vertPos;
			this.texCoord = texCoord;
			InitShaders.call(this)
		};

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPos);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)
		}
		innerConstructor.prototype = {
			DrawTest: function (TexTest) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				SetScene.call(this);
				TexTest.bind(0, this.program, "TexTest");
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
				var pixel = new Uint8Array(256);
				gl.readPixels(0, 0, 16, 4, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
				for (var i = 0; i < pixel.length; i += 4) {
					if (pixel[i] != cwgl.idctVerify[i / 4]) {
						console.error("idct unit test failed");
						return 1
					}
				}
				console.log("idct unit test pass");
				return 0
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var cwgl = new attachingObject.CommonWebGL;
	var text = cwgl.text;
	var inherit = cwgl.inherit;
	var Script = cwgl.Script;
	var Program = cwgl.Program;
	var Shader = cwgl.Shader;
	var Texture = cwgl.Texture;
	var FrameBuffer = cwgl.FrameBuffer;
	var makePerspective = cwgl.makePerspective;
	var CreateOrtho2D = cwgl.CreateOrtho2D;
	var Size = cwgl.Size;
	attachingObject.MotionCompensationProc = function () {
		null;
		var vertexShaderScriptY = Script.createFromSource("x-shader/x-vertex", text(["attribute float aPos;", "attribute vec2 mvIn;", "uniform mat4 uMatrix;", "varying mediump vec2 mvOut;", "void main(void) {", "  vec2 mbxy;", "  vec2 pointSize = vec2(16.0, 16.0);", "  mbxy.y = floor(aPos * 0.00390625);", "  mbxy.x = aPos - mbxy.y * 256.0;", "  mbxy.xy = mbxy.xy * pointSize + pointSize * 0.5;", "  mvOut = mvIn;", "  gl_PointSize = pointSize.x;", "  gl_Position = uMatrix * vec4(mbxy,0.0, 1.0);", "}"]));
		var fragmentShaderScriptYY = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 mvOut;", "uniform vec2 scale;", "uniform vec2 factor;", "uniform sampler2D TexResidue;", "uniform sampler2D TexRef;", "void main(void) {", "  vec2 coord = gl_FragCoord.xy;", "  vec2 coordY = coord * scale;", "  float color = floor(texture2D(TexResidue, coordY).x / 64.0 + 0.5) / 255.0;", "  color += texture2D(TexRef, (coord + mvOut) * factor).x;", "  gl_FragColor = vec4(color, 0.0, 0.0, 0.0);", "}"]));
		var fragmentShaderScriptY = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 mvOut;", "uniform vec2 scale;", "uniform vec2 factor;", "uniform sampler2D TexResidue;", "uniform sampler2D TexRef;", "void main(void) {", "  vec2 coord = gl_FragCoord.xy;", "  vec2 coordY = coord * scale;", "  vec3 color = texture2D(TexResidue, coordY).xyz * 255.0;", "  color.x = ((color.x - 32.0)/32.0 * (color.y * 256.0 + color.z));", "  color.x += texture2D(TexRef, (coord + mvOut) * factor).x * 255.0;", "  gl_FragColor = vec4(color.x/255.0 , 0.0, 0.0, 0.0);", "}"]));
		var vertexShaderScriptUV = Script.createFromSource("x-shader/x-vertex", text(["attribute float aPos;", "attribute vec2 mvIn;", "uniform mat4 uMatrix;", "varying mediump vec2 mvOut;", "void main(void) {", "  vec2 mbxy;", "  vec2 pointSize = vec2(8.0, 8.0);", "  mbxy.y = floor(aPos * 0.00390625);", "  mbxy.x = aPos - mbxy.y * 256.0;", "  mbxy.xy = mbxy.xy * pointSize + pointSize * 0.5;", "  mvOut = mvIn;", "  gl_PointSize = pointSize.x;", "  gl_Position = uMatrix * vec4(mbxy,0.0, 1.0);", "}"]));
		var fragmentShaderScriptUV = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 mvOut;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 halfSize;", "uniform vec2 factor;", "uniform sampler2D TexResidue;", "uniform sampler2D TexRef;", "void main(void) {", "  vec2 coord = gl_FragCoord.xy;", "  vec2 coordU = (coord + vec2(0.0, uvOffset.y)) * scale;", "  vec2 coordV = (coord + uvOffset) * scale;", "  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);", "  vec3 colorU =  texture2D(TexResidue, coordU).xyz * 255.0;", "  vec3 colorV =  texture2D(TexResidue, coordV).xyz * 255.0;", "  gl_FragColor.yz = vec2((colorU.x - 32.0)/32.0 * (colorU.y * 256.0 + colorU.z), (colorV.x - 32.0)/32.0 * (colorV.y * 256.0 + colorV.z));", "  coord = clamp(coord + mvOut * 0.5,vec2(0, 0), halfSize);", "  colorV.xy =  floor(255.0 * texture2D(TexRef, coord * factor).yz + vec2(0.5, 0.5));", "  gl_FragColor.yz = (gl_FragColor.yz + colorV.xy)/255.0;", "}"]));
		var fragmentShaderScriptUVK = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 mvOut;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 halfSize;", "uniform vec2 factor;", "uniform sampler2D TexResidue;", "uniform sampler2D TexRef;", "void main(void) {", "  vec2 coord = gl_FragCoord.xy;", "  vec2 coordU = (coord + vec2(0.0, uvOffset.y)) * scale;", "  vec2 coordV = (coord + uvOffset) * scale;", "  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);", "  gl_FragColor.yz = floor(vec2(texture2D(TexResidue, coordU).x, texture2D(TexResidue, coordV).x) /64.0 + vec2(0.5, 0.5))/255.0;", "  coord = clamp(coord + mvOut * 0.5,vec2(0, 0), halfSize);", "  vec2 color = floor(255.0 * texture2D(TexRef, coord * factor).yz + vec2(0.5, 0.5)) / 255.0;", "  gl_FragColor.yz += color;", "}"]));

		function CreateResources() {
			var gl = this.gl;
			this.program0 = new Program(gl);
			this.program0.attach(new Shader(gl, vertexShaderScriptY));
			this.program0.attach(new Shader(gl, fragmentShaderScriptY));
			this.program0.link();
			this.program0.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program0.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program0.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program0.getAttributeLocation("mvIn");
			var x = 1 / this.size.w;
			var y = 2 / (this.size.h * 3);
			this.program0.setVec2Uniform("scale", x, y);
			x = 1 / this.size.w;
			y = 1 / this.size.h;
			this.program0.setVec2Uniform("factor", x, y);
			this.program1 = new Program(gl);
			this.program1.attach(new Shader(gl, vertexShaderScriptUV));
			this.program1.attach(new Shader(gl, fragmentShaderScriptUV));
			this.program1.link();
			this.program1.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program1.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program1.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program1.getAttributeLocation("mvIn");
			var x = 1 / this.size.w;
			var y = 2 / (this.size.h * 3);
			this.program1.setVec2Uniform("scale", x, y);
			x = this.size.w / 2;
			y = this.size.h;
			this.program1.setVec2Uniform("uvOffset", x, y);
			x = this.size.w / 2 - 1;
			y = this.size.h / 2 - 1;
			this.program1.setVec2Uniform("halfSize", x, y);
			x = 1 / this.size.w;
			y = 1 / this.size.h;
			this.program1.setVec2Uniform("factor", x, y);
			this.mcPosBuf = gl.createBuffer();
			this.mvBuf = gl.createBuffer()
		}
		var innerConstructor = function (gl, texResidue, mvp, size) {
			this.gl = gl;
			this.mcFrameBuf = new FrameBuffer(gl);
			this.texResidue = texResidue;
			this.mvp = mvp;
			this.size = size;
			this.mcPosBuf;
			this.mvBuf;
			this.mcPos;
			this.mv;
			this.drawOffset;
			this.totalBlks = this.size.w * this.size.h / (16 * 16);
			this.initialzed = false;
			this.numSlots;
			this.program0;
			this.program1;
			CreateResources.call(this)
		};

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.mcPos, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.mv, gl.DYNAMIC_DRAW)
		}

		function UpdateBuf() {
			var gl = this.gl;
			var sizeShortInByte = 2;
			var posSizeVertex = 1;
			var mvSizeVertex = 2;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * posSizeVertex * sizeShortInByte, this.mcPos.subarray(this.drawOffset * posSizeVertex));
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * mvSizeVertex * sizeShortInByte, this.mv.subarray(this.drawOffset * mvSizeVertex))
		}

		function SetScene0(texRef) {
			var gl = this.gl;
			this.program0.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 1, gl.UNSIGNED_SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.SHORT, false, 0, 0);
			this.texResidue.bind(0, this.program0, "TexResidue");
			texRef.bind(1, this.program0, "TexRef")
		}

		function SetScene1(texRef) {
			var gl = this.gl;
			this.program1.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 1, gl.UNSIGNED_SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.SHORT, false, 0, 0);
			this.texResidue.bind(0, this.program1, "TexResidue");
			texRef.bind(1, this.program1, "TexRef")
		}
		innerConstructor.prototype = {
			SetBuf: function (mcPos, mv, numSlots) {
				this.mcPos = mcPos;
				this.mv = mv;
				this.numSlots = numSlots
			},
			DrawMC: function (texYUV, texRef) {
				if (this.numSlots > 0) {
					var gl = this.gl;
					gl.viewport(0, 0, this.size.w, this.size.h);
					this.mcFrameBuf.bind(texYUV);
					this.drawOffset = this.totalBlks - this.numSlots;
					if (this.initialzed === false) {
						LoadBuf.call(this);
						this.initialzed = true
					} else {
						UpdateBuf.call(this)
					}
					gl.colorMask(1, 0, 0, 0);
					SetScene0.call(this, texRef);
					gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots);
					gl.colorMask(0, 1, 1, 0);
					SetScene1.call(this, texRef);
					gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots);
					this.mcFrameBuf.unbind();
					gl.colorMask(1, 1, 1, 1)
				}
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.mcPosBuf);
				gl.deleteBuffer(this.mvBuf);
				this.mcFrameBuf.release();
				delete this.program
			}
		};
		return innerConstructor
	}();
	attachingObject.UnitTestMC = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute float aPos;", "attribute vec2 mvIn;", "uniform mat4 uMatrix;", "varying mediump vec2 mvOut;", "void main(void) {", "  vec2 mbxy;", "  vec2 pointSize = vec2(16.0, 16.0);", "  mbxy.y = floor(aPos * 0.00390625 + 0.5);", "  mbxy.x = aPos - mbxy.y * 256.0;", "  mbxy.xy = mbxy.xy * pointSize + pointSize * 0.5;", "  mvOut = mvIn;", "  gl_PointSize = pointSize.x;", "  gl_Position = uMatrix * vec4(mbxy,0.0, 1.0);", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 mvOut;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 factor;", "uniform sampler2D TexResidue;", "uniform sampler2D TexRef;", "void main(void) {", "  vec2 coord = gl_FragCoord.xy - vec2(0.5, 0.5);", "  vec2 coordY = coord* scale;", "  vec2 coordU =  (0.5 * coord + vec2(0.0, uvOffset.y)) * scale;", "  vec2 coordV =  (0.5 * coord + uvOffset) * scale;", "  gl_FragColor.x = texture2D(TexResidue, coordY).x * 0.015625;", "  gl_FragColor.y = texture2D(TexResidue, coordU).x * 0.015625;", "  gl_FragColor.z = texture2D(TexResidue, coordV).x * 0.015625;", "  gl_FragColor.w = 0.0;", "  gl_FragColor.xyzw = vec4(texture2D(TexRef, (coord + mvOut) * factor).xyz, 1.0);", "}"]));

		function CreateResources() {
			var gl = this.gl;
			this.program = new Program(gl);
			this.program.attach(new Shader(gl, vertexShaderScript));
			this.program.attach(new Shader(gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			var mvp = CreateOrtho2D(0, this.size.w, this.size.h, 0);
			this.program.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("mvIn");
			var x = 1 / this.size.w;
			var y = 2 / (this.size.h * 3);
			this.program.setVec2Uniform("scale", x, y);
			x = this.size.w / 2;
			y = this.size.h;
			this.program.setVec2Uniform("uvOffset", x, y);
			x = 1 / this.size.w;
			y = 1 / this.size.h;
			this.program.setVec2Uniform("factor", x, y);
			this.mcPosBuf = gl.createBuffer();
			this.mvBuf = gl.createBuffer()
		}
		var innerConstructor = function (gl, texResidue, mvp, size) {
			this.gl = gl;
			this.mcFrameBuf = new FrameBuffer(gl);
			this.texResidue = texResidue;
			this.mvp = mvp;
			this.size = size;
			this.mcPosBuf;
			this.mvBuf;
			this.mcPos;
			this.mv;
			this.numSlots;
			this.program;
			CreateResources.call(this)
		};

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.bufferData(gl.ARRAY_BUFFER, new Int16Array(this.mcPos), gl.STREAM_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.bufferData(gl.ARRAY_BUFFER, new Int16Array(this.mv), gl.STREAM_DRAW)
		}

		function SetScene(texRef) {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mcPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 1, gl.UNSIGNED_SHORT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mvBuf);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.SHORT, false, 0, 0);
			this.texResidue.bind(0, this.program, "TexResidue");
			texRef.bind(1, this.program, "TexRef")
		}
		innerConstructor.prototype = {
			SetBuf: function (mcPos, mv, numSlots) {
				this.mcPos = mcPos;
				this.mv = mv;
				this.numSlots = numSlots
			},
			DrawMC: function (texYUV, texRef) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				LoadBuf.call(this);
				SetScene.call(this, texRef);
				gl.drawArrays(gl.POINT, 0, 1);
				var pixel = new Uint8Array(64);
				gl.readPixels(0, 0, 4, 4, gl.RGBA, gl.UNSIGNED_BYTE, pixel)
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var cwgl = new attachingObject.CommonWebGL;
	var text = cwgl.text;
	var inherit = cwgl.inherit;
	var Script = cwgl.Script;
	var Program = cwgl.Program;
	var Shader = cwgl.Shader;
	var Texture = cwgl.Texture;
	var FrameBuffer = cwgl.FrameBuffer;
	var makePerspective = cwgl.makePerspective;
	var CreateOrtho2D = cwgl.CreateOrtho2D;
	var Size = cwgl.Size;
	attachingObject.ComposeYUVProc = function () {
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "  gl_Position = uMatrix * vec4(aPos, 1.0);", "  texCoord = aCoord;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text([" precision mediump float;", " varying mediump vec2 texCoord;", " uniform sampler2D inputTex;", " void main(void) {", " vec2 coordY = vec2(texCoord.x, texCoord.y * 2.0 / 3.0);", " vec2 coordU = vec2(texCoord.x, (2.0 + 2.0 * texCoord.y)/3.0);", " vec2 coordV = vec2(0.5 + texCoord.x, (2.0 + 2.0 * texCoord.y)/3.0);", " gl_FragColor = vec4(texture2D(inputTex,  coordY).x, texture2D(inputTex, coordU).x, texture2D(inputTex, coordV).x, 0);", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program = new Program(gl);
			this.program.attach(new Shader(gl, vertexShaderScript));
			this.program.attach(new Shader(gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("aCoord")
		}

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPos);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			this.inputTex.bind(0, this.program, "inputTex")
		}
		var innerConstructor = function (gl, inputTex, vertPos, texCoord, size) {
			this.gl = gl;
			this.inputTex = inputTex;
			this.vertPos = vertPos;
			this.texCoord = texCoord;
			this.yuvFrameBuf = new FrameBuffer(gl);
			this.program;
			this.size = size;
			InitShaders.call(this)
		};
		innerConstructor.prototype = {
			DrawCompose: function (texYUV) {
				var gl = this.gl;
				this.yuvFrameBuf.bind(texYUV);
				SetScene.call(this);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
				this.yuvFrameBuf.unbind()
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var cwgl = new attachingObject.CommonWebGL;
	var text = cwgl.text;
	var inherit = cwgl.inherit;
	var Script = cwgl.Script;
	var Program = cwgl.Program;
	var Shader = cwgl.Shader;
	var Texture = cwgl.Texture;
	var FrameBuffer = cwgl.FrameBuffer;
	var makePerspective = cwgl.makePerspective;
	var CreateOrtho2D = cwgl.CreateOrtho2D;
	var Size = cwgl.Size;
	attachingObject.IntraConstrainedYUVProc = function () {
		null;
		var cwgl = new CommonWebGL;
		var text = cwgl.text;
		var inherit = cwgl.inherit;
		var Script = cwgl.Script;
		var Program = cwgl.Program;
		var Shader = cwgl.Shader;
		var Texture = cwgl.Texture;
		var FrameBuffer = cwgl.FrameBuffer;
		var makePerspective = cwgl.makePerspective;
		var CreateOrtho2D = cwgl.CreateOrtho2D;
		var vertexShaderScriptY = Script.createFromSource("x-shader/x-vertex", text(["attribute vec2 pos;", "varying mediump vec2 texCoord;", "uniform mat4 uMatrix;", "void main(void) {", "  vec2 outPos;", "  vec2 pointSize = vec2(16.0, 16.0);", "  texCoord = floor(pos.xy * 0.00390625);", "  outPos = pos - texCoord * 256.0;", "  gl_Position = uMatrix * vec4(vec2(outPos.x, texCoord.x) * pointSize + 0.5 * pointSize, 0.0, 1.0);", "  texCoord = vec2(outPos.y, texCoord.y) * pointSize;", "  gl_PointSize = pointSize.x;", "}"]));
		var fragmentShaderScriptY = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform vec2 factor;", "uniform sampler2D inputTex;", "void main(void) {", "vec2 coord = mod(gl_FragCoord.xy, 16.0);", "coord = (coord + texCoord)  * factor;", "gl_FragColor = vec4(texture2D(inputTex,  coord).x, 0.0, 0.0, 0.0);", "}"]));
		var vertexShaderScriptUV = Script.createFromSource("x-shader/x-vertex", text(["attribute vec2 pos;", "varying mediump vec2 texCoord;", "uniform mat4 uMatrix;", "void main(void) {", "  vec2 outPos;", "  vec2 pointSize = vec2(8.0, 8.0);", "  texCoord = floor(pos.xy * 0.00390625);", "  outPos = pos - texCoord * 256.0;", "  gl_Position = uMatrix * vec4(vec2(outPos.x, texCoord.x) * pointSize + 0.5 * pointSize, 0.0, 1.0);", "  texCoord = vec2(outPos.y, texCoord.y) * pointSize;", "  gl_PointSize = pointSize.x;", "}"]));
		var fragmentShaderScriptUV = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform vec2 factor;", "uniform vec2 offset;", "uniform sampler2D inputTex;", "void main(void) {", "vec2 coord = mod(gl_FragCoord.xy, 8.0);", "vec2 coordU = (coord + texCoord + vec2(0, offset.y))  * factor;", "vec2 coordV = (coord + texCoord + offset)  * factor;", "gl_FragColor = vec4(0.0, texture2D(inputTex, coordU).x, texture2D(inputTex, coordV).x, 0.0);", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program0 = new Program(gl);
			this.program0.attach(new Shader(gl, vertexShaderScriptY));
			this.program0.attach(new Shader(gl, fragmentShaderScriptY));
			this.program0.link();
			this.program0.use();
			var mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
			this.program0.setMatrixUniform("uMatrix", mvp);
			var x = 1 / this.size.w;
			var y = 1 / (this.size.h + .5 * this.size.h);
			this.program0.setVec2Uniform("factor", x, y);
			this.vertexPositionAttribute = this.program0.getAttributeLocation("pos");
			this.intraPosBuf = gl.createBuffer();
			this.program1 = new Program(gl);
			this.program1.attach(new Shader(gl, vertexShaderScriptUV));
			this.program1.attach(new Shader(gl, fragmentShaderScriptUV));
			this.program1.link();
			this.program1.use();
			this.program1.setMatrixUniform("uMatrix", mvp);
			this.program1.setVec2Uniform("factor", x, y)
		}

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.intraPosBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.intraPos, gl.DYNAMIC_DRAW)
		}

		function UpdateBuf() {
			var gl = this.gl;
			var sizeShortInByte = 2;
			var posSizeVertex = 2;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.intraPosBuf);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.drawOffset * posSizeVertex * sizeShortInByte, this.intraPos.subarray(this.drawOffset * posSizeVertex))
		}

		function SetSceneY() {
			var gl = this.gl;
			this.program0.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.intraPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.UNSIGNED_SHORT, false, 0, 0);
			this.inputTex.bind(0, this.program0, "inputTex")
		}

		function SetSceneUV(drawHeight) {
			var gl = this.gl;
			var x = this.size.w / 2;
			var y = drawHeight * 2 / 3;
			this.program1.use();
			this.program1.setVec2Uniform("offset", x, y);
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.intraPosBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.UNSIGNED_SHORT, false, 0, 0);
			this.inputTex.bind(0, this.program1, "inputTex")
		}
		var innerConstructor = function (gl, inputTex, size, mvp) {
			this.gl = gl;
			this.inputTex = inputTex;
			this.size = size;
			this.intraPosBuf;
			this.intraPos;
			this.yuvFrameBuf = new FrameBuffer(gl);
			this.program;
			this.drawOffset;
			this.totalBlks = this.size.w * this.size.h / (16 * 16);
			this.initialzed = false;
			InitShaders.call(this)
		};
		innerConstructor.prototype = {
			SetBuf: function (intraPos, numSlots) {
				this.intraPos = intraPos;
				this.numSlots = numSlots
			},
			DrawScene: function (texYUV, drawHeight) {
				if (this.numSlots > 0) {
					var gl = this.gl;
					this.yuvFrameBuf.bind(texYUV);
					this.drawOffset = this.totalBlks - this.numSlots;
					if (this.initialzed === false) {
						LoadBuf.call(this);
						this.initialzed = true
					} else {
						UpdateBuf.call(this)
					}
					gl.colorMask(1, 0, 0, 0);
					SetSceneY.call(this);
					gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots);
					gl.colorMask(0, 1, 1, 0);
					SetSceneUV.call(this, drawHeight);
					gl.drawArrays(gl.POINT, this.drawOffset, this.numSlots);
					this.yuvFrameBuf.unbind();
					gl.colorMask(1, 1, 1, 1)
				}
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.intraPosBuf);
				this.yuvFrameBuf.release();
				delete this.program
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var cwgl = new attachingObject.CommonWebGL;
	var text = cwgl.text;
	var inherit = cwgl.inherit;
	var Script = cwgl.Script;
	var Program = cwgl.Program;
	var Shader = cwgl.Shader;
	var Texture = cwgl.Texture;
	var FrameBuffer = cwgl.FrameBuffer;
	var makePerspective = cwgl.makePerspective;
	var CreateOrtho2D = cwgl.CreateOrtho2D;
	var Size = cwgl.Size;
	attachingObject.DisplayProc = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "  gl_Position = uMatrix * vec4(aPos, 1.0);", "  texCoord = aCoord;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform sampler2D texYUV;", "const mat4 YUV2RGB = mat4", "(", " 1.0, 0, 1.57421875, -0.7882352941,", " 1.0, -0.1875, -0.46875, 0.331372549,", " 1.0, 1.85546875, 0, -0.9294117647,", " 0, 0, 0, 1.0", ");", "void main(void) {", " vec3 color = texture2D(texYUV,  texCoord).xxx;", " color.yz = texture2D(texYUV, 0.5 * texCoord).yz;", " gl_FragColor = vec4(color, 1) * YUV2RGB;", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program = new Program(this.gl);
			this.program.attach(new Shader(this.gl, vertexShaderScript));
			this.program.attach(new Shader(this.gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			this.program.setMatrixUniform("uMatrix", this.mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("aCoord")
		}
		var innerConstructor = function (gl, size, vertPos, texCoord) {
			this.gl = gl;
			this.mvp = CreateOrtho2D(0, size.w, size.h, 0);
			this.vertPos = vertPos;
			this.texCoord = texCoord;
			this.size = size;
			InitShaders.call(this)
		};

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPos);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)
		}
		innerConstructor.prototype = {
			DrawScene: function (texYUV) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				SetScene.call(this);
				texYUV.bind(0, this.program, "texYUV");
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
			},
			ReleaseResources: function () {
				delete this.program
			}
		};
		return innerConstructor
	}();
	attachingObject.Display420Proc = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec2 pos;", "uniform mat4 uMatrix;", "void main(void) {", "  gl_Position = uMatrix * vec4(pos, 0.0, 1.0);", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "uniform vec2 factor;", "uniform sampler2D texYUV;", "const mat4 YUV2RGB = mat4", "(", " 1.0, 0, 1.57421875, -0.7882352941,", " 1.0, -0.1875, -0.46875, 0.331372549,", " 1.0, 1.85546875, 0, -0.9294117647,", " 0, 0, 0, 1.0", ");", "void main(void) {", " vec2 coord = gl_FragCoord.xy * factor;", " vec3 color = texture2D(texYUV, coord).xxx;", " color.yz = texture2D(texYUV, 0.5 * coord).yz;", " gl_FragColor = vec4(color, 1.0) * YUV2RGB;", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program = new Program(this.gl);
			this.program.attach(new Shader(this.gl, vertexShaderScript));
			this.program.attach(new Shader(this.gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			var mvp = CreateOrtho2D(0, this.size.w, this.size.h, 0);
			this.program.setMatrixUniform("uMatrix", mvp);
			var x = 1 / this.size.w;
			var y = 1 / this.size.h;
			this.program.setVec2Uniform("factor", x, y);
			this.vertexPositionAttribute = this.program.getAttributeLocation("pos");
			this.posBuf = gl.createBuffer()
		}

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.pos, gl.DYNAMIC_DRAW)
		}
		var innerConstructor = function (gl, size) {
			this.gl = gl;
			this.size = size;
			this.numSlots;
			this.pos;
			InitShaders.call(this)
		};

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.SHORT, false, 0, 0)
		}
		innerConstructor.prototype = {
			SetBuf: function (pos, numSlots) {
				this.pos = pos;
				this.numSlots = numSlots
			},
			DrawScene: function (texYUV) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				LoadBuf.call(this);
				SetScene.call(this);
				texYUV.bind(0, this.program, "texYUV");
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numSlots)
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.posBuf);
				delete this.program
			}
		};
		return innerConstructor
	}();
	attachingObject.Display444Proc = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["precision mediump float;", "attribute vec2 pos;", "uniform mat4 uMatrix;", "void main(void) {", " gl_Position = uMatrix * vec4(pos, 0.0, 1.0);", "}"]));
		var fragmentShaderScript420 = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "uniform vec2 factor;", "uniform sampler2D texLuma;", "uniform float height;", "const vec2 halfOffset = vec2(0.5, 0.5);", "const mat4 YUV2RGB = mat4", "(", " 1.0, 0, 1.57421875, -0.7882352941,", " 1.0, -0.1875, -0.46875, 0.331372549,", " 1.0, 1.85546875, 0, -0.9294117647,", " 0, 0, 0, 1.0", ");", "void main(void) {", " vec2 coord = vec2(gl_FragCoord.x, height - gl_FragCoord.y) - halfOffset;", " vec2 uvS = (floor(coord * 0.5) + halfOffset) * factor;", " float luma = texture2D(texLuma, (coord + halfOffset) * factor).x;", " vec2 chroma = texture2D(texLuma, uvS).yz;", " gl_FragColor = vec4(luma, chroma, 1.0) * YUV2RGB;", "}"]));
		var fragmentShaderScript444 = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "uniform vec2 factor;", "uniform sampler2D texLuma;", "uniform sampler2D texChroma;", "uniform float height;", "const mat4 YUV2RGB = mat4", "(", " 1.0, 0, 1.57421875, -0.7882352941,", " 1.0, -0.1875, -0.46875, 0.331372549,", " 1.0, 1.85546875, 0, -0.9294117647,", " 0, 0, 0, 1.0", ");", "const vec2 halfOffset = vec2(0.5, 0.5);", "const vec2 RED_SPOT_CUTOFF = vec2(30.0/255.0, 30.0/255.0);", "void main(void) {", "  vec2 coord = vec2(gl_FragCoord.x, height - gl_FragCoord.y) - halfOffset;", "  vec2 uvS = (floor(coord * 0.5) + halfOffset) * factor;", "  float luma = texture2D(texLuma, (coord + halfOffset) * factor).x;", "  vec2 chroma00 = texture2D(texLuma, uvS).yz;", "  vec2 chroma10 = texture2D(texChroma, uvS).yz;", "  vec2 pos = mod(coord, 2.0);", "  float isPos00 = (1.0 - pos.x) * (1.0 - pos.y);", "  float isPos01 = (1.0 - pos.x) * pos.y;", "  float isPos10 = pos.x * (1.0 - pos.y);", "  float isPos11 = pos.x * pos.y;", "  float offset = floor(mod(coord.y, 16.0) * 0.5 + 0.00001);", "  float start = floor(coord.y / 16.0 + 0.00001) * 16.0 + offset;", "  uvS = vec2(gl_FragCoord.x, gl_FragCoord.x + 1.0) * factor.x;", "  vec2 uvT = (vec2(start, start + 8.0) + halfOffset) * factor.y;", "  vec2 chroma01 = vec2(texture2D(texChroma, vec2(uvS.x, uvT.x)).x, texture2D(texChroma, vec2(uvS.x, uvT.y)).x);", "  vec2 chroma11 = vec2(texture2D(texChroma, vec2(uvS.y, uvT.x)).x, texture2D(texChroma, vec2(uvS.y, uvT.y)).x);", "  uvT = chroma00;", "  chroma00 = clamp(chroma00 * 4.0 - chroma11 - chroma01 - chroma10, vec2(0.0, 0.0), vec2(1.0, 1.0));", "  bvec2 bdiff = greaterThan(chroma00,RED_SPOT_CUTOFF);", "  vec2 diff = vec2(bdiff.x, bdiff.y);", "  chroma00 = chroma00 * diff +  uvT * (vec2(1.0,1.0) - diff);", "  chroma00 = chroma00 * isPos00 + chroma10 *  isPos10 + chroma01 * isPos01 + chroma01 *  isPos11;", "  gl_FragColor = vec4(vec3(luma, chroma00), 1.0) * YUV2RGB;", "}"]));
		var fragmentShaderScript444v2 = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "uniform vec2 factor;", "uniform sampler2D texLuma;", "uniform sampler2D texChroma;", "uniform float height;", "uniform float width;", "const mat4 YUV2RGB = mat4", "(", " 1.0, 0, 1.57421875, -0.7882352941,", " 1.0, -0.1875, -0.46875, 0.331372549,", " 1.0, 1.85546875, 0, -0.9294117647,", " 0, 0, 0, 1.0", ");", "const vec2 halfOffset = vec2(0.5, 0.5);", "const vec2 RED_SPOT_CUTOFF = vec2(30.0/255.0, 30.0/255.0);", "void main(void) {", "  vec2 coord = vec2(gl_FragCoord.x, height - gl_FragCoord.y) - halfOffset;", "  vec2 coordHalf = floor(coord * 0.5);", "  vec2 pos = mod(coord, 2.0);", "  float cordY_even = coord.y - pos.y;", "  vec2 uvTop0 = (vec2(coordHalf.x, cordY_even) + halfOffset) * factor;", "  vec2 uvTop1 = (vec2(coordHalf.x + width/2.0, cordY_even + 1.0) + halfOffset) * factor;", "  float luma00 = texture2D(texChroma, uvTop0).x;", "  float luma01 = texture2D(texChroma, vec2(uvTop1.x, uvTop0.y)).x;", "  float luma10 = texture2D(texChroma, vec2(uvTop0.x, uvTop1.y)).x;", "  float luma11 = texture2D(texChroma, uvTop1).x;", "  vec2 lumaUV_TR = vec2(luma00, luma01);", "  vec2 lumaUV_BR = vec2(luma10, luma11);", "  float chromaX_UHalf_UV = floor(coordHalf.x * 0.5);", "  vec2 uvBottom0 = (vec2(chromaX_UHalf_UV, coordHalf.y) + halfOffset) * factor;", "  vec2 uvBottom1 = (vec2(chromaX_UHalf_UV + width/4.0, coordHalf.y) + halfOffset) * factor;", "  vec2 lumaU_BL = texture2D(texChroma, uvBottom0).yz;", "  vec2 lumaV_BL = texture2D(texChroma, uvBottom1).yz;", "  float isLeftHalfOf4x2 = float(mod(coord.x, 4.0) < 2.0);", "  vec2 isLeftHalfOf4x2Mask = vec2(isLeftHalfOf4x2, 1.0 - isLeftHalfOf4x2);", "  vec2 lumaUV_BL = vec2(dot(lumaU_BL, isLeftHalfOf4x2Mask), dot(lumaV_BL, isLeftHalfOf4x2Mask));", "  vec2 lumaUV = texture2D(texLuma, vec2(uvTop0.x, uvBottom0.y)).yz;", "  vec2 lumaUV_TL = clamp(lumaUV * 4.0 - lumaUV_TR - lumaUV_BR - lumaUV_BL, vec2(0.0, 0.0), vec2(1.0, 1.0));", "  vec2 diffUV_TL = abs(lumaUV_TL - lumaUV);", "  bvec2 bdiff = greaterThan(diffUV_TL, RED_SPOT_CUTOFF);", "  diffUV_TL = vec2(bdiff.x, bdiff.y);", "  lumaUV_TL = lumaUV_TL * diffUV_TL + lumaUV * (vec2(1.0, 1.0) - diffUV_TL);", "  float isPos00 = (1.0 - pos.x)  * (1.0 - pos.y);", "  float isPos01 = (1.0 - pos.x)  * pos.y;", "  float isPos10 = pos.x          * (1.0 - pos.y);", "  float isPos11 = pos.x          * pos.y;", "  lumaUV = lumaUV_TL * vec2(isPos00, isPos00)", "         + lumaUV_TR * vec2(isPos10, isPos10)", "         + lumaUV_BL * vec2(isPos01, isPos01)", "         + lumaUV_BR * vec2(isPos11, isPos11);", "  float luma = texture2D(texLuma, (coord + halfOffset) * factor).x;", "  gl_FragColor = vec4(luma, lumaUV, 1.0) * YUV2RGB;", "}"]));

		function InitShaders420() {
			var gl = this.gl;
			this.program420 = new Program(this.gl);
			this.program420.attach(new Shader(this.gl, vertexShaderScript));
			this.program420.attach(new Shader(this.gl, fragmentShaderScript420));
			this.program420.link();
			this.program420.use();
			var x = 1 / this.size.w;
			var y = 1 / this.size.h;
			this.program420.setVec2Uniform("factor", x, y);
			var mvp = CreateOrtho2D(0, this.size.w, this.size.h, 0);
			this.program420.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute420 = this.program420.getAttributeLocation("pos");
			this.program420.setFloatUniform("height", this.size.h)
		}

		function InitShaders444() {
			var gl = this.gl;
			this.program444 = new Program(this.gl);
			this.program444.attach(new Shader(this.gl, vertexShaderScript));
			this.program444.attach(new Shader(this.gl, this.isV2 ? fragmentShaderScript444v2 : fragmentShaderScript444));
			this.program444.link();
			this.program444.use();
			var x = 1 / this.size.w;
			var y = 1 / this.size.h;
			this.program444.setVec2Uniform("factor", x, y);
			var mvp = CreateOrtho2D(0, this.size.w, this.size.h, 0);
			this.program444.setMatrixUniform("uMatrix", mvp);
			this.vertexPositionAttribute444 = this.program444.getAttributeLocation("pos");
			this.program444.setFloatUniform("height", this.size.h);
			this.program444.setFloatUniform("width", this.size.w)
		}

		function LoadBuf() {
			var gl = this.gl;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
			gl.bufferData(gl.ARRAY_BUFFER, this.pos, gl.DYNAMIC_DRAW)
		}
		var innerConstructor = function (gl, size, isV2) {
			this.isV2 = isV2;
			this.gl = gl;
			this.size = size;
			this.numSlots;
			this.pos;
			this.texLuma;
			this.texChroma;
			InitShaders420.call(this);
			InitShaders444.call(this);
			this.posBuf = gl.createBuffer()
		};

		function SetScene420() {
			var gl = this.gl;
			this.program420.use();
			this.texLuma.bind(0, this.program420, "texLuma");
			gl.enableVertexAttribArray(this.vertexPositionAttribute420);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute420, 2, gl.UNSIGNED_SHORT, false, 0, 0)
		}

		function SetScene444() {
			var gl = this.gl;
			this.program444.use();
			this.texLuma.bind(0, this.program444, "texLuma");
			this.texChroma.bind(1, this.program444, "texChroma");
			gl.enableVertexAttribArray(this.vertexPositionAttribute444);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
			gl.vertexAttribPointer(this.vertexPositionAttribute444, 2, gl.UNSIGNED_SHORT, false, 0, 0)
		}
		innerConstructor.prototype = {
			SetBuf: function (pos, numSlots) {
				this.pos = pos;
				this.numSlots = numSlots
			},
			DrawScene: function (texRef, isChroma) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				LoadBuf.call(this);
				if (isChroma) {
					this.texChroma = texRef;
					SetScene444.call(this, isChroma)
				} else {
					this.texLuma = texRef;
					SetScene420.call(this, isChroma)
				}
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numSlots)
			},
			ReleaseResources: function () {
				var gl = this.gl;
				gl.deleteBuffer(this.posBuf);
				delete this.program
			}
		};
		return innerConstructor
	}();
	attachingObject.UnitTestSubTex = function () {
		null;
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "  gl_Position = uMatrix * vec4(aPos, 1.0);", "  texCoord = aCoord;", "}"]));
		var fragmentShaderScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform sampler2D TexTest;", "void main(void) {", " vec4 color = texture2D(TexTest,  texCoord);", " if(color.x != 0.0)", "   {gl_FragColor = color;}", " else", "   {gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);}", "}"]));

		function InitShaders() {
			var gl = this.gl;
			this.program = new Program(this.gl);
			this.program.attach(new Shader(this.gl, vertexShaderScript));
			this.program.attach(new Shader(this.gl, fragmentShaderScript));
			this.program.link();
			this.program.use();
			this.program.setMatrixUniform("uMatrix", this.mvp);
			this.vertexPositionAttribute = this.program.getAttributeLocation("aPos");
			this.textureCoordAttribute = this.program.getAttributeLocation("aCoord")
		}
		var innerConstructor = function (gl, size, vertPos, texCoord) {
			this.gl = gl;
			this.size = size;
			this.mvp = CreateOrtho2D(0, size.w, 0, size.h);
			this.vertPos = vertPos;
			this.texCoord = texCoord;
			InitShaders.call(this)
		};

		function SetScene() {
			var gl = this.gl;
			this.program.use();
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPos);
			gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
			gl.vertexAttribPointer(this.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)
		}
		innerConstructor.prototype = {
			DrawTestSubTex: function (TexTest) {
				var gl = this.gl;
				gl.viewport(0, 0, this.size.w, this.size.h);
				gl.clear(gl.COLOR_BUFFER_BIT);
				SetScene.call(this);
				TexTest.bind(0, this.program, "TexTest");
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
				var pixel = new Uint8Array(256);
				gl.readPixels(0, 0, 16, 4, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
				for (var i = 0; i < pixel.length; i++) {
					if (pixel[i] != cwgl.testTexData[i]) {
						console.error("subtex has error");
						return 1
					}
				}
				console.log("subtex unit test pass");
				return 0
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = window
	}
	attachingObject.RFXDecoder = function () {
		var cwgl = new attachingObject.CommonWebGL;
		var text = cwgl.text;
		var inherit = cwgl.inherit;
		var Script = cwgl.Script;
		var Program = cwgl.Program;
		var Shader = cwgl.Shader;
		var Texture = cwgl.Texture;
		var FrameBuffer = cwgl.FrameBuffer;
		var makePerspective = cwgl.makePerspective;
		var CreateOrtho2D = cwgl.CreateOrtho2D;
		var Size = cwgl.Size;

		function CreateWebGLHandle() {
			var gl;
			try {
				gl = this.canvas.getContext("experimental-webgl", {
					preserveDrawingBuffer: true
				})
			} catch (e) {}
			if (!gl) {
				console.error("unable to initialize WebGL, and your browser seems to not support it.");
				return null
			}
			if (this.glNames) {
				return gl
			}
			this.glNames = {};
			for (var propertyName in gl) {
				if (typeof gl[propertyName] == "number") {
					this.glNames[gl[propertyName]] = propertyName
				}
			}
			return gl
		}

		function CreateFourVertBuffers() {
			var tmp;
			var gl = this.gl;
			this.fourVertPos = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fourVertPos);
			tmp = [0, 0, 0, this.size.w, 0, 0, 0, this.size.h, 0, this.size.w, this.size.h, 0];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW);
			this.fourVertPos.itemSize = 3;
			this.fourVertPos.numItems = 4;
			this.fourTexCoord = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fourTexCoord);
			tmp = [0, 0, 1, 0, 0, 1, 1, 1];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW)
		}
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "    gl_Position = uMatrix * vec4(aPos, 1.0);", "    texCoord = aCoord;", "}"]));
		var colorScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform sampler2D inputTex;", "void main(void) {", "    vec4 color = texture2D(inputTex, texCoord);", "    float y = color.r;", "    float cb = color.g - .5;", "    float cr = color.b - .5;", "    gl_FragColor = vec4(y + 1.402525 * cr, y - .34373 * cb - .7144 * cr, y + 1.769905 * cb, 1.);", "}"]));
		var innerConstructor = function (w, h, canvas) {
			this.canvas = canvas;
			this.size = new Size(w, h);
			this.fourVertPos;
			this.fourTexCoord;
			this.orthoCanvasFlip = CreateOrtho2D(0, this.canvas.width, this.canvas.height, 0);
			this.orthoCanvas = CreateOrtho2D(0, this.canvas.width, 0, this.canvas.height);
			this.gl = CreateWebGLHandle.call(this);
			if (this.gl == null) {
				return
			}
			this.colorProg = new Program(this.gl);
			this.colorProg.attach(new Shader(this.gl, vertexShaderScript));
			this.colorProg.attach(new Shader(this.gl, colorScript));
			this.colorProg.link();
			CreateFourVertBuffers.call(this);
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.fullTex = new Texture(this.gl, this.size, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.gl.NEAREST)
		};
		innerConstructor.prototype = {
			RunYCbCr: function (rects, data) {
				this.fullTex.fill(data);
				this.colorProg.use();
				this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.colorProg.setMatrixUniform("uMatrix", this.orthoCanvasFlip);
				this.vertexPositionAttribute = this.colorProg.getAttributeLocation("aPos");
				this.textureCoordAttribute = this.colorProg.getAttributeLocation("aCoord");
				this.fullTex.bind(0, this.colorProg, "inputTex");
				for (var i = 0; i < rects.size(); ++i) {
					var l = rects.get(i).left;
					var b = rects.get(i).top;
					var w = rects.get(i).width();
					var h = rects.get(i).height();
					this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourVertPos);
					tmp = [l, b, 0, l + w, b, 0, l, b + h, 0, l + w, b + h, 0];
					this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
					this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
					this.gl.enableVertexAttribArray(this.textureCoordAttribute);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourTexCoord);
					tmp = [l / this.size.w, b / this.size.h, (l + w) / this.size.w, b / this.size.h, l / this.size.w, (b + h) / this.size.h, (l + w) / this.size.w, (b + h) / this.size.h];
					this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
					this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
					this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
				}
			},
			ReleaseResources: function () {
				this.gl.deleteBuffer(this.fourVertPos);
				this.gl.deleteBuffer(this.fourTexCoord);
				this.fullFrame.release();
				delete this.colorProg
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = window
	}
	attachingObject.WebGLCanvasHandler = function () {
		var cwgl = new attachingObject.CommonWebGL;
		var text = cwgl.text;
		var inherit = cwgl.inherit;
		var Script = cwgl.Script;
		var Program = cwgl.Program;
		var Shader = cwgl.Shader;
		var Texture = cwgl.Texture;
		var FrameBuffer = cwgl.FrameBuffer;
		var makePerspective = cwgl.makePerspective;
		var CreateOrtho2D = cwgl.CreateOrtho2D;
		var Size = cwgl.Size;

		function CreateWebGLHandle() {
			var gl;
			try {
				gl = this.canvas.getContext("experimental-webgl", {
					preserveDrawingBuffer: true
				})
			} catch (e) {}
			if (!gl) {
				console.error("unable to initialize WebGL, and your browser seems to not support it.");
				return null
			}
			if (this.glNames) {
				return gl
			}
			this.glNames = {};
			for (var propertyName in gl) {
				if (typeof gl[propertyName] == "number") {
					this.glNames[gl[propertyName]] = propertyName
				}
			}
			return gl
		}

		function CreateFourVertBuffers() {
			var tmp;
			var gl = this.gl;
			this.fourVertPos = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fourVertPos);
			tmp = [0, 0, 0, this.size.w, 0, 0, 0, this.size.h, 0, this.size.w, this.size.h, 0];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW);
			this.fourVertPos.itemSize = 3;
			this.fourVertPos.numItems = 4;
			this.fourTexCoord = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fourTexCoord);
			tmp = [0, 0, 1, 0, 0, 1, 1, 1];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW)
		}
		var vertexShaderScript = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aPos;", "attribute vec2 aCoord;", "uniform mat4 uMatrix;", "varying mediump vec2 texCoord;", "void main(void) {", "    gl_Position = uMatrix * vec4(aPos, 1.0);", "    texCoord = aCoord;", "}"]));
		var copyScript = Script.createFromSource("x-shader/x-fragment", text(["precision mediump float;", "varying mediump vec2 texCoord;", "uniform sampler2D inputTex;", "uniform bool reverseRGBOrder;", "void main(void) {", "   if (reverseRGBOrder) {", "       gl_FragColor = vec4(texture2D(inputTex, texCoord).bgr, 1.);", "   } else {", "       gl_FragColor = vec4(texture2D(inputTex, texCoord).rgb, 1.);", "   }", "}"]));
		var innerConstructor = function (canvas) {
			this.canvas = canvas;
			this.size = new Size(this.canvas.width, this.canvas.height);
			this.fourVertPos;
			this.fourTexCoord;
			this.orthoCanvasFlip = CreateOrtho2D(0, this.canvas.width, this.canvas.height, 0);
			this.orthoCanvas = CreateOrtho2D(0, this.canvas.width, 0, this.canvas.height);
			this.gl = CreateWebGLHandle.call(this);
			if (this.gl == null) {
				return
			}
			this.copyProg = new Program(this.gl);
			this.copyProg.attach(new Shader(this.gl, vertexShaderScript));
			this.copyProg.attach(new Shader(this.gl, copyScript));
			this.copyProg.link();
			CreateFourVertBuffers.call(this);
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.fullTex = new Texture(this.gl, this.size, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.gl.NEAREST)
		};
		innerConstructor.prototype = {
			ReleaseResources: function () {
				this.gl.deleteBuffer(this.fourVertPos);
				this.gl.deleteBuffer(this.fourTexCoord);
				this.fullFrame.release();
				delete this.colorProg;
				delete this.copyProg
			},
			bitmapToCanvas: function (rect, data, reverseRGBOrder) {
				this.copyProg.use();
				this.copyProg.setMatrixUniform("uMatrix", this.orthoCanvasFlip);
				var rgb = this.gl.getUniformLocation(this.copyProg.program, "reverseRGBOrder");
				this.gl.uniform1i(rgb, reverseRGBOrder);
				this.vertexPositionAttribute = this.copyProg.getAttributeLocation("aPos");
				this.textureCoordAttribute = this.copyProg.getAttributeLocation("aCoord");
				this.fullTex.bind(0, this.copyProg, "inputTex");
				this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, rect.left, rect.top, rect.width(), rect.height(), this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(data));
				var l = rect.left;
				var b = rect.top;
				var w = rect.width();
				var h = rect.height();
				this.gl.enableVertexAttribArray(this.textureCoordAttribute);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourTexCoord);
				tmp = [l / this.size.w, b / this.size.h, (l + w) / this.size.w, b / this.size.h, l / this.size.w, (b + h) / this.size.h, (l + w) / this.size.w, (b + h) / this.size.h];
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
				this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
				this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourVertPos);
				tmp = [l, b, 0, l + w, b, 0, l, b + h, 0, l + w, b + h, 0];
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
				this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
				this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
			},
			createSubCanvas: function (rect, srcCanvas, dstCanvas) {
				var l = rect.left;
				var b = rect.top;
				var w = rect.width();
				var h = rect.height();
				if (dstCanvas == null) {
					dstCanvas = document.createElement("canvas")
				}
				if (dstCanvas.width != w || dstCanvas.height != h) {
					dstCanvas.width = w;
					dstCanvas.height = h
				}
				var canvasCtx = dstCanvas.getContext("2d");
				canvasCtx.drawImage(srcCanvas, l, b, w, h, 0, 0, w, h);
				return dstCanvas
			},
			hasWebGLSupport: function () {
				try {
					var canvas = document.createElement("canvas");
					return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
				} catch (e) {
					return false
				}
			},
			canvasToCanvas: function (rect, data, reverseRGBOrder) {
				this.copyProg.use();
				this.copyProg.setMatrixUniform("uMatrix", this.orthoCanvasFlip);
				var rgb = this.gl.getUniformLocation(this.copyProg.program, "reverseRGBOrder");
				this.gl.uniform1i(rgb, reverseRGBOrder);
				this.vertexPositionAttribute = this.copyProg.getAttributeLocation("aPos");
				this.textureCoordAttribute = this.copyProg.getAttributeLocation("aCoord");
				this.fullTex.bind(0, this.copyProg, "inputTex");
				this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, rect.left, rect.top, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
				var l = rect.left;
				var b = rect.top;
				var w = rect.width();
				var h = rect.height();
				this.gl.enableVertexAttribArray(this.textureCoordAttribute);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourTexCoord);
				tmp = [l / this.size.w, b / this.size.h, (l + w) / this.size.w, b / this.size.h, l / this.size.w, (b + h) / this.size.h, (l + w) / this.size.w, (b + h) / this.size.h];
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
				this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
				this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourVertPos);
				tmp = [l, b, 0, l + w, b, 0, l, b + h, 0, l + w, b + h, 0];
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
				this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
				this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
			},
			copyFromCanvas: function (canvas, rect, points) {
				this.copyProg.use();
				this.copyProg.setMatrixUniform("uMatrix", this.orthoCanvas);
				var rgb = this.gl.getUniformLocation(this.copyProg.program, "reverseRGBOrder");
				this.gl.uniform1i(rgb, 0);
				this.vertexPositionAttribute = this.copyProg.getAttributeLocation("aPos");
				this.textureCoordAttribute = this.copyProg.getAttributeLocation("aCoord");
				this.fullTex.bind(0, this.copyProg, "inputTex");
				this.gl.copyTexSubImage2D(this.gl.TEXTURE_2D, 0, rect.left, this.size.h - rect.top - rect.height(), rect.left, this.canvas.height - rect.top - rect.height(), rect.width(), rect.height());
				var l = rect.left;
				var b = this.size.h - rect.top - rect.height();
				var w = rect.width();
				var h = rect.height();
				this.gl.enableVertexAttribArray(this.textureCoordAttribute);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourTexCoord);
				tmp = [l / this.size.w, b / this.size.h, (l + w) / this.size.w, b / this.size.h, l / this.size.w, (b + h) / this.size.h, (l + w) / this.size.w, (b + h) / this.size.h];
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
				this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
				for (var i = 0; i < points.size(); ++i) {
					l = points.get(i).x;
					b = this.canvas.height - points.get(i).y - rect.height();
					this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.fourVertPos);
					tmp = [l, b, 0, l + w, b, 0, l, b + h, 0, l + w, b + h, 0];
					this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tmp), this.gl.STATIC_DRAW);
					this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
					this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
				}
			}
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	var GetContextWebGL = function (canvas) {
		var gl = null;
		try {
			gl = canvas.getContext("experimental-webgl", {
				preserveDrawingBuffer: true
			})
		} catch (e) {}
		return gl
	};
	var Decoder = function () {
		var cwgl = new attachingObject.CommonWebGL;
		var text = cwgl.text;
		var inherit = cwgl.inherit;
		var Script = cwgl.Script;
		var Program = cwgl.Program;
		var Shader = cwgl.Shader;
		var Texture = cwgl.Texture;
		var FrameBuffer = cwgl.FrameBuffer;
		var makePerspective = cwgl.makePerspective;
		var CreateOrtho2D = cwgl.CreateOrtho2D;
		var Size = cwgl.Size;
		var DecoderWebGL = function () {
			function CreateWebGLHandle() {
				var gl = GetContextWebGL(this.canvas);
				if (!gl) {
					console.error("unable to initialize WebGL, and your browser seems to not support it.");
					return null
				}
				if (this.glNames) {
					return gl
				}
				this.glNames = {};
				for (var propertyName in gl) {
					if (typeof gl[propertyName] == "number") {
						this.glNames[gl[propertyName]] = propertyName
					}
				}
				return gl
			}

			function CreateDisplayTextures() {
				var gl = this.gl;
				this.inputTex = new Texture(gl, this.size.getVExpandSize())
			}

			function CreateDecodeTextures() {
				var gl = this.gl;
				this.texRef = [new Texture(gl, this.size, gl.RGBA), new Texture(gl, this.size, gl.RGBA), new Texture(gl, this.size, gl.RGBA)];
				this.texResidue = new Texture(gl, this.size.getVExpandSize(), gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST)
			}

			function CreateTestSubTexture() {
				var gl = this.gl;
				this.texTestSubTex = new Texture(gl, this.size.getVExpandSize(), gl.RGBA);
				gl.bindTexture(gl.TEXTURE_2D, this.texTestSubTex.texture);
				gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 16, 4, gl.RGBA, gl.UNSIGNED_BYTE, cwgl.testTexData)
			}

			function CreateFourVertBuffers() {
				var tmp;
				var gl = this.gl;
				this.fourVertPos = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, this.fourVertPos);
				tmp = [0, 0, 0, this.size.w, 0, 0, 0, this.size.h, 0, this.size.w, this.size.h, 0];
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW);
				this.fourVertPos.itemSize = 3;
				this.fourVertPos.numItems = 4;
				this.fourVertPosExpand = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, this.fourVertPosExpand);
				tmp = [0, 0, 0, this.size.w, 0, 0, 0, this.size.h * 3 / 2, 0, this.size.w, this.size.h * 3 / 2, 0];
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW);
				this.fourVertPosExpand.itemSize = 3;
				this.fourVertPosExpand.numItems = 4;
				this.fourTexCoord = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, this.fourTexCoord);
				tmp = [0, 0, 1, 0, 0, 1, 1, 1];
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tmp), gl.STATIC_DRAW)
			}
			var innerConstructor = function (canvas, size, isV2) {
				this.canvas = canvas;
				this.size = size;
				this.canvas.width = size.w;
				this.canvas.height = size.h;
				this.mvp = CreateOrtho2D(0, this.size.w, 0, this.size.h);
				this.gl;
				this.fourVertPos;
				this.fourVertPosExpand;
				this.fourTexCoord;
				this.inputTex;
				this.texRef;
				this.texResidue;
				this.switch = false;
				this.drawHeight;
				this.isV2 = isV2;
				this.gl = CreateWebGLHandle.call(this);
				if (this.gl == null) {
					return
				}
				CreateFourVertBuffers.call(this);
				CreateDisplayTextures.call(this);
				CreateDecodeTextures.call(this);
				this.idctPackProc = new attachingObject.IDCTPackProc(this.gl, this.texResidue, this.size);
				this.mcProc = new attachingObject.MotionCompensationProc(this.gl, this.texResidue, this.mvp, this.size);
				this.intraConstrainedProc = new attachingObject.IntraConstrainedYUVProc(this.gl, this.inputTex, this.size, this.mvp);
				this.composeYUVProc = new attachingObject.ComposeYUVProc(this.gl, this.inputTex, this.fourVertPos, this.fourTexCoord, this.size);
				this.displayProc = new attachingObject.DisplayProc(this.gl, this.size, this.fourVertPos, this.fourTexCoord);
				this.display444Proc = new attachingObject.Display444Proc(this.gl, this.size, this.isV2)
			};
			innerConstructor.prototype = {
				ToString: function () {
					return "GPU decoder Size: " + this.size
				},
				CheckLastError: function (operation) {
					var err = this.gl.getError();
					if (err != this.gl.NO_ERROR) {
						var name = this.glNames[err];
						name = name !== undefined ? name + "(" + err + ")" : "Unknown WebGL ENUM (0x" + value.toString(16) + ")";
						if (operation) {
							console.log("WebGL Error: %s, %s", operation, name)
						} else {
							console.log("WebGL Error: %s", name)
						}
						console.trace()
					}
				},
				FillFrameI: function (yuvData, dispVer, numDispVer) {
					this.inputTex.fill(yuvData);
					this.display444Proc.SetBuf(dispVer, numDispVer)
				},
				FillFrameYUVP: function (yuvData, w, h) {
					this.drawHeight = h;
					this.inputTex.fill(yuvData, 1, w, h)
				},
				FillFramePackP: function (idctPos, idctCof0, idctCof1, idctCof2, idctCof3, numDCT, mcPos, mv, numMC, intraPos, numIntras, dispVer, numDispVer) {
					this.idctPackProc.SetBuf(idctPos, idctCof0, idctCof1, idctCof2, idctCof3, numDCT);
					this.mcProc.SetBuf(mcPos, mv, numMC);
					this.intraConstrainedProc.SetBuf(intraPos, numIntras);
					this.display444Proc.SetBuf(dispVer, numDispVer)
				},
				FillFrameP: function (idctPos, idctCof, numDCT, mcPos, mv, numMC) {
					this.idctProc.SetBuf(idctPos, idctCof, numDCT);
					this.mcProc.SetBuf(mcPos, mv, numMC)
				},
				ReadPixels: function (buffer) {
					var gl = this.gl;
					gl.readPixels(0, 0, this.size.w, this.size.h, gl.RGBA, gl.UNSIGNED_BYTE, buffer)
				},
				CheckRenderTarget: function (texture) {
					var gl = this.gl;
					var framebuffer = gl.createFramebuffer();
					gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
					gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
					var check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
					if (check != gl.FRAMEBUFFER_COMPLETE) {} else {}
					gl.deleteFramebuffer(framebuffer);
					gl.bindFramebuffer(gl.FRAMEBUFFER, null)
				},
				DrawFrameP: function (refID, curID, isChroma) {
					this.idctPackProc.DrawIDCT();
					this.mcProc.DrawMC(this.texRef[curID], this.texRef[refID]);
					this.intraConstrainedProc.DrawScene(this.texRef[curID], this.drawHeight);
					this.display444Proc.DrawScene(this.texRef[curID], isChroma)
				},
				DrawFrameI: function (curID, isChroma) {
					this.composeYUVProc.DrawCompose(this.texRef[curID]);
					this.display444Proc.DrawScene(this.texRef[curID], isChroma);
					this.switch = false
				},
				ReleaseResources: function () {
					var gl = this.gl;
					this.texRef[0].release();
					this.texRef[1].release();
					this.texRef[2].release();
					this.inputTex.release();
					this.texResidue.release();
					this.idctPackProc.ReleaseResources();
					this.mcProc.ReleaseResources();
					this.intraConstrainedProc.ReleaseResources();
					this.display444Proc.ReleaseResources();
					gl.deleteBuffer(this.fourVertPos);
					gl.deleteBuffer(this.fourVertPosExpand);
					gl.deleteBuffer(this.fourTexCoord);
					this.idctPackProc = null;
					this.mcProc = null;
					this.intraConstrainedProc = null;
					this.display444Proc = null;
					this.gl = null;
					this.canvas = null;
					this.mvp = null;
					this.fourVertPos = null;
					this.fourVertPosExpand = null;
					this.fourTexCoord = null
				},
				hasWebGLSupport: function () {
					return this.gl != null
				},
				UnitTestMC: function (frameType) {
					if (!this.unitTestMC) {
						this.unitTestMC = new UnitTestMC(this.gl, this.texResidue, this.mvp, this.size)
					}
					var tmp = this.texRef[0];
					this.texRef[0] = this.texRef[1];
					this.texRef[1] = tmp;
					this.idctProc.DrawIDCT();
					this.unitTestMC.SetBuf(this.mcProc.mcPos, this.mcProc.mv, this.mcProc.numSlots);
					this.unitTestMC.DrawMC(this.texRef[1], this.texRef[0])
				},
				UnitTestIDCT: function (frameType) {
					if (!this.unitTestIDCT) {
						this.unitTestIDCT = new UnitTestIDCT(this.gl, this.size.getVExpandSize(), this.fourVertPosExpand, this.fourTexCoord)
					}
					this.idctProc.SetBuf(cwgl.idctPosTest, cwgl.idctCofTest, cwgl.idctNumSlotsTest);
					this.idctProc.DrawIDCT();
					this.unitTestIDCT.DrawTest(this.texResidue)
				},
				UnitTestPackIDCT: function (frameType) {
					if (!this.unitTestIDCT) {
						this.unitTestIDCT = new UnitTestIDCT(this.gl, this.size.getVExpandSize(), this.fourVertPosExpand, this.fourTexCoord)
					}
					this.idctPackProc.SetBuf(cwgl.idctTestPosPack, cwgl.idctTestCof0, cwgl.idctTestCof1, cwgl.idctTestCof2, cwgl.idctTestCof3, 1);
					this.idctPackProc.DrawIDCT();
					this.unitTestIDCT.DrawTest(this.texResidue)
				},
				UnitTestExpand: function (frameType) {
					if (!this.unitTestSubTex) {
						this.unitTestSubTex = new UnitTestSubTex(this.gl, this.size.getVExpandSize(), this.fourVertPosExpand, this.fourTexCoord)
					}
					if (!this.texTestSubTex) {
						CreateTestSubTexture.call(this)
					}
					this.unitTestSubTex.DrawTestSubTex(this.texTestSubTex)
				}
			};
			return innerConstructor
		}();
		var AvcDecInstance = function () {
			var AVC_FRAME_TYPE = {
				I_FRAME: 2,
				P_FRMAE: 0
			};
			var FrameBuf = function () {
				var innerConstructor = function () {
					this.picBufYUV;
					this.picBufIDCT;
					this.picBufDisp
				};
				innerConstructor.prototype = {
					setYUVBuf: function ($YUV) {
						this.picBufYUV = $YUV
					},
					setIDCTBuf: function ($IDCT) {
						this.picBufIDCT = $IDCT
					},
					setDISPBuf: function ($DISP) {
						this.picBufDisp = $DISP
					}
				};
				return innerConstructor
			}();
			var innerConstructor = function (w, h, canvas, isV2) {
				var bufGPU;
				var decoderWebGL;
				var size;
				var lumaSize;
				var chromaSize;
				var dctBufSize;
				var picSizeInMbs;
				var dctCofSize;
				var dctPosSize;
				var mvSize;
				var mvPosSize;
				var dctActPosSize;
				var yuvSize;
				var intraBufSize;
				var numRect;
				var refID;
				var curID;
				size = new Size(w, h);
				yuvSize = w * h * 3 / 2;
				lumaSize = w * h;
				chromaSize = lumaSize / 4;
				picSizeInMbs = lumaSize / 256;
				dctCofSize = picSizeInMbs * 384;
				dctActPosSize = picSizeInMbs * 384 / 8;
				dctPosSize = picSizeInMbs * 384 / 8;
				mvSize = picSizeInMbs * 2;
				mvPosSize = picSizeInMbs;
				intraBufSize = picSizeInMbs * 2;
				dctBufSize = dctCofSize + dctPosSize + mvSize + mvPosSize + intraBufSize;
				numRect = picSizeInMbs * 4 + 2 * (picSizeInMbs - 1);
				decoderWebGL = new DecoderWebGL(canvas, size, isV2);
				var DecodeFrameI = function (numDispVer, isChroma) {
					var yuvData = bufGPU.picBufYUV.subarray(0, yuvSize);
					var dispVer = bufGPU.picBufDisp.subarray(0, numRect);
					decoderWebGL.FillFrameI(yuvData, dispVer, numDispVer);
					decoderWebGL.DrawFrameI(curID, isChroma)
				};
				var DecodeFrameP = function (numIDct, numMc, numIntras, w, h, numDispVer, isChroma) {
					var yuvData = bufGPU.picBufYUV.subarray(0, yuvSize);
					var dctCof0 = bufGPU.picBufIDCT.subarray(0, dctCofSize * .25);
					var dctCof1 = bufGPU.picBufIDCT.subarray(dctCofSize * .25, dctCofSize * .5);
					var dctCof2 = bufGPU.picBufIDCT.subarray(dctCofSize * .5, dctCofSize * .75);
					var dctCof3 = bufGPU.picBufIDCT.subarray(dctCofSize * .75, dctCofSize);
					var dctPos = bufGPU.picBufIDCT.subarray(dctCofSize, dctCofSize + dctActPosSize);
					var mv = bufGPU.picBufIDCT.subarray(dctCofSize + dctPosSize, dctCofSize + dctPosSize + mvSize);
					var mvPos = bufGPU.picBufIDCT.subarray(dctCofSize + dctPosSize + mvSize, dctCofSize + dctPosSize + mvSize + mvPosSize);
					var intraPos = bufGPU.picBufIDCT.subarray(dctCofSize + dctPosSize + mvSize + mvPosSize, dctBufSize);
					var dispVer = bufGPU.picBufDisp.subarray(0, numRect);
					if (numIntras > 0) {
						decoderWebGL.FillFrameYUVP(yuvData, w, h)
					}
					decoderWebGL.FillFramePackP(dctPos, dctCof0, dctCof1, dctCof2, dctCof3, numIDct, mvPos, mv, numMc, intraPos, numIntras, dispVer, numDispVer);
					decoderWebGL.DrawFrameP(refID, curID, isChroma)
				};
				this.ReleaseResources = function () {
					decoderWebGL.ReleaseResources();
					decoderWebGL = null
				};
				this.hasWebGLSupport = function () {
					return decoderWebGL.hasWebGLSupport()
				};
				this.runWebGLRender = function ($YUV, $IDCT, $DISP, w, h, numIDct, numMc, numIntra, numDispVer, refIdx, curIdx, frameType, isChroma) {
					if (bufGPU == null) {
						bufGPU = new FrameBuf
					}
					bufGPU.setYUVBuf($YUV);
					bufGPU.setIDCTBuf($IDCT);
					bufGPU.setDISPBuf($DISP);
					refID = refIdx;
					curID = curIdx;
					if (frameType === AVC_FRAME_TYPE.I_FRAME) {
						DecodeFrameI(numDispVer, isChroma)
					} else {
						DecodeFrameP(numIDct, numMc, numIntra, w, h, numDispVer, isChroma)
					}
				}
			};
			return innerConstructor
		}();
		return AvcDecInstance
	}();
	attachingObject.AvcDecoder = function () {
		var innerConstructor = function (w, h, canvas, isV2) {
			if (this.decoder == null) {
				this.decoder = new Decoder(w, h, canvas, isV2)
			}
		};
		innerConstructor.prototype = {
			hasWebGLSupport: function () {
				return this.decoder.hasWebGLSupport()
			},
			runWebGLRender: function ($YUV, $IDCT, $DISP, w, h, numIDCT, numMc, numIntra, numDispVer, refIdx, curIdx, frameType, isChroma) {
				this.decoder.runWebGLRender($YUV, $IDCT, $DISP, w, h, numIDCT, numMc, numIntra, numDispVer, refIdx, curIdx, frameType, isChroma)
			},
			ReleaseResources: function () {
				this.decoder.ReleaseResources();
				this.decoder = null
			}
		};
		innerConstructor.PlatformSupportsWebGL = function () {
			var canvas = document.createElement("canvas");
			return !!GetContextWebGL(canvas)
		};
		return innerConstructor
	}()
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	attachingObject.AudioCallback = {
		OnSoundData: function (context, timer, data, format, cbobject) {
			var that = timer;
			var curtime = context.currentTime;
			if (that.time === undefined) {
				that.time = curtime
			}
			var length = data.length / format.channels;
			var buffer = context.createBuffer(format.channels, length, format.samplerate);
			for (var c = 0; c < format.channels; ++c) {
				var channelData = buffer.getChannelData(c);
				for (var j = 0; j < length; ++j) {
					channelData[j] = data[j * format.channels + c] / 32768
				}
			}
			var schedulingdelta = that.time - curtime;
			if (schedulingdelta > .25) {
				that.time = curtime
			}
			var playtime = Math.max(curtime, that.time);
			var src = context.createBufferSource();
			src.buffer = buffer;
			src.onended = function () {
				cbobject.Complete();
				cbobject.delete()
			};
			src.connect(context.destination);
			src.start(playtime);
			that.time = playtime + src.buffer.duration
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.JSCallbackFunctionFactory === "undefined") {
		attachingObject.JSCallbackFunctionFactory = function (delegate) {
			var callbackContext = {
				delegate: delegate
			};
			var callbackFunction = function () {
				if (callbackContext && callbackContext.delegate) {
					return Module.InvokeJSCallbackDelegate(callbackContext.delegate, arguments)
				} else {
					return null
				}
			};
			callbackFunction.context = callbackContext;
			return callbackFunction
		}
	}
	if (typeof attachingObject.JSAutoRetireCallbackFunctionFactory === "undefined") {
		attachingObject.JSAutoRetireCallbackFunctionFactory = function (delegate) {
			var callbackContext = {
				delegate: delegate
			};
			var callbackFunction = function () {
				if (callbackContext && callbackContext.delegate) {
					var retVal = Module.InvokeJSCallbackDelegate(callbackContext.delegate, arguments);
					callbackContext.delegate.delete();
					delete callbackContext.delegate;
					return retVal
				} else {
					return null
				}
			};
			callbackFunction.context = callbackContext;
			return callbackFunction
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.CreateProxyJSObject === "undefined") {
		attachingObject.CreateProxyJSObject = function (weakSerializer, objectId, properties) {
			proxyObject = {};
			proxyObject.weakSerializer = weakSerializer;
			proxyObject.objectId = objectId;
			for (functionIndx in properties.__PROXY_FUNCTIONS__) {
				var functionName = properties.__PROXY_FUNCTIONS__[functionIndx];
				proxyObject[functionName] = function (obj, name) {
					return function () {
						var serializer = obj.weakSerializer.lock();
						if (!serializer) {
							return null
						}
						var args = [];
						for (var arg in arguments) {
							args.push(arguments[arg])
						}
						var ret = serializer.Call(obj.objectId + "::" + name, args);
						serializer.delete();
						return ret
					}
				}(proxyObject, functionName)
			}
			for (propertyName in properties) {
				if (propertyName != "__PROXY_FUNCTIONS__") {
					proxyObject[propertyName] = properties[propertyName]
				}
			}
			proxyObject.delete = function (obj) {
				return function () {
					var serializer = obj.weakSerializer.lock();
					if (serializer) {
						serializer.Call(obj.objectId + "::__RELEASE__", []);
						serializer.delete()
					}
					obj.weakSerializer.delete()
				}
			}(proxyObject);
			if (properties.__IS_FUNCTION__) {
				proxyObject = function (obj) {
					var functionObj = function () {
						return obj.__DEFAULT_FUNCTION__.apply(obj, arguments)
					};
					functionObj.delete = function () {
						obj.delete()
					};
					return functionObj
				}(proxyObject)
			}
			return proxyObject
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.CreateStubJSObject === "undefined") {
		attachingObject.CreateStubJSObject = function (weakSerializer, jsObject) {
			var serializer = weakSerializer.lock();
			if (!serializer) {
				return null
			}
			var stubObject = {};
			stubObject.weakSerializer = weakSerializer;
			stubObject.jsObject = jsObject;
			var serializedStub = {};
			serializedStub.properties = {};
			serializedStub.properties.__PROXY_FUNCTIONS__ = [];
			serializedStub.__IS_OBJECT_STUB__ = true;
			if (typeof jsObject === "function") {
				serializedStub.properties.__IS_FUNCTION__ = true;
				serializedStub.properties.__PROXY_FUNCTIONS__.push("__DEFAULT_FUNCTION__")
			}
			for (var prop in jsObject) {
				if (typeof jsObject[prop] === "function") {
					serializedStub.properties.__PROXY_FUNCTIONS__.push(prop)
				} else {
					serializedStub.properties[prop] = jsObject[prop]
				}
			}
			stubObject.RegisterDelegates = function (obj, serializedObj) {
				return function (objectId) {
					obj.objectId = objectId;
					serializedObj.objectId = objectId;
					var weakSerializer = obj.weakSerializer;
					var serializer = weakSerializer.lock();
					if (serializer) {
						serializer.RegisterDelegate(obj.objectId + "::__RELEASE__", obj, function () {
							var serializer = obj.weakSerializer.lock();
							if (serializer) {
								serializer.UnregisterStub(obj.objectId);
								serializer.delete()
							}
						});
						for (var functionIndx in serializedObj.properties.__PROXY_FUNCTIONS__) {
							var functionName = serializedObj.properties.__PROXY_FUNCTIONS__[functionIndx];
							if (functionName == "__DEFAULT_FUNCTION__") {
								serializer.RegisterDelegate(obj.objectId + "::" + functionName, obj.jsObject, obj.jsObject)
							} else {
								serializer.RegisterDelegate(obj.objectId + "::" + functionName, obj.jsObject, obj.jsObject[functionName])
							}
						}
						serializer.delete()
					}
				}
			}(stubObject, serializedStub);
			stubObject.delete = function (obj) {
				return function () {
					var serializer = weakSerializer.lock();
					if (serializer) {
						serializer.UnregisterDelegate(obj.objectId + "::__RELEASE__");
						for (var functionIndx in serializedStub.properties.__PROXY_FUNCTIONS__) {
							var functionName = serializedStub.properties.__PROXY_FUNCTIONS__[functionIndx];
							serializer.UnregisterDelegate(obj.objectId + "::" + functionName)
						}
						serializer.delete()
					}
					obj.weakSerializer.delete();
					if (typeof obj.jsObject.delete !== "undefined") {
						obj.jsObject.delete()
					}
				}
			}(stubObject);
			var stubWrapper = new Module.JSStubWrapper(stubObject);
			stubObject.objectId = serializer.RegisterStub(stubWrapper, "");
			serializer.delete();
			stubWrapper.delete();
			return serializedStub
		}
	}
}, function () {
	if (ENVIRONMENT_IS_WORKER && self) {
		self.onmessage = function (message) {
			if (message && message.data && message.data.WebworkerSetup) {
				var OnMessage = message.data.WebworkerSetup.OnMessage;
				self.onmessage = Module[OnMessage];
				if (JSON && JSON.parse && message.data.WebworkerSetup.UIStrings) {
					Module.UIStrings.RegisterTranslationTable(JSON.parse(message.data.WebworkerSetup.UIStrings))
				}
			}
		};
		if (self.webworkerMessageQueue) {
			while (self.webworkerMessageQueue.length > 0) {
				self.onmessage(self.webworkerMessageQueue.shift())
			}
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.CreateMessageInvoker === "undefined") {
		attachingObject.CreateMessageInvoker = function (onMessageCallback) {
			return function (message) {
				onMessageCallback.Invoke(message)
			}
		}
	}
}, function () {
	var attachingObject = {};
	if (typeof exports !== "undefined" && this.exports !== exports) {
		attachingObject = GLOBAL
	} else {
		attachingObject = self
	}
	if (typeof attachingObject.LIBRDPHTML_SafeJsonParse === "undefined") {
		attachingObject.LIBRDPHTML_SafeJsonParse = function (jsonString) {
			var retVal;
			try {
				retVal = JSON.parse(jsonString)
			} catch (e) {
				retVal = null
			}
			return retVal
		}
	}
}, function () {
	try {
		FS.syncfs(true, function (err) {
			if (err) {
				throw "Error occured during IDBFS sync: " + err
			}
			return ""
		})
	} catch (e) {
		var errorMessage = "SyncFS error: " + e;
		var lengthBytes = lengthBytesUTF8(errorMessage) + 1;
		var errorMessageOnWasmHeap = _malloc(lengthBytes);
		stringToUTF8(errorMessage, errorMessageOnWasmHeap, lengthBytes + 1);
		return errorMessageOnWasmHeap
	}
}, function () {
	try {
		FS.syncfs(function (err) {
			if (err) {
				throw "Error occured during IDBFS sync: " + err
			}
			return ""
		})
	} catch (e) {
		var errorMessage = "SyncFS error: " + e;
		var lengthBytes = lengthBytesUTF8(errorMessage) + 1;
		var errorMessageOnWasmHeap = _malloc(lengthBytes);
		stringToUTF8(errorMessage, errorMessageOnWasmHeap, lengthBytes + 1);
		return errorMessageOnWasmHeap
	}
}, function ($0) {
	try {
		var folderPath = UTF8ToString($0);
		try {
			FS.lookupPath(folderPath);
			return 1
		} catch (e) {
			FS.mkdir(folderPath);
			FS.mount(IDBFS, {
				root: "."
			}, folderPath);
			return 0
		}
	} catch (e) {
		return 2
	}
}];

function _emscripten_asm_const_i(code) {
	return ASM_CONSTS[code]()
}

function _emscripten_asm_const_ii(code, a0) {
	return ASM_CONSTS[code](a0)
}
__ATINIT__.push({
	func: function () {
		globalCtors()
	}
});

function demangle(func) {
	demangle.recursionGuard = (demangle.recursionGuard | 0) + 1;
	if (demangle.recursionGuard > 1) return func;
	var __cxa_demangle_func = Module["___cxa_demangle"] || Module["__cxa_demangle"];
	assert(__cxa_demangle_func);
	var stackTop = stackSave();
	try {
		var s = func;
		if (s.startsWith("__Z")) s = s.substr(1);
		var len = lengthBytesUTF8(s) + 1;
		var buf = stackAlloc(len);
		stringToUTF8(s, buf, len);
		var status = stackAlloc(4);
		var ret = __cxa_demangle_func(buf, 0, 0, status);
		if (HEAP32[status >> 2] === 0 && ret) {
			return UTF8ToString(ret)
		}
	} catch (e) {} finally {
		_free(ret);
		stackRestore(stackTop);
		if (demangle.recursionGuard < 2) --demangle.recursionGuard
	}
	return func
}

function demangleAll(text) {
	var regex = /\b__Z[\w\d_]+/g;
	return text.replace(regex, function (x) {
		var y = demangle(x);
		return x === y ? x : y + " [" + x + "]"
	})
}

function jsStackTrace() {
	var err = new Error;
	if (!err.stack) {
		try {
			throw new Error
		} catch (e) {
			err = e
		}
		if (!err.stack) {
			return "(no stack trace available)"
		}
	}
	return err.stack.toString()
}

function stackTrace() {
	var js = jsStackTrace();
	if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
	return demangleAll(js)
}

function ___atomic_compare_exchange_8(ptr, expected, desiredl, desiredh, weak, success_memmodel, failure_memmodel) {
	var pl = HEAP32[ptr >> 2];
	var ph = HEAP32[ptr + 4 >> 2];
	var el = HEAP32[expected >> 2];
	var eh = HEAP32[expected + 4 >> 2];
	if (pl === el && ph === eh) {
		HEAP32[ptr >> 2] = desiredl;
		HEAP32[ptr + 4 >> 2] = desiredh;
		return 1
	} else {
		HEAP32[expected >> 2] = pl;
		HEAP32[expected + 4 >> 2] = ph;
		return 0
	}
}
var ___environ = 1204496;
var ENV = {};

function getExecutableName() {
	return thisProgram || "./this.program"
}

function ___buildEnvironment(environ) {
	var MAX_ENV_VALUES = 64;
	var TOTAL_ENV_SIZE = 1024;
	var poolPtr;
	if (!___buildEnvironment.called) {
		___buildEnvironment.called = true;
		ENV["USER"] = "web_user";
		ENV["LOGNAME"] = "web_user";
		ENV["PATH"] = "/";
		ENV["PWD"] = "/";
		ENV["HOME"] = "/home/web_user";
		ENV["LANG"] = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
		ENV["_"] = getExecutableName();
		poolPtr = getMemory(TOTAL_ENV_SIZE);
		___environ = getMemory(MAX_ENV_VALUES * 4);
		HEAP32[___environ >> 2] = poolPtr;
		HEAP32[environ >> 2] = ___environ
	} else {
		___environ = HEAP32[environ >> 2];
		poolPtr = HEAP32[___environ >> 2]
	}
	var strings = [];
	var totalSize = 0;
	for (var key in ENV) {
		if (typeof ENV[key] === "string") {
			var line = key + "=" + ENV[key];
			strings.push(line);
			totalSize += line.length
		}
	}
	if (totalSize > TOTAL_ENV_SIZE) {
		throw new Error("Environment size exceeded TOTAL_ENV_SIZE!")
	}
	var ptrSize = 4;
	for (var i = 0; i < strings.length; i++) {
		var line = strings[i];
		writeAsciiToMemory(line, poolPtr);
		HEAP32[___environ + i * ptrSize >> 2] = poolPtr;
		poolPtr += line.length + 1
	}
	HEAP32[___environ + strings.length * ptrSize >> 2] = 0
}

function ___cxa_allocate_exception(size) {
	return _malloc(size)
}
var exceptionInfos = {};
var exceptionCaught = [];

function exception_addRef(ptr) {
	if (!ptr) return;
	var info = exceptionInfos[ptr];
	info.refcount++
}

function exception_deAdjust(adjusted) {
	if (!adjusted || exceptionInfos[adjusted]) return adjusted;
	for (var key in exceptionInfos) {
		var ptr = +key;
		var adj = exceptionInfos[ptr].adjusted;
		var len = adj.length;
		for (var i = 0; i < len; i++) {
			if (adj[i] === adjusted) {
				return ptr
			}
		}
	}
	return adjusted
}

function ___cxa_begin_catch(ptr) {
	var info = exceptionInfos[ptr];
	if (info && !info.caught) {
		info.caught = true;
		__ZSt18uncaught_exceptionv.uncaught_exceptions--
	}
	if (info) info.rethrown = false;
	exceptionCaught.push(ptr);
	exception_addRef(exception_deAdjust(ptr));
	return ptr
}

function ___cxa_current_primary_exception() {
	var ret = exceptionCaught[exceptionCaught.length - 1] || 0;
	if (ret) exception_addRef(exception_deAdjust(ret));
	return ret
}

function ___cxa_free_exception(ptr) {
	return _free(ptr)
}

function exception_decRef(ptr) {
	if (!ptr) return;
	var info = exceptionInfos[ptr];
	info.refcount--;
	if (info.refcount === 0 && !info.rethrown) {
		if (info.destructor) {
			Module["dynCall_vi"](info.destructor, ptr)
		}
		delete exceptionInfos[ptr];
		___cxa_free_exception(ptr)
	}
}

function ___cxa_decrement_exception_refcount(ptr) {
	exception_decRef(exception_deAdjust(ptr))
}
var exceptionLast = 0;

function ___cxa_end_catch() {
	_setThrew(0);
	var ptr = exceptionCaught.pop();
	if (ptr) {
		exception_decRef(exception_deAdjust(ptr));
		exceptionLast = 0
	}
}

function ___cxa_find_matching_catch_2() {
	var thrown = exceptionLast;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = exceptionInfos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 1204656;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_find_matching_catch_3() {
	var thrown = exceptionLast;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = exceptionInfos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 1204656;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_find_matching_catch_4() {
	var thrown = exceptionLast;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = exceptionInfos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 1204656;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_increment_exception_refcount(ptr) {
	exception_addRef(exception_deAdjust(ptr))
}

function ___cxa_rethrow() {
	var ptr = exceptionCaught.pop();
	ptr = exception_deAdjust(ptr);
	if (!exceptionInfos[ptr].rethrown) {
		exceptionCaught.push(ptr);
		exceptionInfos[ptr].rethrown = true
	}
	exceptionLast = ptr;
	throw ptr
}

function ___cxa_rethrow_primary_exception(ptr) {
	if (!ptr) return;
	ptr = exception_deAdjust(ptr);
	exceptionCaught.push(ptr);
	exceptionInfos[ptr].rethrown = true;
	___cxa_rethrow()
}

function ___cxa_throw(ptr, type, destructor) {
	exceptionInfos[ptr] = {
		ptr: ptr,
		adjusted: [ptr],
		type: type,
		destructor: destructor,
		refcount: 0,
		caught: false,
		rethrown: false
	};
	exceptionLast = ptr;
	if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
		__ZSt18uncaught_exceptionv.uncaught_exceptions = 1
	} else {
		__ZSt18uncaught_exceptionv.uncaught_exceptions++
	}
	throw ptr
}

function ___cxa_uncaught_exceptions() {
	return __ZSt18uncaught_exceptionv.uncaught_exceptions
}

function setErrNo(value) {
	HEAP32[___errno_location() >> 2] = value;
	return value
}

function ___map_file(pathname, size) {
	setErrNo(63);
	return -1
}

function ___resumeException(ptr) {
	if (!exceptionLast) {
		exceptionLast = ptr
	}
	throw ptr
}
var PATH = {
	splitPath: function (filename) {
		var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		return splitPathRe.exec(filename).slice(1)
	},
	normalizeArray: function (parts, allowAboveRoot) {
		var up = 0;
		for (var i = parts.length - 1; i >= 0; i--) {
			var last = parts[i];
			if (last === ".") {
				parts.splice(i, 1)
			} else if (last === "..") {
				parts.splice(i, 1);
				up++
			} else if (up) {
				parts.splice(i, 1);
				up--
			}
		}
		if (allowAboveRoot) {
			for (; up; up--) {
				parts.unshift("..")
			}
		}
		return parts
	},
	normalize: function (path) {
		var isAbsolute = path.charAt(0) === "/",
			trailingSlash = path.substr(-1) === "/";
		path = PATH.normalizeArray(path.split("/").filter(function (p) {
			return !!p
		}), !isAbsolute).join("/");
		if (!path && !isAbsolute) {
			path = "."
		}
		if (path && trailingSlash) {
			path += "/"
		}
		return (isAbsolute ? "/" : "") + path
	},
	dirname: function (path) {
		var result = PATH.splitPath(path),
			root = result[0],
			dir = result[1];
		if (!root && !dir) {
			return "."
		}
		if (dir) {
			dir = dir.substr(0, dir.length - 1)
		}
		return root + dir
	},
	basename: function (path) {
		if (path === "/") return "/";
		var lastSlash = path.lastIndexOf("/");
		if (lastSlash === -1) return path;
		return path.substr(lastSlash + 1)
	},
	extname: function (path) {
		return PATH.splitPath(path)[3]
	},
	join: function () {
		var paths = Array.prototype.slice.call(arguments, 0);
		return PATH.normalize(paths.join("/"))
	},
	join2: function (l, r) {
		return PATH.normalize(l + "/" + r)
	}
};
var PATH_FS = {
	resolve: function () {
		var resolvedPath = "",
			resolvedAbsolute = false;
		for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
			var path = i >= 0 ? arguments[i] : FS.cwd();
			if (typeof path !== "string") {
				throw new TypeError("Arguments to path.resolve must be strings")
			} else if (!path) {
				return ""
			}
			resolvedPath = path + "/" + resolvedPath;
			resolvedAbsolute = path.charAt(0) === "/"
		}
		resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function (p) {
			return !!p
		}), !resolvedAbsolute).join("/");
		return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
	},
	relative: function (from, to) {
		from = PATH_FS.resolve(from).substr(1);
		to = PATH_FS.resolve(to).substr(1);

		function trim(arr) {
			var start = 0;
			for (; start < arr.length; start++) {
				if (arr[start] !== "") break
			}
			var end = arr.length - 1;
			for (; end >= 0; end--) {
				if (arr[end] !== "") break
			}
			if (start > end) return [];
			return arr.slice(start, end - start + 1)
		}
		var fromParts = trim(from.split("/"));
		var toParts = trim(to.split("/"));
		var length = Math.min(fromParts.length, toParts.length);
		var samePartsLength = length;
		for (var i = 0; i < length; i++) {
			if (fromParts[i] !== toParts[i]) {
				samePartsLength = i;
				break
			}
		}
		var outputParts = [];
		for (var i = samePartsLength; i < fromParts.length; i++) {
			outputParts.push("..")
		}
		outputParts = outputParts.concat(toParts.slice(samePartsLength));
		return outputParts.join("/")
	}
};
var TTY = {
	ttys: [],
	init: function () {},
	shutdown: function () {},
	register: function (dev, ops) {
		TTY.ttys[dev] = {
			input: [],
			output: [],
			ops: ops
		};
		FS.registerDevice(dev, TTY.stream_ops)
	},
	stream_ops: {
		open: function (stream) {
			var tty = TTY.ttys[stream.node.rdev];
			if (!tty) {
				throw new FS.ErrnoError(43)
			}
			stream.tty = tty;
			stream.seekable = false
		},
		close: function (stream) {
			stream.tty.ops.flush(stream.tty)
		},
		flush: function (stream) {
			stream.tty.ops.flush(stream.tty)
		},
		read: function (stream, buffer, offset, length, pos) {
			if (!stream.tty || !stream.tty.ops.get_char) {
				throw new FS.ErrnoError(60)
			}
			var bytesRead = 0;
			for (var i = 0; i < length; i++) {
				var result;
				try {
					result = stream.tty.ops.get_char(stream.tty)
				} catch (e) {
					throw new FS.ErrnoError(29)
				}
				if (result === undefined && bytesRead === 0) {
					throw new FS.ErrnoError(6)
				}
				if (result === null || result === undefined) break;
				bytesRead++;
				buffer[offset + i] = result
			}
			if (bytesRead) {
				stream.node.timestamp = Date.now()
			}
			return bytesRead
		},
		write: function (stream, buffer, offset, length, pos) {
			if (!stream.tty || !stream.tty.ops.put_char) {
				throw new FS.ErrnoError(60)
			}
			try {
				for (var i = 0; i < length; i++) {
					stream.tty.ops.put_char(stream.tty, buffer[offset + i])
				}
			} catch (e) {
				throw new FS.ErrnoError(29)
			}
			if (length) {
				stream.node.timestamp = Date.now()
			}
			return i
		}
	},
	default_tty_ops: {
		get_char: function (tty) {
			if (!tty.input.length) {
				var result = null;
				if (ENVIRONMENT_IS_NODE) {
					var BUFSIZE = 256;
					var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
					var bytesRead = 0;
					try {
						bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null)
					} catch (e) {
						if (e.toString().indexOf("EOF") != -1) bytesRead = 0;
						else throw e
					}
					if (bytesRead > 0) {
						result = buf.slice(0, bytesRead).toString("utf-8")
					} else {
						result = null
					}
				} else if (typeof window != "undefined" && typeof window.prompt == "function") {
					result = window.prompt("Input: ");
					if (result !== null) {
						result += "\n"
					}
				} else if (typeof readline == "function") {
					result = readline();
					if (result !== null) {
						result += "\n"
					}
				}
				if (!result) {
					return null
				}
				tty.input = intArrayFromString(result, true)
			}
			return tty.input.shift()
		},
		put_char: function (tty, val) {
			if (val === null || val === 10) {
				out(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			} else {
				if (val != 0) tty.output.push(val)
			}
		},
		flush: function (tty) {
			if (tty.output && tty.output.length > 0) {
				out(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			}
		}
	},
	default_tty1_ops: {
		put_char: function (tty, val) {
			if (val === null || val === 10) {
				err(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			} else {
				if (val != 0) tty.output.push(val)
			}
		},
		flush: function (tty) {
			if (tty.output && tty.output.length > 0) {
				err(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			}
		}
	}
};
var MEMFS = {
	ops_table: null,
	mount: function (mount) {
		return MEMFS.createNode(null, "/", 16384 | 511, 0)
	},
	createNode: function (parent, name, mode, dev) {
		if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
			throw new FS.ErrnoError(63)
		}
		if (!MEMFS.ops_table) {
			MEMFS.ops_table = {
				dir: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						lookup: MEMFS.node_ops.lookup,
						mknod: MEMFS.node_ops.mknod,
						rename: MEMFS.node_ops.rename,
						unlink: MEMFS.node_ops.unlink,
						rmdir: MEMFS.node_ops.rmdir,
						readdir: MEMFS.node_ops.readdir,
						symlink: MEMFS.node_ops.symlink
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek
					}
				},
				file: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek,
						read: MEMFS.stream_ops.read,
						write: MEMFS.stream_ops.write,
						allocate: MEMFS.stream_ops.allocate,
						mmap: MEMFS.stream_ops.mmap,
						msync: MEMFS.stream_ops.msync
					}
				},
				link: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						readlink: MEMFS.node_ops.readlink
					},
					stream: {}
				},
				chrdev: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: FS.chrdev_stream_ops
				}
			}
		}
		var node = FS.createNode(parent, name, mode, dev);
		if (FS.isDir(node.mode)) {
			node.node_ops = MEMFS.ops_table.dir.node;
			node.stream_ops = MEMFS.ops_table.dir.stream;
			node.contents = {}
		} else if (FS.isFile(node.mode)) {
			node.node_ops = MEMFS.ops_table.file.node;
			node.stream_ops = MEMFS.ops_table.file.stream;
			node.usedBytes = 0;
			node.contents = null
		} else if (FS.isLink(node.mode)) {
			node.node_ops = MEMFS.ops_table.link.node;
			node.stream_ops = MEMFS.ops_table.link.stream
		} else if (FS.isChrdev(node.mode)) {
			node.node_ops = MEMFS.ops_table.chrdev.node;
			node.stream_ops = MEMFS.ops_table.chrdev.stream
		}
		node.timestamp = Date.now();
		if (parent) {
			parent.contents[name] = node
		}
		return node
	},
	getFileDataAsRegularArray: function (node) {
		if (node.contents && node.contents.subarray) {
			var arr = [];
			for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
			return arr
		}
		return node.contents
	},
	getFileDataAsTypedArray: function (node) {
		if (!node.contents) return new Uint8Array(0);
		if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
		return new Uint8Array(node.contents)
	},
	expandFileStorage: function (node, newCapacity) {
		var prevCapacity = node.contents ? node.contents.length : 0;
		if (prevCapacity >= newCapacity) return;
		var CAPACITY_DOUBLING_MAX = 1024 * 1024;
		newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
		if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
		var oldContents = node.contents;
		node.contents = new Uint8Array(newCapacity);
		if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
		return
	},
	resizeFileStorage: function (node, newSize) {
		if (node.usedBytes == newSize) return;
		if (newSize == 0) {
			node.contents = null;
			node.usedBytes = 0;
			return
		}
		if (!node.contents || node.contents.subarray) {
			var oldContents = node.contents;
			node.contents = new Uint8Array(newSize);
			if (oldContents) {
				node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
			}
			node.usedBytes = newSize;
			return
		}
		if (!node.contents) node.contents = [];
		if (node.contents.length > newSize) node.contents.length = newSize;
		else
			while (node.contents.length < newSize) node.contents.push(0);
		node.usedBytes = newSize
	},
	node_ops: {
		getattr: function (node) {
			var attr = {};
			attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
			attr.ino = node.id;
			attr.mode = node.mode;
			attr.nlink = 1;
			attr.uid = 0;
			attr.gid = 0;
			attr.rdev = node.rdev;
			if (FS.isDir(node.mode)) {
				attr.size = 4096
			} else if (FS.isFile(node.mode)) {
				attr.size = node.usedBytes
			} else if (FS.isLink(node.mode)) {
				attr.size = node.link.length
			} else {
				attr.size = 0
			}
			attr.atime = new Date(node.timestamp);
			attr.mtime = new Date(node.timestamp);
			attr.ctime = new Date(node.timestamp);
			attr.blksize = 4096;
			attr.blocks = Math.ceil(attr.size / attr.blksize);
			return attr
		},
		setattr: function (node, attr) {
			if (attr.mode !== undefined) {
				node.mode = attr.mode
			}
			if (attr.timestamp !== undefined) {
				node.timestamp = attr.timestamp
			}
			if (attr.size !== undefined) {
				MEMFS.resizeFileStorage(node, attr.size)
			}
		},
		lookup: function (parent, name) {
			throw FS.genericErrors[44]
		},
		mknod: function (parent, name, mode, dev) {
			return MEMFS.createNode(parent, name, mode, dev)
		},
		rename: function (old_node, new_dir, new_name) {
			if (FS.isDir(old_node.mode)) {
				var new_node;
				try {
					new_node = FS.lookupNode(new_dir, new_name)
				} catch (e) {}
				if (new_node) {
					for (var i in new_node.contents) {
						throw new FS.ErrnoError(55)
					}
				}
			}
			delete old_node.parent.contents[old_node.name];
			old_node.name = new_name;
			new_dir.contents[new_name] = old_node;
			old_node.parent = new_dir
		},
		unlink: function (parent, name) {
			delete parent.contents[name]
		},
		rmdir: function (parent, name) {
			var node = FS.lookupNode(parent, name);
			for (var i in node.contents) {
				throw new FS.ErrnoError(55)
			}
			delete parent.contents[name]
		},
		readdir: function (node) {
			var entries = [".", ".."];
			for (var key in node.contents) {
				if (!node.contents.hasOwnProperty(key)) {
					continue
				}
				entries.push(key)
			}
			return entries
		},
		symlink: function (parent, newname, oldpath) {
			var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
			node.link = oldpath;
			return node
		},
		readlink: function (node) {
			if (!FS.isLink(node.mode)) {
				throw new FS.ErrnoError(28)
			}
			return node.link
		}
	},
	stream_ops: {
		read: function (stream, buffer, offset, length, position) {
			var contents = stream.node.contents;
			if (position >= stream.node.usedBytes) return 0;
			var size = Math.min(stream.node.usedBytes - position, length);
			if (size > 8 && contents.subarray) {
				buffer.set(contents.subarray(position, position + size), offset)
			} else {
				for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
			}
			return size
		},
		write: function (stream, buffer, offset, length, position, canOwn) {
			if (buffer.buffer === HEAP8.buffer) {
				canOwn = false
			}
			if (!length) return 0;
			var node = stream.node;
			node.timestamp = Date.now();
			if (buffer.subarray && (!node.contents || node.contents.subarray)) {
				if (canOwn) {
					node.contents = buffer.subarray(offset, offset + length);
					node.usedBytes = length;
					return length
				} else if (node.usedBytes === 0 && position === 0) {
					node.contents = buffer.slice(offset, offset + length);
					node.usedBytes = length;
					return length
				} else if (position + length <= node.usedBytes) {
					node.contents.set(buffer.subarray(offset, offset + length), position);
					return length
				}
			}
			MEMFS.expandFileStorage(node, position + length);
			if (node.contents.subarray && buffer.subarray) {
				node.contents.set(buffer.subarray(offset, offset + length), position)
			} else {
				for (var i = 0; i < length; i++) {
					node.contents[position + i] = buffer[offset + i]
				}
			}
			node.usedBytes = Math.max(node.usedBytes, position + length);
			return length
		},
		llseek: function (stream, offset, whence) {
			var position = offset;
			if (whence === 1) {
				position += stream.position
			} else if (whence === 2) {
				if (FS.isFile(stream.node.mode)) {
					position += stream.node.usedBytes
				}
			}
			if (position < 0) {
				throw new FS.ErrnoError(28)
			}
			return position
		},
		allocate: function (stream, offset, length) {
			MEMFS.expandFileStorage(stream.node, offset + length);
			stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
		},
		mmap: function (stream, address, length, position, prot, flags) {
			assert(address === 0);
			if (!FS.isFile(stream.node.mode)) {
				throw new FS.ErrnoError(43)
			}
			var ptr;
			var allocated;
			var contents = stream.node.contents;
			if (!(flags & 2) && contents.buffer === buffer) {
				allocated = false;
				ptr = contents.byteOffset
			} else {
				if (position > 0 || position + length < contents.length) {
					if (contents.subarray) {
						contents = contents.subarray(position, position + length)
					} else {
						contents = Array.prototype.slice.call(contents, position, position + length)
					}
				}
				allocated = true;
				ptr = FS.mmapAlloc(length);
				if (!ptr) {
					throw new FS.ErrnoError(48)
				}
				HEAP8.set(contents, ptr)
			}
			return {
				ptr: ptr,
				allocated: allocated
			}
		},
		msync: function (stream, buffer, offset, length, mmapFlags) {
			if (!FS.isFile(stream.node.mode)) {
				throw new FS.ErrnoError(43)
			}
			if (mmapFlags & 2) {
				return 0
			}
			var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
			return 0
		}
	}
};
var IDBFS = {
	dbs: {},
	indexedDB: function () {
		if (typeof indexedDB !== "undefined") return indexedDB;
		var ret = null;
		if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		assert(ret, "IDBFS used, but indexedDB not supported");
		return ret
	},
	DB_VERSION: 21,
	DB_STORE_NAME: "FILE_DATA",
	mount: function (mount) {
		return MEMFS.mount.apply(null, arguments)
	},
	syncfs: function (mount, populate, callback) {
		IDBFS.getLocalSet(mount, function (err, local) {
			if (err) return callback(err);
			IDBFS.getRemoteSet(mount, function (err, remote) {
				if (err) return callback(err);
				var src = populate ? remote : local;
				var dst = populate ? local : remote;
				IDBFS.reconcile(src, dst, callback)
			})
		})
	},
	getDB: function (name, callback) {
		var db = IDBFS.dbs[name];
		if (db) {
			return callback(null, db)
		}
		var req;
		try {
			req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION)
		} catch (e) {
			return callback(e)
		}
		if (!req) {
			return callback("Unable to connect to IndexedDB")
		}
		req.onupgradeneeded = function (e) {
			var db = e.target.result;
			var transaction = e.target.transaction;
			var fileStore;
			if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
				fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME)
			} else {
				fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME)
			}
			if (!fileStore.indexNames.contains("timestamp")) {
				fileStore.createIndex("timestamp", "timestamp", {
					unique: false
				})
			}
		};
		req.onsuccess = function () {
			db = req.result;
			IDBFS.dbs[name] = db;
			callback(null, db)
		};
		req.onerror = function (e) {
			callback(this.error);
			e.preventDefault()
		}
	},
	getLocalSet: function (mount, callback) {
		var entries = {};

		function isRealDir(p) {
			return p !== "." && p !== ".."
		}

		function toAbsolute(root) {
			return function (p) {
				return PATH.join2(root, p)
			}
		}
		var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
		while (check.length) {
			var path = check.pop();
			var stat;
			try {
				stat = FS.stat(path)
			} catch (e) {
				return callback(e)
			}
			if (FS.isDir(stat.mode)) {
				check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))
			}
			entries[path] = {
				"timestamp": stat.mtime
			}
		}
		return callback(null, {
			type: "local",
			entries: entries
		})
	},
	getRemoteSet: function (mount, callback) {
		var entries = {};
		IDBFS.getDB(mount.mountpoint, function (err, db) {
			if (err) return callback(err);
			try {
				var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
				transaction.onerror = function (e) {
					callback(this.error);
					e.preventDefault()
				};
				var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
				var index = store.index("timestamp");
				index.openKeyCursor().onsuccess = function (event) {
					var cursor = event.target.result;
					if (!cursor) {
						return callback(null, {
							type: "remote",
							db: db,
							entries: entries
						})
					}
					entries[cursor.primaryKey] = {
						"timestamp": cursor.key
					};
					cursor.continue()
				}
			} catch (e) {
				return callback(e)
			}
		})
	},
	loadLocalEntry: function (path, callback) {
		var stat, node;
		try {
			var lookup = FS.lookupPath(path);
			node = lookup.node;
			stat = FS.stat(path)
		} catch (e) {
			return callback(e)
		}
		if (FS.isDir(stat.mode)) {
			return callback(null, {
				"timestamp": stat.mtime,
				"mode": stat.mode
			})
		} else if (FS.isFile(stat.mode)) {
			node.contents = MEMFS.getFileDataAsTypedArray(node);
			return callback(null, {
				"timestamp": stat.mtime,
				"mode": stat.mode,
				"contents": node.contents
			})
		} else {
			return callback(new Error("node type not supported"))
		}
	},
	storeLocalEntry: function (path, entry, callback) {
		try {
			if (FS.isDir(entry["mode"])) {
				FS.mkdir(path, entry["mode"])
			} else if (FS.isFile(entry["mode"])) {
				FS.writeFile(path, entry["contents"], {
					canOwn: true
				})
			} else {
				return callback(new Error("node type not supported"))
			}
			FS.chmod(path, entry["mode"]);
			FS.utime(path, entry["timestamp"], entry["timestamp"])
		} catch (e) {
			return callback(e)
		}
		callback(null)
	},
	removeLocalEntry: function (path, callback) {
		try {
			var lookup = FS.lookupPath(path);
			var stat = FS.stat(path);
			if (FS.isDir(stat.mode)) {
				FS.rmdir(path)
			} else if (FS.isFile(stat.mode)) {
				FS.unlink(path)
			}
		} catch (e) {
			return callback(e)
		}
		callback(null)
	},
	loadRemoteEntry: function (store, path, callback) {
		var req = store.get(path);
		req.onsuccess = function (event) {
			callback(null, event.target.result)
		};
		req.onerror = function (e) {
			callback(this.error);
			e.preventDefault()
		}
	},
	storeRemoteEntry: function (store, path, entry, callback) {
		var req = store.put(entry, path);
		req.onsuccess = function () {
			callback(null)
		};
		req.onerror = function (e) {
			callback(this.error);
			e.preventDefault()
		}
	},
	removeRemoteEntry: function (store, path, callback) {
		var req = store.delete(path);
		req.onsuccess = function () {
			callback(null)
		};
		req.onerror = function (e) {
			callback(this.error);
			e.preventDefault()
		}
	},
	reconcile: function (src, dst, callback) {
		var total = 0;
		var create = [];
		Object.keys(src.entries).forEach(function (key) {
			var e = src.entries[key];
			var e2 = dst.entries[key];
			if (!e2 || e["timestamp"] > e2["timestamp"]) {
				create.push(key);
				total++
			}
		});
		var remove = [];
		Object.keys(dst.entries).forEach(function (key) {
			var e = dst.entries[key];
			var e2 = src.entries[key];
			if (!e2) {
				remove.push(key);
				total++
			}
		});
		if (!total) {
			return callback(null)
		}
		var errored = false;
		var db = src.type === "remote" ? src.db : dst.db;
		var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
		var store = transaction.objectStore(IDBFS.DB_STORE_NAME);

		function done(err) {
			if (err && !errored) {
				errored = true;
				return callback(err)
			}
		}
		transaction.onerror = function (e) {
			done(this.error);
			e.preventDefault()
		};
		transaction.oncomplete = function (e) {
			if (!errored) {
				callback(null)
			}
		};
		create.sort().forEach(function (path) {
			if (dst.type === "local") {
				IDBFS.loadRemoteEntry(store, path, function (err, entry) {
					if (err) return done(err);
					IDBFS.storeLocalEntry(path, entry, done)
				})
			} else {
				IDBFS.loadLocalEntry(path, function (err, entry) {
					if (err) return done(err);
					IDBFS.storeRemoteEntry(store, path, entry, done)
				})
			}
		});
		remove.sort().reverse().forEach(function (path) {
			if (dst.type === "local") {
				IDBFS.removeLocalEntry(path, done)
			} else {
				IDBFS.removeRemoteEntry(store, path, done)
			}
		})
	}
};
var FS = {
	root: null,
	mounts: [],
	devices: {},
	streams: [],
	nextInode: 1,
	nameTable: null,
	currentPath: "/",
	initialized: false,
	ignorePermissions: true,
	trackingDelegate: {},
	tracking: {
		openFlags: {
			READ: 1,
			WRITE: 2
		}
	},
	ErrnoError: null,
	genericErrors: {},
	filesystems: null,
	syncFSRequests: 0,
	handleFSError: function (e) {
		if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
		return setErrNo(e.errno)
	},
	lookupPath: function (path, opts) {
		path = PATH_FS.resolve(FS.cwd(), path);
		opts = opts || {};
		if (!path) return {
			path: "",
			node: null
		};
		var defaults = {
			follow_mount: true,
			recurse_count: 0
		};
		for (var key in defaults) {
			if (opts[key] === undefined) {
				opts[key] = defaults[key]
			}
		}
		if (opts.recurse_count > 8) {
			throw new FS.ErrnoError(32)
		}
		var parts = PATH.normalizeArray(path.split("/").filter(function (p) {
			return !!p
		}), false);
		var current = FS.root;
		var current_path = "/";
		for (var i = 0; i < parts.length; i++) {
			var islast = i === parts.length - 1;
			if (islast && opts.parent) {
				break
			}
			current = FS.lookupNode(current, parts[i]);
			current_path = PATH.join2(current_path, parts[i]);
			if (FS.isMountpoint(current)) {
				if (!islast || islast && opts.follow_mount) {
					current = current.mounted.root
				}
			}
			if (!islast || opts.follow) {
				var count = 0;
				while (FS.isLink(current.mode)) {
					var link = FS.readlink(current_path);
					current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
					var lookup = FS.lookupPath(current_path, {
						recurse_count: opts.recurse_count
					});
					current = lookup.node;
					if (count++ > 40) {
						throw new FS.ErrnoError(32)
					}
				}
			}
		}
		return {
			path: current_path,
			node: current
		}
	},
	getPath: function (node) {
		var path;
		while (true) {
			if (FS.isRoot(node)) {
				var mount = node.mount.mountpoint;
				if (!path) return mount;
				return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
			}
			path = path ? node.name + "/" + path : node.name;
			node = node.parent
		}
	},
	hashName: function (parentid, name) {
		var hash = 0;
		for (var i = 0; i < name.length; i++) {
			hash = (hash << 5) - hash + name.charCodeAt(i) | 0
		}
		return (parentid + hash >>> 0) % FS.nameTable.length
	},
	hashAddNode: function (node) {
		var hash = FS.hashName(node.parent.id, node.name);
		node.name_next = FS.nameTable[hash];
		FS.nameTable[hash] = node
	},
	hashRemoveNode: function (node) {
		var hash = FS.hashName(node.parent.id, node.name);
		if (FS.nameTable[hash] === node) {
			FS.nameTable[hash] = node.name_next
		} else {
			var current = FS.nameTable[hash];
			while (current) {
				if (current.name_next === node) {
					current.name_next = node.name_next;
					break
				}
				current = current.name_next
			}
		}
	},
	lookupNode: function (parent, name) {
		var errCode = FS.mayLookup(parent);
		if (errCode) {
			throw new FS.ErrnoError(errCode, parent)
		}
		var hash = FS.hashName(parent.id, name);
		for (var node = FS.nameTable[hash]; node; node = node.name_next) {
			var nodeName = node.name;
			if (node.parent.id === parent.id && nodeName === name) {
				return node
			}
		}
		return FS.lookup(parent, name)
	},
	createNode: function (parent, name, mode, rdev) {
		var node = new FS.FSNode(parent, name, mode, rdev);
		FS.hashAddNode(node);
		return node
	},
	destroyNode: function (node) {
		FS.hashRemoveNode(node)
	},
	isRoot: function (node) {
		return node === node.parent
	},
	isMountpoint: function (node) {
		return !!node.mounted
	},
	isFile: function (mode) {
		return (mode & 61440) === 32768
	},
	isDir: function (mode) {
		return (mode & 61440) === 16384
	},
	isLink: function (mode) {
		return (mode & 61440) === 40960
	},
	isChrdev: function (mode) {
		return (mode & 61440) === 8192
	},
	isBlkdev: function (mode) {
		return (mode & 61440) === 24576
	},
	isFIFO: function (mode) {
		return (mode & 61440) === 4096
	},
	isSocket: function (mode) {
		return (mode & 49152) === 49152
	},
	flagModes: {
		"r": 0,
		"rs": 1052672,
		"r+": 2,
		"w": 577,
		"wx": 705,
		"xw": 705,
		"w+": 578,
		"wx+": 706,
		"xw+": 706,
		"a": 1089,
		"ax": 1217,
		"xa": 1217,
		"a+": 1090,
		"ax+": 1218,
		"xa+": 1218
	},
	modeStringToFlags: function (str) {
		var flags = FS.flagModes[str];
		if (typeof flags === "undefined") {
			throw new Error("Unknown file open mode: " + str)
		}
		return flags
	},
	flagsToPermissionString: function (flag) {
		var perms = ["r", "w", "rw"][flag & 3];
		if (flag & 512) {
			perms += "w"
		}
		return perms
	},
	nodePermissions: function (node, perms) {
		if (FS.ignorePermissions) {
			return 0
		}
		if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
			return 2
		} else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
			return 2
		} else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
			return 2
		}
		return 0
	},
	mayLookup: function (dir) {
		var errCode = FS.nodePermissions(dir, "x");
		if (errCode) return errCode;
		if (!dir.node_ops.lookup) return 2;
		return 0
	},
	mayCreate: function (dir, name) {
		try {
			var node = FS.lookupNode(dir, name);
			return 20
		} catch (e) {}
		return FS.nodePermissions(dir, "wx")
	},
	mayDelete: function (dir, name, isdir) {
		var node;
		try {
			node = FS.lookupNode(dir, name)
		} catch (e) {
			return e.errno
		}
		var errCode = FS.nodePermissions(dir, "wx");
		if (errCode) {
			return errCode
		}
		if (isdir) {
			if (!FS.isDir(node.mode)) {
				return 54
			}
			if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
				return 10
			}
		} else {
			if (FS.isDir(node.mode)) {
				return 31
			}
		}
		return 0
	},
	mayOpen: function (node, flags) {
		if (!node) {
			return 44
		}
		if (FS.isLink(node.mode)) {
			return 32
		} else if (FS.isDir(node.mode)) {
			if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
				return 31
			}
		}
		return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
	},
	MAX_OPEN_FDS: 4096,
	nextfd: function (fd_start, fd_end) {
		fd_start = fd_start || 0;
		fd_end = fd_end || FS.MAX_OPEN_FDS;
		for (var fd = fd_start; fd <= fd_end; fd++) {
			if (!FS.streams[fd]) {
				return fd
			}
		}
		throw new FS.ErrnoError(33)
	},
	getStream: function (fd) {
		return FS.streams[fd]
	},
	createStream: function (stream, fd_start, fd_end) {
		if (!FS.FSStream) {
			FS.FSStream = function () {};
			FS.FSStream.prototype = {
				object: {
					get: function () {
						return this.node
					},
					set: function (val) {
						this.node = val
					}
				},
				isRead: {
					get: function () {
						return (this.flags & 2097155) !== 1
					}
				},
				isWrite: {
					get: function () {
						return (this.flags & 2097155) !== 0
					}
				},
				isAppend: {
					get: function () {
						return this.flags & 1024
					}
				}
			}
		}
		var newStream = new FS.FSStream;
		for (var p in stream) {
			newStream[p] = stream[p]
		}
		stream = newStream;
		var fd = FS.nextfd(fd_start, fd_end);
		stream.fd = fd;
		FS.streams[fd] = stream;
		return stream
	},
	closeStream: function (fd) {
		FS.streams[fd] = null
	},
	chrdev_stream_ops: {
		open: function (stream) {
			var device = FS.getDevice(stream.node.rdev);
			stream.stream_ops = device.stream_ops;
			if (stream.stream_ops.open) {
				stream.stream_ops.open(stream)
			}
		},
		llseek: function () {
			throw new FS.ErrnoError(70)
		}
	},
	major: function (dev) {
		return dev >> 8
	},
	minor: function (dev) {
		return dev & 255
	},
	makedev: function (ma, mi) {
		return ma << 8 | mi
	},
	registerDevice: function (dev, ops) {
		FS.devices[dev] = {
			stream_ops: ops
		}
	},
	getDevice: function (dev) {
		return FS.devices[dev]
	},
	getMounts: function (mount) {
		var mounts = [];
		var check = [mount];
		while (check.length) {
			var m = check.pop();
			mounts.push(m);
			check.push.apply(check, m.mounts)
		}
		return mounts
	},
	syncfs: function (populate, callback) {
		if (typeof populate === "function") {
			callback = populate;
			populate = false
		}
		FS.syncFSRequests++;
		if (FS.syncFSRequests > 1) {
			err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
		}
		var mounts = FS.getMounts(FS.root.mount);
		var completed = 0;

		function doCallback(errCode) {
			FS.syncFSRequests--;
			return callback(errCode)
		}

		function done(errCode) {
			if (errCode) {
				if (!done.errored) {
					done.errored = true;
					return doCallback(errCode)
				}
				return
			}
			if (++completed >= mounts.length) {
				doCallback(null)
			}
		}
		mounts.forEach(function (mount) {
			if (!mount.type.syncfs) {
				return done(null)
			}
			mount.type.syncfs(mount, populate, done)
		})
	},
	mount: function (type, opts, mountpoint) {
		var root = mountpoint === "/";
		var pseudo = !mountpoint;
		var node;
		if (root && FS.root) {
			throw new FS.ErrnoError(10)
		} else if (!root && !pseudo) {
			var lookup = FS.lookupPath(mountpoint, {
				follow_mount: false
			});
			mountpoint = lookup.path;
			node = lookup.node;
			if (FS.isMountpoint(node)) {
				throw new FS.ErrnoError(10)
			}
			if (!FS.isDir(node.mode)) {
				throw new FS.ErrnoError(54)
			}
		}
		var mount = {
			type: type,
			opts: opts,
			mountpoint: mountpoint,
			mounts: []
		};
		var mountRoot = type.mount(mount);
		mountRoot.mount = mount;
		mount.root = mountRoot;
		if (root) {
			FS.root = mountRoot
		} else if (node) {
			node.mounted = mount;
			if (node.mount) {
				node.mount.mounts.push(mount)
			}
		}
		return mountRoot
	},
	unmount: function (mountpoint) {
		var lookup = FS.lookupPath(mountpoint, {
			follow_mount: false
		});
		if (!FS.isMountpoint(lookup.node)) {
			throw new FS.ErrnoError(28)
		}
		var node = lookup.node;
		var mount = node.mounted;
		var mounts = FS.getMounts(mount);
		Object.keys(FS.nameTable).forEach(function (hash) {
			var current = FS.nameTable[hash];
			while (current) {
				var next = current.name_next;
				if (mounts.indexOf(current.mount) !== -1) {
					FS.destroyNode(current)
				}
				current = next
			}
		});
		node.mounted = null;
		var idx = node.mount.mounts.indexOf(mount);
		node.mount.mounts.splice(idx, 1)
	},
	lookup: function (parent, name) {
		return parent.node_ops.lookup(parent, name)
	},
	mknod: function (path, mode, dev) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		if (!name || name === "." || name === "..") {
			throw new FS.ErrnoError(28)
		}
		var errCode = FS.mayCreate(parent, name);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.mknod) {
			throw new FS.ErrnoError(63)
		}
		return parent.node_ops.mknod(parent, name, mode, dev)
	},
	create: function (path, mode) {
		mode = mode !== undefined ? mode : 438;
		mode &= 4095;
		mode |= 32768;
		return FS.mknod(path, mode, 0)
	},
	mkdir: function (path, mode) {
		mode = mode !== undefined ? mode : 511;
		mode &= 511 | 512;
		mode |= 16384;
		return FS.mknod(path, mode, 0)
	},
	mkdirTree: function (path, mode) {
		var dirs = path.split("/");
		var d = "";
		for (var i = 0; i < dirs.length; ++i) {
			if (!dirs[i]) continue;
			d += "/" + dirs[i];
			try {
				FS.mkdir(d, mode)
			} catch (e) {
				if (e.errno != 20) throw e
			}
		}
	},
	mkdev: function (path, mode, dev) {
		if (typeof dev === "undefined") {
			dev = mode;
			mode = 438
		}
		mode |= 8192;
		return FS.mknod(path, mode, dev)
	},
	symlink: function (oldpath, newpath) {
		if (!PATH_FS.resolve(oldpath)) {
			throw new FS.ErrnoError(44)
		}
		var lookup = FS.lookupPath(newpath, {
			parent: true
		});
		var parent = lookup.node;
		if (!parent) {
			throw new FS.ErrnoError(44)
		}
		var newname = PATH.basename(newpath);
		var errCode = FS.mayCreate(parent, newname);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.symlink) {
			throw new FS.ErrnoError(63)
		}
		return parent.node_ops.symlink(parent, newname, oldpath)
	},
	rename: function (old_path, new_path) {
		var old_dirname = PATH.dirname(old_path);
		var new_dirname = PATH.dirname(new_path);
		var old_name = PATH.basename(old_path);
		var new_name = PATH.basename(new_path);
		var lookup, old_dir, new_dir;
		try {
			lookup = FS.lookupPath(old_path, {
				parent: true
			});
			old_dir = lookup.node;
			lookup = FS.lookupPath(new_path, {
				parent: true
			});
			new_dir = lookup.node
		} catch (e) {
			throw new FS.ErrnoError(10)
		}
		if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
		if (old_dir.mount !== new_dir.mount) {
			throw new FS.ErrnoError(75)
		}
		var old_node = FS.lookupNode(old_dir, old_name);
		var relative = PATH_FS.relative(old_path, new_dirname);
		if (relative.charAt(0) !== ".") {
			throw new FS.ErrnoError(28)
		}
		relative = PATH_FS.relative(new_path, old_dirname);
		if (relative.charAt(0) !== ".") {
			throw new FS.ErrnoError(55)
		}
		var new_node;
		try {
			new_node = FS.lookupNode(new_dir, new_name)
		} catch (e) {}
		if (old_node === new_node) {
			return
		}
		var isdir = FS.isDir(old_node.mode);
		var errCode = FS.mayDelete(old_dir, old_name, isdir);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!old_dir.node_ops.rename) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
			throw new FS.ErrnoError(10)
		}
		if (new_dir !== old_dir) {
			errCode = FS.nodePermissions(old_dir, "w");
			if (errCode) {
				throw new FS.ErrnoError(errCode)
			}
		}
		try {
			if (FS.trackingDelegate["willMovePath"]) {
				FS.trackingDelegate["willMovePath"](old_path, new_path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
		}
		FS.hashRemoveNode(old_node);
		try {
			old_dir.node_ops.rename(old_node, new_dir, new_name)
		} catch (e) {
			throw e
		} finally {
			FS.hashAddNode(old_node)
		}
		try {
			if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path)
		} catch (e) {
			err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
		}
	},
	rmdir: function (path) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		var node = FS.lookupNode(parent, name);
		var errCode = FS.mayDelete(parent, name, true);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.rmdir) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(node)) {
			throw new FS.ErrnoError(10)
		}
		try {
			if (FS.trackingDelegate["willDeletePath"]) {
				FS.trackingDelegate["willDeletePath"](path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
		}
		parent.node_ops.rmdir(parent, name);
		FS.destroyNode(node);
		try {
			if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path)
		} catch (e) {
			err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
		}
	},
	readdir: function (path) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		var node = lookup.node;
		if (!node.node_ops.readdir) {
			throw new FS.ErrnoError(54)
		}
		return node.node_ops.readdir(node)
	},
	unlink: function (path) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		var node = FS.lookupNode(parent, name);
		var errCode = FS.mayDelete(parent, name, false);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.unlink) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(node)) {
			throw new FS.ErrnoError(10)
		}
		try {
			if (FS.trackingDelegate["willDeletePath"]) {
				FS.trackingDelegate["willDeletePath"](path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
		}
		parent.node_ops.unlink(parent, name);
		FS.destroyNode(node);
		try {
			if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path)
		} catch (e) {
			err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
		}
	},
	readlink: function (path) {
		var lookup = FS.lookupPath(path);
		var link = lookup.node;
		if (!link) {
			throw new FS.ErrnoError(44)
		}
		if (!link.node_ops.readlink) {
			throw new FS.ErrnoError(28)
		}
		return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
	},
	stat: function (path, dontFollow) {
		var lookup = FS.lookupPath(path, {
			follow: !dontFollow
		});
		var node = lookup.node;
		if (!node) {
			throw new FS.ErrnoError(44)
		}
		if (!node.node_ops.getattr) {
			throw new FS.ErrnoError(63)
		}
		return node.node_ops.getattr(node)
	},
	lstat: function (path) {
		return FS.stat(path, true)
	},
	chmod: function (path, mode, dontFollow) {
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: !dontFollow
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		node.node_ops.setattr(node, {
			mode: mode & 4095 | node.mode & ~4095,
			timestamp: Date.now()
		})
	},
	lchmod: function (path, mode) {
		FS.chmod(path, mode, true)
	},
	fchmod: function (fd, mode) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		FS.chmod(stream.node, mode)
	},
	chown: function (path, uid, gid, dontFollow) {
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: !dontFollow
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		node.node_ops.setattr(node, {
			timestamp: Date.now()
		})
	},
	lchown: function (path, uid, gid) {
		FS.chown(path, uid, gid, true)
	},
	fchown: function (fd, uid, gid) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		FS.chown(stream.node, uid, gid)
	},
	truncate: function (path, len) {
		if (len < 0) {
			throw new FS.ErrnoError(28)
		}
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: true
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isDir(node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!FS.isFile(node.mode)) {
			throw new FS.ErrnoError(28)
		}
		var errCode = FS.nodePermissions(node, "w");
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		node.node_ops.setattr(node, {
			size: len,
			timestamp: Date.now()
		})
	},
	ftruncate: function (fd, len) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(28)
		}
		FS.truncate(stream.node, len)
	},
	utime: function (path, atime, mtime) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		var node = lookup.node;
		node.node_ops.setattr(node, {
			timestamp: Math.max(atime, mtime)
		})
	},
	open: function (path, flags, mode, fd_start, fd_end) {
		if (path === "") {
			throw new FS.ErrnoError(44)
		}
		flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
		mode = typeof mode === "undefined" ? 438 : mode;
		if (flags & 64) {
			mode = mode & 4095 | 32768
		} else {
			mode = 0
		}
		var node;
		if (typeof path === "object") {
			node = path
		} else {
			path = PATH.normalize(path);
			try {
				var lookup = FS.lookupPath(path, {
					follow: !(flags & 131072)
				});
				node = lookup.node
			} catch (e) {}
		}
		var created = false;
		if (flags & 64) {
			if (node) {
				if (flags & 128) {
					throw new FS.ErrnoError(20)
				}
			} else {
				node = FS.mknod(path, mode, 0);
				created = true
			}
		}
		if (!node) {
			throw new FS.ErrnoError(44)
		}
		if (FS.isChrdev(node.mode)) {
			flags &= ~512
		}
		if (flags & 65536 && !FS.isDir(node.mode)) {
			throw new FS.ErrnoError(54)
		}
		if (!created) {
			var errCode = FS.mayOpen(node, flags);
			if (errCode) {
				throw new FS.ErrnoError(errCode)
			}
		}
		if (flags & 512) {
			FS.truncate(node, 0)
		}
		flags &= ~(128 | 512 | 131072);
		var stream = FS.createStream({
			node: node,
			path: FS.getPath(node),
			flags: flags,
			seekable: true,
			position: 0,
			stream_ops: node.stream_ops,
			ungotten: [],
			error: false
		}, fd_start, fd_end);
		if (stream.stream_ops.open) {
			stream.stream_ops.open(stream)
		}
		if (Module["logReadFiles"] && !(flags & 1)) {
			if (!FS.readFiles) FS.readFiles = {};
			if (!(path in FS.readFiles)) {
				FS.readFiles[path] = 1;
				err("FS.trackingDelegate error on read file: " + path)
			}
		}
		try {
			if (FS.trackingDelegate["onOpenFile"]) {
				var trackingFlags = 0;
				if ((flags & 2097155) !== 1) {
					trackingFlags |= FS.tracking.openFlags.READ
				}
				if ((flags & 2097155) !== 0) {
					trackingFlags |= FS.tracking.openFlags.WRITE
				}
				FS.trackingDelegate["onOpenFile"](path, trackingFlags)
			}
		} catch (e) {
			err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message)
		}
		return stream
	},
	close: function (stream) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (stream.getdents) stream.getdents = null;
		try {
			if (stream.stream_ops.close) {
				stream.stream_ops.close(stream)
			}
		} catch (e) {
			throw e
		} finally {
			FS.closeStream(stream.fd)
		}
		stream.fd = null
	},
	isClosed: function (stream) {
		return stream.fd === null
	},
	llseek: function (stream, offset, whence) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (!stream.seekable || !stream.stream_ops.llseek) {
			throw new FS.ErrnoError(70)
		}
		if (whence != 0 && whence != 1 && whence != 2) {
			throw new FS.ErrnoError(28)
		}
		stream.position = stream.stream_ops.llseek(stream, offset, whence);
		stream.ungotten = [];
		return stream.position
	},
	read: function (stream, buffer, offset, length, position) {
		if (length < 0 || position < 0) {
			throw new FS.ErrnoError(28)
		}
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 1) {
			throw new FS.ErrnoError(8)
		}
		if (FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!stream.stream_ops.read) {
			throw new FS.ErrnoError(28)
		}
		var seeking = typeof position !== "undefined";
		if (!seeking) {
			position = stream.position
		} else if (!stream.seekable) {
			throw new FS.ErrnoError(70)
		}
		var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
		if (!seeking) stream.position += bytesRead;
		return bytesRead
	},
	write: function (stream, buffer, offset, length, position, canOwn) {
		if (length < 0 || position < 0) {
			throw new FS.ErrnoError(28)
		}
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(8)
		}
		if (FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!stream.stream_ops.write) {
			throw new FS.ErrnoError(28)
		}
		if (stream.seekable && stream.flags & 1024) {
			FS.llseek(stream, 0, 2)
		}
		var seeking = typeof position !== "undefined";
		if (!seeking) {
			position = stream.position
		} else if (!stream.seekable) {
			throw new FS.ErrnoError(70)
		}
		var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
		if (!seeking) stream.position += bytesWritten;
		try {
			if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path)
		} catch (e) {
			err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message)
		}
		return bytesWritten
	},
	allocate: function (stream, offset, length) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (offset < 0 || length <= 0) {
			throw new FS.ErrnoError(28)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(8)
		}
		if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(43)
		}
		if (!stream.stream_ops.allocate) {
			throw new FS.ErrnoError(138)
		}
		stream.stream_ops.allocate(stream, offset, length)
	},
	mmap: function (stream, address, length, position, prot, flags) {
		if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
			throw new FS.ErrnoError(2)
		}
		if ((stream.flags & 2097155) === 1) {
			throw new FS.ErrnoError(2)
		}
		if (!stream.stream_ops.mmap) {
			throw new FS.ErrnoError(43)
		}
		return stream.stream_ops.mmap(stream, address, length, position, prot, flags)
	},
	msync: function (stream, buffer, offset, length, mmapFlags) {
		if (!stream || !stream.stream_ops.msync) {
			return 0
		}
		return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
	},
	munmap: function (stream) {
		return 0
	},
	ioctl: function (stream, cmd, arg) {
		if (!stream.stream_ops.ioctl) {
			throw new FS.ErrnoError(59)
		}
		return stream.stream_ops.ioctl(stream, cmd, arg)
	},
	readFile: function (path, opts) {
		opts = opts || {};
		opts.flags = opts.flags || "r";
		opts.encoding = opts.encoding || "binary";
		if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
			throw new Error('Invalid encoding type "' + opts.encoding + '"')
		}
		var ret;
		var stream = FS.open(path, opts.flags);
		var stat = FS.stat(path);
		var length = stat.size;
		var buf = new Uint8Array(length);
		FS.read(stream, buf, 0, length, 0);
		if (opts.encoding === "utf8") {
			ret = UTF8ArrayToString(buf, 0)
		} else if (opts.encoding === "binary") {
			ret = buf
		}
		FS.close(stream);
		return ret
	},
	writeFile: function (path, data, opts) {
		opts = opts || {};
		opts.flags = opts.flags || "w";
		var stream = FS.open(path, opts.flags, opts.mode);
		if (typeof data === "string") {
			var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
			var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
			FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
		} else if (ArrayBuffer.isView(data)) {
			FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
		} else {
			throw new Error("Unsupported data type")
		}
		FS.close(stream)
	},
	cwd: function () {
		return FS.currentPath
	},
	chdir: function (path) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		if (lookup.node === null) {
			throw new FS.ErrnoError(44)
		}
		if (!FS.isDir(lookup.node.mode)) {
			throw new FS.ErrnoError(54)
		}
		var errCode = FS.nodePermissions(lookup.node, "x");
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		FS.currentPath = lookup.path
	},
	createDefaultDirectories: function () {
		FS.mkdir("/tmp");
		FS.mkdir("/home");
		FS.mkdir("/home/web_user")
	},
	createDefaultDevices: function () {
		FS.mkdir("/dev");
		FS.registerDevice(FS.makedev(1, 3), {
			read: function () {
				return 0
			},
			write: function (stream, buffer, offset, length, pos) {
				return length
			}
		});
		FS.mkdev("/dev/null", FS.makedev(1, 3));
		TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
		TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
		FS.mkdev("/dev/tty", FS.makedev(5, 0));
		FS.mkdev("/dev/tty1", FS.makedev(6, 0));
		var random_device;
		if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
			var randomBuffer = new Uint8Array(1);
			random_device = function () {
				crypto.getRandomValues(randomBuffer);
				return randomBuffer[0]
			}
		} else if (ENVIRONMENT_IS_NODE) {
			try {
				var crypto_module = require("crypto");
				random_device = function () {
					return crypto_module["randomBytes"](1)[0]
				}
			} catch (e) {}
		} else {}
		if (!random_device) {
			random_device = function () {
				abort("random_device")
			}
		}
		FS.createDevice("/dev", "random", random_device);
		FS.createDevice("/dev", "urandom", random_device);
		FS.mkdir("/dev/shm");
		FS.mkdir("/dev/shm/tmp")
	},
	createSpecialDirectories: function () {
		FS.mkdir("/proc");
		FS.mkdir("/proc/self");
		FS.mkdir("/proc/self/fd");
		FS.mount({
			mount: function () {
				var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
				node.node_ops = {
					lookup: function (parent, name) {
						var fd = +name;
						var stream = FS.getStream(fd);
						if (!stream) throw new FS.ErrnoError(8);
						var ret = {
							parent: null,
							mount: {
								mountpoint: "fake"
							},
							node_ops: {
								readlink: function () {
									return stream.path
								}
							}
						};
						ret.parent = ret;
						return ret
					}
				};
				return node
			}
		}, {}, "/proc/self/fd")
	},
	createStandardStreams: function () {
		if (Module["stdin"]) {
			FS.createDevice("/dev", "stdin", Module["stdin"])
		} else {
			FS.symlink("/dev/tty", "/dev/stdin")
		}
		if (Module["stdout"]) {
			FS.createDevice("/dev", "stdout", null, Module["stdout"])
		} else {
			FS.symlink("/dev/tty", "/dev/stdout")
		}
		if (Module["stderr"]) {
			FS.createDevice("/dev", "stderr", null, Module["stderr"])
		} else {
			FS.symlink("/dev/tty1", "/dev/stderr")
		}
		var stdin = FS.open("/dev/stdin", "r");
		var stdout = FS.open("/dev/stdout", "w");
		var stderr = FS.open("/dev/stderr", "w")
	},
	ensureErrnoError: function () {
		if (FS.ErrnoError) return;
		FS.ErrnoError = function ErrnoError(errno, node) {
			this.node = node;
			this.setErrno = function (errno) {
				this.errno = errno
			};
			this.setErrno(errno);
			this.message = "FS error"
		};
		FS.ErrnoError.prototype = new Error;
		FS.ErrnoError.prototype.constructor = FS.ErrnoError;
		[44].forEach(function (code) {
			FS.genericErrors[code] = new FS.ErrnoError(code);
			FS.genericErrors[code].stack = "<generic error, no stack>"
		})
	},
	staticInit: function () {
		FS.ensureErrnoError();
		FS.nameTable = new Array(4096);
		FS.mount(MEMFS, {}, "/");
		FS.createDefaultDirectories();
		FS.createDefaultDevices();
		FS.createSpecialDirectories();
		FS.filesystems = {
			"MEMFS": MEMFS,
			"IDBFS": IDBFS
		}
	},
	init: function (input, output, error) {
		FS.init.initialized = true;
		FS.ensureErrnoError();
		Module["stdin"] = input || Module["stdin"];
		Module["stdout"] = output || Module["stdout"];
		Module["stderr"] = error || Module["stderr"];
		FS.createStandardStreams()
	},
	quit: function () {
		FS.init.initialized = false;
		var fflush = Module["_fflush"];
		if (fflush) fflush(0);
		for (var i = 0; i < FS.streams.length; i++) {
			var stream = FS.streams[i];
			if (!stream) {
				continue
			}
			FS.close(stream)
		}
	},
	getMode: function (canRead, canWrite) {
		var mode = 0;
		if (canRead) mode |= 292 | 73;
		if (canWrite) mode |= 146;
		return mode
	},
	joinPath: function (parts, forceRelative) {
		var path = PATH.join.apply(null, parts);
		if (forceRelative && path[0] == "/") path = path.substr(1);
		return path
	},
	absolutePath: function (relative, base) {
		return PATH_FS.resolve(base, relative)
	},
	standardizePath: function (path) {
		return PATH.normalize(path)
	},
	findObject: function (path, dontResolveLastLink) {
		var ret = FS.analyzePath(path, dontResolveLastLink);
		if (ret.exists) {
			return ret.object
		} else {
			setErrNo(ret.error);
			return null
		}
	},
	analyzePath: function (path, dontResolveLastLink) {
		try {
			var lookup = FS.lookupPath(path, {
				follow: !dontResolveLastLink
			});
			path = lookup.path
		} catch (e) {}
		var ret = {
			isRoot: false,
			exists: false,
			error: 0,
			name: null,
			path: null,
			object: null,
			parentExists: false,
			parentPath: null,
			parentObject: null
		};
		try {
			var lookup = FS.lookupPath(path, {
				parent: true
			});
			ret.parentExists = true;
			ret.parentPath = lookup.path;
			ret.parentObject = lookup.node;
			ret.name = PATH.basename(path);
			lookup = FS.lookupPath(path, {
				follow: !dontResolveLastLink
			});
			ret.exists = true;
			ret.path = lookup.path;
			ret.object = lookup.node;
			ret.name = lookup.node.name;
			ret.isRoot = lookup.path === "/"
		} catch (e) {
			ret.error = e.errno
		}
		return ret
	},
	createFolder: function (parent, name, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(canRead, canWrite);
		return FS.mkdir(path, mode)
	},
	createPath: function (parent, path, canRead, canWrite) {
		parent = typeof parent === "string" ? parent : FS.getPath(parent);
		var parts = path.split("/").reverse();
		while (parts.length) {
			var part = parts.pop();
			if (!part) continue;
			var current = PATH.join2(parent, part);
			try {
				FS.mkdir(current)
			} catch (e) {}
			parent = current
		}
		return current
	},
	createFile: function (parent, name, properties, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(canRead, canWrite);
		return FS.create(path, mode)
	},
	createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
		var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
		var mode = FS.getMode(canRead, canWrite);
		var node = FS.create(path, mode);
		if (data) {
			if (typeof data === "string") {
				var arr = new Array(data.length);
				for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
				data = arr
			}
			FS.chmod(node, mode | 146);
			var stream = FS.open(node, "w");
			FS.write(stream, data, 0, data.length, 0, canOwn);
			FS.close(stream);
			FS.chmod(node, mode)
		}
		return node
	},
	createDevice: function (parent, name, input, output) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(!!input, !!output);
		if (!FS.createDevice.major) FS.createDevice.major = 64;
		var dev = FS.makedev(FS.createDevice.major++, 0);
		FS.registerDevice(dev, {
			open: function (stream) {
				stream.seekable = false
			},
			close: function (stream) {
				if (output && output.buffer && output.buffer.length) {
					output(10)
				}
			},
			read: function (stream, buffer, offset, length, pos) {
				var bytesRead = 0;
				for (var i = 0; i < length; i++) {
					var result;
					try {
						result = input()
					} catch (e) {
						throw new FS.ErrnoError(29)
					}
					if (result === undefined && bytesRead === 0) {
						throw new FS.ErrnoError(6)
					}
					if (result === null || result === undefined) break;
					bytesRead++;
					buffer[offset + i] = result
				}
				if (bytesRead) {
					stream.node.timestamp = Date.now()
				}
				return bytesRead
			},
			write: function (stream, buffer, offset, length, pos) {
				for (var i = 0; i < length; i++) {
					try {
						output(buffer[offset + i])
					} catch (e) {
						throw new FS.ErrnoError(29)
					}
				}
				if (length) {
					stream.node.timestamp = Date.now()
				}
				return i
			}
		});
		return FS.mkdev(path, mode, dev)
	},
	createLink: function (parent, name, target, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		return FS.symlink(target, path)
	},
	forceLoadFile: function (obj) {
		if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
		var success = true;
		if (typeof XMLHttpRequest !== "undefined") {
			throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
		} else if (read_) {
			try {
				obj.contents = intArrayFromString(read_(obj.url), true);
				obj.usedBytes = obj.contents.length
			} catch (e) {
				success = false
			}
		} else {
			throw new Error("Cannot load without read() or XMLHttpRequest.")
		}
		if (!success) setErrNo(29);
		return success
	},
	createLazyFile: function (parent, name, url, canRead, canWrite) {
		function LazyUint8Array() {
			this.lengthKnown = false;
			this.chunks = []
		}
		LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
			if (idx > this.length - 1 || idx < 0) {
				return undefined
			}
			var chunkOffset = idx % this.chunkSize;
			var chunkNum = idx / this.chunkSize | 0;
			return this.getter(chunkNum)[chunkOffset]
		};
		LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
			this.getter = getter
		};
		LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
			var xhr = new XMLHttpRequest;
			xhr.open("HEAD", url, false);
			xhr.send(null);
			if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
			var datalength = Number(xhr.getResponseHeader("Content-length"));
			var header;
			var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
			var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
			var chunkSize = 1024 * 1024;
			if (!hasByteServing) chunkSize = datalength;
			var doXHR = function (from, to) {
				if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
				if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, false);
				if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
				if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
				if (xhr.overrideMimeType) {
					xhr.overrideMimeType("text/plain; charset=x-user-defined")
				}
				xhr.send(null);
				if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
				if (xhr.response !== undefined) {
					return new Uint8Array(xhr.response || [])
				} else {
					return intArrayFromString(xhr.responseText || "", true)
				}
			};
			var lazyArray = this;
			lazyArray.setDataGetter(function (chunkNum) {
				var start = chunkNum * chunkSize;
				var end = (chunkNum + 1) * chunkSize - 1;
				end = Math.min(end, datalength - 1);
				if (typeof lazyArray.chunks[chunkNum] === "undefined") {
					lazyArray.chunks[chunkNum] = doXHR(start, end)
				}
				if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
				return lazyArray.chunks[chunkNum]
			});
			if (usesGzip || !datalength) {
				chunkSize = datalength = 1;
				datalength = this.getter(0).length;
				chunkSize = datalength;
				out("LazyFiles on gzip forces download of the whole file when length is accessed")
			}
			this._length = datalength;
			this._chunkSize = chunkSize;
			this.lengthKnown = true
		};
		if (typeof XMLHttpRequest !== "undefined") {
			if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
			var lazyArray = new LazyUint8Array;
			Object.defineProperties(lazyArray, {
				length: {
					get: function () {
						if (!this.lengthKnown) {
							this.cacheLength()
						}
						return this._length
					}
				},
				chunkSize: {
					get: function () {
						if (!this.lengthKnown) {
							this.cacheLength()
						}
						return this._chunkSize
					}
				}
			});
			var properties = {
				isDevice: false,
				contents: lazyArray
			}
		} else {
			var properties = {
				isDevice: false,
				url: url
			}
		}
		var node = FS.createFile(parent, name, properties, canRead, canWrite);
		if (properties.contents) {
			node.contents = properties.contents
		} else if (properties.url) {
			node.contents = null;
			node.url = properties.url
		}
		Object.defineProperties(node, {
			usedBytes: {
				get: function () {
					return this.contents.length
				}
			}
		});
		var stream_ops = {};
		var keys = Object.keys(node.stream_ops);
		keys.forEach(function (key) {
			var fn = node.stream_ops[key];
			stream_ops[key] = function forceLoadLazyFile() {
				if (!FS.forceLoadFile(node)) {
					throw new FS.ErrnoError(29)
				}
				return fn.apply(null, arguments)
			}
		});
		stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
			if (!FS.forceLoadFile(node)) {
				throw new FS.ErrnoError(29)
			}
			var contents = stream.node.contents;
			if (position >= contents.length) return 0;
			var size = Math.min(contents.length - position, length);
			if (contents.slice) {
				for (var i = 0; i < size; i++) {
					buffer[offset + i] = contents[position + i]
				}
			} else {
				for (var i = 0; i < size; i++) {
					buffer[offset + i] = contents.get(position + i)
				}
			}
			return size
		};
		node.stream_ops = stream_ops;
		return node
	},
	createPreloadedFile: function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
		Browser.init();
		var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
		var dep = getUniqueRunDependency("cp " + fullname);

		function processData(byteArray) {
			function finish(byteArray) {
				if (preFinish) preFinish();
				if (!dontCreateFile) {
					FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
				}
				if (onload) onload();
				removeRunDependency(dep)
			}
			var handled = false;
			Module["preloadPlugins"].forEach(function (plugin) {
				if (handled) return;
				if (plugin["canHandle"](fullname)) {
					plugin["handle"](byteArray, fullname, finish, function () {
						if (onerror) onerror();
						removeRunDependency(dep)
					});
					handled = true
				}
			});
			if (!handled) finish(byteArray)
		}
		addRunDependency(dep);
		if (typeof url == "string") {
			Browser.asyncLoad(url, function (byteArray) {
				processData(byteArray)
			}, onerror)
		} else {
			processData(url)
		}
	},
	indexedDB: function () {
		return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
	},
	DB_NAME: function () {
		return "EM_FS_" + window.location.pathname
	},
	DB_VERSION: 20,
	DB_STORE_NAME: "FILE_DATA",
	saveFilesToDB: function (paths, onload, onerror) {
		onload = onload || function () {};
		onerror = onerror || function () {};
		var indexedDB = FS.indexedDB();
		try {
			var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
		} catch (e) {
			return onerror(e)
		}
		openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
			out("creating db");
			var db = openRequest.result;
			db.createObjectStore(FS.DB_STORE_NAME)
		};
		openRequest.onsuccess = function openRequest_onsuccess() {
			var db = openRequest.result;
			var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
			var files = transaction.objectStore(FS.DB_STORE_NAME);
			var ok = 0,
				fail = 0,
				total = paths.length;

			function finish() {
				if (fail == 0) onload();
				else onerror()
			}
			paths.forEach(function (path) {
				var putRequest = files.put(FS.analyzePath(path).object.contents, path);
				putRequest.onsuccess = function putRequest_onsuccess() {
					ok++;
					if (ok + fail == total) finish()
				};
				putRequest.onerror = function putRequest_onerror() {
					fail++;
					if (ok + fail == total) finish()
				}
			});
			transaction.onerror = onerror
		};
		openRequest.onerror = onerror
	},
	loadFilesFromDB: function (paths, onload, onerror) {
		onload = onload || function () {};
		onerror = onerror || function () {};
		var indexedDB = FS.indexedDB();
		try {
			var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
		} catch (e) {
			return onerror(e)
		}
		openRequest.onupgradeneeded = onerror;
		openRequest.onsuccess = function openRequest_onsuccess() {
			var db = openRequest.result;
			try {
				var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
			} catch (e) {
				onerror(e);
				return
			}
			var files = transaction.objectStore(FS.DB_STORE_NAME);
			var ok = 0,
				fail = 0,
				total = paths.length;

			function finish() {
				if (fail == 0) onload();
				else onerror()
			}
			paths.forEach(function (path) {
				var getRequest = files.get(path);
				getRequest.onsuccess = function getRequest_onsuccess() {
					if (FS.analyzePath(path).exists) {
						FS.unlink(path)
					}
					FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
					ok++;
					if (ok + fail == total) finish()
				};
				getRequest.onerror = function getRequest_onerror() {
					fail++;
					if (ok + fail == total) finish()
				}
			});
			transaction.onerror = onerror
		};
		openRequest.onerror = onerror
	},
	mmapAlloc: function (size) {
		var alignedSize = alignMemory(size, 16384);
		var ptr = _malloc(alignedSize);
		while (size < alignedSize) HEAP8[ptr + size++] = 0;
		return ptr
	}
};
var SYSCALLS = {
	mappings: {},
	DEFAULT_POLLMASK: 5,
	umask: 511,
	calculateAt: function (dirfd, path) {
		if (path[0] !== "/") {
			var dir;
			if (dirfd === -100) {
				dir = FS.cwd()
			} else {
				var dirstream = FS.getStream(dirfd);
				if (!dirstream) throw new FS.ErrnoError(8);
				dir = dirstream.path
			}
			path = PATH.join2(dir, path)
		}
		return path
	},
	doStat: function (func, path, buf) {
		try {
			var stat = func(path)
		} catch (e) {
			if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
				return -54
			}
			throw e
		}
		HEAP32[buf >> 2] = stat.dev;
		HEAP32[buf + 4 >> 2] = 0;
		HEAP32[buf + 8 >> 2] = stat.ino;
		HEAP32[buf + 12 >> 2] = stat.mode;
		HEAP32[buf + 16 >> 2] = stat.nlink;
		HEAP32[buf + 20 >> 2] = stat.uid;
		HEAP32[buf + 24 >> 2] = stat.gid;
		HEAP32[buf + 28 >> 2] = stat.rdev;
		HEAP32[buf + 32 >> 2] = 0;
		tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
		HEAP32[buf + 48 >> 2] = 4096;
		HEAP32[buf + 52 >> 2] = stat.blocks;
		HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
		HEAP32[buf + 60 >> 2] = 0;
		HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
		HEAP32[buf + 68 >> 2] = 0;
		HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
		HEAP32[buf + 76 >> 2] = 0;
		tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
		return 0
	},
	doMsync: function (addr, stream, len, flags, offset) {
		var buffer = HEAPU8.slice(addr, addr + len);
		FS.msync(stream, buffer, offset, len, flags)
	},
	doMkdir: function (path, mode) {
		path = PATH.normalize(path);
		if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
		FS.mkdir(path, mode, 0);
		return 0
	},
	doMknod: function (path, mode, dev) {
		switch (mode & 61440) {
			case 32768:
			case 8192:
			case 24576:
			case 4096:
			case 49152:
				break;
			default:
				return -28
		}
		FS.mknod(path, mode, dev);
		return 0
	},
	doReadlink: function (path, buf, bufsize) {
		if (bufsize <= 0) return -28;
		var ret = FS.readlink(path);
		var len = Math.min(bufsize, lengthBytesUTF8(ret));
		var endChar = HEAP8[buf + len];
		stringToUTF8(ret, buf, bufsize + 1);
		HEAP8[buf + len] = endChar;
		return len
	},
	doAccess: function (path, amode) {
		if (amode & ~7) {
			return -28
		}
		var node;
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		node = lookup.node;
		if (!node) {
			return -44
		}
		var perms = "";
		if (amode & 4) perms += "r";
		if (amode & 2) perms += "w";
		if (amode & 1) perms += "x";
		if (perms && FS.nodePermissions(node, perms)) {
			return -2
		}
		return 0
	},
	doDup: function (path, flags, suggestFD) {
		var suggest = FS.getStream(suggestFD);
		if (suggest) FS.close(suggest);
		return FS.open(path, flags, 0, suggestFD, suggestFD).fd
	},
	doReadv: function (stream, iov, iovcnt, offset) {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAP32[iov + i * 8 >> 2];
			var len = HEAP32[iov + (i * 8 + 4) >> 2];
			var curr = FS.read(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break
		}
		return ret
	},
	doWritev: function (stream, iov, iovcnt, offset) {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAP32[iov + i * 8 >> 2];
			var len = HEAP32[iov + (i * 8 + 4) >> 2];
			var curr = FS.write(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr
		}
		return ret
	},
	varargs: undefined,
	get: function () {
		SYSCALLS.varargs += 4;
		var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
		return ret
	},
	getStr: function (ptr) {
		var ret = UTF8ToString(ptr);
		return ret
	},
	getStreamFromFD: function (fd) {
		var stream = FS.getStream(fd);
		if (!stream) throw new FS.ErrnoError(8);
		return stream
	},
	get64: function (low, high) {
		return low
	}
};

function ___sys_unlink(path) {
	try {
		path = SYSCALLS.getStr(path);
		FS.unlink(path);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall10(a0) {
	return ___sys_unlink(a0)
}

function ___sys_truncate64(path, zero, low, high) {
	try {
		path = SYSCALLS.getStr(path);
		var length = SYSCALLS.get64(low, high);
		FS.truncate(path, length);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall193(a0, a1, a2, a3) {
	return ___sys_truncate64(a0, a1, a2, a3)
}

function ___sys_stat64(path, buf) {
	try {
		path = SYSCALLS.getStr(path);
		return SYSCALLS.doStat(FS.stat, path, buf)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall195(a0, a1) {
	return ___sys_stat64(a0, a1)
}

function ___sys_lstat64(path, buf) {
	try {
		path = SYSCALLS.getStr(path);
		return SYSCALLS.doStat(FS.lstat, path, buf)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall196(a0, a1) {
	return ___sys_lstat64(a0, a1)
}

function ___sys_fstat64(fd, buf) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		return SYSCALLS.doStat(FS.stat, stream.path, buf)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall197(a0, a1) {
	return ___sys_fstat64(a0, a1)
}

function ___sys_getegid32() {
	return 0
}

function ___sys_getuid32() {
	return ___sys_getegid32()
}

function ___syscall199() {
	return ___sys_getuid32()
}

function ___sys_getpid() {
	return 42
}

function ___syscall20() {
	return ___sys_getpid()
}

function ___sys_getgid32() {
	return ___sys_getegid32()
}

function ___syscall200() {
	return ___sys_getgid32()
}

function ___sys_geteuid32() {
	return ___sys_getegid32()
}

function ___syscall201() {
	return ___sys_geteuid32()
}

function ___syscall202() {
	return ___sys_getegid32()
}

function ___sys_getdents64(fd, dirp, count) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		if (!stream.getdents) {
			stream.getdents = FS.readdir(stream.path)
		}
		var struct_size = 280;
		var pos = 0;
		var off = FS.llseek(stream, 0, 1);
		var idx = Math.floor(off / struct_size);
		while (idx < stream.getdents.length && pos + struct_size <= count) {
			var id;
			var type;
			var name = stream.getdents[idx];
			if (name[0] === ".") {
				id = 1;
				type = 4
			} else {
				var child = FS.lookupNode(stream.node, name);
				id = child.id;
				type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8
			}
			tempI64 = [id >>> 0, (tempDouble = id, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
			tempI64 = [(idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
			HEAP16[dirp + pos + 16 >> 1] = 280;
			HEAP8[dirp + pos + 18 >> 0] = type;
			stringToUTF8(name, dirp + pos + 19, 256);
			pos += struct_size;
			idx += 1
		}
		FS.llseek(stream, idx * struct_size, 0);
		return pos
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall220(a0, a1, a2) {
	return ___sys_getdents64(a0, a1, a2)
}

function ___sys_fcntl64(fd, cmd, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		switch (cmd) {
			case 0:
				{
					var arg = SYSCALLS.get();
					if (arg < 0) {
						return -28
					}
					var newStream;newStream = FS.open(stream.path, stream.flags, 0, arg);
					return newStream.fd
				}
			case 1:
			case 2:
				return 0;
			case 3:
				return stream.flags;
			case 4:
				{
					var arg = SYSCALLS.get();stream.flags |= arg;
					return 0
				}
			case 12:
				{
					var arg = SYSCALLS.get();
					var offset = 0;HEAP16[arg + offset >> 1] = 2;
					return 0
				}
			case 13:
			case 14:
				return 0;
			case 16:
			case 8:
				return -28;
			case 9:
				setErrNo(28);
				return -1;
			default:
				{
					return -28
				}
		}
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall221(a0, a1, a2) {
	return ___sys_fcntl64(a0, a1, a2)
}

function ___sys_statfs64(path, size, buf) {
	try {
		path = SYSCALLS.getStr(path);
		HEAP32[buf + 4 >> 2] = 4096;
		HEAP32[buf + 40 >> 2] = 4096;
		HEAP32[buf + 8 >> 2] = 1e6;
		HEAP32[buf + 12 >> 2] = 5e5;
		HEAP32[buf + 16 >> 2] = 5e5;
		HEAP32[buf + 20 >> 2] = FS.nextInode;
		HEAP32[buf + 24 >> 2] = 1e6;
		HEAP32[buf + 28 >> 2] = 42;
		HEAP32[buf + 44 >> 2] = 2;
		HEAP32[buf + 36 >> 2] = 255;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall268(a0, a1, a2) {
	return ___sys_statfs64(a0, a1, a2)
}

function ___sys_read(fd, buf, count) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		return FS.read(stream, HEAP8, buf, count)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall3(a0, a1, a2) {
	return ___sys_read(a0, a1, a2)
}

function ___sys_access(path, amode) {
	try {
		path = SYSCALLS.getStr(path);
		return SYSCALLS.doAccess(path, amode)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall33(a0, a1) {
	return ___sys_access(a0, a1)
}

function ___sys_rename(old_path, new_path) {
	try {
		old_path = SYSCALLS.getStr(old_path);
		new_path = SYSCALLS.getStr(new_path);
		FS.rename(old_path, new_path);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall38(a0, a1) {
	return ___sys_rename(a0, a1)
}

function ___sys_mkdir(path, mode) {
	try {
		path = SYSCALLS.getStr(path);
		return SYSCALLS.doMkdir(path, mode)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall39(a0, a1) {
	return ___sys_mkdir(a0, a1)
}

function ___sys_rmdir(path) {
	try {
		path = SYSCALLS.getStr(path);
		FS.rmdir(path);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall40(a0) {
	return ___sys_rmdir(a0)
}

function ___sys_open(path, flags, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var pathname = SYSCALLS.getStr(path);
		var mode = SYSCALLS.get();
		var stream = FS.open(pathname, flags, mode);
		return stream.fd
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall5(a0, a1, a2) {
	return ___sys_open(a0, a1, a2)
}

function ___sys_ioctl(fd, op, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		switch (op) {
			case 21509:
			case 21505:
				{
					if (!stream.tty) return -59;
					return 0
				}
			case 21510:
			case 21511:
			case 21512:
			case 21506:
			case 21507:
			case 21508:
				{
					if (!stream.tty) return -59;
					return 0
				}
			case 21519:
				{
					if (!stream.tty) return -59;
					var argp = SYSCALLS.get();HEAP32[argp >> 2] = 0;
					return 0
				}
			case 21520:
				{
					if (!stream.tty) return -59;
					return -28
				}
			case 21531:
				{
					var argp = SYSCALLS.get();
					return FS.ioctl(stream, op, argp)
				}
			case 21523:
				{
					if (!stream.tty) return -59;
					return 0
				}
			case 21524:
				{
					if (!stream.tty) return -59;
					return 0
				}
			default:
				abort("bad ioctl syscall " + op)
		}
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall54(a0, a1, a2) {
	return ___sys_ioctl(a0, a1, a2)
}

function syscallMunmap(addr, len) {
	if ((addr | 0) === -1 || len === 0) {
		return -28
	}
	var info = SYSCALLS.mappings[addr];
	if (!info) return 0;
	if (len === info.len) {
		var stream = FS.getStream(info.fd);
		if (info.prot & 2) {
			SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
		}
		FS.munmap(stream);
		SYSCALLS.mappings[addr] = null;
		if (info.allocated) {
			_free(info.malloc)
		}
	}
	return 0
}

function ___sys_munmap(addr, len) {
	try {
		return syscallMunmap(addr, len)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___syscall91(a0, a1) {
	return ___sys_munmap(a0, a1)
}

function _fd_close(fd) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		FS.close(stream);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function ___wasi_fd_close(a0) {
	return _fd_close(a0)
}

function _fd_fdstat_get(fd, pbuf) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
		HEAP8[pbuf >> 0] = type;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function ___wasi_fd_fdstat_get(a0, a1) {
	return _fd_fdstat_get(a0, a1)
}

function _fd_read(fd, iov, iovcnt, pnum) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var num = SYSCALLS.doReadv(stream, iov, iovcnt);
		HEAP32[pnum >> 2] = num;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function ___wasi_fd_read(a0, a1, a2, a3) {
	return _fd_read(a0, a1, a2, a3)
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var HIGH_OFFSET = 4294967296;
		var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
		var DOUBLE_LIMIT = 9007199254740992;
		if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
			return -61
		}
		FS.llseek(stream, offset, whence);
		tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
		if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function ___wasi_fd_seek(a0, a1, a2, a3, a4) {
	return _fd_seek(a0, a1, a2, a3, a4)
}

function _fd_write(fd, iov, iovcnt, pnum) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var num = SYSCALLS.doWritev(stream, iov, iovcnt);
		HEAP32[pnum >> 2] = num;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function ___wasi_fd_write(a0, a1, a2, a3) {
	return _fd_write(a0, a1, a2, a3)
}
var structRegistrations = {};

function runDestructors(destructors) {
	while (destructors.length) {
		var ptr = destructors.pop();
		var del = destructors.pop();
		del(ptr)
	}
}

function simpleReadValueFromPointer(pointer) {
	return this["fromWireType"](HEAPU32[pointer >> 2])
}
var awaitingDependencies = {};
var registeredTypes = {};
var typeDependencies = {};
var char_0 = 48;
var char_9 = 57;

function makeLegalFunctionName(name) {
	if (undefined === name) {
		return "_unknown"
	}
	name = name.replace(/[^a-zA-Z0-9_]/g, "$");
	var f = name.charCodeAt(0);
	if (f >= char_0 && f <= char_9) {
		return "_" + name
	} else {
		return name
	}
}

function createNamedFunction(name, body) {
	name = makeLegalFunctionName(name);
	return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body)
}

function extendError(baseErrorType, errorName) {
	var errorClass = createNamedFunction(errorName, function (message) {
		this.name = errorName;
		this.message = message;
		var stack = new Error(message).stack;
		if (stack !== undefined) {
			this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "")
		}
	});
	errorClass.prototype = Object.create(baseErrorType.prototype);
	errorClass.prototype.constructor = errorClass;
	errorClass.prototype.toString = function () {
		if (this.message === undefined) {
			return this.name
		} else {
			return this.name + ": " + this.message
		}
	};
	return errorClass
}
var InternalError = undefined;

function throwInternalError(message) {
	throw new InternalError(message)
}

function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
	myTypes.forEach(function (type) {
		typeDependencies[type] = dependentTypes
	});

	function onComplete(typeConverters) {
		var myTypeConverters = getTypeConverters(typeConverters);
		if (myTypeConverters.length !== myTypes.length) {
			throwInternalError("Mismatched type converter count")
		}
		for (var i = 0; i < myTypes.length; ++i) {
			registerType(myTypes[i], myTypeConverters[i])
		}
	}
	var typeConverters = new Array(dependentTypes.length);
	var unregisteredTypes = [];
	var registered = 0;
	dependentTypes.forEach(function (dt, i) {
		if (registeredTypes.hasOwnProperty(dt)) {
			typeConverters[i] = registeredTypes[dt]
		} else {
			unregisteredTypes.push(dt);
			if (!awaitingDependencies.hasOwnProperty(dt)) {
				awaitingDependencies[dt] = []
			}
			awaitingDependencies[dt].push(function () {
				typeConverters[i] = registeredTypes[dt];
				++registered;
				if (registered === unregisteredTypes.length) {
					onComplete(typeConverters)
				}
			})
		}
	});
	if (0 === unregisteredTypes.length) {
		onComplete(typeConverters)
	}
}

function __embind_finalize_value_object(structType) {
	var reg = structRegistrations[structType];
	delete structRegistrations[structType];
	var rawConstructor = reg.rawConstructor;
	var rawDestructor = reg.rawDestructor;
	var fieldRecords = reg.fields;
	var fieldTypes = fieldRecords.map(function (field) {
		return field.getterReturnType
	}).concat(fieldRecords.map(function (field) {
		return field.setterArgumentType
	}));
	whenDependentTypesAreResolved([structType], fieldTypes, function (fieldTypes) {
		var fields = {};
		fieldRecords.forEach(function (field, i) {
			var fieldName = field.fieldName;
			var getterReturnType = fieldTypes[i];
			var getter = field.getter;
			var getterContext = field.getterContext;
			var setterArgumentType = fieldTypes[i + fieldRecords.length];
			var setter = field.setter;
			var setterContext = field.setterContext;
			fields[fieldName] = {
				read: function (ptr) {
					return getterReturnType["fromWireType"](getter(getterContext, ptr))
				},
				write: function (ptr, o) {
					var destructors = [];
					setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
					runDestructors(destructors)
				}
			}
		});
		return [{
			name: reg.name,
			"fromWireType": function (ptr) {
				var rv = {};
				for (var i in fields) {
					rv[i] = fields[i].read(ptr)
				}
				rawDestructor(ptr);
				return rv
			},
			"toWireType": function (destructors, o) {
				for (var fieldName in fields) {
					if (!(fieldName in o)) {
						throw new TypeError('Missing field:  "' + fieldName + '"')
					}
				}
				var ptr = rawConstructor();
				for (fieldName in fields) {
					fields[fieldName].write(ptr, o[fieldName])
				}
				if (destructors !== null) {
					destructors.push(rawDestructor, ptr)
				}
				return ptr
			},
			"argPackAdvance": 8,
			"readValueFromPointer": simpleReadValueFromPointer,
			destructorFunction: rawDestructor
		}]
	})
}

function getShiftFromSize(size) {
	switch (size) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 4:
			return 2;
		case 8:
			return 3;
		default:
			throw new TypeError("Unknown type size: " + size)
	}
}

function embind_init_charCodes() {
	var codes = new Array(256);
	for (var i = 0; i < 256; ++i) {
		codes[i] = String.fromCharCode(i)
	}
	embind_charCodes = codes
}
var embind_charCodes = undefined;

function readLatin1String(ptr) {
	var ret = "";
	var c = ptr;
	while (HEAPU8[c]) {
		ret += embind_charCodes[HEAPU8[c++]]
	}
	return ret
}
var BindingError = undefined;

function throwBindingError(message) {
	throw new BindingError(message)
}

function registerType(rawType, registeredInstance, options) {
	options = options || {};
	if (!("argPackAdvance" in registeredInstance)) {
		throw new TypeError("registerType registeredInstance requires argPackAdvance")
	}
	var name = registeredInstance.name;
	if (!rawType) {
		throwBindingError('type "' + name + '" must have a positive integer typeid pointer')
	}
	if (registeredTypes.hasOwnProperty(rawType)) {
		if (options.ignoreDuplicateRegistrations) {
			return
		} else {
			throwBindingError("Cannot register type '" + name + "' twice")
		}
	}
	registeredTypes[rawType] = registeredInstance;
	delete typeDependencies[rawType];
	if (awaitingDependencies.hasOwnProperty(rawType)) {
		var callbacks = awaitingDependencies[rawType];
		delete awaitingDependencies[rawType];
		callbacks.forEach(function (cb) {
			cb()
		})
	}
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
	var shift = getShiftFromSize(size);
	name = readLatin1String(name);
	registerType(rawType, {
		name: name,
		"fromWireType": function (wt) {
			return !!wt
		},
		"toWireType": function (destructors, o) {
			return o ? trueValue : falseValue
		},
		"argPackAdvance": 8,
		"readValueFromPointer": function (pointer) {
			var heap;
			if (size === 1) {
				heap = HEAP8
			} else if (size === 2) {
				heap = HEAP16
			} else if (size === 4) {
				heap = HEAP32
			} else {
				throw new TypeError("Unknown boolean type size: " + name)
			}
			return this["fromWireType"](heap[pointer >> shift])
		},
		destructorFunction: null
	})
}

function ClassHandle_isAliasOf(other) {
	if (!(this instanceof ClassHandle)) {
		return false
	}
	if (!(other instanceof ClassHandle)) {
		return false
	}
	var leftClass = this.$$.ptrType.registeredClass;
	var left = this.$$.ptr;
	var rightClass = other.$$.ptrType.registeredClass;
	var right = other.$$.ptr;
	while (leftClass.baseClass) {
		left = leftClass.upcast(left);
		leftClass = leftClass.baseClass
	}
	while (rightClass.baseClass) {
		right = rightClass.upcast(right);
		rightClass = rightClass.baseClass
	}
	return leftClass === rightClass && left === right
}

function shallowCopyInternalPointer(o) {
	return {
		count: o.count,
		deleteScheduled: o.deleteScheduled,
		preservePointerOnDelete: o.preservePointerOnDelete,
		ptr: o.ptr,
		ptrType: o.ptrType,
		smartPtr: o.smartPtr,
		smartPtrType: o.smartPtrType
	}
}

function throwInstanceAlreadyDeleted(obj) {
	function getInstanceTypeName(handle) {
		return handle.$$.ptrType.registeredClass.name
	}
	throwBindingError(getInstanceTypeName(obj) + " instance already deleted")
}
var finalizationGroup = false;

function detachFinalizer(handle) {}

function runDestructor($$) {
	if ($$.smartPtr) {
		$$.smartPtrType.rawDestructor($$.smartPtr)
	} else {
		$$.ptrType.registeredClass.rawDestructor($$.ptr)
	}
}

function releaseClassHandle($$) {
	$$.count.value -= 1;
	var toDelete = 0 === $$.count.value;
	if (toDelete) {
		runDestructor($$)
	}
}

function attachFinalizer(handle) {
	if ("undefined" === typeof FinalizationGroup) {
		attachFinalizer = function (handle) {
			return handle
		};
		return handle
	}
	finalizationGroup = new FinalizationGroup(function (iter) {
		for (var result = iter.next(); !result.done; result = iter.next()) {
			var $$ = result.value;
			if (!$$.ptr) {
				console.warn("object already deleted: " + $$.ptr)
			} else {
				releaseClassHandle($$)
			}
		}
	});
	attachFinalizer = function (handle) {
		finalizationGroup.register(handle, handle.$$, handle.$$);
		return handle
	};
	detachFinalizer = function (handle) {
		finalizationGroup.unregister(handle.$$)
	};
	return attachFinalizer(handle)
}

function ClassHandle_clone() {
	if (!this.$$.ptr) {
		throwInstanceAlreadyDeleted(this)
	}
	if (this.$$.preservePointerOnDelete) {
		this.$$.count.value += 1;
		return this
	} else {
		var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
			$$: {
				value: shallowCopyInternalPointer(this.$$)
			}
		}));
		clone.$$.count.value += 1;
		clone.$$.deleteScheduled = false;
		return clone
	}
}

function ClassHandle_delete() {
	if (!this.$$.ptr) {
		throwInstanceAlreadyDeleted(this)
	}
	if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
		throwBindingError("Object already scheduled for deletion")
	}
	detachFinalizer(this);
	releaseClassHandle(this.$$);
	if (!this.$$.preservePointerOnDelete) {
		this.$$.smartPtr = undefined;
		this.$$.ptr = undefined
	}
}

function ClassHandle_isDeleted() {
	return !this.$$.ptr
}
var delayFunction = undefined;
var deletionQueue = [];

function flushPendingDeletes() {
	while (deletionQueue.length) {
		var obj = deletionQueue.pop();
		obj.$$.deleteScheduled = false;
		obj["delete"]()
	}
}

function ClassHandle_deleteLater() {
	if (!this.$$.ptr) {
		throwInstanceAlreadyDeleted(this)
	}
	if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
		throwBindingError("Object already scheduled for deletion")
	}
	deletionQueue.push(this);
	if (deletionQueue.length === 1 && delayFunction) {
		delayFunction(flushPendingDeletes)
	}
	this.$$.deleteScheduled = true;
	return this
}

function init_ClassHandle() {
	ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
	ClassHandle.prototype["clone"] = ClassHandle_clone;
	ClassHandle.prototype["delete"] = ClassHandle_delete;
	ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
	ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater
}

function ClassHandle() {}
var registeredPointers = {};

function ensureOverloadTable(proto, methodName, humanName) {
	if (undefined === proto[methodName].overloadTable) {
		var prevFunc = proto[methodName];
		proto[methodName] = function () {
			if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
				throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!")
			}
			return proto[methodName].overloadTable[arguments.length].apply(this, arguments)
		};
		proto[methodName].overloadTable = [];
		proto[methodName].overloadTable[prevFunc.argCount] = prevFunc
	}
}

function exposePublicSymbol(name, value, numArguments) {
	if (Module.hasOwnProperty(name)) {
		if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
			throwBindingError("Cannot register public name '" + name + "' twice")
		}
		ensureOverloadTable(Module, name, name);
		if (Module.hasOwnProperty(numArguments)) {
			throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!")
		}
		Module[name].overloadTable[numArguments] = value
	} else {
		Module[name] = value;
		if (undefined !== numArguments) {
			Module[name].numArguments = numArguments
		}
	}
}

function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
	this.name = name;
	this.constructor = constructor;
	this.instancePrototype = instancePrototype;
	this.rawDestructor = rawDestructor;
	this.baseClass = baseClass;
	this.getActualType = getActualType;
	this.upcast = upcast;
	this.downcast = downcast;
	this.pureVirtualFunctions = []
}

function upcastPointer(ptr, ptrClass, desiredClass) {
	while (ptrClass !== desiredClass) {
		if (!ptrClass.upcast) {
			throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name)
		}
		ptr = ptrClass.upcast(ptr);
		ptrClass = ptrClass.baseClass
	}
	return ptr
}

function constNoSmartPtrRawPointerToWireType(destructors, handle) {
	if (handle === null) {
		if (this.isReference) {
			throwBindingError("null is not a valid " + this.name)
		}
		return 0
	}
	if (!handle.$$) {
		throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
	}
	if (!handle.$$.ptr) {
		throwBindingError("Cannot pass deleted object as a pointer of type " + this.name)
	}
	var handleClass = handle.$$.ptrType.registeredClass;
	var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
	return ptr
}

function genericPointerToWireType(destructors, handle) {
	var ptr;
	if (handle === null) {
		if (this.isReference) {
			throwBindingError("null is not a valid " + this.name)
		}
		if (this.isSmartPointer) {
			ptr = this.rawConstructor();
			if (destructors !== null) {
				destructors.push(this.rawDestructor, ptr)
			}
			return ptr
		} else {
			return 0
		}
	}
	if (!handle.$$) {
		throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
	}
	if (!handle.$$.ptr) {
		throwBindingError("Cannot pass deleted object as a pointer of type " + this.name)
	}
	if (!this.isConst && handle.$$.ptrType.isConst) {
		throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name)
	}
	var handleClass = handle.$$.ptrType.registeredClass;
	ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
	if (this.isSmartPointer) {
		if (undefined === handle.$$.smartPtr) {
			throwBindingError("Passing raw pointer to smart pointer is illegal")
		}
		switch (this.sharingPolicy) {
			case 0:
				if (handle.$$.smartPtrType === this) {
					ptr = handle.$$.smartPtr
				} else {
					throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name)
				}
				break;
			case 1:
				ptr = handle.$$.smartPtr;
				break;
			case 2:
				if (handle.$$.smartPtrType === this) {
					ptr = handle.$$.smartPtr
				} else {
					var clonedHandle = handle["clone"]();
					ptr = this.rawShare(ptr, __emval_register(function () {
						clonedHandle["delete"]()
					}));
					if (destructors !== null) {
						destructors.push(this.rawDestructor, ptr)
					}
				}
				break;
			default:
				throwBindingError("Unsupporting sharing policy")
		}
	}
	return ptr
}

function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
	if (handle === null) {
		if (this.isReference) {
			throwBindingError("null is not a valid " + this.name)
		}
		return 0
	}
	if (!handle.$$) {
		throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name)
	}
	if (!handle.$$.ptr) {
		throwBindingError("Cannot pass deleted object as a pointer of type " + this.name)
	}
	if (handle.$$.ptrType.isConst) {
		throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name)
	}
	var handleClass = handle.$$.ptrType.registeredClass;
	var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
	return ptr
}

function RegisteredPointer_getPointee(ptr) {
	if (this.rawGetPointee) {
		ptr = this.rawGetPointee(ptr)
	}
	return ptr
}

function RegisteredPointer_destructor(ptr) {
	if (this.rawDestructor) {
		this.rawDestructor(ptr)
	}
}

function RegisteredPointer_deleteObject(handle) {
	if (handle !== null) {
		handle["delete"]()
	}
}

function downcastPointer(ptr, ptrClass, desiredClass) {
	if (ptrClass === desiredClass) {
		return ptr
	}
	if (undefined === desiredClass.baseClass) {
		return null
	}
	var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
	if (rv === null) {
		return null
	}
	return desiredClass.downcast(rv)
}

function getInheritedInstanceCount() {
	return Object.keys(registeredInstances).length
}

function getLiveInheritedInstances() {
	var rv = [];
	for (var k in registeredInstances) {
		if (registeredInstances.hasOwnProperty(k)) {
			rv.push(registeredInstances[k])
		}
	}
	return rv
}

function setDelayFunction(fn) {
	delayFunction = fn;
	if (deletionQueue.length && delayFunction) {
		delayFunction(flushPendingDeletes)
	}
}

function init_embind() {
	Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
	Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
	Module["flushPendingDeletes"] = flushPendingDeletes;
	Module["setDelayFunction"] = setDelayFunction
}
var registeredInstances = {};

function getBasestPointer(class_, ptr) {
	if (ptr === undefined) {
		throwBindingError("ptr should not be undefined")
	}
	while (class_.baseClass) {
		ptr = class_.upcast(ptr);
		class_ = class_.baseClass
	}
	return ptr
}

function getInheritedInstance(class_, ptr) {
	ptr = getBasestPointer(class_, ptr);
	return registeredInstances[ptr]
}

function makeClassHandle(prototype, record) {
	if (!record.ptrType || !record.ptr) {
		throwInternalError("makeClassHandle requires ptr and ptrType")
	}
	var hasSmartPtrType = !!record.smartPtrType;
	var hasSmartPtr = !!record.smartPtr;
	if (hasSmartPtrType !== hasSmartPtr) {
		throwInternalError("Both smartPtrType and smartPtr must be specified")
	}
	record.count = {
		value: 1
	};
	return attachFinalizer(Object.create(prototype, {
		$$: {
			value: record
		}
	}))
}

function RegisteredPointer_fromWireType(ptr) {
	var rawPointer = this.getPointee(ptr);
	if (!rawPointer) {
		this.destructor(ptr);
		return null
	}
	var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
	if (undefined !== registeredInstance) {
		if (0 === registeredInstance.$$.count.value) {
			registeredInstance.$$.ptr = rawPointer;
			registeredInstance.$$.smartPtr = ptr;
			return registeredInstance["clone"]()
		} else {
			var rv = registeredInstance["clone"]();
			this.destructor(ptr);
			return rv
		}
	}

	function makeDefaultHandle() {
		if (this.isSmartPointer) {
			return makeClassHandle(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: rawPointer,
				smartPtrType: this,
				smartPtr: ptr
			})
		} else {
			return makeClassHandle(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: ptr
			})
		}
	}
	var actualType = this.registeredClass.getActualType(rawPointer);
	var registeredPointerRecord = registeredPointers[actualType];
	if (!registeredPointerRecord) {
		return makeDefaultHandle.call(this)
	}
	var toType;
	if (this.isConst) {
		toType = registeredPointerRecord.constPointerType
	} else {
		toType = registeredPointerRecord.pointerType
	}
	var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
	if (dp === null) {
		return makeDefaultHandle.call(this)
	}
	if (this.isSmartPointer) {
		return makeClassHandle(toType.registeredClass.instancePrototype, {
			ptrType: toType,
			ptr: dp,
			smartPtrType: this,
			smartPtr: ptr
		})
	} else {
		return makeClassHandle(toType.registeredClass.instancePrototype, {
			ptrType: toType,
			ptr: dp
		})
	}
}

function init_RegisteredPointer() {
	RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
	RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
	RegisteredPointer.prototype["argPackAdvance"] = 8;
	RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
	RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
	RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType
}

function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
	this.name = name;
	this.registeredClass = registeredClass;
	this.isReference = isReference;
	this.isConst = isConst;
	this.isSmartPointer = isSmartPointer;
	this.pointeeType = pointeeType;
	this.sharingPolicy = sharingPolicy;
	this.rawGetPointee = rawGetPointee;
	this.rawConstructor = rawConstructor;
	this.rawShare = rawShare;
	this.rawDestructor = rawDestructor;
	if (!isSmartPointer && registeredClass.baseClass === undefined) {
		if (isConst) {
			this["toWireType"] = constNoSmartPtrRawPointerToWireType;
			this.destructorFunction = null
		} else {
			this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
			this.destructorFunction = null
		}
	} else {
		this["toWireType"] = genericPointerToWireType
	}
}

function replacePublicSymbol(name, value, numArguments) {
	if (!Module.hasOwnProperty(name)) {
		throwInternalError("Replacing nonexistant public symbol")
	}
	if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
		Module[name].overloadTable[numArguments] = value
	} else {
		Module[name] = value;
		Module[name].argCount = numArguments
	}
}

function embind__requireFunction(signature, rawFunction) {
	signature = readLatin1String(signature);

	function makeDynCaller(dynCall) {
		var args = [];
		for (var i = 1; i < signature.length; ++i) {
			args.push("a" + i)
		}
		var name = "dynCall_" + signature + "_" + rawFunction;
		var body = "return function " + name + "(" + args.join(", ") + ") {\n";
		body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n";
		body += "};\n";
		return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction)
	}
	var dc = Module["dynCall_" + signature];
	var fp = makeDynCaller(dc);
	if (typeof fp !== "function") {
		throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction)
	}
	return fp
}
var UnboundTypeError = undefined;

function getTypeName(type) {
	var ptr = ___getTypeName(type);
	var rv = readLatin1String(ptr);
	_free(ptr);
	return rv
}

function throwUnboundTypeError(message, types) {
	var unboundTypes = [];
	var seen = {};

	function visit(type) {
		if (seen[type]) {
			return
		}
		if (registeredTypes[type]) {
			return
		}
		if (typeDependencies[type]) {
			typeDependencies[type].forEach(visit);
			return
		}
		unboundTypes.push(type);
		seen[type] = true
	}
	types.forEach(visit);
	throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]))
}

function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
	name = readLatin1String(name);
	getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
	if (upcast) {
		upcast = embind__requireFunction(upcastSignature, upcast)
	}
	if (downcast) {
		downcast = embind__requireFunction(downcastSignature, downcast)
	}
	rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
	var legalFunctionName = makeLegalFunctionName(name);
	exposePublicSymbol(legalFunctionName, function () {
		throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType])
	});
	whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function (base) {
		base = base[0];
		var baseClass;
		var basePrototype;
		if (baseClassRawType) {
			baseClass = base.registeredClass;
			basePrototype = baseClass.instancePrototype
		} else {
			basePrototype = ClassHandle.prototype
		}
		var constructor = createNamedFunction(legalFunctionName, function () {
			if (Object.getPrototypeOf(this) !== instancePrototype) {
				throw new BindingError("Use 'new' to construct " + name)
			}
			if (undefined === registeredClass.constructor_body) {
				throw new BindingError(name + " has no accessible constructor")
			}
			var body = registeredClass.constructor_body[arguments.length];
			if (undefined === body) {
				throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!")
			}
			return body.apply(this, arguments)
		});
		var instancePrototype = Object.create(basePrototype, {
			constructor: {
				value: constructor
			}
		});
		constructor.prototype = instancePrototype;
		var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
		var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
		var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
		var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
		registeredPointers[rawType] = {
			pointerType: pointerConverter,
			constPointerType: constPointerConverter
		};
		replacePublicSymbol(legalFunctionName, constructor);
		return [referenceConverter, pointerConverter, constPointerConverter]
	})
}

function new_(constructor, argumentList) {
	if (!(constructor instanceof Function)) {
		throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function")
	}
	var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function () {});
	dummy.prototype = constructor.prototype;
	var obj = new dummy;
	var r = constructor.apply(obj, argumentList);
	return r instanceof Object ? r : obj
}

function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
	var argCount = argTypes.length;
	if (argCount < 2) {
		throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")
	}
	var isClassMethodFunc = argTypes[1] !== null && classType !== null;
	var needsDestructorStack = false;
	for (var i = 1; i < argTypes.length; ++i) {
		if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
			needsDestructorStack = true;
			break
		}
	}
	var returns = argTypes[0].name !== "void";
	var argsList = "";
	var argsListWired = "";
	for (var i = 0; i < argCount - 2; ++i) {
		argsList += (i !== 0 ? ", " : "") + "arg" + i;
		argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired"
	}
	var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n";
	if (needsDestructorStack) {
		invokerFnBody += "var destructors = [];\n"
	}
	var dtorStack = needsDestructorStack ? "destructors" : "null";
	var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
	var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
	if (isClassMethodFunc) {
		invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n"
	}
	for (var i = 0; i < argCount - 2; ++i) {
		invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
		args1.push("argType" + i);
		args2.push(argTypes[i + 2])
	}
	if (isClassMethodFunc) {
		argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired
	}
	invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
	if (needsDestructorStack) {
		invokerFnBody += "runDestructors(destructors);\n"
	} else {
		for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
			var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
			if (argTypes[i].destructorFunction !== null) {
				invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
				args1.push(paramName + "_dtor");
				args2.push(argTypes[i].destructorFunction)
			}
		}
	}
	if (returns) {
		invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n"
	} else {}
	invokerFnBody += "}\n";
	args1.push(invokerFnBody);
	var invokerFunction = new_(Function, args1).apply(null, args2);
	return invokerFunction
}

function heap32VectorToArray(count, firstElement) {
	var array = [];
	for (var i = 0; i < count; i++) {
		array.push(HEAP32[(firstElement >> 2) + i])
	}
	return array
}

function __embind_register_class_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn) {
	var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
	methodName = readLatin1String(methodName);
	rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
	whenDependentTypesAreResolved([], [rawClassType], function (classType) {
		classType = classType[0];
		var humanName = classType.name + "." + methodName;

		function unboundTypesHandler() {
			throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes)
		}
		var proto = classType.registeredClass.constructor;
		if (undefined === proto[methodName]) {
			unboundTypesHandler.argCount = argCount - 1;
			proto[methodName] = unboundTypesHandler
		} else {
			ensureOverloadTable(proto, methodName, humanName);
			proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler
		}
		whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
			var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
			var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn);
			if (undefined === proto[methodName].overloadTable) {
				func.argCount = argCount - 1;
				proto[methodName] = func
			} else {
				proto[methodName].overloadTable[argCount - 1] = func
			}
			return []
		});
		return []
	})
}

function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
	assert(argCount > 0);
	var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
	invoker = embind__requireFunction(invokerSignature, invoker);
	var args = [rawConstructor];
	var destructors = [];
	whenDependentTypesAreResolved([], [rawClassType], function (classType) {
		classType = classType[0];
		var humanName = "constructor " + classType.name;
		if (undefined === classType.registeredClass.constructor_body) {
			classType.registeredClass.constructor_body = []
		}
		if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
			throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!")
		}
		classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
			throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes)
		};
		whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
			classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
				if (arguments.length !== argCount - 1) {
					throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1))
				}
				destructors.length = 0;
				args.length = argCount;
				for (var i = 1; i < argCount; ++i) {
					args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1])
				}
				var ptr = invoker.apply(null, args);
				runDestructors(destructors);
				return argTypes[0]["fromWireType"](ptr)
			};
			return []
		});
		return []
	})
}

function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
	var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
	methodName = readLatin1String(methodName);
	rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
	whenDependentTypesAreResolved([], [rawClassType], function (classType) {
		classType = classType[0];
		var humanName = classType.name + "." + methodName;
		if (isPureVirtual) {
			classType.registeredClass.pureVirtualFunctions.push(methodName)
		}

		function unboundTypesHandler() {
			throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes)
		}
		var proto = classType.registeredClass.instancePrototype;
		var method = proto[methodName];
		if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
			unboundTypesHandler.argCount = argCount - 2;
			unboundTypesHandler.className = classType.name;
			proto[methodName] = unboundTypesHandler
		} else {
			ensureOverloadTable(proto, methodName, humanName);
			proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler
		}
		whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
			var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
			if (undefined === proto[methodName].overloadTable) {
				memberFunction.argCount = argCount - 2;
				proto[methodName] = memberFunction
			} else {
				proto[methodName].overloadTable[argCount - 2] = memberFunction
			}
			return []
		});
		return []
	})
}

function validateThis(this_, classType, humanName) {
	if (!(this_ instanceof Object)) {
		throwBindingError(humanName + ' with invalid "this": ' + this_)
	}
	if (!(this_ instanceof classType.registeredClass.constructor)) {
		throwBindingError(humanName + ' incompatible with "this" of type ' + this_.constructor.name)
	}
	if (!this_.$$.ptr) {
		throwBindingError("cannot call emscripten binding method " + humanName + " on deleted object")
	}
	return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass)
}

function __embind_register_class_property(classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
	fieldName = readLatin1String(fieldName);
	getter = embind__requireFunction(getterSignature, getter);
	whenDependentTypesAreResolved([], [classType], function (classType) {
		classType = classType[0];
		var humanName = classType.name + "." + fieldName;
		var desc = {
			get: function () {
				throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [getterReturnType, setterArgumentType])
			},
			enumerable: true,
			configurable: true
		};
		if (setter) {
			desc.set = function () {
				throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [getterReturnType, setterArgumentType])
			}
		} else {
			desc.set = function (v) {
				throwBindingError(humanName + " is a read-only property")
			}
		}
		Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
		whenDependentTypesAreResolved([], setter ? [getterReturnType, setterArgumentType] : [getterReturnType], function (types) {
			var getterReturnType = types[0];
			var desc = {
				get: function () {
					var ptr = validateThis(this, classType, humanName + " getter");
					return getterReturnType["fromWireType"](getter(getterContext, ptr))
				},
				enumerable: true
			};
			if (setter) {
				setter = embind__requireFunction(setterSignature, setter);
				var setterArgumentType = types[1];
				desc.set = function (v) {
					var ptr = validateThis(this, classType, humanName + " setter");
					var destructors = [];
					setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, v));
					runDestructors(destructors)
				}
			}
			Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
			return []
		});
		return []
	})
}
var emval_free_list = [];
var emval_handle_array = [{}, {
	value: undefined
}, {
	value: null
}, {
	value: true
}, {
	value: false
}];

function __emval_decref(handle) {
	if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
		emval_handle_array[handle] = undefined;
		emval_free_list.push(handle)
	}
}

function count_emval_handles() {
	var count = 0;
	for (var i = 5; i < emval_handle_array.length; ++i) {
		if (emval_handle_array[i] !== undefined) {
			++count
		}
	}
	return count
}

function get_first_emval() {
	for (var i = 5; i < emval_handle_array.length; ++i) {
		if (emval_handle_array[i] !== undefined) {
			return emval_handle_array[i]
		}
	}
	return null
}

function init_emval() {
	Module["count_emval_handles"] = count_emval_handles;
	Module["get_first_emval"] = get_first_emval
}

function __emval_register(value) {
	switch (value) {
		case undefined:
			{
				return 1
			}
		case null:
			{
				return 2
			}
		case true:
			{
				return 3
			}
		case false:
			{
				return 4
			}
		default:
			{
				var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;emval_handle_array[handle] = {
					refcount: 1,
					value: value
				};
				return handle
			}
	}
}

function __embind_register_emval(rawType, name) {
	name = readLatin1String(name);
	registerType(rawType, {
		name: name,
		"fromWireType": function (handle) {
			var rv = emval_handle_array[handle].value;
			__emval_decref(handle);
			return rv
		},
		"toWireType": function (destructors, value) {
			return __emval_register(value)
		},
		"argPackAdvance": 8,
		"readValueFromPointer": simpleReadValueFromPointer,
		destructorFunction: null
	})
}

function enumReadValueFromPointer(name, shift, signed) {
	switch (shift) {
		case 0:
			return function (pointer) {
				var heap = signed ? HEAP8 : HEAPU8;
				return this["fromWireType"](heap[pointer])
			};
		case 1:
			return function (pointer) {
				var heap = signed ? HEAP16 : HEAPU16;
				return this["fromWireType"](heap[pointer >> 1])
			};
		case 2:
			return function (pointer) {
				var heap = signed ? HEAP32 : HEAPU32;
				return this["fromWireType"](heap[pointer >> 2])
			};
		default:
			throw new TypeError("Unknown integer type: " + name)
	}
}

function __embind_register_enum(rawType, name, size, isSigned) {
	var shift = getShiftFromSize(size);
	name = readLatin1String(name);

	function ctor() {}
	ctor.values = {};
	registerType(rawType, {
		name: name,
		constructor: ctor,
		"fromWireType": function (c) {
			return this.constructor.values[c]
		},
		"toWireType": function (destructors, c) {
			return c.value
		},
		"argPackAdvance": 8,
		"readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned),
		destructorFunction: null
	});
	exposePublicSymbol(name, ctor)
}

function requireRegisteredType(rawType, humanName) {
	var impl = registeredTypes[rawType];
	if (undefined === impl) {
		throwBindingError(humanName + " has unknown type " + getTypeName(rawType))
	}
	return impl
}

function __embind_register_enum_value(rawEnumType, name, enumValue) {
	var enumType = requireRegisteredType(rawEnumType, "enum");
	name = readLatin1String(name);
	var Enum = enumType.constructor;
	var Value = Object.create(enumType.constructor.prototype, {
		value: {
			value: enumValue
		},
		constructor: {
			value: createNamedFunction(enumType.name + "_" + name, function () {})
		}
	});
	Enum.values[enumValue] = Value;
	Enum[name] = Value
}

function _embind_repr(v) {
	if (v === null) {
		return "null"
	}
	var t = typeof v;
	if (t === "object" || t === "array" || t === "function") {
		return v.toString()
	} else {
		return "" + v
	}
}

function floatReadValueFromPointer(name, shift) {
	switch (shift) {
		case 2:
			return function (pointer) {
				return this["fromWireType"](HEAPF32[pointer >> 2])
			};
		case 3:
			return function (pointer) {
				return this["fromWireType"](HEAPF64[pointer >> 3])
			};
		default:
			throw new TypeError("Unknown float type: " + name)
	}
}

function __embind_register_float(rawType, name, size) {
	var shift = getShiftFromSize(size);
	name = readLatin1String(name);
	registerType(rawType, {
		name: name,
		"fromWireType": function (value) {
			return value
		},
		"toWireType": function (destructors, value) {
			if (typeof value !== "number" && typeof value !== "boolean") {
				throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
			}
			return value
		},
		"argPackAdvance": 8,
		"readValueFromPointer": floatReadValueFromPointer(name, shift),
		destructorFunction: null
	})
}

function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
	var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
	name = readLatin1String(name);
	rawInvoker = embind__requireFunction(signature, rawInvoker);
	exposePublicSymbol(name, function () {
		throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes)
	}, argCount - 1);
	whenDependentTypesAreResolved([], argTypes, function (argTypes) {
		var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
		replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
		return []
	})
}

function integerReadValueFromPointer(name, shift, signed) {
	switch (shift) {
		case 0:
			return signed ? function readS8FromPointer(pointer) {
				return HEAP8[pointer]
			} : function readU8FromPointer(pointer) {
				return HEAPU8[pointer]
			};
		case 1:
			return signed ? function readS16FromPointer(pointer) {
				return HEAP16[pointer >> 1]
			} : function readU16FromPointer(pointer) {
				return HEAPU16[pointer >> 1]
			};
		case 2:
			return signed ? function readS32FromPointer(pointer) {
				return HEAP32[pointer >> 2]
			} : function readU32FromPointer(pointer) {
				return HEAPU32[pointer >> 2]
			};
		default:
			throw new TypeError("Unknown integer type: " + name)
	}
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
	name = readLatin1String(name);
	if (maxRange === -1) {
		maxRange = 4294967295
	}
	var shift = getShiftFromSize(size);
	var fromWireType = function (value) {
		return value
	};
	if (minRange === 0) {
		var bitshift = 32 - 8 * size;
		fromWireType = function (value) {
			return value << bitshift >>> bitshift
		}
	}
	var isUnsignedType = name.indexOf("unsigned") != -1;
	registerType(primitiveType, {
		name: name,
		"fromWireType": fromWireType,
		"toWireType": function (destructors, value) {
			if (typeof value !== "number" && typeof value !== "boolean") {
				throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name)
			}
			if (value < minRange || value > maxRange) {
				throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!")
			}
			return isUnsignedType ? value >>> 0 : value | 0
		},
		"argPackAdvance": 8,
		"readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
		destructorFunction: null
	})
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
	var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
	var TA = typeMapping[dataTypeIndex];

	function decodeMemoryView(handle) {
		handle = handle >> 2;
		var heap = HEAPU32;
		var size = heap[handle];
		var data = heap[handle + 1];
		return new TA(buffer, data, size)
	}
	name = readLatin1String(name);
	registerType(rawType, {
		name: name,
		"fromWireType": decodeMemoryView,
		"argPackAdvance": 8,
		"readValueFromPointer": decodeMemoryView
	}, {
		ignoreDuplicateRegistrations: true
	})
}

function __embind_register_smart_ptr(rawType, rawPointeeType, name, sharingPolicy, getPointeeSignature, rawGetPointee, constructorSignature, rawConstructor, shareSignature, rawShare, destructorSignature, rawDestructor) {
	name = readLatin1String(name);
	rawGetPointee = embind__requireFunction(getPointeeSignature, rawGetPointee);
	rawConstructor = embind__requireFunction(constructorSignature, rawConstructor);
	rawShare = embind__requireFunction(shareSignature, rawShare);
	rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
	whenDependentTypesAreResolved([rawType], [rawPointeeType], function (pointeeType) {
		pointeeType = pointeeType[0];
		var registeredPointer = new RegisteredPointer(name, pointeeType.registeredClass, false, false, true, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor);
		return [registeredPointer]
	})
}

function __embind_register_std_string(rawType, name) {
	name = readLatin1String(name);
	var stdStringIsUTF8 = false;
	registerType(rawType, {
		name: name,
		"fromWireType": function (value) {
			var length = HEAPU32[value >> 2];
			var str;
			if (stdStringIsUTF8) {
				var decodeStartPtr = value + 4;
				for (var i = 0; i <= length; ++i) {
					var currentBytePtr = value + 4 + i;
					if (i == length || HEAPU8[currentBytePtr] == 0) {
						var maxRead = currentBytePtr - decodeStartPtr;
						var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
						if (str === undefined) {
							str = stringSegment
						} else {
							str += String.fromCharCode(0);
							str += stringSegment
						}
						decodeStartPtr = currentBytePtr + 1
					}
				}
			} else {
				var a = new Array(length);
				for (var i = 0; i < length; ++i) {
					a[i] = String.fromCharCode(HEAPU8[value + 4 + i])
				}
				str = a.join("")
			}
			_free(value);
			return str
		},
		"toWireType": function (destructors, value) {
			if (value instanceof ArrayBuffer) {
				value = new Uint8Array(value)
			}
			var getLength;
			var valueIsOfTypeString = typeof value === "string";
			if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
				throwBindingError("Cannot pass non-string to std::string")
			}
			if (stdStringIsUTF8 && valueIsOfTypeString) {
				getLength = function () {
					return lengthBytesUTF8(value)
				}
			} else {
				getLength = function () {
					return value.length
				}
			}
			var length = getLength();
			var ptr = _malloc(4 + length + 1);
			HEAPU32[ptr >> 2] = length;
			if (stdStringIsUTF8 && valueIsOfTypeString) {
				stringToUTF8(value, ptr + 4, length + 1)
			} else {
				if (valueIsOfTypeString) {
					for (var i = 0; i < length; ++i) {
						var charCode = value.charCodeAt(i);
						if (charCode > 255) {
							_free(ptr);
							throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
						}
						HEAPU8[ptr + 4 + i] = charCode
					}
				} else {
					for (var i = 0; i < length; ++i) {
						HEAPU8[ptr + 4 + i] = value[i]
					}
				}
			}
			if (destructors !== null) {
				destructors.push(_free, ptr)
			}
			return ptr
		},
		"argPackAdvance": 8,
		"readValueFromPointer": simpleReadValueFromPointer,
		destructorFunction: function (ptr) {
			_free(ptr)
		}
	})
}

function __embind_register_std_wstring(rawType, charSize, name) {
	name = readLatin1String(name);
	var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
	if (charSize === 2) {
		decodeString = UTF16ToString;
		encodeString = stringToUTF16;
		lengthBytesUTF = lengthBytesUTF16;
		getHeap = function () {
			return HEAPU16
		};
		shift = 1
	} else if (charSize === 4) {
		decodeString = UTF32ToString;
		encodeString = stringToUTF32;
		lengthBytesUTF = lengthBytesUTF32;
		getHeap = function () {
			return HEAPU32
		};
		shift = 2
	}
	registerType(rawType, {
		name: name,
		"fromWireType": function (value) {
			var length = HEAPU32[value >> 2];
			var HEAP = getHeap();
			var str;
			var decodeStartPtr = value + 4;
			for (var i = 0; i <= length; ++i) {
				var currentBytePtr = value + 4 + i * charSize;
				if (i == length || HEAP[currentBytePtr >> shift] == 0) {
					var maxReadBytes = currentBytePtr - decodeStartPtr;
					var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
					if (str === undefined) {
						str = stringSegment
					} else {
						str += String.fromCharCode(0);
						str += stringSegment
					}
					decodeStartPtr = currentBytePtr + charSize
				}
			}
			_free(value);
			return str
		},
		"toWireType": function (destructors, value) {
			if (!(typeof value === "string")) {
				throwBindingError("Cannot pass non-string to C++ string type " + name)
			}
			var length = lengthBytesUTF(value);
			var ptr = _malloc(4 + length + charSize);
			HEAPU32[ptr >> 2] = length >> shift;
			encodeString(value, ptr + 4, length + charSize);
			if (destructors !== null) {
				destructors.push(_free, ptr)
			}
			return ptr
		},
		"argPackAdvance": 8,
		"readValueFromPointer": simpleReadValueFromPointer,
		destructorFunction: function (ptr) {
			_free(ptr)
		}
	})
}

function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
	structRegistrations[rawType] = {
		name: readLatin1String(name),
		rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
		rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
		fields: []
	}
}

function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
	structRegistrations[structType].fields.push({
		fieldName: readLatin1String(fieldName),
		getterReturnType: getterReturnType,
		getter: embind__requireFunction(getterSignature, getter),
		getterContext: getterContext,
		setterArgumentType: setterArgumentType,
		setter: embind__requireFunction(setterSignature, setter),
		setterContext: setterContext
	})
}

function __embind_register_void(rawType, name) {
	name = readLatin1String(name);
	registerType(rawType, {
		isVoid: true,
		name: name,
		"argPackAdvance": 0,
		"fromWireType": function () {
			return undefined
		},
		"toWireType": function (destructors, o) {
			return undefined
		}
	})
}

function requireHandle(handle) {
	if (!handle) {
		throwBindingError("Cannot use deleted val. handle = " + handle)
	}
	return emval_handle_array[handle].value
}

function __emval_as(handle, returnType, destructorsRef) {
	handle = requireHandle(handle);
	returnType = requireRegisteredType(returnType, "emval::as");
	var destructors = [];
	var rd = __emval_register(destructors);
	HEAP32[destructorsRef >> 2] = rd;
	return returnType["toWireType"](destructors, handle)
}

function __emval_lookupTypes(argCount, argTypes) {
	var a = new Array(argCount);
	for (var i = 0; i < argCount; ++i) {
		a[i] = requireRegisteredType(HEAP32[(argTypes >> 2) + i], "parameter " + i)
	}
	return a
}

function __emval_call(handle, argCount, argTypes, argv) {
	handle = requireHandle(handle);
	var types = __emval_lookupTypes(argCount, argTypes);
	var args = new Array(argCount);
	for (var i = 0; i < argCount; ++i) {
		var type = types[i];
		args[i] = type["readValueFromPointer"](argv);
		argv += type["argPackAdvance"]
	}
	var rv = handle.apply(undefined, args);
	return __emval_register(rv)
}

function __emval_allocateDestructors(destructorsRef) {
	var destructors = [];
	HEAP32[destructorsRef >> 2] = __emval_register(destructors);
	return destructors
}
var emval_symbols = {};

function getStringOrSymbol(address) {
	var symbol = emval_symbols[address];
	if (symbol === undefined) {
		return readLatin1String(address)
	} else {
		return symbol
	}
}
var emval_methodCallers = [];

function __emval_call_method(caller, handle, methodName, destructorsRef, args) {
	caller = emval_methodCallers[caller];
	handle = requireHandle(handle);
	methodName = getStringOrSymbol(methodName);
	return caller(handle, methodName, __emval_allocateDestructors(destructorsRef), args)
}

function __emval_call_void_method(caller, handle, methodName, args) {
	caller = emval_methodCallers[caller];
	handle = requireHandle(handle);
	methodName = getStringOrSymbol(methodName);
	caller(handle, methodName, null, args)
}

function __emval_equals(first, second) {
	first = requireHandle(first);
	second = requireHandle(second);
	return first == second
}

function emval_get_global() {
	if (typeof globalThis === "object") {
		return globalThis
	}
	return function () {
		return Function
	}()("return this")()
}

function __emval_get_global(name) {
	if (name === 0) {
		return __emval_register(emval_get_global())
	} else {
		name = getStringOrSymbol(name);
		return __emval_register(emval_get_global()[name])
	}
}

function __emval_addMethodCaller(caller) {
	var id = emval_methodCallers.length;
	emval_methodCallers.push(caller);
	return id
}

function __emval_get_method_caller(argCount, argTypes) {
	var types = __emval_lookupTypes(argCount, argTypes);
	var retType = types[0];
	var signatureName = retType.name + "_$" + types.slice(1).map(function (t) {
		return t.name
	}).join("_") + "$";
	var params = ["retType"];
	var args = [retType];
	var argsList = "";
	for (var i = 0; i < argCount - 1; ++i) {
		argsList += (i !== 0 ? ", " : "") + "arg" + i;
		params.push("argType" + i);
		args.push(types[1 + i])
	}
	var functionName = makeLegalFunctionName("methodCaller_" + signatureName);
	var functionBody = "return function " + functionName + "(handle, name, destructors, args) {\n";
	var offset = 0;
	for (var i = 0; i < argCount - 1; ++i) {
		functionBody += "    var arg" + i + " = argType" + i + ".readValueFromPointer(args" + (offset ? "+" + offset : "") + ");\n";
		offset += types[i + 1]["argPackAdvance"]
	}
	functionBody += "    var rv = handle[name](" + argsList + ");\n";
	for (var i = 0; i < argCount - 1; ++i) {
		if (types[i + 1]["deleteObject"]) {
			functionBody += "    argType" + i + ".deleteObject(arg" + i + ");\n"
		}
	}
	if (!retType.isVoid) {
		functionBody += "    return retType.toWireType(destructors, rv);\n"
	}
	functionBody += "};\n";
	params.push(functionBody);
	var invokerFunction = new_(Function, params).apply(null, args);
	return __emval_addMethodCaller(invokerFunction)
}

function __emval_get_property(handle, key) {
	handle = requireHandle(handle);
	key = requireHandle(key);
	return __emval_register(handle[key])
}

function __emval_incref(handle) {
	if (handle > 4) {
		emval_handle_array[handle].refcount += 1
	}
}

function craftEmvalAllocator(argCount) {
	var argsList = "";
	for (var i = 0; i < argCount; ++i) {
		argsList += (i !== 0 ? ", " : "") + "arg" + i
	}
	var functionBody = "return function emval_allocator_" + argCount + "(constructor, argTypes, args) {\n";
	for (var i = 0; i < argCount; ++i) {
		functionBody += "var argType" + i + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + i + '], "parameter ' + i + '");\n' + "var arg" + i + " = argType" + i + ".readValueFromPointer(args);\n" + "args += argType" + i + "['argPackAdvance'];\n"
	}
	functionBody += "var obj = new constructor(" + argsList + ");\n" + "return __emval_register(obj);\n" + "}\n";
	return new Function("requireRegisteredType", "Module", "__emval_register", functionBody)(requireRegisteredType, Module, __emval_register)
}
var emval_newers = {};

function __emval_new(handle, argCount, argTypes, args) {
	handle = requireHandle(handle);
	var newer = emval_newers[argCount];
	if (!newer) {
		newer = craftEmvalAllocator(argCount);
		emval_newers[argCount] = newer
	}
	return newer(handle, argTypes, args)
}

function __emval_new_array() {
	return __emval_register([])
}

function __emval_new_cstring(v) {
	return __emval_register(getStringOrSymbol(v))
}

function __emval_new_object() {
	return __emval_register({})
}

function __emval_run_destructors(handle) {
	var destructors = emval_handle_array[handle].value;
	runDestructors(destructors);
	__emval_decref(handle)
}

function __emval_set_property(handle, key, value) {
	handle = requireHandle(handle);
	key = requireHandle(key);
	value = requireHandle(value);
	handle[key] = value
}

function __emval_strictly_equals(first, second) {
	first = requireHandle(first);
	second = requireHandle(second);
	return first === second
}

function __emval_take_value(type, argv) {
	type = requireRegisteredType(type, "_emval_take_value");
	var v = type["readValueFromPointer"](argv);
	return __emval_register(v)
}

function __emval_typeof(handle) {
	handle = requireHandle(handle);
	return __emval_register(typeof handle)
}

function _abort() {
	abort()
}

function _atexit(func, arg) {}
var _emscripten_get_now;
if (ENVIRONMENT_IS_NODE) {
	_emscripten_get_now = function () {
		var t = process["hrtime"]();
		return t[0] * 1e3 + t[1] / 1e6
	}
} else if (typeof dateNow !== "undefined") {
	_emscripten_get_now = dateNow
} else _emscripten_get_now = function () {
	return performance.now()
};
var _emscripten_get_now_is_monotonic = true;

function _clock_gettime(clk_id, tp) {
	var now;
	if (clk_id === 0) {
		now = Date.now()
	} else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
		now = _emscripten_get_now()
	} else {
		setErrNo(28);
		return -1
	}
	HEAP32[tp >> 2] = now / 1e3 | 0;
	HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
	return 0
}

function _emscripten_set_main_loop_timing(mode, value) {
	Browser.mainLoop.timingMode = mode;
	Browser.mainLoop.timingValue = value;
	if (!Browser.mainLoop.func) {
		return 1
	}
	if (mode == 0) {
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
			var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
			setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
		};
		Browser.mainLoop.method = "timeout"
	} else if (mode == 1) {
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
			Browser.requestAnimationFrame(Browser.mainLoop.runner)
		};
		Browser.mainLoop.method = "rAF"
	} else if (mode == 2) {
		if (typeof setImmediate === "undefined") {
			var setImmediates = [];
			var emscriptenMainLoopMessageId = "setimmediate";
			var Browser_setImmediate_messageHandler = function (event) {
				if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
					event.stopPropagation();
					setImmediates.shift()()
				}
			};
			addEventListener("message", Browser_setImmediate_messageHandler, true);
			setImmediate = function Browser_emulated_setImmediate(func) {
				setImmediates.push(func);
				if (ENVIRONMENT_IS_WORKER) {
					if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
					Module["setImmediates"].push(func);
					postMessage({
						target: emscriptenMainLoopMessageId
					})
				} else postMessage(emscriptenMainLoopMessageId, "*")
			}
		}
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
			setImmediate(Browser.mainLoop.runner)
		};
		Browser.mainLoop.method = "immediate"
	}
	return 0
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
	noExitRuntime = true;
	assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
	Browser.mainLoop.func = func;
	Browser.mainLoop.arg = arg;
	var browserIterationFunc;
	if (typeof arg !== "undefined") {
		browserIterationFunc = function () {
			Module["dynCall_vi"](func, arg)
		}
	} else {
		browserIterationFunc = function () {
			Module["dynCall_v"](func)
		}
	}
	var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
	Browser.mainLoop.runner = function Browser_mainLoop_runner() {
		if (ABORT) return;
		if (Browser.mainLoop.queue.length > 0) {
			var start = Date.now();
			var blocker = Browser.mainLoop.queue.shift();
			blocker.func(blocker.arg);
			if (Browser.mainLoop.remainingBlockers) {
				var remaining = Browser.mainLoop.remainingBlockers;
				var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
				if (blocker.counted) {
					Browser.mainLoop.remainingBlockers = next
				} else {
					next = next + .5;
					Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
				}
			}
			console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
			Browser.mainLoop.updateStatus();
			if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
			setTimeout(Browser.mainLoop.runner, 0);
			return
		}
		if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
		Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
		if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
			Browser.mainLoop.scheduler();
			return
		} else if (Browser.mainLoop.timingMode == 0) {
			Browser.mainLoop.tickStartTime = _emscripten_get_now()
		}
		Browser.mainLoop.runIter(browserIterationFunc);
		if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
		if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
		Browser.mainLoop.scheduler()
	};
	if (!noSetTiming) {
		if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);
		else _emscripten_set_main_loop_timing(1, 1);
		Browser.mainLoop.scheduler()
	}
	if (simulateInfiniteLoop) {
		throw "unwind"
	}
}
var Browser = {
	mainLoop: {
		scheduler: null,
		method: "",
		currentlyRunningMainloop: 0,
		func: null,
		arg: 0,
		timingMode: 0,
		timingValue: 0,
		currentFrameNumber: 0,
		queue: [],
		pause: function () {
			Browser.mainLoop.scheduler = null;
			Browser.mainLoop.currentlyRunningMainloop++
		},
		resume: function () {
			Browser.mainLoop.currentlyRunningMainloop++;
			var timingMode = Browser.mainLoop.timingMode;
			var timingValue = Browser.mainLoop.timingValue;
			var func = Browser.mainLoop.func;
			Browser.mainLoop.func = null;
			_emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
			_emscripten_set_main_loop_timing(timingMode, timingValue);
			Browser.mainLoop.scheduler()
		},
		updateStatus: function () {
			if (Module["setStatus"]) {
				var message = Module["statusMessage"] || "Please wait...";
				var remaining = Browser.mainLoop.remainingBlockers;
				var expected = Browser.mainLoop.expectedBlockers;
				if (remaining) {
					if (remaining < expected) {
						Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")")
					} else {
						Module["setStatus"](message)
					}
				} else {
					Module["setStatus"]("")
				}
			}
		},
		runIter: function (func) {
			if (ABORT) return;
			if (Module["preMainLoop"]) {
				var preRet = Module["preMainLoop"]();
				if (preRet === false) {
					return
				}
			}
			try {
				func()
			} catch (e) {
				if (e instanceof ExitStatus) {
					return
				} else {
					if (e && typeof e === "object" && e.stack) err("exception thrown: " + [e, e.stack]);
					throw e
				}
			}
			if (Module["postMainLoop"]) Module["postMainLoop"]()
		}
	},
	isFullscreen: false,
	pointerLock: false,
	moduleContextCreatedCallbacks: [],
	workers: [],
	init: function () {
		if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
		if (Browser.initted) return;
		Browser.initted = true;
		try {
			new Blob;
			Browser.hasBlobConstructor = true
		} catch (e) {
			Browser.hasBlobConstructor = false;
			console.log("warning: no blob constructor, cannot create blobs with mimetypes")
		}
		Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
		Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
		if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
			console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
			Module.noImageDecoding = true
		}
		var imagePlugin = {};
		imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
			return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
		};
		imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
			var b = null;
			if (Browser.hasBlobConstructor) {
				try {
					b = new Blob([byteArray], {
						type: Browser.getMimetype(name)
					});
					if (b.size !== byteArray.length) {
						b = new Blob([new Uint8Array(byteArray).buffer], {
							type: Browser.getMimetype(name)
						})
					}
				} catch (e) {
					warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
				}
			}
			if (!b) {
				var bb = new Browser.BlobBuilder;
				bb.append(new Uint8Array(byteArray).buffer);
				b = bb.getBlob()
			}
			var url = Browser.URLObject.createObjectURL(b);
			var img = new Image;
			img.onload = function img_onload() {
				assert(img.complete, "Image " + name + " could not be decoded");
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				Module["preloadedImages"][name] = canvas;
				Browser.URLObject.revokeObjectURL(url);
				if (onload) onload(byteArray)
			};
			img.onerror = function img_onerror(event) {
				console.log("Image " + url + " could not be decoded");
				if (onerror) onerror()
			};
			img.src = url
		};
		Module["preloadPlugins"].push(imagePlugin);
		var audioPlugin = {};
		audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
			return !Module.noAudioDecoding && name.substr(-4) in {
				".ogg": 1,
				".wav": 1,
				".mp3": 1
			}
		};
		audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
			var done = false;

			function finish(audio) {
				if (done) return;
				done = true;
				Module["preloadedAudios"][name] = audio;
				if (onload) onload(byteArray)
			}

			function fail() {
				if (done) return;
				done = true;
				Module["preloadedAudios"][name] = new Audio;
				if (onerror) onerror()
			}
			if (Browser.hasBlobConstructor) {
				try {
					var b = new Blob([byteArray], {
						type: Browser.getMimetype(name)
					})
				} catch (e) {
					return fail()
				}
				var url = Browser.URLObject.createObjectURL(b);
				var audio = new Audio;
				audio.addEventListener("canplaythrough", function () {
					finish(audio)
				}, false);
				audio.onerror = function audio_onerror(event) {
					if (done) return;
					console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");

					function encode64(data) {
						var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
						var PAD = "=";
						var ret = "";
						var leftchar = 0;
						var leftbits = 0;
						for (var i = 0; i < data.length; i++) {
							leftchar = leftchar << 8 | data[i];
							leftbits += 8;
							while (leftbits >= 6) {
								var curr = leftchar >> leftbits - 6 & 63;
								leftbits -= 6;
								ret += BASE[curr]
							}
						}
						if (leftbits == 2) {
							ret += BASE[(leftchar & 3) << 4];
							ret += PAD + PAD
						} else if (leftbits == 4) {
							ret += BASE[(leftchar & 15) << 2];
							ret += PAD
						}
						return ret
					}
					audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
					finish(audio)
				};
				audio.src = url;
				Browser.safeSetTimeout(function () {
					finish(audio)
				}, 1e4)
			} else {
				return fail()
			}
		};
		Module["preloadPlugins"].push(audioPlugin);

		function pointerLockChange() {
			Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"]
		}
		var canvas = Module["canvas"];
		if (canvas) {
			canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function () {};
			canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function () {};
			canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
			document.addEventListener("pointerlockchange", pointerLockChange, false);
			document.addEventListener("mozpointerlockchange", pointerLockChange, false);
			document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
			document.addEventListener("mspointerlockchange", pointerLockChange, false);
			if (Module["elementPointerLock"]) {
				canvas.addEventListener("click", function (ev) {
					if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
						Module["canvas"].requestPointerLock();
						ev.preventDefault()
					}
				}, false)
			}
		}
	},
	createContext: function (canvas, useWebGL, setInModule, webGLContextAttributes) {
		if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
		var ctx;
		var contextHandle;
		if (useWebGL) {
			var contextAttributes = {
				antialias: false,
				alpha: false,
				majorVersion: 1
			};
			if (webGLContextAttributes) {
				for (var attribute in webGLContextAttributes) {
					contextAttributes[attribute] = webGLContextAttributes[attribute]
				}
			}
			if (typeof GL !== "undefined") {
				contextHandle = GL.createContext(canvas, contextAttributes);
				if (contextHandle) {
					ctx = GL.getContext(contextHandle).GLctx
				}
			}
		} else {
			ctx = canvas.getContext("2d")
		}
		if (!ctx) return null;
		if (setInModule) {
			if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
			Module.ctx = ctx;
			if (useWebGL) GL.makeContextCurrent(contextHandle);
			Module.useWebGL = useWebGL;
			Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
				callback()
			});
			Browser.init()
		}
		return ctx
	},
	destroyContext: function (canvas, useWebGL, setInModule) {},
	fullscreenHandlersInstalled: false,
	lockPointer: undefined,
	resizeCanvas: undefined,
	requestFullscreen: function (lockPointer, resizeCanvas) {
		Browser.lockPointer = lockPointer;
		Browser.resizeCanvas = resizeCanvas;
		if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
		if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
		var canvas = Module["canvas"];

		function fullscreenChange() {
			Browser.isFullscreen = false;
			var canvasContainer = canvas.parentNode;
			if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
				canvas.exitFullscreen = Browser.exitFullscreen;
				if (Browser.lockPointer) canvas.requestPointerLock();
				Browser.isFullscreen = true;
				if (Browser.resizeCanvas) {
					Browser.setFullscreenCanvasSize()
				} else {
					Browser.updateCanvasDimensions(canvas)
				}
			} else {
				canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
				canvasContainer.parentNode.removeChild(canvasContainer);
				if (Browser.resizeCanvas) {
					Browser.setWindowedCanvasSize()
				} else {
					Browser.updateCanvasDimensions(canvas)
				}
			}
			if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
			if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen)
		}
		if (!Browser.fullscreenHandlersInstalled) {
			Browser.fullscreenHandlersInstalled = true;
			document.addEventListener("fullscreenchange", fullscreenChange, false);
			document.addEventListener("mozfullscreenchange", fullscreenChange, false);
			document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
			document.addEventListener("MSFullscreenChange", fullscreenChange, false)
		}
		var canvasContainer = document.createElement("div");
		canvas.parentNode.insertBefore(canvasContainer, canvas);
		canvasContainer.appendChild(canvas);
		canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? function () {
			canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])
		} : null) || (canvasContainer["webkitRequestFullScreen"] ? function () {
			canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])
		} : null);
		canvasContainer.requestFullscreen()
	},
	exitFullscreen: function () {
		if (!Browser.isFullscreen) {
			return false
		}
		var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function () {};
		CFS.apply(document, []);
		return true
	},
	nextRAF: 0,
	fakeRequestAnimationFrame: function (func) {
		var now = Date.now();
		if (Browser.nextRAF === 0) {
			Browser.nextRAF = now + 1e3 / 60
		} else {
			while (now + 2 >= Browser.nextRAF) {
				Browser.nextRAF += 1e3 / 60
			}
		}
		var delay = Math.max(Browser.nextRAF - now, 0);
		setTimeout(func, delay)
	},
	requestAnimationFrame: function (func) {
		if (typeof requestAnimationFrame === "function") {
			requestAnimationFrame(func);
			return
		}
		var RAF = Browser.fakeRequestAnimationFrame;
		RAF(func)
	},
	safeCallback: function (func) {
		return function () {
			if (!ABORT) return func.apply(null, arguments)
		}
	},
	allowAsyncCallbacks: true,
	queuedAsyncCallbacks: [],
	pauseAsyncCallbacks: function () {
		Browser.allowAsyncCallbacks = false
	},
	resumeAsyncCallbacks: function () {
		Browser.allowAsyncCallbacks = true;
		if (Browser.queuedAsyncCallbacks.length > 0) {
			var callbacks = Browser.queuedAsyncCallbacks;
			Browser.queuedAsyncCallbacks = [];
			callbacks.forEach(function (func) {
				func()
			})
		}
	},
	safeRequestAnimationFrame: function (func) {
		return Browser.requestAnimationFrame(function () {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			} else {
				Browser.queuedAsyncCallbacks.push(func)
			}
		})
	},
	safeSetTimeout: function (func, timeout) {
		noExitRuntime = true;
		return setTimeout(function () {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			} else {
				Browser.queuedAsyncCallbacks.push(func)
			}
		}, timeout)
	},
	safeSetInterval: function (func, timeout) {
		noExitRuntime = true;
		return setInterval(function () {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			}
		}, timeout)
	},
	getMimetype: function (name) {
		return {
			"jpg": "image/jpeg",
			"jpeg": "image/jpeg",
			"png": "image/png",
			"bmp": "image/bmp",
			"ogg": "audio/ogg",
			"wav": "audio/wav",
			"mp3": "audio/mpeg"
		}[name.substr(name.lastIndexOf(".") + 1)]
	},
	getUserMedia: function (func) {
		if (!window.getUserMedia) {
			window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"]
		}
		window.getUserMedia(func)
	},
	getMovementX: function (event) {
		return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
	},
	getMovementY: function (event) {
		return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
	},
	getMouseWheelDelta: function (event) {
		var delta = 0;
		switch (event.type) {
			case "DOMMouseScroll":
				delta = event.detail / 3;
				break;
			case "mousewheel":
				delta = event.wheelDelta / 120;
				break;
			case "wheel":
				delta = event.deltaY;
				switch (event.deltaMode) {
					case 0:
						delta /= 100;
						break;
					case 1:
						delta /= 3;
						break;
					case 2:
						delta *= 80;
						break;
					default:
						throw "unrecognized mouse wheel delta mode: " + event.deltaMode
				}
				break;
			default:
				throw "unrecognized mouse wheel event: " + event.type
		}
		return delta
	},
	mouseX: 0,
	mouseY: 0,
	mouseMovementX: 0,
	mouseMovementY: 0,
	touches: {},
	lastTouches: {},
	calculateMouseEvent: function (event) {
		if (Browser.pointerLock) {
			if (event.type != "mousemove" && "mozMovementX" in event) {
				Browser.mouseMovementX = Browser.mouseMovementY = 0
			} else {
				Browser.mouseMovementX = Browser.getMovementX(event);
				Browser.mouseMovementY = Browser.getMovementY(event)
			}
			if (typeof SDL != "undefined") {
				Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
				Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
			} else {
				Browser.mouseX += Browser.mouseMovementX;
				Browser.mouseY += Browser.mouseMovementY
			}
		} else {
			var rect = Module["canvas"].getBoundingClientRect();
			var cw = Module["canvas"].width;
			var ch = Module["canvas"].height;
			var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
			var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
			if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
				var touch = event.touch;
				if (touch === undefined) {
					return
				}
				var adjustedX = touch.pageX - (scrollX + rect.left);
				var adjustedY = touch.pageY - (scrollY + rect.top);
				adjustedX = adjustedX * (cw / rect.width);
				adjustedY = adjustedY * (ch / rect.height);
				var coords = {
					x: adjustedX,
					y: adjustedY
				};
				if (event.type === "touchstart") {
					Browser.lastTouches[touch.identifier] = coords;
					Browser.touches[touch.identifier] = coords
				} else if (event.type === "touchend" || event.type === "touchmove") {
					var last = Browser.touches[touch.identifier];
					if (!last) last = coords;
					Browser.lastTouches[touch.identifier] = last;
					Browser.touches[touch.identifier] = coords
				}
				return
			}
			var x = event.pageX - (scrollX + rect.left);
			var y = event.pageY - (scrollY + rect.top);
			x = x * (cw / rect.width);
			y = y * (ch / rect.height);
			Browser.mouseMovementX = x - Browser.mouseX;
			Browser.mouseMovementY = y - Browser.mouseY;
			Browser.mouseX = x;
			Browser.mouseY = y
		}
	},
	asyncLoad: function (url, onload, onerror, noRunDep) {
		var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
		readAsync(url, function (arrayBuffer) {
			assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
			onload(new Uint8Array(arrayBuffer));
			if (dep) removeRunDependency(dep)
		}, function (event) {
			if (onerror) {
				onerror()
			} else {
				throw 'Loading data file "' + url + '" failed.'
			}
		});
		if (dep) addRunDependency(dep)
	},
	resizeListeners: [],
	updateResizeListeners: function () {
		var canvas = Module["canvas"];
		Browser.resizeListeners.forEach(function (listener) {
			listener(canvas.width, canvas.height)
		})
	},
	setCanvasSize: function (width, height, noUpdates) {
		var canvas = Module["canvas"];
		Browser.updateCanvasDimensions(canvas, width, height);
		if (!noUpdates) Browser.updateResizeListeners()
	},
	windowedWidth: 0,
	windowedHeight: 0,
	setFullscreenCanvasSize: function () {
		if (typeof SDL != "undefined") {
			var flags = HEAPU32[SDL.screen >> 2];
			flags = flags | 8388608;
			HEAP32[SDL.screen >> 2] = flags
		}
		Browser.updateCanvasDimensions(Module["canvas"]);
		Browser.updateResizeListeners()
	},
	setWindowedCanvasSize: function () {
		if (typeof SDL != "undefined") {
			var flags = HEAPU32[SDL.screen >> 2];
			flags = flags & ~8388608;
			HEAP32[SDL.screen >> 2] = flags
		}
		Browser.updateCanvasDimensions(Module["canvas"]);
		Browser.updateResizeListeners()
	},
	updateCanvasDimensions: function (canvas, wNative, hNative) {
		if (wNative && hNative) {
			canvas.widthNative = wNative;
			canvas.heightNative = hNative
		} else {
			wNative = canvas.widthNative;
			hNative = canvas.heightNative
		}
		var w = wNative;
		var h = hNative;
		if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
			if (w / h < Module["forcedAspectRatio"]) {
				w = Math.round(h * Module["forcedAspectRatio"])
			} else {
				h = Math.round(w / Module["forcedAspectRatio"])
			}
		}
		if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
			var factor = Math.min(screen.width / w, screen.height / h);
			w = Math.round(w * factor);
			h = Math.round(h * factor)
		}
		if (Browser.resizeCanvas) {
			if (canvas.width != w) canvas.width = w;
			if (canvas.height != h) canvas.height = h;
			if (typeof canvas.style != "undefined") {
				canvas.style.removeProperty("width");
				canvas.style.removeProperty("height")
			}
		} else {
			if (canvas.width != wNative) canvas.width = wNative;
			if (canvas.height != hNative) canvas.height = hNative;
			if (typeof canvas.style != "undefined") {
				if (w != wNative || h != hNative) {
					canvas.style.setProperty("width", w + "px", "important");
					canvas.style.setProperty("height", h + "px", "important")
				} else {
					canvas.style.removeProperty("width");
					canvas.style.removeProperty("height")
				}
			}
		}
	},
	wgetRequests: {},
	nextWgetRequestHandle: 0,
	getNextWgetRequestHandle: function () {
		var handle = Browser.nextWgetRequestHandle;
		Browser.nextWgetRequestHandle++;
		return handle
	}
};

function _emscripten_exit_with_live_runtime() {
	noExitRuntime = true;
	throw "unwind"
}

function traverseStack(args) {
	if (!args || !args.callee || !args.callee.name) {
		return [null, "", ""]
	}
	var funstr = args.callee.toString();
	var funcname = args.callee.name;
	var str = "(";
	var first = true;
	for (var i in args) {
		var a = args[i];
		if (!first) {
			str += ", "
		}
		first = false;
		if (typeof a === "number" || typeof a === "string") {
			str += a
		} else {
			str += "(" + typeof a + ")"
		}
	}
	str += ")";
	var caller = args.callee.caller;
	args = caller ? caller.arguments : [];
	if (first) str = "";
	return [args, funcname, str]
}

function _emscripten_get_callstack_js(flags) {
	var callstack = jsStackTrace();
	var iThisFunc = callstack.lastIndexOf("_emscripten_log");
	var iThisFunc2 = callstack.lastIndexOf("_emscripten_get_callstack");
	var iNextLine = callstack.indexOf("\n", Math.max(iThisFunc, iThisFunc2)) + 1;
	callstack = callstack.slice(iNextLine);
	if (flags & 8 && typeof emscripten_source_map === "undefined") {
		warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');
		flags ^= 8;
		flags |= 16
	}
	var stack_args = null;
	if (flags & 128) {
		stack_args = traverseStack(arguments);
		while (stack_args[1].indexOf("_emscripten_") >= 0) stack_args = traverseStack(stack_args[0])
	}
	var lines = callstack.split("\n");
	callstack = "";
	var newFirefoxRe = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");
	var firefoxRe = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");
	var chromeRe = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
	for (var l in lines) {
		var line = lines[l];
		var jsSymbolName = "";
		var file = "";
		var lineno = 0;
		var column = 0;
		var parts = chromeRe.exec(line);
		if (parts && parts.length == 5) {
			jsSymbolName = parts[1];
			file = parts[2];
			lineno = parts[3];
			column = parts[4]
		} else {
			parts = newFirefoxRe.exec(line);
			if (!parts) parts = firefoxRe.exec(line);
			if (parts && parts.length >= 4) {
				jsSymbolName = parts[1];
				file = parts[2];
				lineno = parts[3];
				column = parts[4] | 0
			} else {
				callstack += line + "\n";
				continue
			}
		}
		var cSymbolName = flags & 32 ? demangle(jsSymbolName) : jsSymbolName;
		if (!cSymbolName) {
			cSymbolName = jsSymbolName
		}
		var haveSourceMap = false;
		if (flags & 8) {
			var orig = emscripten_source_map.originalPositionFor({
				line: lineno,
				column: column
			});
			haveSourceMap = orig && orig.source;
			if (haveSourceMap) {
				if (flags & 64) {
					orig.source = orig.source.substring(orig.source.replace(/\\/g, "/").lastIndexOf("/") + 1)
				}
				callstack += "    at " + cSymbolName + " (" + orig.source + ":" + orig.line + ":" + orig.column + ")\n"
			}
		}
		if (flags & 16 || !haveSourceMap) {
			if (flags & 64) {
				file = file.substring(file.replace(/\\/g, "/").lastIndexOf("/") + 1)
			}
			callstack += (haveSourceMap ? "     = " + jsSymbolName : "    at " + cSymbolName) + " (" + file + ":" + lineno + ":" + column + ")\n"
		}
		if (flags & 128 && stack_args[0]) {
			if (stack_args[1] == jsSymbolName && stack_args[2].length > 0) {
				callstack = callstack.replace(/\s+$/, "");
				callstack += " with values: " + stack_args[1] + stack_args[2] + "\n"
			}
			stack_args = traverseStack(stack_args[0])
		}
	}
	callstack = callstack.replace(/\s+$/, "");
	return callstack
}

function _emscripten_get_callstack(flags, str, maxbytes) {
	var callstack = _emscripten_get_callstack_js(flags);
	if (!str || maxbytes <= 0) {
		return lengthBytesUTF8(callstack) + 1
	}
	var bytesWrittenExcludingNull = stringToUTF8(callstack, str, maxbytes);
	return bytesWrittenExcludingNull + 1
}

function _emscripten_get_heap_size() {
	return HEAPU8.length
}
var IDBStore = {
	indexedDB: function () {
		if (typeof indexedDB !== "undefined") return indexedDB;
		var ret = null;
		if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		assert(ret, "IDBStore used, but indexedDB not supported");
		return ret
	},
	DB_VERSION: 22,
	DB_STORE_NAME: "FILE_DATA",
	dbs: {},
	blobs: [0],
	getDB: function (name, callback) {
		var db = IDBStore.dbs[name];
		if (db) {
			return callback(null, db)
		}
		var req;
		try {
			req = IDBStore.indexedDB().open(name, IDBStore.DB_VERSION)
		} catch (e) {
			return callback(e)
		}
		req.onupgradeneeded = function (e) {
			var db = e.target.result;
			var transaction = e.target.transaction;
			var fileStore;
			if (db.objectStoreNames.contains(IDBStore.DB_STORE_NAME)) {
				fileStore = transaction.objectStore(IDBStore.DB_STORE_NAME)
			} else {
				fileStore = db.createObjectStore(IDBStore.DB_STORE_NAME)
			}
		};
		req.onsuccess = function () {
			db = req.result;
			IDBStore.dbs[name] = db;
			callback(null, db)
		};
		req.onerror = function (e) {
			callback(this.error);
			e.preventDefault()
		}
	},
	getStore: function (dbName, type, callback) {
		IDBStore.getDB(dbName, function (error, db) {
			if (error) return callback(error);
			var transaction = db.transaction([IDBStore.DB_STORE_NAME], type);
			transaction.onerror = function (e) {
				callback(this.error || "unknown error");
				e.preventDefault()
			};
			var store = transaction.objectStore(IDBStore.DB_STORE_NAME);
			callback(null, store)
		})
	},
	getFile: function (dbName, id, callback) {
		IDBStore.getStore(dbName, "readonly", function (err, store) {
			if (err) return callback(err);
			var req = store.get(id);
			req.onsuccess = function (event) {
				var result = event.target.result;
				if (!result) {
					return callback("file " + id + " not found")
				} else {
					return callback(null, result)
				}
			};
			req.onerror = function (error) {
				callback(error)
			}
		})
	},
	setFile: function (dbName, id, data, callback) {
		IDBStore.getStore(dbName, "readwrite", function (err, store) {
			if (err) return callback(err);
			var req = store.put(data, id);
			req.onsuccess = function (event) {
				callback()
			};
			req.onerror = function (error) {
				callback(error)
			}
		})
	},
	deleteFile: function (dbName, id, callback) {
		IDBStore.getStore(dbName, "readwrite", function (err, store) {
			if (err) return callback(err);
			var req = store.delete(id);
			req.onsuccess = function (event) {
				callback()
			};
			req.onerror = function (error) {
				callback(error)
			}
		})
	},
	existsFile: function (dbName, id, callback) {
		IDBStore.getStore(dbName, "readonly", function (err, store) {
			if (err) return callback(err);
			var req = store.count(id);
			req.onsuccess = function (event) {
				callback(null, event.target.result > 0)
			};
			req.onerror = function (error) {
				callback(error)
			}
		})
	}
};

function _emscripten_idb_async_load(db, id, arg, onload, onerror) {
	IDBStore.getFile(UTF8ToString(db), UTF8ToString(id), function (error, byteArray) {
		if (error) {
			if (onerror) dynCall_vi(onerror, arg);
			return
		}
		var buffer = _malloc(byteArray.length);
		HEAPU8.set(byteArray, buffer);
		dynCall_viii(onload, arg, buffer, byteArray.length);
		_free(buffer)
	})
}

function _emscripten_idb_async_store(db, id, ptr, num, arg, onstore, onerror) {
	IDBStore.setFile(UTF8ToString(db), UTF8ToString(id), new Uint8Array(HEAPU8.subarray(ptr, ptr + num)), function (error) {
		if (error) {
			if (onerror) dynCall_vi(onerror, arg);
			return
		}
		if (onstore) dynCall_vi(onstore, arg)
	})
}

function emscripten_realloc_buffer(size) {
	try {
		wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
		updateGlobalBufferAndViews(wasmMemory.buffer);
		return 1
	} catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
	requestedSize = requestedSize >>> 0;
	var oldSize = _emscripten_get_heap_size();
	var PAGE_MULTIPLE = 65536;
	var maxHeapSize = 2147483648;
	if (requestedSize > maxHeapSize) {
		return false
	}
	var minHeapSize = 16777216;
	for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
		var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
		overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
		var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
		var replacement = emscripten_realloc_buffer(newSize);
		if (replacement) {
			return true
		}
	}
	return false
}

function _exit(status) {
	exit(status)
}

function _getenv(name) {
	if (name === 0) return 0;
	name = UTF8ToString(name);
	if (!ENV.hasOwnProperty(name)) return 0;
	if (_getenv.ret) _free(_getenv.ret);
	_getenv.ret = allocateUTF8(ENV[name]);
	return _getenv.ret
}

function _gettimeofday(ptr) {
	var now = Date.now();
	HEAP32[ptr >> 2] = now / 1e3 | 0;
	HEAP32[ptr + 4 >> 2] = now % 1e3 * 1e3 | 0;
	return 0
}
var ___tm_current = 1204512;
var ___tm_timezone = (stringToUTF8("GMT", 1204560, 4), 1204560);

function _gmtime_r(time, tmPtr) {
	var date = new Date(HEAP32[time >> 2] * 1e3);
	HEAP32[tmPtr >> 2] = date.getUTCSeconds();
	HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
	HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
	HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
	HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
	HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
	HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
	HEAP32[tmPtr + 36 >> 2] = 0;
	HEAP32[tmPtr + 32 >> 2] = 0;
	var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
	var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
	HEAP32[tmPtr + 28 >> 2] = yday;
	HEAP32[tmPtr + 40 >> 2] = ___tm_timezone;
	return tmPtr
}

function _gmtime(time) {
	return _gmtime_r(time, ___tm_current)
}

function _llvm_eh_typeid_for(type) {
	return type
}

function _llvm_stackrestore(p) {
	var self = _llvm_stacksave;
	var ret = self.LLVM_SAVEDSTACKS[p];
	self.LLVM_SAVEDSTACKS.splice(p, 1);
	stackRestore(ret)
}

function _llvm_stacksave() {
	var self = _llvm_stacksave;
	if (!self.LLVM_SAVEDSTACKS) {
		self.LLVM_SAVEDSTACKS = []
	}
	self.LLVM_SAVEDSTACKS.push(stackSave());
	return self.LLVM_SAVEDSTACKS.length - 1
}

function _llvm_trap() {
	abort("trap!")
}

function _emscripten_memcpy_big(dest, src, num) {
	HEAPU8.copyWithin(dest, src, src + num)
}

function _usleep(useconds) {
	var start = _emscripten_get_now();
	while (_emscripten_get_now() - start < useconds / 1e3) {}
}

function _nanosleep(rqtp, rmtp) {
	if (rqtp === 0) {
		setErrNo(28);
		return -1
	}
	var seconds = HEAP32[rqtp >> 2];
	var nanoseconds = HEAP32[rqtp + 4 >> 2];
	if (nanoseconds < 0 || nanoseconds > 999999999 || seconds < 0) {
		setErrNo(28);
		return -1
	}
	if (rmtp !== 0) {
		HEAP32[rmtp >> 2] = 0;
		HEAP32[rmtp + 4 >> 2] = 0
	}
	return _usleep(seconds * 1e6 + nanoseconds / 1e3)
}

function _pthread_mutexattr_destroy() {}

function _pthread_mutexattr_init() {}

function _pthread_mutexattr_settype() {}

function _sigaction(signum, act, oldact) {
	return 0
}
var __sigalrm_handler = 0;

function _signal(sig, func) {
	if (sig == 14) {
		__sigalrm_handler = func
	} else {}
	return 0
}

function __isLeapYear(year) {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function __arraySum(array, index) {
	var sum = 0;
	for (var i = 0; i <= index; sum += array[i++]) {}
	return sum
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function __addDays(date, days) {
	var newDate = new Date(date.getTime());
	while (days > 0) {
		var leap = __isLeapYear(newDate.getFullYear());
		var currentMonth = newDate.getMonth();
		var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
		if (days > daysInCurrentMonth - newDate.getDate()) {
			days -= daysInCurrentMonth - newDate.getDate() + 1;
			newDate.setDate(1);
			if (currentMonth < 11) {
				newDate.setMonth(currentMonth + 1)
			} else {
				newDate.setMonth(0);
				newDate.setFullYear(newDate.getFullYear() + 1)
			}
		} else {
			newDate.setDate(newDate.getDate() + days);
			return newDate
		}
	}
	return newDate
}

function _strftime(s, maxsize, format, tm) {
	var tm_zone = HEAP32[tm + 40 >> 2];
	var date = {
		tm_sec: HEAP32[tm >> 2],
		tm_min: HEAP32[tm + 4 >> 2],
		tm_hour: HEAP32[tm + 8 >> 2],
		tm_mday: HEAP32[tm + 12 >> 2],
		tm_mon: HEAP32[tm + 16 >> 2],
		tm_year: HEAP32[tm + 20 >> 2],
		tm_wday: HEAP32[tm + 24 >> 2],
		tm_yday: HEAP32[tm + 28 >> 2],
		tm_isdst: HEAP32[tm + 32 >> 2],
		tm_gmtoff: HEAP32[tm + 36 >> 2],
		tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
	};
	var pattern = UTF8ToString(format);
	var EXPANSION_RULES_1 = {
		"%c": "%a %b %d %H:%M:%S %Y",
		"%D": "%m/%d/%y",
		"%F": "%Y-%m-%d",
		"%h": "%b",
		"%r": "%I:%M:%S %p",
		"%R": "%H:%M",
		"%T": "%H:%M:%S",
		"%x": "%m/%d/%y",
		"%X": "%H:%M:%S",
		"%Ec": "%c",
		"%EC": "%C",
		"%Ex": "%m/%d/%y",
		"%EX": "%H:%M:%S",
		"%Ey": "%y",
		"%EY": "%Y",
		"%Od": "%d",
		"%Oe": "%e",
		"%OH": "%H",
		"%OI": "%I",
		"%Om": "%m",
		"%OM": "%M",
		"%OS": "%S",
		"%Ou": "%u",
		"%OU": "%U",
		"%OV": "%V",
		"%Ow": "%w",
		"%OW": "%W",
		"%Oy": "%y"
	};
	for (var rule in EXPANSION_RULES_1) {
		pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule])
	}
	var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	function leadingSomething(value, digits, character) {
		var str = typeof value === "number" ? value.toString() : value || "";
		while (str.length < digits) {
			str = character[0] + str
		}
		return str
	}

	function leadingNulls(value, digits) {
		return leadingSomething(value, digits, "0")
	}

	function compareByDay(date1, date2) {
		function sgn(value) {
			return value < 0 ? -1 : value > 0 ? 1 : 0
		}
		var compare;
		if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
			if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
				compare = sgn(date1.getDate() - date2.getDate())
			}
		}
		return compare
	}

	function getFirstWeekStartDate(janFourth) {
		switch (janFourth.getDay()) {
			case 0:
				return new Date(janFourth.getFullYear() - 1, 11, 29);
			case 1:
				return janFourth;
			case 2:
				return new Date(janFourth.getFullYear(), 0, 3);
			case 3:
				return new Date(janFourth.getFullYear(), 0, 2);
			case 4:
				return new Date(janFourth.getFullYear(), 0, 1);
			case 5:
				return new Date(janFourth.getFullYear() - 1, 11, 31);
			case 6:
				return new Date(janFourth.getFullYear() - 1, 11, 30)
		}
	}

	function getWeekBasedYear(date) {
		var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
		var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
		var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
		var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
		var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
		if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
			if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
				return thisDate.getFullYear() + 1
			} else {
				return thisDate.getFullYear()
			}
		} else {
			return thisDate.getFullYear() - 1
		}
	}
	var EXPANSION_RULES_2 = {
		"%a": function (date) {
			return WEEKDAYS[date.tm_wday].substring(0, 3)
		},
		"%A": function (date) {
			return WEEKDAYS[date.tm_wday]
		},
		"%b": function (date) {
			return MONTHS[date.tm_mon].substring(0, 3)
		},
		"%B": function (date) {
			return MONTHS[date.tm_mon]
		},
		"%C": function (date) {
			var year = date.tm_year + 1900;
			return leadingNulls(year / 100 | 0, 2)
		},
		"%d": function (date) {
			return leadingNulls(date.tm_mday, 2)
		},
		"%e": function (date) {
			return leadingSomething(date.tm_mday, 2, " ")
		},
		"%g": function (date) {
			return getWeekBasedYear(date).toString().substring(2)
		},
		"%G": function (date) {
			return getWeekBasedYear(date)
		},
		"%H": function (date) {
			return leadingNulls(date.tm_hour, 2)
		},
		"%I": function (date) {
			var twelveHour = date.tm_hour;
			if (twelveHour == 0) twelveHour = 12;
			else if (twelveHour > 12) twelveHour -= 12;
			return leadingNulls(twelveHour, 2)
		},
		"%j": function (date) {
			return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
		},
		"%m": function (date) {
			return leadingNulls(date.tm_mon + 1, 2)
		},
		"%M": function (date) {
			return leadingNulls(date.tm_min, 2)
		},
		"%n": function () {
			return "\n"
		},
		"%p": function (date) {
			if (date.tm_hour >= 0 && date.tm_hour < 12) {
				return "AM"
			} else {
				return "PM"
			}
		},
		"%S": function (date) {
			return leadingNulls(date.tm_sec, 2)
		},
		"%t": function () {
			return "\t"
		},
		"%u": function (date) {
			return date.tm_wday || 7
		},
		"%U": function (date) {
			var janFirst = new Date(date.tm_year + 1900, 0, 1);
			var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
			var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
			if (compareByDay(firstSunday, endDate) < 0) {
				var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
				var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
				var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
				return leadingNulls(Math.ceil(days / 7), 2)
			}
			return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00"
		},
		"%V": function (date) {
			var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
			var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
			var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
			var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
			var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
			if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
				return "53"
			}
			if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
				return "01"
			}
			var daysDifference;
			if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
				daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
			} else {
				daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
			}
			return leadingNulls(Math.ceil(daysDifference / 7), 2)
		},
		"%w": function (date) {
			return date.tm_wday
		},
		"%W": function (date) {
			var janFirst = new Date(date.tm_year, 0, 1);
			var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
			var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
			if (compareByDay(firstMonday, endDate) < 0) {
				var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
				var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
				var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
				return leadingNulls(Math.ceil(days / 7), 2)
			}
			return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00"
		},
		"%y": function (date) {
			return (date.tm_year + 1900).toString().substring(2)
		},
		"%Y": function (date) {
			return date.tm_year + 1900
		},
		"%z": function (date) {
			var off = date.tm_gmtoff;
			var ahead = off >= 0;
			off = Math.abs(off) / 60;
			off = off / 60 * 100 + off % 60;
			return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
		},
		"%Z": function (date) {
			return date.tm_zone
		},
		"%%": function () {
			return "%"
		}
	};
	for (var rule in EXPANSION_RULES_2) {
		if (pattern.indexOf(rule) >= 0) {
			pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date))
		}
	}
	var bytes = intArrayFromString(pattern, false);
	if (bytes.length > maxsize) {
		return 0
	}
	writeArrayToMemory(bytes, s);
	return bytes.length - 1
}

function _strftime_l(s, maxsize, format, tm) {
	return _strftime(s, maxsize, format, tm)
}

function _sysconf(name) {
	switch (name) {
		case 30:
			return 16384;
		case 85:
			var maxHeapSize = 2147483648;
			return maxHeapSize / 16384;
		case 132:
		case 133:
		case 12:
		case 137:
		case 138:
		case 15:
		case 235:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
		case 149:
		case 13:
		case 10:
		case 236:
		case 153:
		case 9:
		case 21:
		case 22:
		case 159:
		case 154:
		case 14:
		case 77:
		case 78:
		case 139:
		case 80:
		case 81:
		case 82:
		case 68:
		case 67:
		case 164:
		case 11:
		case 29:
		case 47:
		case 48:
		case 95:
		case 52:
		case 51:
		case 46:
		case 79:
			return 200809;
		case 27:
		case 246:
		case 127:
		case 128:
		case 23:
		case 24:
		case 160:
		case 161:
		case 181:
		case 182:
		case 242:
		case 183:
		case 184:
		case 243:
		case 244:
		case 245:
		case 165:
		case 178:
		case 179:
		case 49:
		case 50:
		case 168:
		case 169:
		case 175:
		case 170:
		case 171:
		case 172:
		case 97:
		case 76:
		case 32:
		case 173:
		case 35:
			return -1;
		case 176:
		case 177:
		case 7:
		case 155:
		case 8:
		case 157:
		case 125:
		case 126:
		case 92:
		case 93:
		case 129:
		case 130:
		case 131:
		case 94:
		case 91:
			return 1;
		case 74:
		case 60:
		case 69:
		case 70:
		case 4:
			return 1024;
		case 31:
		case 42:
		case 72:
			return 32;
		case 87:
		case 26:
		case 33:
			return 2147483647;
		case 34:
		case 1:
			return 47839;
		case 38:
		case 36:
			return 99;
		case 43:
		case 37:
			return 2048;
		case 0:
			return 2097152;
		case 3:
			return 65536;
		case 28:
			return 32768;
		case 44:
			return 32767;
		case 75:
			return 16384;
		case 39:
			return 1e3;
		case 89:
			return 700;
		case 71:
			return 256;
		case 40:
			return 255;
		case 2:
			return 100;
		case 180:
			return 64;
		case 25:
			return 20;
		case 5:
			return 16;
		case 6:
			return 6;
		case 73:
			return 4;
		case 84:
			{
				if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
				return 1
			}
	}
	setErrNo(28);
	return -1
}

function _time(ptr) {
	var ret = Date.now() / 1e3 | 0;
	if (ptr) {
		HEAP32[ptr >> 2] = ret
	}
	return ret
}
var FSNode = function (parent, name, mode, rdev) {
	if (!parent) {
		parent = this
	}
	this.parent = parent;
	this.mount = parent.mount;
	this.mounted = null;
	this.id = FS.nextInode++;
	this.name = name;
	this.mode = mode;
	this.node_ops = {};
	this.stream_ops = {};
	this.rdev = rdev
};
var readMode = 292 | 73;
var writeMode = 146;
Object.defineProperties(FSNode.prototype, {
	read: {
		get: function () {
			return (this.mode & readMode) === readMode
		},
		set: function (val) {
			val ? this.mode |= readMode : this.mode &= ~readMode
		}
	},
	write: {
		get: function () {
			return (this.mode & writeMode) === writeMode
		},
		set: function (val) {
			val ? this.mode |= writeMode : this.mode &= ~writeMode
		}
	},
	isFolder: {
		get: function () {
			return FS.isDir(this.mode)
		}
	},
	isDevice: {
		get: function () {
			return FS.isChrdev(this.mode)
		}
	}
});
FS.FSNode = FSNode;
FS.staticInit();
InternalError = Module["InternalError"] = extendError(Error, "InternalError");
embind_init_charCodes();
BindingError = Module["BindingError"] = extendError(Error, "BindingError");
init_ClassHandle();
init_RegisteredPointer();
init_embind();
UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
init_emval();
Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
	Browser.requestFullscreen(lockPointer, resizeCanvas)
};
Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
	Browser.requestAnimationFrame(func)
};
Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
	Browser.setCanvasSize(width, height, noUpdates)
};
Module["pauseMainLoop"] = function Module_pauseMainLoop() {
	Browser.mainLoop.pause()
};
Module["resumeMainLoop"] = function Module_resumeMainLoop() {
	Browser.mainLoop.resume()
};
Module["getUserMedia"] = function Module_getUserMedia() {
	Browser.getUserMedia()
};
Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
	return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
};

function intArrayFromString(stringy, dontAddNull, length) {
	var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
	var u8array = new Array(len);
	var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
	if (dontAddNull) u8array.length = numBytesWritten;
	return u8array
}

function invoke_diii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_diii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_fiii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_fiii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_i(index) {
	var sp = stackSave();
	try {
		return dynCall_i(index)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_ii(index, a1) {
	var sp = stackSave();
	try {
		return dynCall_ii(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iif(index, a1, a2) {
	var sp = stackSave();
	try {
		return dynCall_iif(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iii(index, a1, a2) {
	var sp = stackSave();
	try {
		return dynCall_iii(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_iiii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_iiiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		return dynCall_iiiiid(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		return dynCall_iiiiii(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiijii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiijii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iij(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_iij(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_ji(index, a1) {
	var sp = stackSave();
	try {
		return dynCall_ji(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_jiiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_jiiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_v(index) {
	var sp = stackSave();
	try {
		dynCall_v(index)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vi(index, a1) {
	var sp = stackSave();
	try {
		dynCall_vi(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vii(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vii(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_viii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		dynCall_viiiii(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		dynCall_viiiiii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vij(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_vij(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viji(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viji(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		dynCall_vijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vijjjii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	var sp = stackSave();
	try {
		dynCall_vijjjii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}
var asmGlobalArg = {};
var asmLibraryArg = {
	"Xa": ___atomic_compare_exchange_8,
	"Wb": ___buildEnvironment,
	"k": ___cxa_allocate_exception,
	"r": ___cxa_begin_catch,
	"Vb": ___cxa_current_primary_exception,
	"Ma": ___cxa_decrement_exception_refcount,
	"F": ___cxa_end_catch,
	"b": ___cxa_find_matching_catch_2,
	"d": ___cxa_find_matching_catch_3,
	"l": ___cxa_find_matching_catch_4,
	"m": ___cxa_free_exception,
	"La": ___cxa_increment_exception_refcount,
	"Ka": ___cxa_rethrow,
	"Ub": ___cxa_rethrow_primary_exception,
	"q": ___cxa_throw,
	"Tb": ___cxa_uncaught_exceptions,
	"Sb": ___map_file,
	"c": ___resumeException,
	"Rb": ___syscall10,
	"Qb": ___syscall193,
	"Ja": ___syscall195,
	"Pb": ___syscall196,
	"Ob": ___syscall197,
	"Nb": ___syscall199,
	"qa": ___syscall20,
	"Mb": ___syscall200,
	"Lb": ___syscall201,
	"Kb": ___syscall202,
	"Jb": ___syscall220,
	"Ia": ___syscall221,
	"Ib": ___syscall268,
	"Hb": ___syscall3,
	"Gb": ___syscall33,
	"Fb": ___syscall38,
	"Eb": ___syscall39,
	"Db": ___syscall40,
	"Ha": ___syscall5,
	"Ga": ___syscall54,
	"Cb": ___syscall91,
	"pa": ___wasi_fd_close,
	"Bb": ___wasi_fd_fdstat_get,
	"Ab": ___wasi_fd_read,
	"Wa": ___wasi_fd_seek,
	"zb": ___wasi_fd_write,
	"yb": __embind_finalize_value_object,
	"xb": __embind_register_bool,
	"I": __embind_register_class,
	"$": __embind_register_class_class_function,
	"W": __embind_register_class_constructor,
	"z": __embind_register_class_function,
	"D": __embind_register_class_property,
	"wb": __embind_register_emval,
	"P": __embind_register_enum,
	"A": __embind_register_enum_value,
	"Fa": __embind_register_float,
	"fa": __embind_register_function,
	"_": __embind_register_integer,
	"Y": __embind_register_memory_view,
	"O": __embind_register_smart_ptr,
	"Ea": __embind_register_std_string,
	"va": __embind_register_std_wstring,
	"Da": __embind_register_value_object,
	"vb": __embind_register_value_object_field,
	"ub": __embind_register_void,
	"S": __emval_as,
	"ea": __emval_call,
	"V": __emval_call_method,
	"U": __emval_call_void_method,
	"Ca": __emval_decref,
	"tb": __emval_equals,
	"N": __emval_get_global,
	"sb": __emval_get_method_caller,
	"rb": __emval_get_property,
	"C": __emval_incref,
	"Ba": __emval_new,
	"K": __emval_new_array,
	"w": __emval_new_cstring,
	"G": __emval_new_object,
	"qb": __emval_run_destructors,
	"pb": __emval_set_property,
	"Aa": __emval_strictly_equals,
	"R": __emval_take_value,
	"ob": __emval_typeof,
	"__memory_base": 1024,
	"__table_base": 0,
	"ua": _abort,
	"nb": _atexit,
	"ta": _clock_gettime,
	"L": _emscripten_asm_const_i,
	"mb": _emscripten_asm_const_ii,
	"lb": _emscripten_exit_with_live_runtime,
	"kb": _emscripten_get_callstack,
	"jb": _emscripten_get_heap_size,
	"za": _emscripten_idb_async_load,
	"ya": _emscripten_idb_async_store,
	"ib": _emscripten_memcpy_big,
	"hb": _emscripten_resize_heap,
	"ca": _exit,
	"la": _getenv,
	"ka": _gettimeofday,
	"gb": _gmtime,
	"u": _llvm_eh_typeid_for,
	"ba": _llvm_stackrestore,
	"aa": _llvm_stacksave,
	"da": _llvm_trap,
	"fb": _nanosleep,
	"xa": _pthread_mutexattr_destroy,
	"eb": _pthread_mutexattr_init,
	"db": _pthread_mutexattr_settype,
	"E": _sigaction,
	"cb": _signal,
	"bb": _strftime_l,
	"ab": _sysconf,
	"Q": _time,
	"H": abort,
	"a": getTempRet0,
	"t": invoke_diii,
	"wa": invoke_fiii,
	"v": invoke_i,
	"f": invoke_ii,
	"$a": invoke_iif,
	"j": invoke_iii,
	"n": invoke_iiii,
	"x": invoke_iiiii,
	"_a": invoke_iiiiid,
	"B": invoke_iiiiii,
	"M": invoke_iiiiiii,
	"ja": invoke_iiiiiiii,
	"ia": invoke_iiiiiiiii,
	"Za": invoke_iiiiiiiiii,
	"X": invoke_iiiiiiiiiii,
	"oa": invoke_iiiiiiiiiiii,
	"ha": invoke_iiiiiiiiiiiii,
	"Va": invoke_iiiiij,
	"Ua": invoke_iiijii,
	"Ta": invoke_iij,
	"Sa": invoke_ji,
	"Ra": invoke_jiiii,
	"o": invoke_v,
	"e": invoke_vi,
	"g": invoke_vii,
	"h": invoke_viii,
	"i": invoke_viiii,
	"s": invoke_viiiii,
	"p": invoke_viiiiii,
	"y": invoke_viiiiiii,
	"J": invoke_viiiiiiii,
	"ga": invoke_viiiiiiiii,
	"T": invoke_viiiiiiiiii,
	"sa": invoke_viiiiiiiiiii,
	"na": invoke_viiiiiiiiiiii,
	"Z": invoke_viiiiiiiiiiiii,
	"Ya": invoke_viiiiiiiiiiiiii,
	"ma": invoke_viiiiiiiiiiiiiii,
	"Qa": invoke_vij,
	"Pa": invoke_viji,
	"Oa": invoke_vijjiii,
	"Na": invoke_vijjjii,
	"memory": wasmMemory,
	"ra": setTempRet0,
	"table": wasmTable
};
var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = function () {
	return (__ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = Module["asm"]["Xb"]).apply(null, arguments)
};
var ___cxa_can_catch = Module["___cxa_can_catch"] = function () {
	return (___cxa_can_catch = Module["___cxa_can_catch"] = Module["asm"]["Yb"]).apply(null, arguments)
};
var ___cxa_demangle = Module["___cxa_demangle"] = function () {
	return (___cxa_demangle = Module["___cxa_demangle"] = Module["asm"]["Zb"]).apply(null, arguments)
};
var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function () {
	return (___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = Module["asm"]["_b"]).apply(null, arguments)
};
var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function () {
	return (___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = Module["asm"]["$b"]).apply(null, arguments)
};
var ___errno_location = Module["___errno_location"] = function () {
	return (___errno_location = Module["___errno_location"] = Module["asm"]["ac"]).apply(null, arguments)
};
var ___getTypeName = Module["___getTypeName"] = function () {
	return (___getTypeName = Module["___getTypeName"] = Module["asm"]["bc"]).apply(null, arguments)
};
var _free = Module["_free"] = function () {
	return (_free = Module["_free"] = Module["asm"]["cc"]).apply(null, arguments)
};
var _main = Module["_main"] = function () {
	return (_main = Module["_main"] = Module["asm"]["dc"]).apply(null, arguments)
};
var _malloc = Module["_malloc"] = function () {
	return (_malloc = Module["_malloc"] = Module["asm"]["ec"]).apply(null, arguments)
};
var _setThrew = Module["_setThrew"] = function () {
	return (_setThrew = Module["_setThrew"] = Module["asm"]["fc"]).apply(null, arguments)
};
var globalCtors = Module["globalCtors"] = function () {
	return (globalCtors = Module["globalCtors"] = Module["asm"]["$c"]).apply(null, arguments)
};
var stackAlloc = Module["stackAlloc"] = function () {
	return (stackAlloc = Module["stackAlloc"] = Module["asm"]["ad"]).apply(null, arguments)
};
var stackRestore = Module["stackRestore"] = function () {
	return (stackRestore = Module["stackRestore"] = Module["asm"]["bd"]).apply(null, arguments)
};
var stackSave = Module["stackSave"] = function () {
	return (stackSave = Module["stackSave"] = Module["asm"]["cd"]).apply(null, arguments)
};
var dynCall_diii = Module["dynCall_diii"] = function () {
	return (dynCall_diii = Module["dynCall_diii"] = Module["asm"]["gc"]).apply(null, arguments)
};
var dynCall_fiii = Module["dynCall_fiii"] = function () {
	return (dynCall_fiii = Module["dynCall_fiii"] = Module["asm"]["hc"]).apply(null, arguments)
};
var dynCall_i = Module["dynCall_i"] = function () {
	return (dynCall_i = Module["dynCall_i"] = Module["asm"]["ic"]).apply(null, arguments)
};
var dynCall_ii = Module["dynCall_ii"] = function () {
	return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["jc"]).apply(null, arguments)
};
var dynCall_iidiiii = Module["dynCall_iidiiii"] = function () {
	return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["kc"]).apply(null, arguments)
};
var dynCall_iif = Module["dynCall_iif"] = function () {
	return (dynCall_iif = Module["dynCall_iif"] = Module["asm"]["lc"]).apply(null, arguments)
};
var dynCall_iii = Module["dynCall_iii"] = function () {
	return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["mc"]).apply(null, arguments)
};
var dynCall_iiid = Module["dynCall_iiid"] = function () {
	return (dynCall_iiid = Module["dynCall_iiid"] = Module["asm"]["nc"]).apply(null, arguments)
};
var dynCall_iiii = Module["dynCall_iiii"] = function () {
	return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["oc"]).apply(null, arguments)
};
var dynCall_iiiii = Module["dynCall_iiiii"] = function () {
	return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["pc"]).apply(null, arguments)
};
var dynCall_iiiiid = Module["dynCall_iiiiid"] = function () {
	return (dynCall_iiiiid = Module["dynCall_iiiiid"] = Module["asm"]["qc"]).apply(null, arguments)
};
var dynCall_iiiiii = Module["dynCall_iiiiii"] = function () {
	return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["rc"]).apply(null, arguments)
};
var dynCall_iiiiiid = Module["dynCall_iiiiiid"] = function () {
	return (dynCall_iiiiiid = Module["dynCall_iiiiiid"] = Module["asm"]["sc"]).apply(null, arguments)
};
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function () {
	return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["tc"]).apply(null, arguments)
};
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function () {
	return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["uc"]).apply(null, arguments)
};
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function () {
	return (dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = Module["asm"]["vc"]).apply(null, arguments)
};
var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function () {
	return (dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = Module["asm"]["wc"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = function () {
	return (dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = Module["asm"]["xc"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = function () {
	return (dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = Module["asm"]["yc"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = function () {
	return (dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = Module["asm"]["zc"]).apply(null, arguments)
};
var dynCall_iiiiij = Module["dynCall_iiiiij"] = function () {
	return (dynCall_iiiiij = Module["dynCall_iiiiij"] = Module["asm"]["Ac"]).apply(null, arguments)
};
var dynCall_iiijii = Module["dynCall_iiijii"] = function () {
	return (dynCall_iiijii = Module["dynCall_iiijii"] = Module["asm"]["Bc"]).apply(null, arguments)
};
var dynCall_iij = Module["dynCall_iij"] = function () {
	return (dynCall_iij = Module["dynCall_iij"] = Module["asm"]["Cc"]).apply(null, arguments)
};
var dynCall_ji = Module["dynCall_ji"] = function () {
	return (dynCall_ji = Module["dynCall_ji"] = Module["asm"]["Dc"]).apply(null, arguments)
};
var dynCall_jiiii = Module["dynCall_jiiii"] = function () {
	return (dynCall_jiiii = Module["dynCall_jiiii"] = Module["asm"]["Ec"]).apply(null, arguments)
};
var dynCall_jiji = Module["dynCall_jiji"] = function () {
	return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["Fc"]).apply(null, arguments)
};
var dynCall_v = Module["dynCall_v"] = function () {
	return (dynCall_v = Module["dynCall_v"] = Module["asm"]["Gc"]).apply(null, arguments)
};
var dynCall_vi = Module["dynCall_vi"] = function () {
	return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["Hc"]).apply(null, arguments)
};
var dynCall_vii = Module["dynCall_vii"] = function () {
	return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["Ic"]).apply(null, arguments)
};
var dynCall_viii = Module["dynCall_viii"] = function () {
	return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["Jc"]).apply(null, arguments)
};
var dynCall_viiii = Module["dynCall_viiii"] = function () {
	return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["Kc"]).apply(null, arguments)
};
var dynCall_viiiii = Module["dynCall_viiiii"] = function () {
	return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["Lc"]).apply(null, arguments)
};
var dynCall_viiiiii = Module["dynCall_viiiiii"] = function () {
	return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["Mc"]).apply(null, arguments)
};
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = function () {
	return (dynCall_viiiiiii = Module["dynCall_viiiiiii"] = Module["asm"]["Nc"]).apply(null, arguments)
};
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = function () {
	return (dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = Module["asm"]["Oc"]).apply(null, arguments)
};
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = function () {
	return (dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = Module["asm"]["Pc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = Module["asm"]["Qc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = Module["asm"]["Rc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiii = Module["dynCall_viiiiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiiiii = Module["dynCall_viiiiiiiiiiii"] = Module["asm"]["Sc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiii"] = Module["asm"]["Tc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiii"] = Module["asm"]["Uc"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = function () {
	return (dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = Module["asm"]["Vc"]).apply(null, arguments)
};
var dynCall_viijii = Module["dynCall_viijii"] = function () {
	return (dynCall_viijii = Module["dynCall_viijii"] = Module["asm"]["Wc"]).apply(null, arguments)
};
var dynCall_vij = Module["dynCall_vij"] = function () {
	return (dynCall_vij = Module["dynCall_vij"] = Module["asm"]["Xc"]).apply(null, arguments)
};
var dynCall_viji = Module["dynCall_viji"] = function () {
	return (dynCall_viji = Module["dynCall_viji"] = Module["asm"]["Yc"]).apply(null, arguments)
};
var dynCall_vijjiii = Module["dynCall_vijjiii"] = function () {
	return (dynCall_vijjiii = Module["dynCall_vijjiii"] = Module["asm"]["Zc"]).apply(null, arguments)
};
var dynCall_vijjjii = Module["dynCall_vijjjii"] = function () {
	return (dynCall_vijjjii = Module["dynCall_vijjjii"] = Module["asm"]["_c"]).apply(null, arguments)
};
Module["__ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPKvE5__fmt"] = 1173155;
Module["__ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwmE5__fmt"] = 1173164;
var calledRun;

function ExitStatus(status) {
	this.name = "ExitStatus";
	this.message = "Program terminated with exit(" + status + ")";
	this.status = status
}
var calledMain = false;
dependenciesFulfilled = function runCaller() {
	if (!calledRun) run();
	if (!calledRun) dependenciesFulfilled = runCaller
};

function callMain(args) {
	var entryFunction = Module["_main"];
	args = args || [];
	var argc = args.length + 1;
	var argv = stackAlloc((argc + 1) * 4);
	HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
	for (var i = 1; i < argc; i++) {
		HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
	}
	HEAP32[(argv >> 2) + argc] = 0;
	try {
		var ret = entryFunction(argc, argv);
		exit(ret, true)
	} catch (e) {
		if (e instanceof ExitStatus) {
			return
		} else if (e == "unwind") {
			noExitRuntime = true;
			return
		} else {
			var toLog = e;
			if (e && typeof e === "object" && e.stack) {
				toLog = [e, e.stack]
			}
			err("exception thrown: " + toLog);
			quit_(1, e)
		}
	} finally {
		calledMain = true
	}
}

function run(args) {
	args = args || arguments_;
	if (runDependencies > 0) {
		return
	}
	preRun();
	if (runDependencies > 0) return;

	function doRun() {
		if (calledRun) return;
		calledRun = true;
		Module["calledRun"] = true;
		if (ABORT) return;
		initRuntime();
		preMain();
		if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
		if (shouldRunNow) callMain(args);
		postRun()
	}
	if (Module["setStatus"]) {
		Module["setStatus"]("Running...");
		setTimeout(function () {
			setTimeout(function () {
				Module["setStatus"]("")
			}, 1);
			doRun()
		}, 1)
	} else {
		doRun()
	}
}
Module["run"] = run;

function exit(status, implicit) {
	if (implicit && noExitRuntime && status === 0) {
		return
	}
	if (noExitRuntime) {} else {
		ABORT = true;
		EXITSTATUS = status;
		exitRuntime();
		if (Module["onExit"]) Module["onExit"](status)
	}
	quit_(status, new ExitStatus(status))
}
if (Module["preInit"]) {
	if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
	while (Module["preInit"].length > 0) {
		Module["preInit"].pop()()
	}
}
var shouldRunNow = true;
if (Module["noInitialRun"]) shouldRunNow = false;
noExitRuntime = true;
run();