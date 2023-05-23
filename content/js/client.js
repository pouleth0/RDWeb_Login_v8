function FeedData() {
	return {
		loading: !0,
		loadFailed: !1,
		multiTenant: !1,
		numRetry: 0,
		workspaces: []
	}
}
var PlatformInfo = function (a, b, c) {
		"use strict";
		var d = this,
			e = a.getResultObject();
		d.isMac = navigator.platform.indexOf("Mac") > -1, d.isFirefox = void 0 !== b.mozInnerScreenX, d.isChrome = "Chrome" === e.browser.name, d.isIE = "IE" === e.browser.name, d.isSafari = "Safari" === e.browser.name, d.isEdge = "Edge" === e.browser.name, d.isTouchDevice = function () {
			return "ontouchstart" in b || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
		}, d.getWindowWidth = function () {
			return b.innerWidth
		}, d.getWindowHeight = function () {
			return b.innerHeight
		}, d.getWindowScale = function () {
			return b.devicePixelRatio
		}, d.getLocale = function () {
			return c.use()
		}, d.isHardwareModeEnabled = function () {
			return Module.IsWebGLSupported()
		};
		var f = function (a) {
			return a && a.toString().trim() ? a : "<>"
		};
		return d.clientVersion = "1.0.25.0", d.clientTarget = "Live", d.clientOS = function (a) {
			switch (a) {
				case "Mac OS":
					return "macOS";
				case "Chromium OS":
					return "CrOS";
				default:
					return a
			}
		}(a.getOSInfo().name), d.clientOSVersion = f(a.getOSInfo().version), d.browserName = a.getBrowserInfo().name, d.browserVersion = f(a.getBrowserInfo().version), d.deviceInfo = a, d.clientUserAgent = "com.microsoft.rdc.html/" + d.clientVersion, d
	},
	LogLevel = {
		All: 0,
		Debug: 1,
		Info: 2,
		Warn: 3,
		Error: 4
	},
	Logger = function () {
		"use strict";
		var a = {},
			b = LogLevel.All,
			c = function (a) {
				var b = (new Date).toISOString() + " ";
				return 1 === a.length ? b + a[0] : b + Array.prototype.slice.call(arguments).join(" ")
			},
			d = function (a) {
				return 1 === a.length ? a[0] : Array.prototype.slice.call(arguments).join(" ")
			},
			e = !1,
			f = [],
			g = function (a) {
				f.push(a + "\r\n")
			};
		return a.getConsoleRecordingStatus = function () {
			return e
		}, a.getListOfLogs = function () {
			return f
		}, a.startRecording = function () {
			console.log((new Date).toISOString() + " Started console recording"), f = [], e = !0
		}, a.stopRecording = function () {
			console.log((new Date).toISOString() + " Stopped console recording"), e = !1
		}, a.debugWithoutTimestamp = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug || (a = d(arguments), !0 === e && g(a), console.debug(a))
		}, a.debug = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug || (a = c(arguments), !0 === e && g(a), console.debug(a))
		}, a.logWithoutTimestamp = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info || (a = d(arguments), !0 === e && g(a), console.log(a))
		}, a.log = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info || (a = c(arguments), !0 === e && g(a), console.log(a))
		}, a.warnWithoutTimestamp = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info && b !== LogLevel.Warn || (a = d(arguments), !0 === e && g(a), console.warn(a))
		}, a.warn = function () {
			var a;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info && b !== LogLevel.Warn || (a = c(arguments), !0 === e && g(a), console.warn(a))
		}, a.errorWithoutTimestamp = function () {
			var c, f;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info && b !== LogLevel.Warn && b !== LogLevel.Error || (c = d(arguments), f = a.stackTrace(), !0 === e && (g(c), g(f)), console.error(c), console.error(f))
		}, a.error = function () {
			var d, f;
			b !== LogLevel.All && b !== LogLevel.Debug && b !== LogLevel.Info && b !== LogLevel.Warn && b !== LogLevel.Error || (d = c(arguments), f = a.stackTrace(), !0 === e && (g(d), g(f)), console.error(d), console.error(f))
		}, a.stackTrace = function () {
			var a;
			try {
				throw new Error("")
			} catch (b) {
				a = b.stack || ""
			}
			return a = a.split("\n").map(function (a) {
				return a.trim()
			}), a.splice("Error" === a[0] ? 2 : 1)
		}, a.setLogLevel = function (a) {
			b = a
		}, a
	},
	ObjectHelper = function () {
		"use strict";
		var a = window.crypto || window.msCrypto;
		if (!a) throw new Error("Strong random numbers are not available.");
		this.cloneObject = function (a) {
			var b, c = Object.create(null);
			if (null === a) return null;
			for (b in a) void 0 !== a[b] && (c[b] = a[b]);
			return c
		}, this.createGuid = function () {
			var b = new Uint8Array(16);
			a.getRandomValues(b), b[6] = 79 & (64 | b[6]), b[8] = 191 & (128 | b[8]);
			var c, d = "";
			for (c = 0; c < 16; c++) {
				4 != c && 6 != c && 8 != c && 10 != c || (d += "-");
				var e = b[c].toString(16);
				1 == e.length && (e = "0" + e), d += e
			}
			return d
		}
	};
! function () {
	String.prototype.startsWith = String.prototype.startsWith || function (a, b) {
		return b = b || 0, this.indexOf(a, b) === b
	}, String.prototype.endsWith = String.prototype.endsWith || function (a, b) {
		var c = this.toString();
		("number" != typeof b || !isFinite(b) || Math.floor(b) !== b || b > c.length) && (b = c.length), b -= a.length;
		var d = c.indexOf(a, b);
		return -1 !== d && d === b
	}, Object.entries = Object.entries || function (a) {
		for (var b = Object.keys(a), c = b.length, d = new Array(c); c--;) d[c] = [b[c], a[b[c]]];
		return d
	}
}();
var KeyCodes = {
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		Return: 13,
		Esc: 27,
		Backspace: 8,
		Tab: 9,
		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,
		CapsLock: 20,
		Delete: 46,
		End: 35,
		Home: 36,
		Insert: 45,
		NumLock: 144,
		PageUp: 33,
		PageDown: 34,
		Shift: 16,
		Windows: 91,
		RWindows: 93,
		Ctrl: 17,
		Alt: 18,
		Pause: 19,
		ScrollLock: 145,
		PrintScreen: 44,
		Cmd1: 91,
		Cmd2: 93,
		Cmd3: 224
	},
	ASCIICodes = {
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
		a: 97,
		b: 98,
		c: 99,
		d: 100,
		e: 101,
		f: 102,
		g: 103,
		h: 104,
		i: 105,
		j: 106,
		k: 107,
		l: 108,
		m: 109,
		n: 110,
		o: 111,
		p: 112,
		q: 113,
		r: 114,
		s: 115,
		t: 116,
		u: 117,
		v: 118,
		w: 119,
		x: 120,
		y: 121,
		z: 122
	},
	NumericPadKeyCodes = {
		144: "NumLock",
		96: "Numpad0",
		97: "Numpad1",
		98: "Numpad2",
		99: "Numpad3",
		100: "Numpad4",
		101: "Numpad5",
		102: "Numpad6",
		103: "Numpad7",
		104: "Numpad8",
		105: "Numpad9",
		106: "NumpadMultiply",
		107: "NumpadAdd",
		109: "NumpadSubtract",
		111: "NumpadDivide",
		108: '"NumpadComma" inputting "," or "."',
		188: '"NumpadComma" inputting ","',
		194: '"NumpadComma" inputting ",", "NumpadComma" inputting "."',
		190: '"NumpadComma" inputting "."',
		110: '"NumpadDecimal" inputting "."',
		12: "NumpadEqual",
		61: "NumpadEqual"
	},
	CtrlAltCharacterShortCuts = {
		86: "Ctrl + Alt + V Excel paste special",
		107: 'Ctrl + Alt + "+" Excel zoom in NumpadAdd',
		192: 'Ctrl + Alt + "+" Excel zoom in Equal with shift Linux / Mac on Chromium 34',
		222: 'Ctrl + Alt + "+" Excel zoom in Equal with shift Japanese',
		187: 'Ctrl + Alt + "-"  Excel zoom out Minus Japanese keyboards, Excel zoom in Equal with shift non-Japanese',
		189: 'Ctrl + Alt + "-" Excel zoom out',
		109: 'Ctrl + Alt + "-"  Excel zoom out NumpadSubtract'
	},
	CodesToKeycodes = {
		Digit1: 49,
		Digit2: 50,
		Digit3: 51,
		Digit4: 52,
		Digit5: 53,
		Digit6: 54,
		Digit7: 55,
		Digit8: 56,
		Digit9: 57,
		Digit0: 48,
		KeyA: 65,
		KeyB: 66,
		KeyC: 67,
		KeyD: 68,
		KeyE: 69,
		KeyF: 70,
		KeyG: 71,
		KeyH: 72,
		KeyI: 73,
		KeyJ: 74,
		KeyK: 75,
		KeyL: 76,
		KeyM: 77,
		KeyN: 78,
		KeyO: 79,
		KeyP: 80,
		KeyQ: 81,
		KeyR: 82,
		KeyS: 83,
		KeyT: 84,
		KeyU: 85,
		KeyV: 86,
		KeyW: 87,
		KeyX: 88,
		KeyY: 89,
		KeyZ: 90,
		Comma: 188,
		Period: 190,
		Semicolon: 186,
		Quote: 222,
		BracketLeft: 219,
		BracketRight: 221,
		Backquote: 192,
		Backslash: 220,
		Minus: 189,
		Equal: 187,
		IntlRo: 193,
		IntlYen: 255,
		ContextMenu: 93,
		Space: 32,
		NumLock: 144,
		Numpad0: 96,
		Numpad1: 97,
		Numpad2: 98,
		Numpad3: 99,
		Numpad4: 100,
		Numpad5: 101,
		Numpad6: 102,
		Numpad7: 103,
		Numpad8: 104,
		Numpad9: 105,
		NumpadAdd: 107,
		NumpadComma: 194,
		NumpadDecimal: 110,
		NumpadDivide: 111,
		NumpadEnter: 13,
		NumpadEqual: 12,
		NumpadMultiply: 106,
		NumpadSubtract: 109
	},
	KeyboardLayoutUtil = function () {
		"use strict";
		var a = {
				Select: 1033,
				Others: 1033,
				Amharic: 1033,
				ChinesePRC: 2052,
				ChineseTaiwan: 1028,
				ChineseTraditinal: 1028,
				ChineseSimplified: 2052,
				Japanese: 1041,
				Korean: 1042,
				Tigrinya: 1033,
				Japanese_101_102: 1041,
				Japanese_106_109: 1041,
				Korean_101_TYPE1: 1042,
				Korean_101_TYPE2: 1042,
				Korean_101_TYPE3: 1042,
				Korean_103_106: 1042
			},
			b = {
				Select: 1033,
				Others: 1033,
				Amharic: 1033,
				ChinesePRC: 2052,
				ChineseTaiwan: 1028,
				ChineseTraditinal: 1028,
				ChineseSimplified: 2052,
				Japanese: 1041,
				Korean: 1042,
				Tigrinya: 1033,
				Japanese_101_102: 1041,
				Japanese_106_109: 1041,
				Korean_101_TYPE1: 1042,
				Korean_101_TYPE2: 1042,
				Korean_101_TYPE3: 1042,
				Korean_103_106: 1042
			},
			c = {
				Japanese_106_109: 2,
				Korean_101_TYPE2: 4,
				Korean_101_TYPE3: 5,
				Korean_103_106: 6
			};
		return {
			getKeyboardType: function (a) {
				return "Japanese_106_109" === a ? Module.KeyboardType.Japanese : Module.KeyboardType.IBM_Enhanced
			},
			getKeyboardSubType: function (a) {
				return a in c ? c[a] : 0
			},
			getKeyboardLayout: function (b) {
				return b in a ? a[b] : 1033
			},
			getKeyboardCodePage: function (a) {
				return a in b ? b[a] : 1033
			}
		}
	},
	LaunchMode = {
		Webclient: "0",
		DownloadFileOnly: "1",
		CloudPC: "2"
	},
	URLParameters = {
		rdpFile: "rdpfile",
		launchMode: "launchmode",
		tenantId: "tenantid"
	},
	LaunchModeErrors = {
		UnexpectedToken: "Found unexpected token in rdp file URL. Blocking download...",
		InvalidGUID: "Found invalid GUID.",
		GUIDNotFound: "Could not retreive GUID",
		RDPFileUrlNotFound: "Could not retreive RDP file URL",
		NotSameOrigin: "rdp file url not same as webclient origin",
		DiscoveryUrlNotFound: "Missing or invalid discovery URL from deployment settings"
	},
	LaunchInfo = function () {
		return this.rdpfileURL = null, this.tenantId = null, this
	},
	getLocationString = function () {
		return window.location.toString()
	},
	LaunchModeSettings = {
		hideAllResourcesUI: function () {
			return DeploymentSettings.launchMode === LaunchMode.DownloadFileOnly || DeploymentSettings.launchMode === LaunchMode.CloudPC
		},
		hideNavbar: function () {
			return DeploymentSettings.launchMode === LaunchMode.DownloadFileOnly
		},
		stopFeedDiscovery: function () {
			return DeploymentSettings.launchMode === LaunchMode.DownloadFileOnly || DeploymentSettings.launchMode === LaunchMode.CloudPC
		}
	},
	LaunchModeHelper = function () {
		var a = {},
			b = function (a) {
				var b = /^((?:http:\/\/)|(?:https:\/\/))([\/a-zA-Z0-9-\.\?\&\=]*)$/;
				return new RegExp(b).test(a)
			},
			c = function (a) {
				var b = /[0-9A-Fa-f]{8}-?([0-9A-Fa-f]{4}-?){3}[0-9A-Fa-f]{12}/;
				return new RegExp(b).test(a)
			},
			d = function () {
				var a = [];
				for (var b in URLParameters) a.push(URLParameters[b]);
				return a
			};
		a.rawLoc = getLocationString(), a.getParams = function () {
			if (-1 !== a.rawLoc.indexOf("?")) {
				var b = decodeURIComponent(a.rawLoc);
				return b ? b.substr(b.indexOf("?") + 1) : null
			}
			return null
		}, a.setLaunchMode = function () {
			var b = a.sanitizedParams();
			if (b && -1 !== b.toLowerCase().indexOf(URLParameters.launchMode)) {
				var c = b.substr(b.toLowerCase().indexOf(URLParameters.launchMode) + URLParameters.launchMode.length + 1, b.length);
				c = c.substr(0, -1 !== c.indexOf("&") ? c.indexOf("&") : c.length), DeploymentSettings.launchMode = c
			} else b && -1 !== b.toLowerCase().indexOf(URLParameters.rdpFile) && -1 !== b.toLowerCase().indexOf(URLParameters.tenantId) ? DeploymentSettings.launchMode = LaunchMode.CloudPC : DeploymentSettings.launchMode = LaunchMode.Webclient
		};
		var e = function () {
				var c = a.sanitizedParams();
				if (c && -1 !== c.toLowerCase().indexOf(URLParameters.rdpFile)) {
					var d = c.substr(c.toLowerCase().indexOf(URLParameters.rdpFile) + URLParameters.rdpFile.length + 1, c.length);
					if (d = d.substr(0, -1 !== d.indexOf("&") ? d.indexOf("&") : d.length), !DeploymentSettings || !DeploymentSettings.multiTenantConfig || !DeploymentSettings.multiTenantConfig.discoveryUrl) throw new Error(LaunchModeErrors.DiscoveryUrlNotFound);
					if (!d || !b(d)) throw new Error(LaunchModeErrors.UnexpectedToken);
					try {
						var e = new URL(DeploymentSettings.multiTenantConfig.discoveryUrl).hostname,
							f = new URL(d);
						return f.hostname = e, d = f.href
					} catch (a) {
						throw new Error(LaunchModeErrors.DiscoveryUrlNotFound)
					}
				}
				throw new Error(LaunchModeErrors.RDPFileUrlNotFound)
			},
			f = function () {
				var b = a.sanitizedParams();
				if (-1 !== b.toLowerCase().indexOf(URLParameters.tenantId)) {
					var d = b.substr(b.toLowerCase().indexOf(URLParameters.tenantId) + URLParameters.tenantId.length + 1, b.length);
					if (d = d.substring(0, -1 !== d.indexOf("&") ? d.indexOf("&") : d.length), c(d)) return d;
					throw new Error(LaunchModeErrors.InvalidGUID)
				}
				throw new Error(LaunchModeErrors.GUIDNotFound)
			};
		if (a.urlContainsParameters = function () {
				return -1 !== a.rawLoc.indexOf("?")
			}, a.getLaunchInfo = function () {
				var a = new LaunchInfo;
				return a.rdpfileURL = e(), a.tenantId = f(), window.localStorage.removeItem(StorageKeys.QueryStringURL), a
			}, a.sanitizedParams = function () {
				var b = a.getParams();
				if (!b) return null;
				const c = d();
				return b.split("&").map(function (a) {
					var b = a.indexOf("=");
					return {
						key: a.substr(0, b),
						value: a.substr(b + 1)
					}
				}).filter(function (a) {
					return -1 !== c.indexOf(a.key.toLowerCase())
				}).map(function (a) {
					return [a.key, a.value].join("=")
				}).join("&")
			}, a.urlContainsParameters()) window.localStorage.setItem(StorageKeys.QueryStringURL, getLocationString());
		else {
			var g = window.localStorage.getItem(StorageKeys.QueryStringURL);
			g && new URL(g).hostname === new URL(getLocationString()).hostname && (a.rawLoc = g)
		}
		return a
	},
	ErrorInfo = function (a, b, c, d) {
		return this.errorSource = "Client", this.errorOperation = a, this.errorCode = b, this.errorCodeSymbolic = c, this.errorMessage = d, this
	},
	DebugInfo = function () {
		return this.TIMESTAMP = (new Date).toISOString(), this.Env = "", this.ClientType = "HTML", this.ClientInstance = null, this.ClientOS = null, this.Level = null, this.Pid = 0, this.Tid = 0, this.EventId = 0, this.TaskName = null, this.ChannelName = "", this.ActivityId = null, this.Msg = null, this.Ex = "", this
	},
	FeedCounts = function (a, b, c) {
		return this.total = a, this.failed = b, this.download = c, this
	},
	FeedCountswithCache = function (a, b, c, d) {
		var e = new FeedCounts(a, b, c);
		return e.cached = d, e
	},
	timeZones = {
		"Africa/Abidjan": "Greenwich Standard Time",
		"Africa/Accra": "Greenwich Standard Time",
		"Africa/Addis_Ababa": "E. Africa Standard Time",
		"Africa/Algiers": "W. Central Africa Standard Time",
		"Africa/Asmera": "E. Africa Standard Time",
		"Africa/Bamako": "Greenwich Standard Time",
		"Africa/Bangui": "W. Central Africa Standard Time",
		"Africa/Banjul": "Greenwich Standard Time",
		"Africa/Bissau": "Greenwich Standard Time",
		"Africa/Blantyre": "South Africa Standard Time",
		"Africa/Brazzaville": "W. Central Africa Standard Time",
		"Africa/Bujumbura": "South Africa Standard Time",
		"Africa/Cairo": "Egypt Standard Time",
		"Africa/Casablanca": "Morocco Standard Time",
		"Africa/Ceuta": "Romance Standard Time",
		"Africa/Conakry": "Greenwich Standard Time",
		"Africa/Dakar": "Greenwich Standard Time",
		"Africa/Dar_es_Salaam": "E. Africa Standard Time",
		"Africa/Djibouti": "E. Africa Standard Time",
		"Africa/Douala": "W. Central Africa Standard Time",
		"Africa/El_Aaiun": "Morocco Standard Time",
		"Africa/Freetown": "Greenwich Standard Time",
		"Africa/Gaborone": "South Africa Standard Time",
		"Africa/Harare": "South Africa Standard Time",
		"Africa/Johannesburg": "South Africa Standard Time",
		"Africa/Juba": "E. Africa Standard Time",
		"Africa/Kampala": "E. Africa Standard Time",
		"Africa/Khartoum": "Sudan Standard Time",
		"Africa/Kigali": "South Africa Standard Time",
		"Africa/Kinshasa": "W. Central Africa Standard Time",
		"Africa/Lagos": "W. Central Africa Standard Time",
		"Africa/Libreville": "W. Central Africa Standard Time",
		"Africa/Lome": "Greenwich Standard Time",
		"Africa/Luanda": "W. Central Africa Standard Time",
		"Africa/Lubumbashi": "South Africa Standard Time",
		"Africa/Lusaka": "South Africa Standard Time",
		"Africa/Malabo": "W. Central Africa Standard Time",
		"Africa/Maputo": "South Africa Standard Time",
		"Africa/Maseru": "South Africa Standard Time",
		"Africa/Mbabane": "South Africa Standard Time",
		"Africa/Mogadishu": "E. Africa Standard Time",
		"Africa/Monrovia": "Greenwich Standard Time",
		"Africa/Nairobi": "E. Africa Standard Time",
		"Africa/Ndjamena": "W. Central Africa Standard Time",
		"Africa/Niamey": "W. Central Africa Standard Time",
		"Africa/Nouakchott": "Greenwich Standard Time",
		"Africa/Ouagadougou": "Greenwich Standard Time",
		"Africa/Porto-Novo": "W. Central Africa Standard Time",
		"Africa/Sao_Tome": "Sao Tome Standard Time",
		"Africa/Tripoli": "Libya Standard Time",
		"Africa/Tunis": "W. Central Africa Standard Time",
		"Africa/Windhoek": "Namibia Standard Time",
		"America/Adak": "Aleutian Standard Time",
		"America/Anchorage": "Alaskan Standard Time",
		"America/Anguilla": "SA Western Standard Time",
		"America/Antigua": "SA Western Standard Time",
		"America/Araguaina": "Tocantins Standard Time",
		"America/Argentina/Buenos_Aires": "Argentina Standard Time",
		"America/Argentina/Catamarca": "Argentina Standard Time",
		"America/Argentina/Cordoba": "Argentina Standard Time",
		"America/Argentina/Jujuy": "Argentina Standard Time",
		"America/Argentina/La_Rioja": "Argentina Standard Time",
		"America/Argentina/Mendoza": "Argentina Standard Time",
		"America/Argentina/Rio_Gallegos": "Argentina Standard Time",
		"America/Argentina/Salta": "Argentina Standard Time",
		"America/Argentina/San_Juan": "Argentina Standard Time",
		"America/Argentina/San_Luis": "Argentina Standard Time",
		"America/Argentina/Tucuman": "Argentina Standard Time",
		"America/Argentina/Ushuaia": "Argentina Standard Time",
		"America/Aruba": "SA Western Standard Time",
		"America/Asuncion": "Paraguay Standard Time",
		"America/Atikokan": "SA Pacific Standard Time",
		"America/Bahia": "Bahia Standard Time",
		"America/Bahia_Banderas": "Central Standard Time (Mexico)",
		"America/Barbados": "SA Western Standard Time",
		"America/Belem": "SA Eastern Standard Time",
		"America/Belize": "Central America Standard Time",
		"America/Blanc-Sablon": "SA Western Standard Time",
		"America/Boa_Vista": "SA Western Standard Time",
		"America/Bogota": "SA Pacific Standard Time",
		"America/Boise": "Mountain Standard Time",
		"America/Buenos_Aires": "Argentina Standard Time",
		"America/Cambridge_Bay": "Mountain Standard Time",
		"America/Campo_Grande": "Central Brazilian Standard Time",
		"America/Cancun": "Eastern Standard Time (Mexico)",
		"America/Caracas": "Venezuela Standard Time",
		"America/Catamarca": "Argentina Standard Time",
		"America/Cayenne": "SA Eastern Standard Time",
		"America/Cayman": "SA Pacific Standard Time",
		"America/Chicago": "Central Standard Time",
		"America/Chihuahua": "Mountain Standard Time (Mexico)",
		"America/Coral_Harbour": "SA Pacific Standard Time",
		"America/Cordoba": "Argentina Standard Time",
		"America/Costa_Rica": "Central America Standard Time",
		"America/Creston": "US Mountain Standard Time",
		"America/Cuiaba": "Central Brazilian Standard Time",
		"America/Curacao": "SA Western Standard Time",
		"America/Danmarkshavn": "UTC",
		"America/Dawson": "Pacific Standard Time",
		"America/Dawson_Creek": "US Mountain Standard Time",
		"America/Denver": "Mountain Standard Time",
		"America/Detroit": "Eastern Standard Time",
		"America/Dominica": "SA Western Standard Time",
		"America/Edmonton": "Mountain Standard Time",
		"America/Eirunepe": "SA Pacific Standard Time",
		"America/El_Salvador": "Central America Standard Time",
		"America/Fort_Nelson": "US Mountain Standard Time",
		"America/Fortaleza": "SA Eastern Standard Time",
		"America/Glace_Bay": "Atlantic Standard Time",
		"America/Godthab": "Greenland Standard Time",
		"America/Goose_Bay": "Atlantic Standard Time",
		"America/Grand_Turk": "Turks And Caicos Standard Time",
		"America/Grenada": "SA Western Standard Time",
		"America/Guadeloupe": "SA Western Standard Time",
		"America/Guatemala": "Central America Standard Time",
		"America/Guayaquil": "SA Pacific Standard Time",
		"America/Guyana": "SA Western Standard Time",
		"America/Halifax": "Atlantic Standard Time",
		"America/Havana": "Cuba Standard Time",
		"America/Hermosillo": "US Mountain Standard Time",
		"America/Indiana/Indianapolis": "US Eastern Standard Time",
		"America/Indiana/Knox": "Central Standard Time",
		"America/Indiana/Marengo": "US Eastern Standard Time",
		"America/Indiana/Petersburg": "Eastern Standard Time",
		"America/Indiana/Tell_City": "Central Standard Time",
		"America/Indiana/Vevay": "US Eastern Standard Time",
		"America/Indiana/Vincennes": "Eastern Standard Time",
		"America/Indiana/Winamac": "Eastern Standard Time",
		"America/Indianapolis": "US Eastern Standard Time",
		"America/Inuvik": "Mountain Standard Time",
		"America/Iqaluit": "Eastern Standard Time",
		"America/Jamaica": "SA Pacific Standard Time",
		"America/Jujuy": "Argentina Standard Time",
		"America/Juneau": "Alaskan Standard Time",
		"America/Kentucky/Louisville": "Eastern Standard Time",
		"America/Kentucky/Monticello": "Eastern Standard Time",
		"America/Kralendijk": "SA Western Standard Time",
		"America/La_Paz": "SA Western Standard Time",
		"America/Lima": "SA Pacific Standard Time",
		"America/Los_Angeles": "Pacific Standard Time",
		"America/Louisville": "Eastern Standard Time",
		"America/Lower_Princes": "SA Western Standard Time",
		"America/Maceio": "SA Eastern Standard Time",
		"America/Managua": "Central America Standard Time",
		"America/Manaus": "SA Western Standard Time",
		"America/Marigot": "SA Western Standard Time",
		"America/Martinique": "SA Western Standard Time",
		"America/Matamoros": "Central Standard Time",
		"America/Mazatlan": "Mountain Standard Time (Mexico)",
		"America/Mendoza": "Argentina Standard Time",
		"America/Menominee": "Central Standard Time",
		"America/Merida": "Central Standard Time (Mexico)",
		"America/Metlakatla": "Alaskan Standard Time",
		"America/Mexico_City": "Central Standard Time (Mexico)",
		"America/Miquelon": "Saint Pierre Standard Time",
		"America/Moncton": "Atlantic Standard Time",
		"America/Monterrey": "Central Standard Time (Mexico)",
		"America/Montevideo": "Montevideo Standard Time",
		"America/Montreal": "Eastern Standard Time",
		"America/Montserrat": "SA Western Standard Time",
		"America/Nassau": "Eastern Standard Time",
		"America/New_York": "Eastern Standard Time",
		"America/Nipigon": "Eastern Standard Time",
		"America/Nome": "Alaskan Standard Time",
		"America/Noronha": "UTC-02",
		"America/North_Dakota/Beulah": "Central Standard Time",
		"America/North_Dakota/Center": "Central Standard Time",
		"America/North_Dakota/New_Salem": "Central Standard Time",
		"America/Ojinaga": "Mountain Standard Time",
		"America/Panama": "SA Pacific Standard Time",
		"America/Pangnirtung": "Eastern Standard Time",
		"America/Paramaribo": "SA Eastern Standard Time",
		"America/Phoenix": "US Mountain Standard Time",
		"America/Port_of_Spain": "SA Western Standard Time",
		"America/Port-au-Prince": "Haiti Standard Time",
		"America/Porto_Velho": "SA Western Standard Time",
		"America/Puerto_Rico": "SA Western Standard Time",
		"America/Punta_Arenas": "Magallanes Standard Time",
		"America/Rainy_River": "Central Standard Time",
		"America/Rankin_Inlet": "Central Standard Time",
		"America/Recife": "SA Eastern Standard Time",
		"America/Regina": "Canada Central Standard Time",
		"America/Resolute": "Central Standard Time",
		"America/Rio_Branco": "SA Pacific Standard Time",
		"America/Santa_Isabel": "Pacific Standard Time (Mexico)",
		"America/Santarem": "SA Eastern Standard Time",
		"America/Santiago": "Pacific SA Standard Time",
		"America/Santo_Domingo": "SA Western Standard Time",
		"America/Sao_Paulo": "E. South America Standard Time",
		"America/Scoresbysund": "Azores Standard Time",
		"America/Sitka": "Alaskan Standard Time",
		"America/St_Barthelemy": "SA Western Standard Time",
		"America/St_Johns": "Newfoundland Standard Time",
		"America/St_Kitts": "SA Western Standard Time",
		"America/St_Lucia": "SA Western Standard Time",
		"America/St_Thomas": "SA Western Standard Time",
		"America/St_Vincent": "SA Western Standard Time",
		"America/Swift_Current": "Canada Central Standard Time",
		"America/Tegucigalpa": "Central America Standard Time",
		"America/Thule": "Atlantic Standard Time",
		"America/Thunder_Bay": "Eastern Standard Time",
		"America/Tijuana": "Pacific Standard Time (Mexico)",
		"America/Toronto": "Eastern Standard Time",
		"America/Tortola": "SA Western Standard Time",
		"America/Vancouver": "Pacific Standard Time",
		"America/Whitehorse": "Pacific Standard Time",
		"America/Winnipeg": "Central Standard Time",
		"America/Yakutat": "Alaskan Standard Time",
		"America/Yellowknife": "Mountain Standard Time",
		"Antarctica/Casey": "W. Australia Standard Time",
		"Antarctica/Davis": "SE Asia Standard Time",
		"Antarctica/DumontDUrville": "West Pacific Standard Time",
		"Antarctica/Macquarie": "Central Pacific Standard Time",
		"Antarctica/Mawson": "West Asia Standard Time",
		"Antarctica/McMurdo": "New Zealand Standard Time",
		"Antarctica/Palmer": "Magallanes Standard Time",
		"Antarctica/Rothera": "SA Eastern Standard Time",
		"Antarctica/Syowa": "E. Africa Standard Time",
		"Antarctica/Vostok": "Central Asia Standard Time",
		"Arctic/Longyearbyen": "W. Europe Standard Time",
		"Asia/Aden": "Arab Standard Time",
		"Asia/Almaty": "Central Asia Standard Time",
		"Asia/Amman": "Jordan Standard Time",
		"Asia/Anadyr": "Russia Time Zone 11",
		"Asia/Aqtau": "West Asia Standard Time",
		"Asia/Aqtobe": "West Asia Standard Time",
		"Asia/Ashgabat": "West Asia Standard Time",
		"Asia/Atyrau": "West Asia Standard Time",
		"Asia/Baghdad": "Arabic Standard Time",
		"Asia/Bahrain": "Arab Standard Time",
		"Asia/Baku": "Azerbaijan Standard Time",
		"Asia/Bangkok": "SE Asia Standard Time",
		"Asia/Barnaul": "Altai Standard Time",
		"Asia/Beirut": "Middle East Standard Time",
		"Asia/Bishkek": "Central Asia Standard Time",
		"Asia/Brunei": "Singapore Standard Time",
		"Asia/Calcutta": "India Standard Time",
		"Asia/Chita": "Transbaikal Standard Time",
		"Asia/Choibalsan": "Ulaanbaatar Standard Time",
		"Asia/Colombo": "Sri Lanka Standard Time",
		"Asia/Damascus": "Syria Standard Time",
		"Asia/Dhaka": "Bangladesh Standard Time",
		"Asia/Dili": "Tokyo Standard Time",
		"Asia/Dubai": "Arabian Standard Time",
		"Asia/Dushanbe": "West Asia Standard Time",
		"Asia/Famagusta": "GTB Standard Time",
		"Asia/Gaza": "West Bank Standard Time",
		"Asia/Hebron": "West Bank Standard Time",
		"Asia/Ho_Chi_Minh": "SE Asia Standard Time",
		"Asia/Hong_Kong": "China Standard Time",
		"Asia/Hovd": "W. Mongolia Standard Time",
		"Asia/Irkutsk": "North Asia East Standard Time",
		"Asia/Jakarta": "SE Asia Standard Time",
		"Asia/Jayapura": "Tokyo Standard Time",
		"Asia/Jerusalem": "Israel Standard Time",
		"Asia/Kabul": "Afghanistan Standard Time",
		"Asia/Kamchatka": "Russia Time Zone 11",
		"Asia/Karachi": "Pakistan Standard Time",
		"Asia/Kathmandu": "Nepal Standard Time",
		"Asia/Katmandu": "Nepal Standard Time",
		"Asia/Khandyga": "Yakutsk Standard Time",
		"Asia/Kolkata": "India Standard Time",
		"Asia/Krasnoyarsk": "North Asia Standard Time",
		"Asia/Kuala_Lumpur": "Singapore Standard Time",
		"Asia/Kuching": "Singapore Standard Time",
		"Asia/Kuwait": "Arab Standard Time",
		"Asia/Macau": "China Standard Time",
		"Asia/Magadan": "Magadan Standard Time",
		"Asia/Makassar": "Singapore Standard Time",
		"Asia/Manila": "Singapore Standard Time",
		"Asia/Muscat": "Arabian Standard Time",
		"Asia/Nicosia": "GTB Standard Time",
		"Asia/Novokuznetsk": "North Asia Standard Time",
		"Asia/Novosibirsk": "N. Central Asia Standard Time",
		"Asia/Omsk": "Omsk Standard Time",
		"Asia/Oral": "West Asia Standard Time",
		"Asia/Phnom_Penh": "SE Asia Standard Time",
		"Asia/Pontianak": "SE Asia Standard Time",
		"Asia/Pyongyang": "North Korea Standard Time",
		"Asia/Qatar": "Arab Standard Time",
		"Asia/Qyzylorda": "Central Asia Standard Time",
		"Asia/Rangoon": "Myanmar Standard Time",
		"Asia/Riyadh": "Arab Standard Time",
		"Asia/Saigon": "SE Asia Standard Time",
		"Asia/Sakhalin": "Sakhalin Standard Time",
		"Asia/Samarkand": "West Asia Standard Time",
		"Asia/Seoul": "Korea Standard Time",
		"Asia/Shanghai": "China Standard Time",
		"Asia/Singapore": "Singapore Standard Time",
		"Asia/Srednekolymsk": "Russia Time Zone 10",
		"Asia/Taipei": "Taipei Standard Time",
		"Asia/Tashkent": "West Asia Standard Time",
		"Asia/Tbilisi": "Georgian Standard Time",
		"Asia/Tehran": "Iran Standard Time",
		"Asia/Thimphu": "Bangladesh Standard Time",
		"Asia/Tokyo": "Tokyo Standard Time",
		"Asia/Tomsk": "Tomsk Standard Time",
		"Asia/Ulaanbaatar": "Ulaanbaatar Standard Time",
		"Asia/Urumqi": "China Standard Time",
		"Asia/Ust-Nera": "Vladivostok Standard Time",
		"Asia/Vientiane": "SE Asia Standard Time",
		"Asia/Vladivostok": "Vladivostok Standard Time",
		"Asia/Yakutsk": "Yakutsk Standard Time",
		"Asia/Yangon": "Myanmar Standard Time",
		"Asia/Yekaterinburg": "Ekaterinburg Standard Time",
		"Asia/Yerevan": "Caucasus Standard Time",
		"Atlantic/Azores": "Azores Standard Time",
		"Atlantic/Bermuda": "Atlantic Standard Time",
		"Atlantic/Canary": "GMT Standard Time",
		"Atlantic/Cape_Verde": "Cape Verde Standard Time",
		"Atlantic/Faeroe": "GMT Standard Time",
		"Atlantic/Faroe": "GMT Standard Time",
		"Atlantic/Madeira": "GMT Standard Time",
		"Atlantic/Reykjavik": "Greenwich Standard Time",
		"Atlantic/South_Georgia": "UTC-02",
		"Atlantic/St_Helena": "Greenwich Standard Time",
		"Atlantic/Stanley": "SA Eastern Standard Time",
		"Australia/Adelaide": "Cen. Australia Standard Time",
		"Australia/Brisbane": "E. Australia Standard Time",
		"Australia/Broken_Hill": "Cen. Australia Standard Time",
		"Australia/Currie": "Tasmania Standard Time",
		"Australia/Darwin": "AUS Central Standard Time",
		"Australia/Eucla": "Aus Central W. Standard Time",
		"Australia/Hobart": "Tasmania Standard Time",
		"Australia/Lindeman": "E. Australia Standard Time",
		"Australia/Lord_Howe": "Lord Howe Standard Time",
		"Australia/Melbourne": "AUS Eastern Standard Time",
		"Australia/Perth": "W. Australia Standard Time",
		"Australia/Sydney": "AUS Eastern Standard Time",
		CST6CDT: "Central Standard Time",
		EST5EDT: "Eastern Standard Time",
		"Etc/GMT": "UTC",
		"Etc/GMT+1": "Cape Verde Standard Time",
		"Etc/GMT+10": "Hawaiian Standard Time",
		"Etc/GMT+11": "UTC-11",
		"Etc/GMT+12": "Dateline Standard Time",
		"Etc/GMT+2": "UTC-02",
		"Etc/GMT+3": "SA Eastern Standard Time",
		"Etc/GMT+4": "SA Western Standard Time",
		"Etc/GMT+5": "SA Pacific Standard Time",
		"Etc/GMT+6": "Central America Standard Time",
		"Etc/GMT+7": "US Mountain Standard Time",
		"Etc/GMT+8": "UTC-08",
		"Etc/GMT+9": "UTC-09",
		"Etc/GMT-1": "W. Central Africa Standard Time",
		"Etc/GMT-10": "West Pacific Standard Time",
		"Etc/GMT-11": "Central Pacific Standard Time",
		"Etc/GMT-12": "UTC+12",
		"Etc/GMT-13": "UTC+13",
		"Etc/GMT-14": "Line Islands Standard Time",
		"Etc/GMT-2": "South Africa Standard Time",
		"Etc/GMT-3": "E. Africa Standard Time",
		"Etc/GMT-4": "Arabian Standard Time",
		"Etc/GMT-5": "West Asia Standard Time",
		"Etc/GMT-6": "Central Asia Standard Time",
		"Etc/GMT-7": "SE Asia Standard Time",
		"Etc/GMT-8": "Singapore Standard Time",
		"Etc/GMT-9": "Tokyo Standard Time",
		"Etc/UTC": "UTC",
		"Europe/Amsterdam": "W. Europe Standard Time",
		"Europe/Andorra": "W. Europe Standard Time",
		"Europe/Astrakhan": "Astrakhan Standard Time",
		"Europe/Athens": "GTB Standard Time",
		"Europe/Belgrade": "Central Europe Standard Time",
		"Europe/Berlin": "W. Europe Standard Time",
		"Europe/Bratislava": "Central Europe Standard Time",
		"Europe/Brussels": "Romance Standard Time",
		"Europe/Bucharest": "GTB Standard Time",
		"Europe/Budapest": "Central Europe Standard Time",
		"Europe/Busingen": "W. Europe Standard Time",
		"Europe/Chisinau": "E. Europe Standard Time",
		"Europe/Copenhagen": "Romance Standard Time",
		"Europe/Dublin": "GMT Standard Time",
		"Europe/Gibraltar": "W. Europe Standard Time",
		"Europe/Guernsey": "GMT Standard Time",
		"Europe/Helsinki": "FLE Standard Time",
		"Europe/Isle_of_Man": "GMT Standard Time",
		"Europe/Istanbul": "Turkey Standard Time",
		"Europe/Jersey": "GMT Standard Time",
		"Europe/Kaliningrad": "Kaliningrad Standard Time",
		"Europe/Kiev": "FLE Standard Time",
		"Europe/Kirov": "Russian Standard Time",
		"Europe/Lisbon": "GMT Standard Time",
		"Europe/Ljubljana": "Central Europe Standard Time",
		"Europe/London": "GMT Standard Time",
		"Europe/Luxembourg": "W. Europe Standard Time",
		"Europe/Madrid": "Romance Standard Time",
		"Europe/Malta": "W. Europe Standard Time",
		"Europe/Mariehamn": "FLE Standard Time",
		"Europe/Minsk": "Belarus Standard Time",
		"Europe/Monaco": "W. Europe Standard Time",
		"Europe/Moscow": "Russian Standard Time",
		"Europe/Oslo": "W. Europe Standard Time",
		"Europe/Paris": "Romance Standard Time",
		"Europe/Podgorica": "Central Europe Standard Time",
		"Europe/Prague": "Central Europe Standard Time",
		"Europe/Riga": "FLE Standard Time",
		"Europe/Rome": "W. Europe Standard Time",
		"Europe/Samara": "Russia Time Zone 3",
		"Europe/San_Marino": "W. Europe Standard Time",
		"Europe/Sarajevo": "Central European Standard Time",
		"Europe/Saratov": "Saratov Standard Time",
		"Europe/Simferopol": "Russian Standard Time",
		"Europe/Skopje": "Central European Standard Time",
		"Europe/Sofia": "FLE Standard Time",
		"Europe/Stockholm": "W. Europe Standard Time",
		"Europe/Tallinn": "FLE Standard Time",
		"Europe/Tirane": "Central Europe Standard Time",
		"Europe/Ulyanovsk": "Astrakhan Standard Time",
		"Europe/Uzhgorod": "FLE Standard Time",
		"Europe/Vaduz": "W. Europe Standard Time",
		"Europe/Vatican": "W. Europe Standard Time",
		"Europe/Vienna": "W. Europe Standard Time",
		"Europe/Vilnius": "FLE Standard Time",
		"Europe/Volgograd": "Russian Standard Time",
		"Europe/Warsaw": "Central European Standard Time",
		"Europe/Zagreb": "Central European Standard Time",
		"Europe/Zaporozhye": "FLE Standard Time",
		"Europe/Zurich": "W. Europe Standard Time",
		"Indian/Antananarivo": "E. Africa Standard Time",
		"Indian/Chagos": "Central Asia Standard Time",
		"Indian/Christmas": "SE Asia Standard Time",
		"Indian/Cocos": "Myanmar Standard Time",
		"Indian/Comoro": "E. Africa Standard Time",
		"Indian/Kerguelen": "West Asia Standard Time",
		"Indian/Mahe": "Mauritius Standard Time",
		"Indian/Maldives": "West Asia Standard Time",
		"Indian/Mauritius": "Mauritius Standard Time",
		"Indian/Mayotte": "E. Africa Standard Time",
		"Indian/Reunion": "Mauritius Standard Time",
		MST7MDT: "Mountain Standard Time",
		"Pacific/Apia": "Samoa Standard Time",
		"Pacific/Auckland": "New Zealand Standard Time",
		"Pacific/Bougainville": "Bougainville Standard Time",
		"Pacific/Chatham": "Chatham Islands Standard Time",
		"Pacific/Chuuk": "West Pacific Standard Time",
		"Pacific/Easter": "Easter Island Standard Time",
		"Pacific/Efate": "Central Pacific Standard Time",
		"Pacific/Enderbury": "UTC+13",
		"Pacific/Fakaofo": "UTC+13",
		"Pacific/Fiji": "Fiji Standard Time",
		"Pacific/Funafuti": "UTC+12",
		"Pacific/Galapagos": "Central America Standard Time",
		"Pacific/Gambier": "UTC-09",
		"Pacific/Guadalcanal": "Central Pacific Standard Time",
		"Pacific/Guam": "West Pacific Standard Time",
		"Pacific/Honolulu": "Hawaiian Standard Time",
		"Pacific/Johnston": "Hawaiian Standard Time",
		"Pacific/Kiritimati": "Line Islands Standard Time",
		"Pacific/Kosrae": "Central Pacific Standard Time",
		"Pacific/Kwajalein": "UTC+12",
		"Pacific/Majuro": "UTC+12",
		"Pacific/Marquesas": "Marquesas Standard Time",
		"Pacific/Midway": "UTC-11",
		"Pacific/Nauru": "UTC+12",
		"Pacific/Niue": "UTC-11",
		"Pacific/Norfolk": "Norfolk Standard Time",
		"Pacific/Noumea": "Central Pacific Standard Time",
		"Pacific/Pago_Pago": "UTC-11",
		"Pacific/Palau": "Tokyo Standard Time",
		"Pacific/Pitcairn": "UTC-08",
		"Pacific/Pohnpei": "Central Pacific Standard Time",
		"Pacific/Ponape": "Central Pacific Standard Time",
		"Pacific/Port_Moresby": "West Pacific Standard Time",
		"Pacific/Rarotonga": "Hawaiian Standard Time",
		"Pacific/Saipan": "West Pacific Standard Time",
		"Pacific/Tahiti": "Hawaiian Standard Time",
		"Pacific/Tarawa": "UTC+12",
		"Pacific/Tongatapu": "Tonga Standard Time",
		"Pacific/Truk": "West Pacific Standard Time",
		"Pacific/Wake": "UTC+12",
		"Pacific/Wallis": "UTC+12",
		PST8PDT: "Pacific Standard Time"
	},
	momentTimeZones = {
		version: "2020a",
		zones: ["Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5", "Africa/Accra|LMT GMT +0020|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5", "Africa/Nairobi|LMT EAT +0230 +0245|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5", "Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5", "Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6", "Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4", "Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5", "Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", "Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|32e5", "Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3", "Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|20e4", "Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5", "Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|01212121212121212121212121212121213|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0|", "Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5", "Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5", "Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5", "Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00|", "Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5", "Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5", "Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4", "America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3", "America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4", "America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0|", "America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0|", "America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0|", "America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0|", "America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|", "America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0|", "America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|", "America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0|", "America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0|", "America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0|", "America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0|", "America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0|", "America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4", "America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5", "America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2", "America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3", "America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5", "America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4", "America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5", "America/Belize|LMT CST -0530 CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3", "America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2", "America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2", "America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5", "America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4", "America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2", "America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4", "America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5", "America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3", "America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5", "America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4", "America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5", "America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2", "America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4", "America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8", "America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3", "America/Dawson|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|01010230405656565656565656565656565656565656565656565656565656565656565656565656565656565657|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|13e2", "America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|0123425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 JxX1 SMX 1cN0 1cL0 aW10 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5", "America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|0121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 XQp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5", "America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3", "America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5", "America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5", "America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", "America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5", "America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3", "America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", "America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|01212121212121212121212121212121212121212121212121212121212121212121212121232121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5", "America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5", "America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4", "America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4", "America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010401054541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 8wn0 1cN0 1cL0 1cN0 1cK0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2", "America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2", "America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4", "America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3", "America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 1nX1 e0X 9vd0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5", "America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6", "America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4", "America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5", "America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5", "America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4", "America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4", "America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4", "America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2", "America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5", "America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6", "America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3", "America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5", "America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", "America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5", "America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4", "America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2", "America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2", "America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2", "America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4", "America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5", "America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4", "America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4", "America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5", "America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|", "America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842", "America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2", "America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5", "America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4", "America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229", "America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4", "America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5", "America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5", "America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6", "America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452", "America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2", "America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3", "America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5", "America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656", "America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Whitehorse|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|01010230405656565656565656565656565656565656565656565656565656565656565656565656565656565657|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|23e3", "America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4", "America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642", "America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "Antarctica/Casey|-00 +08 +11|0 -80 -b0|01212121|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10|10", "Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70", "Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80", "Antarctica/Macquarie|AEST AEDT -00 +11|-a0 -b0 0 -b0|0102010101010101010101010101010101010101010101010101010101010101010101010101010101010101013|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1", "Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60", "Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5", "Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40", "Antarctica/Rothera|-00 -03|0 30|01|gOo0|130", "Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20", "Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40", "Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25", "Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4", "Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5", "Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5", "Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5", "Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3", "Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4", "Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4", "Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4", "Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|", "Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5", "Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4", "Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5", "Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6", "Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|", "Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5", "Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4", "Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4", "Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6", "Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4", "Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST CDT|-80 -90|01010101010101010101010101010|-23uw0 18n0 OjB0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6", "Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5", "Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6", "Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5", "Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4", "Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5", "Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4", "Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|", "Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|0101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|18e5", "Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|25e4", "Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5", "Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5", "Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|IMT EET EEST +03 +04|-1U.U -20 -30 -30 -40|0121212121212121212121212121212121212121212121234312121212121212121212121212121212121212121212121212121212121212123|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSN0 CL0 mp0 1Vz0 1gN0 8yn0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1ip0 19X0 1ip0 17b0 qdB0 38L0 1jd0 Tz0 l6O0 11A0 WN0 1qL0 TB0 1tX0 U10 1tz0 11B0 1in0 17d0 z90 cne0 pb0 2Cp0 1800 14o0 1dc0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6", "Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6", "Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4", "Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|012121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4", "Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5", "Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4", "Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6", "Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5", "Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5", "Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", "Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5", "Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4", "Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4", "Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3", "Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5", "Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6", "Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4", "Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4", "Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5", "Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5", "Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4", "Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4", "Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5", "Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|", "Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4", "Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5", "Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4", "Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4", "Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -a0 -9u|012343434343151515151515134343|-2um8r.Q 97XV.Q 1m1zu 6CM0 Fz0 1kN0 14n0 1kN0 14L0 1zd0 On0 69B0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6", "Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2", "Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5", "Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5", "Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5", "Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3", "Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rc0 1lc0 14o0 1zc0 Oo0 1zc0 Oo0|38e6", "Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5", "Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5", "Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5", "Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4", "Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3", "Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4", "Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3", "Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4", "Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4", "Atlantic/South_Georgia|-02|20|0||30", "Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2", "Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5", "Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5", "Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5", "Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3", "Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746", "Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4", "Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368", "Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4", "Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347", "Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10", "Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5", "Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5", "CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|", "Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2", "CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|", "Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "EST|EST|50|0||", "EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "Etc/GMT-0|GMT|0|0||", "Etc/GMT-1|+01|-10|0||", "Pacific/Port_Moresby|+10|-a0|0||25e4", "Etc/GMT-11|+11|-b0|0||", "Pacific/Tarawa|+12|-c0|0||29e3", "Etc/GMT-13|+13|-d0|0||", "Etc/GMT-14|+14|-e0|0||", "Etc/GMT-2|+02|-20|0||", "Etc/GMT-3|+03|-30|0||", "Etc/GMT-4|+04|-40|0||", "Etc/GMT-5|+05|-50|0||", "Etc/GMT-6|+06|-60|0||", "Indian/Christmas|+07|-70|0||21e2", "Etc/GMT-8|+08|-80|0||", "Pacific/Palau|+09|-90|0||21e3", "Etc/GMT+1|-01|10|0||", "Etc/GMT+10|-10|a0|0||", "Etc/GMT+11|-11|b0|0||", "Etc/GMT+12|-12|c0|0||", "Etc/GMT+3|-03|30|0||", "Etc/GMT+4|-04|40|0||", "Etc/GMT+5|-05|50|0||", "Etc/GMT+6|-06|60|0||", "Etc/GMT+7|-07|70|0||", "Etc/GMT+8|-08|80|0||", "Etc/GMT+9|-09|90|0||", "Etc/UTC|UTC|0|0||", "Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5", "Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3", "Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5", "Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5", "Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6", "Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5", "Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5", "Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5", "Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5", "Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1ip0 17b0 1op0 1tb0 Q2m0 3Ne0 WM0 1fA0 1cM0 1cM0 1oJ0 1dc0 1030 1fA0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1iM0 1fA0 8Ha0 Rb0 1wN0 Rb0 1BB0 Lz0 1C20 LB0 SNX0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4", "Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4", "Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3", "Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Kaliningrad|CET CEST EET EEST MSK MSD +03|-10 -20 -20 -30 -30 -40 -30|01010101010101232454545454545454543232323232323232323232323232323232323232323262|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 390 7A0 1en0 12N0 1pbb0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4", "Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5", "Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4", "Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5", "Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5", "Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3", "Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6", "Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6", "Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4", "Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5", "Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5", "Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810|", "Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5", "Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4", "Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5", "Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4", "Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1ao0 1co0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5", "Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0|10e5", "Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4", "HST|HST|a0|0||", "Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2", "Indian/Cocos|+0630|-6u|0||596", "Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130", "Indian/Mahe|LMT +04|-3F.M -40|01|-2yO3F.M|79e3", "Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4", "Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4", "Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4", "Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3", "MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|", "MST|MST|70|0||", "MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600", "Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3", "Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4", "Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3", "Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3", "Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1", "Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00|88e4", "Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3", "Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125", "Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4", "Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4", "Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4", "Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2", "Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2", "Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3", "Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2", "Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2", "Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3", "Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2", "Pacific/Norfolk|+1112 +1130 +1230 +11 +12|-bc -bu -cu -b0 -c0|012134343434343434343434343434343434343434|-Kgbc W01G Oo0 1COo0 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|25e4", "Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3", "Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56", "Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3", "Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3", "Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4", "Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3", "PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|", "WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|"],
		links: ["Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Cairo|Egypt", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Nairobi|Africa/Addis_Ababa", "Africa/Nairobi|Africa/Asmara", "Africa/Nairobi|Africa/Asmera", "Africa/Nairobi|Africa/Dar_es_Salaam", "Africa/Nairobi|Africa/Djibouti", "Africa/Nairobi|Africa/Kampala", "Africa/Nairobi|Africa/Mogadishu", "Africa/Nairobi|Indian/Antananarivo", "Africa/Nairobi|Indian/Comoro", "Africa/Nairobi|Indian/Mayotte", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Catamarca|America/Argentina/ComodRivadavia", "America/Argentina/Catamarca|America/Catamarca", "America/Argentina/Cordoba|America/Cordoba", "America/Argentina/Cordoba|America/Rosario", "America/Argentina/Jujuy|America/Jujuy", "America/Argentina/Mendoza|America/Mendoza", "America/Atikokan|America/Coral_Harbour", "America/Chicago|US/Central", "America/Curacao|America/Aruba", "America/Curacao|America/Kralendijk", "America/Curacao|America/Lower_Princes", "America/Denver|America/Shiprock", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Detroit|US/Michigan", "America/Edmonton|Canada/Mountain", "America/Fort_Wayne|America/Indiana/Indianapolis", "America/Fort_Wayne|America/Indianapolis", "America/Fort_Wayne|US/East-Indiana", "America/Godthab|America/Nuuk", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/Indiana/Knox|America/Knox_IN", "America/Indiana/Knox|US/Indiana-Starke", "America/Jamaica|Jamaica", "America/Kentucky/Louisville|America/Louisville", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Manaus|Brazil/West", "America/Mazatlan|Mexico/BajaSur", "America/Mexico_City|Mexico/General", "America/New_York|US/Eastern", "America/Noronha|Brazil/DeNoronha", "America/Panama|America/Cayman", "America/Phoenix|US/Arizona", "America/Port_of_Spain|America/Anguilla", "America/Port_of_Spain|America/Antigua", "America/Port_of_Spain|America/Dominica", "America/Port_of_Spain|America/Grenada", "America/Port_of_Spain|America/Guadeloupe", "America/Port_of_Spain|America/Marigot", "America/Port_of_Spain|America/Montserrat", "America/Port_of_Spain|America/St_Barthelemy", "America/Port_of_Spain|America/St_Kitts", "America/Port_of_Spain|America/St_Lucia", "America/Port_of_Spain|America/St_Thomas", "America/Port_of_Spain|America/St_Vincent", "America/Port_of_Spain|America/Tortola", "America/Port_of_Spain|America/Virgin", "America/Regina|Canada/Saskatchewan", "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "America/Tijuana|America/Ensenada", "America/Tijuana|America/Santa_Isabel", "America/Tijuana|Mexico/BajaNorte", "America/Toronto|America/Montreal", "America/Toronto|Canada/Eastern", "America/Vancouver|Canada/Pacific", "America/Whitehorse|Canada/Yukon", "America/Winnipeg|Canada/Central", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Vientiane", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Ho_Chi_Minh|Asia/Saigon", "Asia/Hong_Kong|Hongkong", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Kuala_Lumpur|Asia/Singapore", "Asia/Kuala_Lumpur|Singapore", "Asia/Macau|Asia/Macao", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|Europe/Nicosia", "Asia/Qatar|Asia/Bahrain", "Asia/Rangoon|Asia/Yangon", "Asia/Riyadh|Asia/Aden", "Asia/Riyadh|Asia/Kuwait", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|PRC", "Asia/Taipei|ROC", "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Asia/Kashgar", "Atlantic/Faroe|Atlantic/Faeroe", "Atlantic/Reykjavik|Iceland", "Atlantic/South_Georgia|Etc/GMT+2", "Australia/Adelaide|Australia/South", "Australia/Brisbane|Australia/Queensland", "Australia/Broken_Hill|Australia/Yancowinna", "Australia/Darwin|Australia/North", "Australia/Hobart|Australia/Tasmania", "Australia/Lord_Howe|Australia/LHI", "Australia/Melbourne|Australia/Victoria", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/NSW", "Etc/GMT-0|Etc/GMT", "Etc/GMT-0|Etc/GMT+0", "Etc/GMT-0|Etc/GMT0", "Etc/GMT-0|Etc/Greenwich", "Etc/GMT-0|GMT", "Etc/GMT-0|GMT+0", "Etc/GMT-0|GMT-0", "Etc/GMT-0|GMT0", "Etc/GMT-0|Greenwich", "Etc/UTC|Etc/UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UCT", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belgrade|Europe/Ljubljana", "Europe/Belgrade|Europe/Podgorica", "Europe/Belgrade|Europe/Sarajevo", "Europe/Belgrade|Europe/Skopje", "Europe/Belgrade|Europe/Zagreb", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Helsinki|Europe/Mariehamn", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Portugal", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Oslo|Arctic/Longyearbyen", "Europe/Oslo|Atlantic/Jan_Mayen", "Europe/Prague|Europe/Bratislava", "Europe/Rome|Europe/San_Marino", "Europe/Rome|Europe/Vatican", "Europe/Warsaw|Poland", "Europe/Zurich|Europe/Busingen", "Europe/Zurich|Europe/Vaduz", "Indian/Christmas|Etc/GMT-7", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Easter|Chile/EasterIsland", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Kwajalein|Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Palau|Etc/GMT-9", "Pacific/Pohnpei|Pacific/Ponape", "Pacific/Port_Moresby|Etc/GMT-10", "Pacific/Tarawa|Etc/GMT-12", "Pacific/Tarawa|Pacific/Funafuti", "Pacific/Tarawa|Pacific/Wake", "Pacific/Tarawa|Pacific/Wallis"],
		countries: ["AD|Europe/Andorra", "AE|Asia/Dubai", "AF|Asia/Kabul", "AG|America/Port_of_Spain America/Antigua", "AI|America/Port_of_Spain America/Anguilla", "AL|Europe/Tirane", "AM|Asia/Yerevan", "AO|Africa/Lagos Africa/Luanda", "AQ|Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok Pacific/Auckland Antarctica/McMurdo", "AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia", "AS|Pacific/Pago_Pago", "AT|Europe/Vienna", "AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Currie Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla", "AW|America/Curacao America/Aruba", "AX|Europe/Helsinki Europe/Mariehamn", "AZ|Asia/Baku", "BA|Europe/Belgrade Europe/Sarajevo", "BB|America/Barbados", "BD|Asia/Dhaka", "BE|Europe/Brussels", "BF|Africa/Abidjan Africa/Ouagadougou", "BG|Europe/Sofia", "BH|Asia/Qatar Asia/Bahrain", "BI|Africa/Maputo Africa/Bujumbura", "BJ|Africa/Lagos Africa/Porto-Novo", "BL|America/Port_of_Spain America/St_Barthelemy", "BM|Atlantic/Bermuda", "BN|Asia/Brunei", "BO|America/La_Paz", "BQ|America/Curacao America/Kralendijk", "BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco", "BS|America/Nassau", "BT|Asia/Thimphu", "BW|Africa/Maputo Africa/Gaborone", "BY|Europe/Minsk", "BZ|America/Belize", "CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Blanc-Sablon America/Toronto America/Nipigon America/Thunder_Bay America/Iqaluit America/Pangnirtung America/Atikokan America/Winnipeg America/Rainy_River America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Creston America/Dawson_Creek America/Fort_Nelson America/Vancouver America/Whitehorse America/Dawson", "CC|Indian/Cocos", "CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi", "CF|Africa/Lagos Africa/Bangui", "CG|Africa/Lagos Africa/Brazzaville", "CH|Europe/Zurich", "CI|Africa/Abidjan", "CK|Pacific/Rarotonga", "CL|America/Santiago America/Punta_Arenas Pacific/Easter", "CM|Africa/Lagos Africa/Douala", "CN|Asia/Shanghai Asia/Urumqi", "CO|America/Bogota", "CR|America/Costa_Rica", "CU|America/Havana", "CV|Atlantic/Cape_Verde", "CW|America/Curacao", "CX|Indian/Christmas", "CY|Asia/Nicosia Asia/Famagusta", "CZ|Europe/Prague", "DE|Europe/Zurich Europe/Berlin Europe/Busingen", "DJ|Africa/Nairobi Africa/Djibouti", "DK|Europe/Copenhagen", "DM|America/Port_of_Spain America/Dominica", "DO|America/Santo_Domingo", "DZ|Africa/Algiers", "EC|America/Guayaquil Pacific/Galapagos", "EE|Europe/Tallinn", "EG|Africa/Cairo", "EH|Africa/El_Aaiun", "ER|Africa/Nairobi Africa/Asmara", "ES|Europe/Madrid Africa/Ceuta Atlantic/Canary", "ET|Africa/Nairobi Africa/Addis_Ababa", "FI|Europe/Helsinki", "FJ|Pacific/Fiji", "FK|Atlantic/Stanley", "FM|Pacific/Chuuk Pacific/Pohnpei Pacific/Kosrae", "FO|Atlantic/Faroe", "FR|Europe/Paris", "GA|Africa/Lagos Africa/Libreville", "GB|Europe/London", "GD|America/Port_of_Spain America/Grenada", "GE|Asia/Tbilisi", "GF|America/Cayenne", "GG|Europe/London Europe/Guernsey", "GH|Africa/Accra", "GI|Europe/Gibraltar", "GL|America/Godthab America/Danmarkshavn America/Scoresbysund America/Thule", "GM|Africa/Abidjan Africa/Banjul", "GN|Africa/Abidjan Africa/Conakry", "GP|America/Port_of_Spain America/Guadeloupe", "GQ|Africa/Lagos Africa/Malabo", "GR|Europe/Athens", "GS|Atlantic/South_Georgia", "GT|America/Guatemala", "GU|Pacific/Guam", "GW|Africa/Bissau", "GY|America/Guyana", "HK|Asia/Hong_Kong", "HN|America/Tegucigalpa", "HR|Europe/Belgrade Europe/Zagreb", "HT|America/Port-au-Prince", "HU|Europe/Budapest", "ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura", "IE|Europe/Dublin", "IL|Asia/Jerusalem", "IM|Europe/London Europe/Isle_of_Man", "IN|Asia/Kolkata", "IO|Indian/Chagos", "IQ|Asia/Baghdad", "IR|Asia/Tehran", "IS|Atlantic/Reykjavik", "IT|Europe/Rome", "JE|Europe/London Europe/Jersey", "JM|America/Jamaica", "JO|Asia/Amman", "JP|Asia/Tokyo", "KE|Africa/Nairobi", "KG|Asia/Bishkek", "KH|Asia/Bangkok Asia/Phnom_Penh", "KI|Pacific/Tarawa Pacific/Enderbury Pacific/Kiritimati", "KM|Africa/Nairobi Indian/Comoro", "KN|America/Port_of_Spain America/St_Kitts", "KP|Asia/Pyongyang", "KR|Asia/Seoul", "KW|Asia/Riyadh Asia/Kuwait", "KY|America/Panama America/Cayman", "KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral", "LA|Asia/Bangkok Asia/Vientiane", "LB|Asia/Beirut", "LC|America/Port_of_Spain America/St_Lucia", "LI|Europe/Zurich Europe/Vaduz", "LK|Asia/Colombo", "LR|Africa/Monrovia", "LS|Africa/Johannesburg Africa/Maseru", "LT|Europe/Vilnius", "LU|Europe/Luxembourg", "LV|Europe/Riga", "LY|Africa/Tripoli", "MA|Africa/Casablanca", "MC|Europe/Monaco", "MD|Europe/Chisinau", "ME|Europe/Belgrade Europe/Podgorica", "MF|America/Port_of_Spain America/Marigot", "MG|Africa/Nairobi Indian/Antananarivo", "MH|Pacific/Majuro Pacific/Kwajalein", "MK|Europe/Belgrade Europe/Skopje", "ML|Africa/Abidjan Africa/Bamako", "MM|Asia/Yangon", "MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan", "MO|Asia/Macau", "MP|Pacific/Guam Pacific/Saipan", "MQ|America/Martinique", "MR|Africa/Abidjan Africa/Nouakchott", "MS|America/Port_of_Spain America/Montserrat", "MT|Europe/Malta", "MU|Indian/Mauritius", "MV|Indian/Maldives", "MW|Africa/Maputo Africa/Blantyre", "MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas", "MY|Asia/Kuala_Lumpur Asia/Kuching", "MZ|Africa/Maputo", "NA|Africa/Windhoek", "NC|Pacific/Noumea", "NE|Africa/Lagos Africa/Niamey", "NF|Pacific/Norfolk", "NG|Africa/Lagos", "NI|America/Managua", "NL|Europe/Amsterdam", "NO|Europe/Oslo", "NP|Asia/Kathmandu", "NR|Pacific/Nauru", "NU|Pacific/Niue", "NZ|Pacific/Auckland Pacific/Chatham", "OM|Asia/Dubai Asia/Muscat", "PA|America/Panama", "PE|America/Lima", "PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier", "PG|Pacific/Port_Moresby Pacific/Bougainville", "PH|Asia/Manila", "PK|Asia/Karachi", "PL|Europe/Warsaw", "PM|America/Miquelon", "PN|Pacific/Pitcairn", "PR|America/Puerto_Rico", "PS|Asia/Gaza Asia/Hebron", "PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores", "PW|Pacific/Palau", "PY|America/Asuncion", "QA|Asia/Qatar", "RE|Indian/Reunion", "RO|Europe/Bucharest", "RS|Europe/Belgrade", "RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Astrakhan Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr", "RW|Africa/Maputo Africa/Kigali", "SA|Asia/Riyadh", "SB|Pacific/Guadalcanal", "SC|Indian/Mahe", "SD|Africa/Khartoum", "SE|Europe/Stockholm", "SG|Asia/Singapore", "SH|Africa/Abidjan Atlantic/St_Helena", "SI|Europe/Belgrade Europe/Ljubljana", "SJ|Europe/Oslo Arctic/Longyearbyen", "SK|Europe/Prague Europe/Bratislava", "SL|Africa/Abidjan Africa/Freetown", "SM|Europe/Rome Europe/San_Marino", "SN|Africa/Abidjan Africa/Dakar", "SO|Africa/Nairobi Africa/Mogadishu", "SR|America/Paramaribo", "SS|Africa/Juba", "ST|Africa/Sao_Tome", "SV|America/El_Salvador", "SX|America/Curacao America/Lower_Princes", "SY|Asia/Damascus", "SZ|Africa/Johannesburg Africa/Mbabane", "TC|America/Grand_Turk", "TD|Africa/Ndjamena", "TF|Indian/Reunion Indian/Kerguelen", "TG|Africa/Abidjan Africa/Lome", "TH|Asia/Bangkok", "TJ|Asia/Dushanbe", "TK|Pacific/Fakaofo", "TL|Asia/Dili", "TM|Asia/Ashgabat", "TN|Africa/Tunis", "TO|Pacific/Tongatapu", "TR|Europe/Istanbul", "TT|America/Port_of_Spain", "TV|Pacific/Funafuti", "TW|Asia/Taipei", "TZ|Africa/Nairobi Africa/Dar_es_Salaam", "UA|Europe/Simferopol Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye", "UG|Africa/Nairobi Africa/Kampala", "UM|Pacific/Pago_Pago Pacific/Wake Pacific/Honolulu Pacific/Midway", "US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu", "UY|America/Montevideo", "UZ|Asia/Samarkand Asia/Tashkent", "VA|Europe/Rome Europe/Vatican", "VC|America/Port_of_Spain America/St_Vincent", "VE|America/Caracas", "VG|America/Port_of_Spain America/Tortola", "VI|America/Port_of_Spain America/St_Thomas", "VN|Asia/Bangkok Asia/Ho_Chi_Minh", "VU|Pacific/Efate", "WF|Pacific/Wallis", "WS|Pacific/Apia", "YE|Asia/Riyadh Asia/Aden", "YT|Africa/Nairobi Indian/Mayotte", "ZA|Africa/Johannesburg", "ZM|Africa/Maputo Africa/Lusaka", "ZW|Africa/Maputo Africa/Harare"]
	},
	StorageKeys = {
		QueryStringURL: "RdWebAppSettings::QueryStringURL"
	},
	AudioPlaybackType = {
		PlayOnDevice: 0,
		PlayOnRemotePC: 1,
		NoSound: 2
	},
	BookmarkType = {
		Desktop: 0,
		RemoteApp: 1
	},
	Bookmark = function () {
		"use strict";
		this.id = null, this.hostName = null, this.port = null, this.friendlyName = null, this.audioPlaybackType = AudioPlaybackType.PlayOnDevice, this.swapMouseButtons = !1, this.adminMode = !1, this.bookmarkType = BookmarkType.Desktop, this.thumbnail = null, this.defaultThumbnai = "assets/images/defaultIcon.807effe8.png", this.rdpFileString = "", this.folderNames = [], this.tenantId = "", this.multiTenantMode = !1, this.endpointCert = null, this.workspaceName = null, this.desktopName = null, this.label = function () {
			return this.friendlyName || this.hostName
		}, this.clippedDisplayLabel = function () {
			var a = this.label(),
				b = a.split(" "),
				c = "",
				d = "";
			if (b.length < 1) return a;
			if (b[0].length > 10) {
				var e = b[0].substring(0, 9) + "-";
				b[0] = b[0].substring(10), b.unshift(e)
			}
			for (var f = 0; f < b.length; f++) {
				var g = b[f];
				(c + " " + g).trim().length <= 10 ? c = (c + " " + g).trim() : d = (d + " " + g).trim()
			}
			return d.length > 10 && (d = d.substring(0, 7).trim() + "..."), c + " " + d
		}, this.desktopLabel = function () {
			return this.desktopName || this.label()
		}, this.validate = function () {
			return !0
		}
	},
	ConnectionProperties = function (a, b) {
		"use strict";

		function c() {
			try {
				return moment.tz.load(momentTimeZones), moment.tz.guess()
			} catch (a) {
				return
			}
		}
		this.hostName = null, this.port = 3389, this.gatewayHostName = null, this.gatewayPort = 443, this.remoteApplicationMode = !1, this.remoteApplicationProgram = "", this.remoteApplicationCmdLine = "", this.connectionSettings = null, this.tenantId = null, this.properties = null, this.setConnectionWebworkersFlag = function (a) {
			var c = b.localStorage;
			c && c.setItem("RdWebAppSettings::UseConnectionWebWorkers", a), this.connectionSettings.UseConnectionWebWorkers = a
		};
		var d = function (a) {
			var b = new DeviceInfo;
			return !b.isIE() && "EdgeHTML" !== b.getEngineInfo() && "false" !== a
		};
		this.applyProperties = function (a) {
			if (a) {
				this.connectionSettings = Module.RdpConnectionSettings.CreateFromString(a), this.connectionSettings.AzureRemoteApp = !1, this.connectionSettings.UseGraphicsWebWorkers = !1, this.connectionSettings.TimeZoneBias = (new Date).getTimezoneOffset();
				var b = Intl && Intl.DateTimeFormat && new Intl.DateTimeFormat;
				this.connectionSettings.TimeZoneName = b && b.resolvedOptions().timeZone || c() || "", this.connectionSettings.TimeZoneName = timeZones[this.connectionSettings.TimeZoneName] || this.connectionSettings.TimeZoneName, this.hostName = this.connectionSettings.HostName, this.port = this.connectionSettings.Port, this.gatewayHostName = this.connectionSettings.GatewayHostName, this.gatewayPort = this.connectionSettings.GatewayPort, this.remoteApplicationProgram = this.connectionSettings.RemoteAppProgram, this.remoteApplicationMode = this.connectionSettings.RemoteAppMode, this.remoteApplicationCmdLine = this.connectionSettings.RemoteAppCmdLine, this.EventLogUploadAddress = this.connectionSettings.EventLogUploadAddress, this.GatewayCertLogonAuthority = this.connectionSettings.GatewayCertLogonAuthority, this.properties = this.connectionSettings
			}
		}, this.isEqual = function (a) {
			var b, c = this.properties || {},
				d = a.properties || {};
			return b = c.HostPoolID || d.HostPoolID ? c.HostPoolID === d.HostPoolID : c.LBInfo === d.LBInfo, this.hostName === a.hostName && this.remoteApplicationMode === a.remoteApplicationMode && b && c.GatewayUsageMethod === d.GatewayUsageMethod && c.GatewayProfileUsageMethod === d.GatewayProfileUsageMethod && c.GatewayCredentialsSource === d.GatewayCredentialsSource && c.GatewayHostName === d.GatewayHostName
		};
		var e = this;
		! function () {
			if (e.tenantId = a && a.tenantId || null, e.applyProperties(a && a.rdpFileString || null), a && a.friendlyName && "RDP file launched resource" === a.friendlyName && (e.properties.RemoteAppName || e.properties.RemoteDesktopName) && (a.friendlyName = e.properties.RemoteAppName || e.properties.RemoteDesktopName), e.connectionSettings) {
				e.connectionSettings.MultiTenant = a.multiTenantMode, a.endpointCert && e.connectionSettings.SetEndpointCertificate(a.endpointCert);
				var c = b.localStorage;
				if (!c) throw new Error("Persistent storage is not available!");
				var f = c.getItem("RdWebAppSettings::SelectedKeyboardLayout");
				if (f) {
					var g = f.slice(1, -1),
						h = new KeyboardLayoutUtil;
					e.connectionSettings.CodePage = h.getKeyboardCodePage(g), e.connectionSettings.KeyboardLayout = h.getKeyboardLayout(g), e.connectionSettings.KeyboardType = h.getKeyboardType(g), e.connectionSettings.KeyboardSubType = h.getKeyboardSubType(g)
				}
				var i = c.getItem("RdWebAppSettings::UseConnectionWebWorkers");
				e.connectionSettings.UseConnectionWebWorkers = d(i)
			}
		}()
	},
	Credential = function () {
		"use strict";
		this.id = null, this.userName = null, this.password = null, this.label = function () {
			return this.userName
		}, this.validate = function () {
			return !0
		}
	},
	CredentialRequest = function (a) {
		"use strict";
		this.credentialHint = function () {
			var b = "",
				c = "";
			return a.getAuthType() === Module.IAuthCompletion_AuthType.UsernameAndPassword && (b = a.GetUserNameHint(), c = a.GetDomainHint()), b || (b = ""), c ? c += "\\" : c = "", c + b
		}, this.complete = function (b) {
			var c = b.userName,
				d = "",
				e = b.password || "",
				f = -1;
			(f = b.userName.indexOf("\\")) > -1 && (d = b.userName.substring(0, f), c = b.userName.substring(f + 1));
			try {
				a.complete(c, d, e), a.delete(), a = null
			} catch (b) {
				a = null
			}
		}, this.completeWithToken = function (b) {
			try {
				a.complete(b), a.delete(), a = null
			} catch (b) {
				a = null
			}
		}, this.isTokenRequired = function () {
			return a.getAuthType() === Module.IAuthCompletion_AuthType.ClaimsToken
		}(), this.cancel = function () {
			try {
				a.cancel(), a.delete(), a = null
			} catch (b) {
				a = null
			}
		}
	},
	EventProvider = function () {
		"use strict";
		var a = {},
			b = [];
		return a.filter = function (a) {
			return b.filter(function (b) {
				return b.event === a
			})
		}, a.fireEventCallback = function (b) {
			var c, d = a.filter(b),
				e = Array.prototype.splice.call(arguments, 1);
			if (d.length > 0)
				for (c = 0; c < d.length; c++) e = e.concat(d[c].arg), d[c].callback.apply(this, e)
		}, a.subscribe = function (a, c) {
			var d, e, f = [];
			for (d in b)
				if (b.hasOwnProperty(d) && b[d].event === a && b[d].callback === c) return;
			for (e = 2; e < arguments.length; e++) f.push(arguments[e]);
			b.push({
				event: a,
				callback: c,
				arg: f
			})
		}, a.unsubscribe = function (a, c) {
			var d;
			for (d = 0; d < b.length; d++)
				if (b[d].event === a && b[d].callback === c) {
					b.splice(d, 1);
					break
				}
		}, a
	},
	Redirections = function () {
		"use strict";
		this.id = null, this.clipboard = !1, this.printer = !1, this.audioInput = !1, this.drive = !1, this.rememberCollection = !1
	},
	SessionState = {
		Initialized: 0,
		Connecting: 1,
		Connected: 2,
		Disconnecting: 3,
		Disconnected: 4
	},
	SessionType = {
		Desktop: 0,
		RemoteApp: 1
	},
	SessionDelegate = function () {
		"use strict";
		this.canvasNeeded = null, this.retireCanvas = null, this.monitorBounds = null
	},
	SessionEvent = {
		ViewSizeChanged: 0,
		WillConnect: 1,
		DidConnect: 2,
		WillDisconnect: 3,
		DidDisconnect: 4,
		LoginCompleted: 5,
		ConnectionHealthStateChanged: 6,
		MousePointerChanged: 7,
		ShowDefaultMousePointer: 8,
		GetRemoteClipboardContent: 9,
		ClipboardContentRequest: 10,
		SetRemoteClipboardFormatsComplete: 11,
		FocusChanged: 12,
		WindowIconChanged: 13,
		WindowTitleChanged: 14,
		WindowLaunched: 15,
		ApplicationIdChanged: 16,
		CredentialsNeeded: 17,
		Error: 18,
		TrustChallenge: 19,
		DisplayDesktopBackground: 20
	},
	Session = function (a, b, c, d, e) {
		"use strict";
		var f = {
				events: new EventProvider,
				id: (new ObjectHelper).createGuid(),
				sessionType: c,
				windowId: null,
				connection: b
			},
			g = null,
			h = null,
			i = null,
			j = new Credential,
			k = function () {
				return f.delegate.canvasNeeded ? f.delegate.canvasNeeded(f.getConnectionId()) : null
			},
			l = function () {
				return f.delegate.monitorBounds ? f.delegate.monitorBounds() : null
			},
			m = function (a, b) {
				f.events.fireEventCallback(SessionEvent.ViewSizeChanged, f, a, b)
			},
			n = function (a, b) {
				j.password ? setTimeout(function () {
					a.complete(j)
				}) : (a.cred = j, j.userName || (j.userName = a.credentialHint()), f.events.fireEventCallback(SessionEvent.CredentialsNeeded, a, b))
			},
			o = function (a) {
				f.events.fireEventCallback(SessionEvent.TrustChallenge, a)
			},
			p = function (a, b) {
				f.events.fireEventCallback(SessionEvent.WillConnect, f.id, a, b)
			},
			q = function () {
				f.state = SessionState.Connected, f.events.fireEventCallback(SessionEvent.DidConnect, f.id), j = {}
			},
			r = function () {
				f.events.fireEventCallback(SessionEvent.WillDisconnect)
			},
			s = function (a) {
				f.state = SessionState.Disconnected, f.delegate.retireCanvas && f.delegate.retireCanvas(f.getConnectionId()), f.events.fireEventCallback(SessionEvent.DidDisconnect, f.id, a), j = {}
			},
			t = function (a, b) {
				f.state = SessionState.Disconnected, f.events.fireEventCallback(SessionEvent.DidDisconnect, f.id, b)
			},
			u = function (a, b) {
				f.state = SessionState.Disconnected, f.events.fireEventCallback(SessionEvent.DidDisconnect, f.id, b)
			},
			v = function () {
				f.events.fireEventCallback(SessionEvent.LoginCompleted)
			},
			w = function () {
				f.events.fireEventCallback(SessionEvent.ConnectionHealthStateChanged)
			},
			x = function (a, b, c) {
				f.events.fireEventCallback(SessionEvent.MousePointerChanged, a, b, c)
			},
			y = function (a) {
				f.events.fireEventCallback(SessionEvent.ShowDefaultMousePointer, a)
			},
			z = function (a, b) {
				d.log("[Session] Remote clipboard data received"), f.events.fireEventCallback(SessionEvent.GetRemoteClipboardContent, a, b)
			},
			A = function (a) {
				d.log("[Session] Remote Clipboard format set complete with result " + a), f.events.fireEventCallback(SessionEvent.SetRemoteClipboardFormatsComplete, a)
			},
			B = function (a) {
				d.log("[Session] Request for clipboard content received for format " + a.GetFormat()), f.events.fireEventCallback(SessionEvent.ClipboardContentRequest, a)
			},
			C = function (a) {
				d.log("[Session] Window deleted: " + a), a === f.id && f.events.fireEventCallback(SessionEvent.DidDisconnect, f.id)
			},
			D = function (a, b, c) {
				if (d.log("[Session] Window icon changed for window " + a + " Url: " + b + " bigIcon: " + c), a === f.windowId)
					if (c) g = b, f.events.fireEventCallback(SessionEvent.WindowIconChanged);
					else if (null === g) {
					var h = f.getBookmark();
					if (h && h.thumbnail) {
						g = h.thumbnail, d.log("[Session] Icon for window: " + a + " taken from bookmark thumbnail. Url: " + h.thumbnail);
						var i = "[Session] Bookmark name : " + h.friendlyName + ", bookmark id " + h.id + ", Window ID: " + a;
						d.log(i), e.onClientEvent(f.connection.id, "BigIconMissing", i, 4)
					} else {
						g = b;
						var j = "[Session] Bookmark icon not found, using small icon for windowid :" + a;
						d.log(j), e.onClientEvent(f.connection.id, "BigIconMissing", j, 4)
					}
					f.events.fireEventCallback(SessionEvent.WindowIconChanged)
				}
			},
			E = function (a, b) {
				d.log("[Session] Window title for window " + a + " changed to " + b), a === f.windowId && (h = b), f.events.fireEventCallback(SessionEvent.WindowTitleChanged)
			},
			F = function (a, b) {
				d.log("[Session] Application id changed to: " + b + " for Window: " + a), a === f.windowId && (i = b), f.events.fireEventCallback(SessionEvent.ApplicationIdChanged)
			},
			G = function (a, b) {
				d.log("[Session] Window " + f.windowId + " launched successfully with result " + b), f.events.fireEventCallback(SessionEvent.WindowLaunched, f, a, b)
			},
			H = function (a) {
				f.events.fireEventCallback(SessionEvent.Error, f.id, a)
			},
			I = function (a) {
				f.events.fireEventCallback(SessionEvent.DisplayDesktopBackground, a, f.id)
			};
		return f.state = SessionState.Initialized, f.connection.getState() === ConnectionState.Connected && (f.state = SessionState.Connected), f.connection && (f.connection.events.subscribe(ConnectionEvent.ConnectionConnectFailed, u), f.connection.events.subscribe(ConnectionEvent.ConnectionDestroyed, t), f.connection.events.subscribe(ConnectionEvent.WindowDeleted, C), f.connection.events.subscribe(ConnectionEvent.WindowIconChanged, D), f.connection.events.subscribe(ConnectionEvent.WindowTitleChanged, E), f.connection.events.subscribe(ConnectionEvent.WindowApplicationIdChanged, F), f.connection.events.subscribe(ConnectionEvent.WindowLaunched, G)), f.delegate = new SessionDelegate, f.connect = function () {
			f.state !== SessionState.Connecting && (f.state = SessionState.Connecting, f.connection.delegate.displayDesktopBackground = I, f.connection.delegate.canvasNeeded = k, f.connection.delegate.monitorBounds = l, f.connection.delegate.viewSizeChanged = m, f.connection.delegate.credentialsNeeded = n, f.connection.delegate.trustChallenge = o, f.connection.delegate.willConnect = p, f.connection.delegate.didConnect = q, f.connection.delegate.willDisconnect = r, f.connection.delegate.didDisconnect = s, f.connection.delegate.loginCompleted = v, f.connection.delegate.connectionHealthStateChanged = w, f.connection.delegate.mousePointerChanged = x, f.connection.delegate.showDefaultMousePointer = y, f.connection.delegate.getRemoteClipboardContent = z, f.connection.delegate.setRemoteClipboardFormatsComplete = A, f.connection.delegate.clipboardContentRequest = B, f.connection.delegate.error = H, f.connection.connect())
		}, f.disconnect = function (a) {
			f.state !== SessionState.Disconnecting && (f.state = SessionState.Disconnecting, f.windowId && (f.connection.closeWindow(f.windowId), f.windowId = null), f.connection.events.unsubscribe(ConnectionEvent.WindowIconChanged, D), !0 !== a ? setTimeout(function () {
				f.connection.disconnect()
			}, 1) : setTimeout(function () {
				f.connection.disconnect(!0)
			}, 1))
		}, f.uploadFile = function (a, b, c, d) {
			f.connection.uploadFile(a, b, c, d)
		}, f.syncFileSystem = function () {
			f.connection.syncFileSystem()
		}, f.driveUploadError = function (a) {
			f.connection.fileSystemError(a)
		}, f.getUploadFolderPath = function () {
			return f.connection.getUploadFolderPath()
		}, f.mouseMove = function (a, b) {
			f.connection.mouseMove(a, b)
		}, f.mouseDown = function (a, b, c) {
			f.connection.mouseDown(a, b, c)
		}, f.mouseUp = function (a, b, c) {
			f.connection.mouseUp(a, b, c)
		}, f.mouseWheel = function (a, b) {
			f.connection.mouseWheel(a, b)
		}, f.keyDown = function (a) {
			f.connection.keyDown(a)
		}, f.keyUp = function (a) {
			f.connection.keyUp(a)
		}, f.keyUnicodeDown = function (a) {
			f.connection.keyUnicodeDown(a)
		}, f.keyUnicodeUp = function (a) {
			f.connection.keyUnicodeUp(a)
		}, f.sendTouchEvents = function (a, b) {
			f.connection.sendTouchEvents(a, b)
		}, f.setRemoteClipboardFormats = function () {
			f.connection.clipboardHandler.setRemoteClipboardFormats()
		}, f.isClipboardReady = function () {
			return f.connection.isClipboardReady()
		}, f.isFileUploadSupported = function () {
			return f.connection.isFileUploadSupported()
		}, f.getBookmark = function () {
			return a
		}, f.setFocus = function (a, b) {
			d.log("[Session] Session focus changed to " + a + " id:" + f.id + " window id:" + f.windowId), c === SessionType.RemoteApp && a && f.windowId && f.connection.activateWindow(f.windowId, b), f.connection.setFocus(a), f.events.fireEventCallback(SessionEvent.FocusChanged, a)
		}, f.getFocus = function () {
			return f.connection.getFocus()
		}, f.getThumbnail = function () {
			return null !== g ? g : null !== a ? a.thumbnail : null
		}, f.getLabel = function () {
			return h || a && a.label() || "no title"
		}, f.getApplicationId = function () {
			return null !== i ? i : f.id
		}, f.invalidateCanvas = function () {
			f.connection.invalidateCanvas()
		}, f.getConnectionId = function () {
			return f.connection.id
		}, f.getSiblingCount = function () {
			return f.connection.getWindowCount()
		}, f.getDisconnectReason = function () {
			return f.connection.disconnectReason && !f.connection.isAutoReconnecting() ? SessionDisconnectCode.locKey(f.connection.disconnectReason) : null
		}, f
	},
	StoreTransactionMode = {
		Immediate: 0,
		Transactional: 1
	},
	StoreType = {
		Memory: 1,
		Persistent: 2
	},
	StoreEvent = {
		RecordAdded: 0,
		RecordRemoved: 1,
		RecordUpdated: 2,
		CommitComplete: 3,
		RollbackComplete: 4
	},
	Store = function (a, b, c, d, e, f) {
		"use strict";
		var g = {
				events: new EventProvider
			},
			h = [],
			i = [],
			j = {},
			k = function () {
				var a, c;
				if (b === StoreType.Persistent) {
					if (!("sessionStorage" in window) || null === window.sessionStorage) throw new Error("Session storage is not supported");
					j = {};
					for (a in sessionStorage) sessionStorage.hasOwnProperty(a) && 0 === a.indexOf(e) && (c = d(sessionStorage[a])) && (i[c.id] = c, j[c.id] = c)
				}
			},
			l = function (a) {
				return j.hasOwnProperty(a)
			},
			m = function (a) {
				b === StoreType.Persistent && delete sessionStorage[e + a], delete j[a], g.events.fireEventCallback(StoreEvent.RecordRemoved, a)
			},
			n = function (a) {
				var d = !1;
				void 0 !== a.id && !0 === l(a.id) && (d = !0), b === StoreType.Persistent && (sessionStorage[e + a.id] = c(a)), j[a.id] = a, d ? g.events.fireEventCallback(StoreEvent.RecordUpdated, a.id) : g.events.fireEventCallback(StoreEvent.RecordAdded, a.id)
			},
			o = function (a) {
				var b;
				for (b = h.length - 1; b >= 0; b--) h[b].obj.id === a && h.splice(b, 1)
			};
		return g.findExcludingCommit = function (a) {
				return l(a) ? (new ObjectHelper).cloneObject(j[a]) : null
			}, g.find = function (b) {
				var c;
				return k(), c = j, a === StoreTransactionMode.Transactional ? (c = i, (new ObjectHelper).cloneObject(c[b])) : c.hasOwnProperty(b) ? (new ObjectHelper).cloneObject(c[b]) : null
			}, g.list = function (b) {
				var c, d, e = j,
					f = [],
					g = function (a, b) {
						for (c in b) b.hasOwnProperty(c) && (d = b[c].id, f.hasOwnProperty(d) ? (a.push(f[d]), delete f[d]) : a.push((new ObjectHelper).cloneObject(b[c])));
						return a
					};
				if (k(), void 0 === b || null === b) b = [];
				else {
					for (c in b) f[b[c].id] = b[c];
					b.splice(0, b.length)
				}
				return a === StoreTransactionMode.Transactional ? g(b, i) : g(b, e)
			}, g.remove = function (b) {
				a === StoreTransactionMode.Transactional ? (o(b), l(b) && (h.push({
					obj: {
						id: b
					},
					type: "Delete"
				}), delete i[b])) : m(b)
			}, g.removeAll = function () {
				var a;
				for (a in j) j.hasOwnProperty(a) && g.remove(j[a].id)
			}, g.findAllKeys = function () {
				return Object.keys(j)
			}, g.save = function (b) {
				var c;
				c = f ? (new ObjectHelper).cloneObject(b) : b, a === StoreTransactionMode.Transactional ? (o(b.id), h.push({
					obj: c,
					type: "Add"
				}), void 0 !== b.id && (i[c.id] = c)) : n(c)
			}, g.commit = function () {
				var b;
				if (a === StoreTransactionMode.Transactional)
					for (b in h)
						if (h.hasOwnProperty(b)) {
							var c = h[b];
							"Add" === c.type ? n(c.obj) : m(c.obj.id)
						}
				h = [], g.events.fireEventCallback(StoreEvent.CommitComplete)
			}, g.rollback = function () {
				var a;
				i = [];
				for (a in j) i[j[a].id] = j[a];
				h = [], g.events.fireEventCallback(StoreEvent.RollbackComplete)
			},
			function () {
				"function" == typeof c && c || (c = function () {
					return ""
				}), "function" == typeof d && c || (d = function () {
					return null
				}), k()
			}(), g
	},
	SessionStore = function () {
		"use strict";
		var a = new Store(StoreTransactionMode.Immediate, StoreType.Memory, null, null, null, !1),
			b = a.save;
		return a.save = function (a) {
			null === a.id && (a.id = (new ObjectHelper).createGuid()), b(a)
		}, a
	},
	ConnectionPropertiesRejectedReason = {
		GatewayNotSpecified: 1
	},
	ConnectionPropertiesRejectedError = function (a, b) {
		"use strict";
		var c = this;
		return this.message = "Connection creation failed due to a problem with the connection properties, error=" + a, this.propertiesRejectedReason = a, this.name = "ConnectionPropertiesRejectedError", this.bookmark = b, this.toString = function () {
			return c.name + ": " + c.message
		}, this
	},
	SessionFactoryEvent = {
		SessionCreated: 0,
		SessionDestroyed: 1,
		SessionFocused: 2,
		ConnectionCreated: 3,
		ConnectionDestroyed: 4,
		ConnectionCreateFailed: 5,
		RedirectionsRequest: 6
	},
	RedirectionsRequest = function (a, b, c) {
		"use strict";

		function d(a) {
			try {
				var b = "[SessionFactory] Redirection settings selected by user: \n";
				for (var d in a) b += d + ": " + a[d] + " \n";
				c.debug(b)
			} catch (a) {
				c.error("[SessionFactory] Error logging redirections")
			}
		}
		var e = this;
		e.properties = b, e.complete = function (b) {
			var c = a;
			a = null, c && (d(b), b.clipboard || (e.properties.connectionSettings.EnableClipboard = !1), b.printer || (e.properties.connectionSettings.EnablePrinting = !1), b.audioInput || (e.properties.connectionSettings.EnableAudioInput = !1), b.drive || (e.properties.connectionSettings.EnableDriveRedirection = !1), c.complete(e.properties, b.rememberCollection))
		}, e.cancel = function () {
			var b = a;
			a = null, b && b.cancel()
		}
	},
	SessionFactory = function (a, b, c, d, e, f) {
		"use strict";
		var g = {},
			h = {
				events: new EventProvider
			},
			i = function (a) {
				for (var b = c.getFeedData(), d = 0; d < b.workspaces.length; d++)
					for (var e = b.workspaces[d], f = 0; f < e.bookmarks.length; f++) {
						var g = e.bookmarks[f];
						if (g.id === a) return g
					}
				return null
			},
			j = function (a, c) {
				var d, f = i(a.bookmarkId);
				d = new Session(f, a, SessionType.RemoteApp, b, e), d.windowId = c, g[c] = d.id, f && b.log("[SessionFactory] Window with windowID :" + c + " created for : " + f.friendlyName + ", bookmark id" + f.id), h.events.fireEventCallback(SessionFactoryEvent.SessionCreated, d)
			},
			k = function (a) {
				var c = g[a];
				c && (b.log("[SessionFactory] Connection destroyed window"), delete g[a], h.events.fireEventCallback(SessionFactoryEvent.SessionDestroyed, c))
			},
			l = function (a) {
				var c = g[a];
				c && (b.log("[SessionFactory] Connection activated window"), h.events.fireEventCallback(SessionFactoryEvent.SessionFocused, c))
			},
			m = function (a) {
				h.events.fireEventCallback(SessionFactoryEvent.ConnectionDestroyed, a), a.events.unsubscribe(ConnectionEvent.ConnectionDestroyed, m), a.events.unsubscribe(ConnectionEvent.WindowCreated, j), a.events.unsubscribe(ConnectionEvent.WindowDeleted, k), a.events.unsubscribe(ConnectionEvent.WindowActivated, l)
			},
			n = function (a, c) {
				b.log("[SessionFactory] Redirections request");
				var d = new RedirectionsRequest(a, c, b);
				h.events.fireEventCallback(SessionFactoryEvent.RedirectionsRequest, d)
			};
		return h.completeConnectionCreation = function (a, c, f, g, i) {
			var n = null;
			if (a.bookmarkId = g.id, a.isExistingConnection || h.events.fireEventCallback(SessionFactoryEvent.ConnectionCreated, g.id, a), d && f && (b.debug("[SessionFactory] Trusting collection"), d.trustCollection(c)), a.events.subscribe(ConnectionEvent.ConnectionDestroyed, m), c.remoteApplicationMode ? (b.debug("[SessionFactory] Launching remote app: " + c.remoteApplicationProgram), a.events.subscribe(ConnectionEvent.WindowCreated, j), a.events.subscribe(ConnectionEvent.WindowDeleted, k), a.events.subscribe(ConnectionEvent.WindowActivated, l), i || a.launchApplication(c.remoteApplicationProgram, c.remoteApplicationCmdLine, ""), a.getState() !== ConnectionState.Connected && (g.desktopName = g.workspaceName, n = new Session(g, a, SessionType.Desktop, b, e), h.events.fireEventCallback(SessionFactoryEvent.SessionCreated, n))) : (n = new Session(g, a, SessionType.Desktop, b, e), h.events.fireEventCallback(SessionFactoryEvent.SessionCreated, n)), c.connectionSettings.KeyboardLayout && e) {
				var o = "Setting KeyboardLayout :" + c.connectionSettings.KeyboardLayout + " KeyboardType :" + c.connectionSettings.KeyboardType + " KeyboardSubType :" + c.connectionSettings.KeyboardSubType;
				e.onClientEvent(a.id, "KeyboardLayoutSelection", o, 4), b.log(o)
			}
		}, h.createSession = function (e, g, i) {
			var j = function (b, c) {
				try {
					a.createConnection(b, function (a) {
						h.completeConnectionCreation(a, b, c, e, g)
					})
				} catch (a) {
					return void(b.connectionSettings.UseGatewayProtocol ? h.events.fireEventCallback(SessionFactoryEvent.ConnectionCreateFailed, a) : h.events.fireEventCallback(SessionFactoryEvent.ConnectionCreateFailed, new ConnectionPropertiesRejectedError(ConnectionPropertiesRejectedReason.GatewayNotSpecified, e)))
				}
			};
			if (e)
				if (e.rdpFileString) {
					var k = new ConnectionProperties(e, i),
						l = k.connectionSettings.EnableClipboard || k.connectionSettings.EnablePrinting || k.connectionSettings.EnableAudioInput || k.connectionSettings.EnableDriveRedirection,
						m = a.findConnection(k);
					if (k.gatewayHostName || (k.connectionSettings.UseGatewayProtocol = !1, k.connectionSettings.UseSecureWebSockets = !0, k.connectionSettings.GatewayHostName = k.hostName, k.connectionSettings.GatewayPort = 3392, k.connectionSettings.GatewayPath = "rdp"), d && d.checkRedirectionsStateChanges(k), !l || m && m.getState() !== ConnectionState.Disconnected || d && d.isCollectionTrusted(k)) j(k, !1);
					else {
						var o = {
							complete: j,
							cancel: function () {
								b.log("[SessionFactory] Redirection confirmation cancelled")
							}
						};
						n(o, k)
					}
				} else b.debug("[SessionFactory] Retrieving RDP file: " + e.rdpFileURL), c.getFeedFile(e.rdpFileURL, e.tenantId).then(function (a) {
					if (e.rdpFileString = a, e.rdpFileString) h.createSession(e, g, i);
					else {
						var b = new Error("Received an empty rdpFileString.");
						f.$broadcast("rdpClientUI:ErrorMessageModal", "RDPFileDownloadErrorMessage"), h.events.fireEventCallback(SessionFactoryEvent.ConnectionCreateFailed, b)
					}
				}, function (a) {
					var c = new Error("Retrieving the RDP file for the connection failed.");
					b.log("RDP File download failed: " + a), f.$broadcast("rdpClientUI:ErrorMessageModal", "RDPFileDownloadErrorMessage"), h.events.fireEventCallback(SessionFactoryEvent.ConnectionCreateFailed, c)
				})
		}, h
	},
	SessionProviderEvent = {
		SessionCreated: 0,
		SessionDestroyed: 1,
		SessionFocused: 2,
		SessionCreateFailed: 3,
		SessionOrderChanged: 4,
		SessionsLoaded: 5,
		SessionGroupingChanged: 6,
		RedirectionsRequest: 7,
		SessionIconChanged: 8
	},
	SessionProviderDelegate = function () {
		"use strict";
		this.canvasNeeded = null, this.retireCanvas = null, this.monitorBounds = null, this.filesUploaded = null
	},
	reconnecting = !1,
	SessionProvider = function (a, b, c, d, e, f) {
		"use strict";
		var g, h = {
				events: new EventProvider
			},
			i = {},
			j = function (a) {
				var b, c = 0;
				i = {};
				for (b in a) a.hasOwnProperty(b) && (i[a[b]] = c++);
				h.events.fireEventCallback(SessionProviderEvent.SessionOrderChanged)
			},
			k = function (a) {
				return h.delegate.canvasNeeded ? h.delegate.canvasNeeded(a) : null
			},
			l = function (a) {
				h.delegate.retireCanvas && h.delegate.retireCanvas(a)
			},
			m = function () {
				return h.delegate.monitorBounds ? h.delegate.monitorBounds() : null
			},
			n = function (a) {
				return h.delegate.filesUploaded ? h.delegate.filesUploaded(a) : null
			},
			o = function () {
				h.activeSession && h.activeSession.setFocus(!1), h.activeSession = null
			},
			p = function () {
				var a;
				if (h.activeSession && h.activeSession.sessionType === SessionType.RemoteApp && 0 === h.activeSession.getSiblingCount()) {
					var b;
					for (a = c.list(), b = 0; b < a.length; b++)
						if (a[b].sessionType === SessionType.Desktop && a[b].getConnectionId() === h.activeSession.getConnectionId()) {
							h.focusToSession(a[b].id);
							break
						}
				} else h.activeSession && h.activeSession.sessionType === SessionType.Desktop && !c.find(h.activeSession.id) && (a = c.list(), o(), a.length > 0 && h.focusToSession(a[0].id))
			},
			q = function () {
				var a, b = c.list();
				for (a = 0; a < b.length; a++) {
					var d = b[a];
					d.connection.getState() === ConnectionState.Dismissed && (c.remove(d.id), h.events.fireEventCallback(SessionProviderEvent.SessionDestroyed, d.id))
				}
			},
			r = function (a) {
				f.log("[SessionProvider] Session created received in provider"), q();
				var b = a;
				if (b.sessionType === SessionType.Desktop && b.connection.isExistingConnection) {
					var c = [];
					h.sessionList(c);
					for (var d in c)
						if (c[d].getConnectionId() === b.getConnectionId()) {
							f.log("[SessionProvider] Relaunch of an existing remote desktop connection"), b = c[d];
							break
						}
				} else g(b);
				h.focusToSession(b.id)
			},
			s = function () {
				f.log("[SessionProvider] Session disconnect received in provider"), q(), p()
			},
			t = function () {
				h.events.fireEventCallback(SessionProviderEvent.SessionGroupingChanged)
			},
			u = function () {
				h.events.fireEventCallback(SessionProviderEvent.SessionsLoaded)
			},
			v = function () {
				h.events.fireEventCallback(SessionProviderEvent.SessionIconChanged)
			},
			w = function (a, b) {
				f.log("[SessionProvider] Connection created event received."), h.setReconnecting(!1), b.events.subscribe(ConnectionEvent.WindowOrderChanged, j), b.events.subscribe(ConnectionEvent.WindowsLoaded, u), b.events.subscribe(ConnectionEvent.WindowIconChanged, v)
			},
			x = function (a) {
				f.error("[SessionProvider] Connection create failed event received."), f.error(a.message), h.events.fireEventCallback(SessionProviderEvent.SessionCreateFailed, a)
			},
			y = function (a) {
				a.events.unsubscribe(ConnectionEvent.WindowOrderChanged, j), a.events.unsubscribe(ConnectionEvent.WindowsLoaded, u), a.events.unsubscribe(ConnectionEvent.WindowIconChanged, v), q(), p(), f.log("[SessionProvider] Connection destroyed event received.")
			},
			z = function (a) {
				c.find(a) && (f.log("[SessionProvider] Session destroyed received in provider"), c.remove(a), p(), h.events.fireEventCallback(SessionProviderEvent.SessionDestroyed, a))
			},
			A = function (a) {
				var b = c.find(a);
				b && (f.log("[SessionProvider] Session focused received in provider"), h.activeSession = b, h.events.fireEventCallback(SessionProviderEvent.SessionFocused, a))
			},
			B = function (a) {
				h.events.fireEventCallback(SessionProviderEvent.RedirectionsRequest, a)
			};
		return g = function (a) {
				return c.save(a), a.delegate.canvasNeeded = k, a.delegate.retireCanvas = l, a.delegate.monitorBounds = m, a.delegate.filesUploaded = n, a.events.subscribe(SessionEvent.DidDisconnect, s), a.events.subscribe(SessionEvent.ApplicationIdChanged, t), h.events.fireEventCallback(SessionProviderEvent.SessionCreated, a.id), a.id
			},
			function () {
				a.events.subscribe(SessionFactoryEvent.SessionCreated, r), a.events.subscribe(SessionFactoryEvent.SessionDestroyed, z), a.events.subscribe(SessionFactoryEvent.SessionFocused, A), a.events.subscribe(SessionFactoryEvent.ConnectionCreated, w), a.events.subscribe(SessionFactoryEvent.ConnectionCreateFailed, x), a.events.subscribe(SessionFactoryEvent.ConnectionDestroyed, y), a.events.subscribe(SessionFactoryEvent.RedirectionsRequest, B)
			}(), h.sessionList = function (a) {
				return c.list(a)
			}, h.connectionList = function () {
				return b.listActiveConnections()
			}, h.getConnection = function (a) {
				return b.findConnectionById(a)
			}, h.desktopSessionList = function (a) {
				var b, d = c.list();
				for (void 0 === a || null === a ? a = [] : a.splice(0), b = 0; b < d.length; b++) d[b].sessionType === SessionType.Desktop && 0 === d[b].getSiblingCount() && a.push(d[b]);
				return a
			}, h.sessionListGrouped = function (a) {
				var b, d, e, f, g, h = c.list();
				if (void 0 === a || null === a) a = {};
				else
					for (b in a) a.hasOwnProperty(b) && delete a[b];
				for (b in h) h.hasOwnProperty(b) && h[b].sessionType === SessionType.RemoteApp && (d = h[b], e = d.getApplicationId(), g = a[e], void 0 === g && (g = {}, g.thumbnail = d.getThumbnail(), a[e] = g), f = g.sessionList, void 0 === f && (f = [], g.sessionList = f), f.length > 0 && i[d.windowId] < i[f[0].windowId] ? f.unshift(d) : f.push(d));
				return a
			}, h.disconnect = function () {
				c.removeAll(), b.disconnectAllConnections()
			}, h.activeSession = null, h.delegate = new SessionProviderDelegate, h.createSession = function (b, c, d) {
				a.createSession(b, c, d)
			}, h.find = function (a) {
				return c.find(a)
			}, h.focusToSession = function (a, b) {
				var d = c.find(a);
				d && d !== h.activeSession && (h.activeSession && h.activeSession.getConnectionId() !== d.getConnectionId() && o(), d.setFocus(!0, b), h.activeSession = d, h.events.fireEventCallback(SessionProviderEvent.SessionFocused, d.id))
			}, h.dismissSession = function (a) {
				var d = c.find(a);
				d && (d.state === SessionState.Disconnected ? (b.removeConnection(d.connection), q(), p()) : d.disconnect())
			}, h.invalidateCanvasForActiveConnections = function () {
				b.invalidateCanvasForActiveConnections()
			}, h.hasActiveConnections = function () {
				return b.hasActiveConnections()
			}, h.windowsLoaded = function () {
				return b.windowsLoaded()
			}, h.getReconnecting = function () {
				return reconnecting
			}, h.setReconnecting = function (a) {
				reconnecting = a
			}, h.uploadTest = function (a) {
				n(a)
			}, h
	};
if (window.WebAssembly) {
	console.log("Browser with Web Assembly support detected");
	var script = document.createElement("script");
	script.setAttribute("src", "librdp/html/librdphtml.35c0c913.js"), script.id = "rdcorelib", document.body.appendChild(script);
	var Module = {
		logger: null,
		preRun: [],
		postRun: [],
		print: function (a) {
			"use strict";
			a = "[EmscriptenModule] " + Array.prototype.slice.call(arguments).join(" "), this.logger ? this.logger.log(a) : console.log(a)
		},
		printErr: function (a) {
			"use strict";
			a = "[EmscriptenModule] " + Array.prototype.slice.call(arguments).join(" "), this.logger ? this.logger.error(a) : console.error(a)
		},
		onRuntimeInitialized: function () {
			"use strict";
			this.logger ? this.logger.debug("[EmscriptenModule] Using Web Assembly") : console.log("[EmscriptenModule] Using Web Assembly"), angular.element(document).ready(function () {
				angular.bootstrap(document, ["rdpClientUI"])
			})
		}
	}
} else {
	console.log("No Web Assembly Support on this browser... using ASM.js");
	var script = document.createElement("script");
	script.setAttribute("src", "librdp/htmlIE/librdphtml.0b1770e5.js"), script.id = "rdcorelib", document.body.appendChild(script);
	var Module = {
		logger: null,
		preRun: [],
		postRun: [],
		print: function (a) {
			"use strict";
			a = "[EmscriptenModule] " + Array.prototype.slice.call(arguments).join(" "), this.logger ? this.logger.log(a) : console.log(a)
		},
		printErr: function (a) {
			"use strict";
			a = "[EmscriptenModule] " + Array.prototype.slice.call(arguments).join(" "), this.logger ? this.logger.error(a) : console.error(a)
		},
		onRuntimeInitialized: function () {
			"use strict";
			this.logger ? this.logger.debug("[EmscriptenModule] Using ASM.js") : console.log("[EmscriptenModule] Using ASM.js"), angular.element(document).ready(function () {
				angular.bootstrap(document, ["rdpClientUI"])
			})
		}
	}
}
var CanvasGraphicsSinkFactory = function (a) {
		"use strict";
		var b = {};
		return b.createGraphicsSink = function (b, c) {
			return new function (b) {
				var d = b,
					e = document.createElement("canvas");
				e.width = d.width, e.height = d.height;
				var f = null,
					g = null;
				this.isFocused = c, this.setCanvas = function (a) {
					f = a
				}, this.Destroy = function () {
					d && (d.delete(), d = null), g && (g.delete(), g = null), e && (e = null)
				}, this.GetCanvas = function (a) {
					return a ? f : e
				}, this.Present = function (b) {
					if (e && f && g) {
						for (var c = b.get(0), d = 1; d < b.size(); d++) {
							var h = b.get(d);
							c.extend_rect(h), h.delete()
						}
						c.intersects(g) && (c.clip(g), this.refreshCanvas(c, g)), c.delete()
					} else a.error("[CanvasGraphicsSinkFactory] Not attached to a canvas");
					b.delete()
				}, this.refreshCanvas = function (a, b) {
					if (this.isFocused) {
						var c = f.getContext("2d");
						c && c.drawImage(e, a.left, a.top, a.width(), a.height(), a.left - b.left, a.top - b.top, a.width(), a.height())
					}
				}, this.refreshWholeCanvas = function () {
					e && f && g && this.refreshCanvas(g, g)
				}, this.GetDescriptor = function () {
					return d
				}, this.SetViewport = function (b) {
					b ? a.debug("[CanvasGraphicsSinkFactory] Setting graphics sink viewport: width = " + b.width() + " height = " + b.height()) : a.debug("[CanvasGraphicsSinkFactory] Removing graphics sink viewport"), g = b
				}
			}(b)
		}, b
	},
	ConnectionState = {
		OpeningRemotePort: 0,
		EstablishingSecureConnection: 1,
		ConfiguringRemoteConnection: 2,
		DetectingNetworkQuality: 3,
		SessionBrokerFindingDestination: 4,
		SessionBrokerLoadingDestination: 5,
		SessionBrokerBringingSessionOnline: 6,
		SessionBrokerRedirectingToDestination: 7,
		VirtualMachineLoading: 8,
		VirtualMachineWaking: 9,
		VirtualMachineStarting: 10,
		VirtualMachineStartingSessionMonitoring: 11,
		VirtualMachineRetryingSessionMonitoring: 12,
		Connected: 13,
		Disconnected: 14,
		Initialized: 15,
		Dismissed: 16,
		StartingWVDVirtualMachine: 17,
		WaitingForWVDVirtualMachineToFinishBooting: 18,
		StartingConnection: 19
	},
	ConnectionEvent = {
		ConnectionDestroyed: 0,
		WindowIconChanged: 1,
		WindowDeleted: 2,
		WindowActivated: 3,
		WindowTitleChanged: 4,
		WindowCreated: 5,
		WindowApplicationIdChanged: 6,
		WindowLaunched: 7,
		ConnectionConnectFailed: 8,
		WindowOrderChanged: 9,
		WindowsLoaded: 10
	},
	MouseButton = {
		Left: 0,
		Right: 1,
		Middle: 2,
		Button4: 3,
		Button5: 4
	},
	TouchState = {
		Start: 0,
		Move: 1,
		End: 2,
		Cancel: 3
	},
	ConnectionDelegate = function () {
		"use strict";
		this.canvasNeeded = null, this.viewSizeChanged = null, this.credentialsNeeded = null, this.trustChallenge = null, this.willConnect = null, this.didConnect = null, this.willDisconnect = null, this.didDisconnect = null, this.loginCompleted = null, this.connectionHealthStateChanged = null, this.mousePointerChanged = null, this.showDefaultMousePointer = null, this.mousePositionChanged = null, this.multiTouchEnabled = null, this.error = null, this.getRemoteClipboardContent = null, this.clipboardContentRequest = null, this.monitorBounds = null, this.displayDesktopBackground = null
	},
	AudioInputHandler = function (a, b, c, d) {
		"use strict";
		const e = {
			Chrome: 74,
			Edge: 79
		};
		var f, g = {};
		return g.processor = null, g.context = null, g.mediaStream = null, g.serverSampleRate = 44100, g.sampleRateRatio = null, g.userMediaConstraints = window.constraints = {
			audio: !0,
			video: !1
		}, g.convertFloatTo16BitPCM = function (a) {
			var b = Math.max(-1, Math.min(1, a));
			return b < 0 ? 32768 * b : 32767 * b
		}, g.resampleAndSendAudioData = function (a, b) {
			const c = a.inputBuffer,
				d = c.length;
			for (var e = new Int16Array(2 * b), h = 0; h < 2; h++) {
				const i = c.getChannelData(h);
				for (var j = 0, k = 0; j < b;) {
					const l = Math.round((j + 1) * g.sampleRateRatio);
					for (var m = 0, n = 0, o = k; o < l && o < d; o++) m += i[o], n++;
					e[2 * j + h] = g.convertFloatTo16BitPCM(m / n), j++, k = l
				}
			}
			f.SendAudio(e.buffer)
		}, g.sendAudioData = function (a) {
			const b = a.inputBuffer,
				c = b.length;
			for (var d = new Int16Array(2 * c), e = 0; e < 2; e++) {
				const h = b.getChannelData(e);
				for (var i = 0; i < c; i++) d[2 * i + e] = g.convertFloatTo16BitPCM(h[i])
			}
			f.SendAudio(d.buffer)
		}, g.browserResamplingSupported = function () {
			try {
				const a = d.deviceInfo.getBrowserInfo();
				for (var b = 0, f = Object.entries(e); b < f.length; b++) {
					var g = f[b],
						h = g[0],
						i = g[1];
					if (h === a.name && a.major >= i) return !0
				}
				return !1
			} catch (a) {
				return c.error("Error checking platformInfo " + a), !1
			}
		}, g.getResampledBufferLength = function () {
			const a = Math.round(512 / g.sampleRateRatio);
			return a === 1 / 0 ? (c.error("No sampleRateRatio set. Continuing with original buffer size"), 512) : a
		}, g.onAudioInputReady = function () {
			g.browserResamplingSupported() ? g.processor.onaudioprocess = function (a) {
				g.sendAudioData(a)
			} : g.processor.onaudioprocess = function (a) {
				g.resampleAndSendAudioData(a, g.getResampledBufferLength())
			}
		}, g.onAudioInputClosed = function () {
			try {
				g.processor.disconnect(g.context.destination), g.mediaStream.stop(), g.context.suspend()
			} catch (a) {
				c.error("Error stopping audio capture")
			}
		}, g.audioInputStateChanged = function (c) {
			if (g.state = c, b.onClientEvent(a.id, "AudioInput", "Audio input state changed to " + g.state.constructor.name, 4), g.state) switch (c.value) {
				case Module.AudioInputState.Ready.value:
					g.onAudioInputReady();
					break;
				case Module.AudioInputState.Closed.value:
					g.onAudioInputClosed()
			}
		}, g.setAudioInputController = function (a) {
			f = a
		}, g.createAudioContext = function () {
			try {
				if (g.browserResamplingSupported()) g.context = new window.AudioContext({
					sampleRate: g.serverSampleRate
				});
				else {
					var a = window.AudioContext || window.webkitAudioContext;
					g.context = new a, g.sampleRateRatio = g.context.sampleRate / g.serverSampleRate
				}
				return !0
			} catch (a) {
				return c.error(a.message), !1
			}
		}, g.handleGetAudioInputDevicesSuccess = function (a, b) {
			try {
				g.mediaStream = a, g.mediaStream.stop = function () {
					this.getAudioTracks().forEach(function (a) {
						a.stop()
					})
				};
				const d = g.context.createMediaStreamSource(g.mediaStream);
				g.processor = g.context.createScriptProcessor(512, 2, 2), d.connect(g.processor), g.processor.connect(g.context.destination), b.complete(!0)
			} catch (a) {
				c.error(a.message), b.complete(!1)
			}
		}, g.handleGetAudioInputDevicesError = function (a) {
			const b = "navigator.MediaDevices.getUserMedia error: " + a.message + " " + a.name;
			c.error(b)
		}, g.onAudioInputOpenRequest = function (a) {
			if (!g.createAudioContext()) return void a.complete(!1);
			navigator.mediaDevices.getUserMedia(g.userMediaConstraints).then(function (b) {
				g.handleGetAudioInputDevicesSuccess(b, a)
			}).catch(function (b) {
				g.handleGetAudioInputDevicesError(b), a.complete(!1)
			})
		}, g
	},
	ClipboardHandler = function (a, b, c) {
		"use strict";
		var d, e = {};
		return e.clipboardReady = !1, e.clipboardOwner = Module.ClipboardOwner.Unknown, e.clipboardProtocolReady = function (a) {
			e.clipboardReady = a
		}, e.clipboardOwnerChanged = function (a) {
			e.clipboardOwner = a
		}, e.onClipboardContentRequest = function (b) {
			a.delegate.clipboardContentRequest(b)
		}, e.setRemoteClipboardFormats = function () {
			a.telemetry.clipboardUsed = !0;
			var b = new Module.ClipboardFormatList;
			b.push_back(new Module.ClipboardFormat(Module.ClipboardFormatType.Text)), b.push_back(new Module.ClipboardFormat(Module.ClipboardFormatType.UnicodeText)), d.SetRemoteClipboardFormats(b), b.delete()
		}, e.getRemoteClipboardContent = function (b) {
			a.telemetry.clipboardUsed = !0, d.GetRemoteClipboardContent(b)
		}, e.getRemoteClipboardContentComplete = function (b, d, e) {
			if (b.value === Module.ClipboardResponse.ResponseOk.value) switch (d.value) {
				case Module.ClipboardFormatType.Text.value:
					break;
				case Module.ClipboardFormatType.UnicodeText.value:
					a.delegate.getRemoteClipboardContent(d, e);
					break;
				default:
					c.debug("[Connection] Unknown clipboard format received!")
			} else c.debug("[Connection] Clipboard getClipboardContent result invalid.")
		}, e.remoteClipboardChanged = function (a) {
			for (var b = 0; b < a.size(); b++) {
				var c = a.get(b);
				switch (c.Type && c.Type.value) {
					case Module.ClipboardFormatType.UnicodeText.value:
						e.getRemoteClipboardContent(Module.ClipboardFormatType.UnicodeText);
						break;
					case Module.ClipboardFormatType.Text.value:
						e.getRemoteClipboardContent(Module.ClipboardFormatType.Text)
				}
			}
			a.delete()
		}, e.setRemoteClipboardFormatsComplete = function (b) {
			a.delegate.setRemoteClipboardFormatsComplete(b)
		}, e.setClipboardController = function (a) {
			d = a
		}, e
	},
	FileSystemHandler = function (a, b, c, d) {
		"use strict";
		var e, f = {};
		f.isFileUploadEnabled = !1, f.fileSystemClosed = function () {
			d.onFileUploadError(), setTimeout(function () {
				a.connectionSettings.EnableDriveRedirection = !1, f.isFileUploadEnabled = !1, d.onUpdateFileUploadStatus(!1)
			}, 2e3)
		}, f.onDriveUploadError = function (c) {
			b.onRdCoreDebuggingEvent(a.id, "Drive redirection", "Error with file system" + c.message, 2), e && e.FileSystemSyncError("File system error occured on HTML5 side.")
		}, f.getUploadFolderPath = function () {
			return "/html5fs/" + d.getUploadsFolderName()
		};
		var g = function () {
			try {
				var e = f.getUploadFolderPath();
				d.registerIndexedDB(e);
				try {
					FS.lookupPath("/html5fs")
				} catch (a) {
					FS.mkdir("/html5fs")
				}
				if (!e) throw "File system path not provided by controller";
				try {
					FS.lookupPath(e), c.debug("[Connection] File system already mounted.")
				} catch (a) {
					c.debug("[Connection] Mounting file system..."), FS.mkdir(e), FS.mount(IDBFS, {
						root: "."
					}, e)
				}
				FS.syncfs(!0, function (c) {
					c ? f.onDriveUploadError(c) : b.onRdCoreDebuggingEvent(a.id, "Drive redirection", "HTML5 drive successfully mounted and synced with IndexedDB", 4)
				})
			} catch (a) {
				f.onDriveUploadError(a)
			}
		};
		return f.onFileDownloadJobCompletion = function (c, e) {
			b.onRdCoreDebuggingEvent(a.id, "Drive redirection", "File download url received.", 4), d.onDownloadUrl(c, e)
		}, f.onStateChange = function (a) {
			if (c.debug("[Connection] File system state changed to " + a.constructor.name), a) switch (a.value) {
				case Module.FileSystemState.Ready.value:
					g(), f.isFileUploadEnabled = !0, d.onUpdateFileUploadStatus(!0);
					break;
				case Module.FileSystemState.Closed.value:
					f.fileSystemClosed()
			}
		}, f.setFileSystemController = function (a) {
			e = a
		}, f
	},
	ConnectionTelemetry = function () {
		"use strict";
		this.timeLaunched = null, this.timeConnected = null, this.timeDisconnected = null, this.initialWidth = 0, this.initialHeight = 0, this.initialScale = 0, this.arcAttempts = 0, this.arcSuccess = 0, this.totalArcTime = 0, this.resolutionChanged = 0, this.clipboardUsed = !1, this.audioUsed = !1, this.sessionSwitchedCount = 0, this.appSwitchedCount = 0
	},
	Connection = function (a, b, c, d, e, f, g, h, i, j, k) {
		"use strict";
		var l, m, n, o, p, q, r, s, t = {
				id: null,
				correlationId: null,
				lastSuccessConnectionId: null,
				tenantId: null,
				bookmarkId: null,
				eventLogUploadAddress: null,
				isExistingConnection: !1,
				hadSuccessfulConnection: !1,
				disconnectReason: null,
				isRail: d.remoteApplicationMode,
				connectionSettings: d.connectionSettings,
				events: new EventProvider,
				telemetry: new ConnectionTelemetry,
				diagnosticActivityinProgress: !1,
				webWorkerStarted: !0,
				connectionWebWorkerStartedTimeout: null,
				onDisconnecting: null,
				onDisconnected: null
			},
			u = ConnectionState.Initialized,
			v = !0,
			w = 0,
			x = null,
			y = !1,
			z = [],
			A = [],
			B = !1,
			C = null,
			D = 0,
			E = function () {
				w = 0, null !== x && clearTimeout(x), x = null
			},
			F = function (c) {
				var d = {
					code: Module.DisconnectCode.UnknownError
				};
				b.debug("[Connection] Cleaning up connection"), u = ConnectionState.Disconnected, t.events && (c || (d = null), t.events.fireEventCallback(ConnectionEvent.ConnectionDestroyed, t, d), t.events = new EventProvider), s && s.cancel(), a && (a.delete(), a = null), D = 0, E()
			},
			G = function (a) {
				e && e.onException(a), j && j.onException(t.id, a)
			},
			H = function (a) {
				var c = "[Connection] Connection state changed to: ";
				switch (a) {
					case Module.ConnectionStatusUpdates.OpeningRemotePort:
						clearTimeout(t.connectionWebWorkerStartedTimeout), u = ConnectionState.OpeningRemotePort, c += "Opening remote port";
						break;
					case Module.ConnectionStatusUpdates.EstablishingSecureConnection:
						u = ConnectionState.EstablishingSecureConnection, c += "Establishing secure connection";
						break;
					case Module.ConnectionStatusUpdates.ConfiguringRemoteConnection:
						u = ConnectionState.ConfiguringRemoteConnection, c += "Configuring remote connection";
						break;
					case Module.ConnectionStatusUpdates.DetectingNetworkQuality:
						u = ConnectionState.DetectingNetworkQuality, c += "Detecting network quality";
						break;
					case Module.ConnectionStatusUpdates.SessionBrokerFindingDestination:
						u = ConnectionState.SessionBrokerFindingDestination, c += "Session broker finding session";
						break;
					case Module.ConnectionStatusUpdates.SessionBrokerLoadingDestination:
						u = ConnectionState.SessionBrokerLoadingDestination, c += "Session broker loading destination";
						break;
					case Module.ConnectionStatusUpdates.SessionBrokerBringingSessionOnline:
						u = ConnectionState.SessionBrokerBringingSessionOnline, c += "Session broker bringing session online";
						break;
					case Module.ConnectionStatusUpdates.SessionBrokerRedirectingToDestination:
						u = ConnectionState.SessionBrokerRedirectingToDestination, c += "Session broker redirecting to destination";
						break;
					case Module.ConnectionStatusUpdates.VirtualMachineLoading:
						u = ConnectionState.VirtualMachineLoading, c += "Virtual machine loading";
						break;
					case Module.ConnectionStatusUpdates.VirtualMachineWaking:
						u = ConnectionState.VirtualMachineWaking, c += "Virtual machine waking";
						break;
					case Module.ConnectionStatusUpdates.VirtualMachineStarting:
						u = ConnectionState.VirtualMachineStarting, c += "Virtual machine starting";
						break;
					case Module.ConnectionStatusUpdates.VirtualMachineRetryingSessionMonitoring:
						u = ConnectionState.VirtualMachineRetryingSessionMonitoring, c += "Virtual machine retrying session monitoring";
						break;
					case Module.ConnectionStatusUpdates.VirtualMachineStartingSessionMonitoring:
						u = ConnectionState.VirtualMachineStartingSessionMonitoring, c += "Virtual machine starting session monitoring";
						break;
					case Module.ConnectionStatusUpdates.StartingWVDVirtualMachine:
						u = ConnectionState.StartingWVDVirtualMachine, c += "Virtual machine starting";
						break;
					case Module.ConnectionStatusUpdates.WaitingForWVDVirtualMachineToFinishBooting:
						u = ConnectionState.WaitingForWVDVirtualMachineToFinishBooting, c += "Waiting for virtual machine to start";
						break;
					case Module.ConnectionStatusUpdates.StartingConnection:
						clearTimeout(t.connectionWebWorkerStartedTimeout), u = ConnectionState.StartingConnection, c += "Starting connection"
				}
				b.debug(c), j && j.onRdCoreDebuggingEvent(t.id, "Connection Status", c, 4), t.delegate.willConnect && t.delegate.willConnect(u, w), !t.hadSuccessfulConnection && t.delegate.displayDesktopBackground && t.delegate.displayDesktopBackground(!1)
			},
			I = function () {
				b.debug("[Connection] Connected"), t.disconnectReason = null, E(), t.hadSuccessfulConnection = !0, t.lastSuccessConnectionId = t.correlationId && t.correlationId.ToString(), 0 === t.telemetry.arcAttempts ? t.telemetry.timeConnected = (new Date).getTime() : (t.telemetry.arcSuccess++, t.telemetry.totalArcTime += (new Date).getTime() - t.telemetry.timeDisconnected), t.telemetry.timeDisconnected = null, e && e.onConnected(t), j && j.onConnected(t), i && i.triggerConnectionCheckPointEvent(t, "OnConnected"), u = ConnectionState.Connected, t.delegate.didConnect && t.delegate.didConnect()
			},
			J = function () {
				clearTimeout(t.connectionWebWorkerStartedTimeout), b.debug("[Connection] Disconnecting"), t.delegate.willDisconnect && t.delegate.willDisconnect()
			},
			K = function (c) {
				t.disconnectReason = c, t.triggerConnectionEndDiagnosticEvent();
				var f = !1,
					h = !0;
				if (j && j.onDisconnected(t.id, c), c && c.code && c.code.value === Module.DisconnectCode.RdsTlsSSOFailed.value && (t.triggerSSOAuthDiagnosticEvent(!0, !1), 0 === w && (f = !0, h = !1, d.connectionSettings.GatewayCertLogonAuthority = "", t.telemetry.timeDisconnected = (new Date).getTime())), w < 5 && t.hadSuccessfulConnection && c && c.code && (0 === w ? c.code.value !== Module.DisconnectCode.ConnectionBroken.value && c.code.value !== Module.DisconnectCode.ConnectionBrokenMissedHeartbeatThresholdExceeded.value && c.code.value !== Module.DisconnectCode.GatewayProtocolError.value && c.code.value !== Module.DisconnectCode.WebsocketNormalDisconnect.value && c.code.value !== Module.DisconnectCode.OrchestrationNoGatewayResponse.value && c.code.value !== Module.DisconnectCode.SocketConnectionFailed.value || (f = !0, t.telemetry.timeDisconnected = (new Date).getTime()) : u === ConnectionState.OpeningRemotePort && (f = !0)), f) {
					t.telemetry.arcAttempts++, w++, b.debug("[Connection] Autoreconnecting... " + w + " / 5");
					var i = 0;
					h && (i = 1e3 * (3 + Math.pow(2, w) * Math.random())), b.log("Reconnecting after " + i + " ms"), x = setTimeout(function () {
						t.lastSuccessConnectionId = t.correlationId.ToString(), t.correlationId.IncrementConnectionID(), t.triggerConnectionStartDiagnosticEvent(), a.Reconnect()
					}, i)
				} else {
					if (c.code.value === Module.DisconnectCode.WebWorkerError.value) {
						var k = window.localStorage;
						k && k.setItem("RdWebAppSettings::UseConnectionWebWorkers", !1)
					}
					c.code.value === Module.DisconnectCode.OutOfMemory.value && g && g.clearAllFileSystemIndexedDB(), b.debug("[Connection] Disconnected"), t.telemetry.timeDisconnected = (new Date).getTime(), e && e.onDisconnected(t), t.delegate.didDisconnect && t.delegate.didDisconnect(c), F(!1)
				}
			},
			L = function (a, c, d, e) {
				b.debug("[Connection] Login completed for server: " + a + ":" + c + " username: " + e + "\\" + d), t.delegate.loginCompleted && t.delegate.loginCompleted()
			},
			M = function (a) {
				b.debug("[Connection] Connection health state changed: " + a), t.delegate.connectionHealthStateChanged && t.delegate.connectionHealthStateChanged(a)
			},
			N = function (a) {
				if (k && d.connectionSettings.GatewayCertLogonAuthority) {
					const c = performance.now();
					var e;
					j.onSSOTokenRetrievalStarted(t.correlationId);
					k.getADFSToken(d).then(function (d) {
						b.log("[ConnectionFactory] SSO token retrieved!"), e = performance.now() - c, j.onSSOTokenRetrievalSuccess(t.correlationId), t.triggerSSOTokenRetrievalEvent(!0, e, ""), a.complete(d)
					}, function (d) {
						b.warn("[ConnectionFactory] SSO token retrieval failed!"), e = performance.now() - c, j.onSSOTokenRetrievalFailed(t.correlationId, d), t.triggerSSOTokenRetrievalEvent(!1, e, d), t.triggerSSOAuthDiagnosticEvent(!1, !1), a.cancel()
					})
				} else b.log("[ConnectionFactory] SSO not configured"), a.cancel()
			},
			O = function (a) {
				b.debug("[Connection] Auth challenge"), a.getAuthType() !== Module.IAuthCompletion_AuthType.UsernameAndPassword && a.getAuthType() !== Module.IAuthCompletion_AuthType.ClaimsToken && a.getAuthType() !== Module.IAuthCompletion_AuthType.CertLogonToken && (b.error("Only user name/pwd, claims token, cert logon token are currently supported."), t.delegate.error && t.delegate.error("Only user name/pwd, claims token, cert logon token are currently supported."), F(!1)),
					a.getAuthType() === Module.IAuthCompletion_AuthType.CertLogonToken ? N(a) : (s = new CredentialRequest(a), t.delegate.credentialsNeeded && t.delegate.credentialsNeeded(s, t))
			},
			P = function (a) {
				b.debug("[Connection] Certificate trust challenge"), t.delegate.trustChallenge && t.delegate.trustChallenge(a)
			},
			Q = function (a) {
				b.debug("[Connection] Request graphics sink delegate");
				var c = a.getSinkDescriptor();
				try {
					c.sinkType !== Module.GraphicsSinkDescriptor_SinkType.Canvas && (b.error("Only canvas graphics sinks are currently supported."), t.delegate.error && t.delegate.error("Only canvas graphics sinks are currently supported."));
					var d = new CanvasGraphicsSinkFactory(b);
					r = d.createGraphicsSink(c, v), r.isFocused = v, t.invalidateCanvas(), a.complete(r)
				} catch (a) {
					t.delegate.error && (b.error(a.message), t.delegate.error && t.delegate.error(a.message)), c.delete(), F(!0)
				} finally {
					a.delete()
				}
			},
			R = function (a, c, d) {
				b.debug("[Connection] Associating graphics sink with monitor");
				try {
					0 !== c && (b.error("Only one monitor is implemented"), t.delegate.error && t.delegate.error("Only one monitor is implemented.")), t.delegate.viewSizeChanged && (t.delegate.viewSizeChanged(d.width(), d.height()), t.setWorkArea(new Module.Rectangle(0, 0, d.width() - 1, d.height() - 1))), a.SetViewport(d), setTimeout(function () {
						t.delegate.displayDesktopBackground && t.delegate.displayDesktopBackground(!0)
					}, 45e3)
				} catch (a) {
					b.error(a.message), t.delegate.error && t.delegate.error(a.message), F(!0)
				}
			},
			S = function (a, c) {
				b.debug("[Connection] Unassociating graphics sink with monitor");
				try {
					0 !== c && (b.error("Only one monitor is implemented."), t.delegate.error && t.delegate.error("Only one monitor is implemented")), a.SetViewport(null)
				} catch (a) {
					b.error(a.message), t.delegate.error && t.delegate.error(a.message), F(!0)
				}
			},
			T = function (a) {
				var c;
				if (b.log("[Connection] Rail activated message received: " + a), y = a, a) {
					var d = t.getMonitorBounds();
					for (t.setWorkArea(new Module.Rectangle(0, 0, d.width - 1, d.height - 1)), t.delegate.displayDesktopBackground && t.delegate.displayDesktopBackground(!0); z.length > 0;) c = z.pop(), b.log("[Connection] Launching pending app: " + c.applicationName), t.launchApplication(c.applicationName, c.applicationArguments, c.applicationWorkingDirectory)
				}
			},
			U = function (a) {
				A.push(a), m.RequestApplicationId(a), t.events.fireEventCallback(ConnectionEvent.WindowCreated, t, a)
			},
			V = function (a) {
				var b = A.indexOf(a);
				b > -1 && A.splice(b, 1), t.events.fireEventCallback(ConnectionEvent.WindowDeleted, a)
			},
			W = function (a, b, c) {
				t.events.fireEventCallback(ConnectionEvent.WindowIconChanged, a, b, c)
			},
			X = function (a) {
				C = a, t.events.fireEventCallback(ConnectionEvent.WindowActivated, a)
			},
			Y = function (a, b) {
				t.events.fireEventCallback(ConnectionEvent.WindowTitleChanged, a, b)
			},
			Z = function (a, c) {
				b.debug("[Connection] Server reports that " + a + " has been launched with result " + c.value), t.events.fireEventCallback(ConnectionEvent.WindowLaunched, t.isExistingConnection, c.value), 0 !== c.value && t.delegate.error && t.delegate.error("Launching application failed with code " + c.value)
			},
			$ = function (a, c) {
				b.debug("[Connection] Window ID: " + a + " belongs to application id: " + c), t.events.fireEventCallback(ConnectionEvent.WindowApplicationIdChanged, a, c)
			},
			_ = function () {
				return c
			},
			aa = function (a) {
				b.debug("[Connection] ZOrder changed"), b.debug(a), t.events.fireEventCallback(ConnectionEvent.WindowOrderChanged, a)
			},
			ba = function (a) {
				(B = !a) && setTimeout(function () {
					t.events.fireEventCallback(ConnectionEvent.WindowsLoaded, t.id)
				}, 1500)
			},
			ca = function (a) {
				b.debug("[Connection] Audio state changed to " + a)
			},
			da = function () {
				t.delegate.showDefaultMousePointer && t.delegate.showDefaultMousePointer(!0)
			},
			ea = function () {
				t.delegate.showDefaultMousePointer && t.delegate.showDefaultMousePointer(!1)
			},
			fa = function () {
				D++, f.onPrintStart && f.onPrintStart()
			},
			ga = function (a) {
				D > 0 && D--, f.onPrintUrl && f.onPrintUrl(a)
			},
			ha = function (a, b) {
				t.triggerSSOAuthDiagnosticEvent(a, b)
			},
			ia = function (a) {
				var b = 0;
				return a === MouseButton.Left ? b = Module.ButtonMask.Left : a === MouseButton.Middle ? b = Module.ButtonMask.Middle : a === MouseButton.Right ? b = Module.ButtonMask.Right : a === MouseButton.Button4 ? b = Module.ButtonMask.Button4 : a === MouseButton.Button5 && (b = Module.ButtonMask.Button5), b
			},
			ja = function (a) {
				var b;
				return a === TouchState.Start ? b = Module.TouchState.Began : a === TouchState.Move ? b = Module.TouchState.Moved : a === TouchState.End ? b = Module.TouchState.Ended : a === TouchState.Cancel && (b = Module.TouchState.Cancelled), b
			},
			ka = function (a, b) {
				for (var c = new Module.TouchList, d = ja(a), e = 0; e < b.length; e++) {
					var f = b[e].adjustedTouchPos,
						g = new Module.HTML5TouchEvent(d, b[e].identifier, f.clientX, f.clientY);
					if (void 0 !== b[e].radiusX && void 0 !== b[e].radiusY && g.SetRadius(b[e].radiusX, b[e].radiusY), void 0 !== b[e].rotationAngle && g.SetOrientation(b[e].rotationAngle), void 0 !== b[e].force) {
						var h = b[e].force;
						h >= 0 && h <= 1 && (h = Math.trunc(1024.999 * h)), g.SetForce(h)
					}
					c.push_back(g), g.delete()
				}
				return c
			},
			la = function (b, c) {
				var d = new Module.MonitorList,
					e = new Module.Monitor,
					f = new Module.MonitorBounds;
				f.left = 0, f.top = 0, f.width = b, f.height = c, e.monitorBounds = f, e.fPrimary = !0, d.push_back(e), e.delete(), f.delete(), a && a.SetMonitorLayout(d), d.delete()
			},
			ma = function () {
				try {
					var a = window.webkitAudioContext;
					c = new a;
					var d = c.createBuffer(1, 1, 44100),
						e = c.createBufferSource();
					e.buffer = d, e.connect(c.destination)
				} catch (a) {
					b.error("[Connection] Force starting Audio Context for Safari failed.")
				}
			};
		return t.onDisconnected = K, t.onDisconnecting = J, t.delegate = new ConnectionDelegate,
			function () {
				a.SetOnException(G), a.SetOnConnecting(H), a.SetOnConnected(I), a.SetOnDisconnecting(J), a.SetOnDisconnected(K), a.SetOnLoginCompleted(L), a.SetOnConnectionHealthStateChanged(M), a.SetOnAuthChallenge(O), a.SetOnTrustChallenge(P), a.SetRequestGraphicsSinkDelegate(Q), a.SetAssociateGraphicsSinkWithMonitorDelegate(R), a.SetUnassociateGraphicsSinkWithMonitor(S), f && (a.SetPrintStartDelegate(fa), a.SetPrintURLDelegate(ga)), a.SetOnSSOStatusUpdate(ha), void 0 !== h && h.isSafari && ma(), t.telemetry.timeLaunched = (new Date).getTime()
			}(), t.getMonitorBounds = function () {
				var a = {
					width: 800,
					height: 448
				};
				return t.delegate.monitorBounds ? a = t.delegate.monitorBounds() || a : b.error("[Connection] Monitorbounds delegate not found, falling back to default monitor bounds"), a
			}, t.updateMonitorLayout = function () {
				var a = t.getMonitorBounds();
				u === ConnectionState.Initialized ? (t.telemetry.initialWidth = a.width, t.telemetry.initialHeight = a.height, h && (t.telemetry.initialScale = h.getWindowScale())) : t.telemetry.resolutionChanged++, la(a.width, a.height)
			}, t.connect = function () {
				if (t.triggerConnectionStartDiagnosticEvent(), b.debug("[Connection] Connection.connect called"), u === ConnectionState.Disconnected || u === ConnectionState.Initialized) try {
					t.updateMonitorLayout(), t.clipboardHandler = new ClipboardHandler(t, e, b), t.fileSystemHandler = new FileSystemHandler(t, j, b, g), l = a.QueryInputController({
						OnMousePointerPositionChanged: t.delegate.mousePositionChanged,
						OnMousePointerShapeChanged: t.delegate.mousePointerChanged,
						OnShowDefaultMousePointer: da,
						OnHideDefaultMousePointer: ea,
						OnMultiTouchEnabled: t.delegate.multiTouchEnabled
					}), t.isRail && (m = a.QueryRailController({
						OnWindowCreated: U,
						OnWindowDeleted: V,
						OnWindowIconChanged: W,
						OnWindowTitleChanged: Y,
						OnWindowActivated: X,
						OnRailActivated: T,
						OnApplicationLaunched: Z,
						OnWindowIdToApplicationIdChanged: $,
						OnZOrderChanged: aa,
						OnArcStateChanged: ba
					})), p = null, p = a.QueryClipboardController({
						OnClipboardProtocolReady: t.clipboardHandler.clipboardProtocolReady,
						OnClipboardOwnerChanged: t.clipboardHandler.clipboardOwnerChanged,
						OnRemoteClipboardChanged: t.clipboardHandler.remoteClipboardChanged,
						OnGetRemoteClipboardContentComplete: t.clipboardHandler.getRemoteClipboardContentComplete,
						OnSetRemoteClipboardFormatsComplete: t.clipboardHandler.setRemoteClipboardFormatsComplete,
						OnClipboardContentRequest: t.clipboardHandler.onClipboardContentRequest
					}), t.clipboardHandler.setClipboardController(p), n = null, n = a.QueryAudioController({
						GetAudioContext: _,
						OnAudioStateChanged: ca
					}), t.connectionSettings.EnableDriveRedirection && (q = null, q = a.QueryFileSystemController({
						OnFileSystemStateChanged: t.fileSystemHandler.onStateChange,
						OnFileDownloadJobCompletion: t.fileSystemHandler.onFileDownloadJobCompletion
					}), t.fileSystemHandler.setFileSystemController(q)), t.connectionSettings.EnableAudioInput && (b.debug("[Connection] Initializing AudioInputControler"), t.audioInputHandler = new AudioInputHandler(t, j, b, h), o = a.QueryAudioInputController({
						OnAudioInputEnabled: t.audioInputHandler.audioInputStateChanged,
						OnAudioInputOpenRequest: t.audioInputHandler.onAudioInputOpenRequest
					}), t.audioInputHandler.setAudioInputController(o)), a.Connect()
				} catch (a) {
					b.error("[Connection] Connection connect throws following exception"), b.error(a), t.disconnectReason = {
						code: Module.DisconnectCode.UnknownError
					}, t.telemetry.timeDisconnected = (new Date).getTime(), e && e.onDisconnected(t), t.triggerConnectionEndDiagnosticEvent(), t.events.fireEventCallback(ConnectionEvent.ConnectionConnectFailed, t, {
						code: Module.DisconnectCode.UnknownError
					})
				} else b.log("[Connection] Not calling rdpConnection.Connect since connection is in state: " + u)
			}, t.disconnect = function (c) {
				b.log("[Connection] Disconnet Called"), 0 === A.length || c ? a.Disconnect() && F(!1) : b.log("[Connection] Connection has open windows, skipping disconnection until all windows closed")
			}, t.dismiss = function () {
				u = ConnectionState.Dismissed
			}, t.mouseMove = function (a, b) {
				l.SendMouseMove(a, b)
			}, t.mouseDown = function (a, b, c) {
				l.SendMouseButton(a, b, ia(c), Module.MouseEvent.Down)
			}, t.mouseUp = function (a, b, c) {
				l.SendMouseButton(a, b, ia(c), Module.MouseEvent.Up)
			}, t.mouseWheel = function (a, b) {
				l.SendMouseWheel(a, b)
			}, t.keyDown = function (a) {
				l.SendKeycode(a, Module.KeyEvent.Press)
			}, t.keyUp = function (a) {
				l.SendKeycode(a, Module.KeyEvent.Release)
			}, t.keyUnicodeDown = function (a) {
				l.SendUnicode(a, Module.KeyEvent.Press)
			}, t.keyUnicodeUp = function (a) {
				l.SendUnicode(a, Module.KeyEvent.Release)
			}, t.sendTouchEvents = function (a, b) {
				var c = ka(a, b);
				l.SendTouchEvents(c), c.delete()
			}, t.setRemoteClipboardsFormats = function (a) {
				p.SetRemoteClipboardFormats(a)
			}, t.getRemoteClipboardContent = function (a) {
				p.GetRemoteClipboardContent(a)
			}, t.isClipboardReady = function () {
				return t.clipboardHandler.clipboardReady
			}, t.uploadFile = function (a, b) {
				q.OnAddFile(a, b)
			}, t.syncFileSystem = function () {
				q.OnSyncFileSystem()
			}, t.isFileUploadSupported = function () {
				return t.fileSystemHandler.isFileUploadEnabled
			}, t.fileSystemError = function (a) {
				t.fileSystemHandler.onDriveUploadError(a)
			}, t.getUploadFolderPath = function () {
				return t.fileSystemHandler.getUploadFolderPath()
			}, t.setFocus = function (c) {
				v !== c && (v = c, a && (v ? a.EnableGraphicsUpdates() : a.DisableGraphicsUpdates()), t.telemetry.sessionSwitchedCount++, r ? (r.isFocused = v, v && r.refreshWholeCanvas()) : b.log("[Connection] Graphics sink not set yet, cannot set focus to: " + v))
			}, t.getFocus = function () {
				return v
			}, t.launchApplication = function (a, c, d) {
				var e = {};
				y ? (m.LaunchApplication(a, c, d), i && i.triggerConnectionCheckPointEvent(t, "ClientApplicationLaunch", a)) : (b.log("[Connection] Rail is not active adding application to pending list: " + a), e.applicationName = a, e.applicationArguments = c, e.applicationWorkingDirectory = d, z.push(e))
			}, t.setWorkArea = function (a) {
				y && m.SetWorkArea(a)
			}, t.maximizeWindow = function (a) {
				m.WindowAction(a, Module.RailAction.Maximize)
			}, t.minimizeWindow = function (a) {
				m.WindowAction(a, Module.RailAction.Minimize)
			}, t.restoreWindow = function (a) {
				m.WindowAction(a, Module.RailAction.Restore)
			}, t.closeWindow = function (a) {
				m.WindowAction(a, Module.RailAction.Close)
			}, t.activateWindow = function (a, b) {
				b && a !== C && t.telemetry.appSwitchedCount++, m.WindowAction(a, Module.RailAction.Activate)
			}, t.getState = function () {
				return u
			}, t.invalidateCanvas = function () {
				var a;
				t.delegate.canvasNeeded && (a = t.delegate.canvasNeeded(), r && (r.GetCanvas(!0) || r.setCanvas(a), r.refreshWholeCanvas()))
			}, t.getWindowCount = function () {
				return A.length
			}, t.getPendingPrintJobCount = function () {
				return D
			}, t.isAutoReconnecting = function () {
				return w > 0
			}, t.triggerConnectionEndDiagnosticEvent = function (a) {
				a = a || !1, i && (i.triggerConnectionEndEvent(t, a), t.diagnosticActivityinProgress = !1)
			}, t.triggerConnectionStartDiagnosticEvent = function () {
				i && (i.triggerConnectionStartEvent(t), t.diagnosticActivityinProgress = !0)
			}, t.triggerSSOAuthDiagnosticEvent = function (a, b) {
				i && i.triggerSSOAuthenticationCompletedEvent(t, a, b)
			}, t.triggerSSOTokenRetrievalEvent = function (a, b, c) {
				i && i.triggerSSOTokenRetrievalEvent(t, a, b, c)
			}, window.addEventListener("beforeunload", function () {
				i && !0 === t.diagnosticActivityinProgress && (t.disconnectReason = {
					code: Module.DisconnectCode.UserInitiated
				}, t.triggerConnectionEndDiagnosticEvent(!0), i.triggerConnectionCheckPointEvent(t, "OnLocalSessionEnding", null, !0))
			}), t
	},
	ConnectionFactoryType = {
		RdpConnection: 0,
		MockConnection: 1,
		MockDefectConnection: 2
	},
	ConnectionFactory = function (a, b, c, d, e, f, g, h, i, j) {
		"use strict";
		var k = this,
			l = [],
			m = function (a) {
				var b, c;
				for (c = 0; c < l.length; c++)
					if (b = l[c].properties, b.isEqual(a)) return l[c].connection;
				return null
			},
			n = function (a) {
				k.removeConnection(a)
			},
			o = function (a) {
				a.disconnectReason && a.disconnectReason.code !== Module.DisconnectCode.UserInitiated || k.removeConnection(a)
			},
			p = function (a) {
				var c;
				for (b.log("[SessionProvider] All windows loaded for connection: " + a), c = 0; c < l.length; c++)
					if (l[c].connection.id === a) {
						l[c].windowsLoaded = !0;
						break
					}
			};
		this.findConnection = function (a) {
			return m(a)
		}, this.findConnectionById = function (a) {
			var b;
			for (b = 0; b < l.length; b++)
				if (l[b].connection.id === a) return l[b].connection;
			return null
		}, this.createConnection = function (q, r) {
			var s, t, u = null;
			if (b.debug("[ConnectionFactory] Creating connection to: "), b.debug(q), s = m(q), s && s.getState() === ConnectionState.Disconnected && (k.removeConnection(s), s = null), null === s)
				if (a === ConnectionFactoryType.RdpConnection) {
					var v = Module.CorrelationID.CreateRandomCorrelationID();
					q.connectionSettings.ClientUserAgent = g.clientUserAgent, t = Module.IConnection.Create(q.connectionSettings, v), u = new Connection(t, b, c, q, d, e, f, g, h, j, i), u.id = v.ToString().slice(1, -1), u.correlationId = v, u.tenantId = q.tenantId, u.hostPoolId = q.properties.HostPoolID, q.connectionSettings && (u.eventLogUploadAddress = q.connectionSettings.EventLogUploadAddress), l.push({
						connection: u,
						properties: q,
						windowsLoaded: !1
					}), u.events.subscribe(ConnectionEvent.ConnectionDestroyed, o), u.events.subscribe(ConnectionEvent.ConnectionConnectFailed, n), u.events.subscribe(ConnectionEvent.WindowsLoaded, p), u.isExistingConnection = !1, r(u), b.log("Value of UseConnectionWebWorkers flag = " + q.connectionSettings.UseConnectionWebWorkers), !0 === q.connectionSettings.UseConnectionWebWorkers && (u.connectionWebWorkerStartedTimeout = setTimeout(function () {
						b.warn("Setting a flag to not use connection webworkers for all future connections"), q.setConnectionWebworkersFlag(!1), u.onDisconnecting(), j && j.onClientEvent(u.correlationId.ToString(), "ConnectionWebWorkerFailed", "Reconnecting without connection webworkers", 3), u.onDisconnected({
							code: Module.DisconnectCode.WebWorkerError
						})
					}, 12e4, u, q))
				} else {
					if (a === ConnectionFactoryType.MockConnection) t = new MockRdpConnection(q.connectionSettings), u = new MockConnection(t, b, c, q, d, e, f, g, h, j);
					else {
						if (a !== ConnectionFactoryType.MockDefectConnection) return b.error("[ConnectionFactory] unexpected connection factory type"), null;
						t = new MockRdpConnection(q.connectionSettings), t.Connect = function () {
							throw "Mock connection failure"
						}, u = new MockConnection(t, b, c, q, d, e, f, g, h, j)
					}
					l.push({
						connection: u,
						properties: q,
						windowsLoaded: !1
					}), u.events.subscribe(ConnectionEvent.ConnectionDestroyed, o), u.events.subscribe(ConnectionEvent.ConnectionConnectFailed, n), u.events.subscribe(ConnectionEvent.WindowsLoaded, p), u.isExistingConnection = !1, r(u)
				}
			else b.log("[ConnectionFactory] Existing connection found "), u = s, u.isExistingConnection = !0, r(u)
		}, this.disconnectAllConnections = function () {
			for (var a = l.shift(); a && a.connection;) a.connection.disconnect(!0), a = l.shift()
		}, this.removeConnection = function (a) {
			var b;
			for (b = 0; b < l.length; b++)
				if (l[b].connection === a) {
					l.splice(b, 1);
					break
				}
			a.dismiss()
		}, this.invalidateCanvasForActiveConnections = function () {
			var a;
			for (a = 0; a < l.length; a++) l[a].connection.invalidateCanvas()
		}, this.hasActiveConnections = function () {
			return 0 !== l.length
		}, this.listActiveConnections = function () {
			var a, b = [];
			for (a = 0; a < l.length; a++) b.push(l[a].connection);
			return b
		}, this.windowsLoaded = function () {
			var a;
			for (a = 0; a < l.length; a++)
				if (!1 === l[a].windowsLoaded) return !1;
			return !0
		}
	},
	SessionDisconnectCode = function () {
		"use strict";
		var a = {};
		return a.locKey = function (a) {
			var b = Module.DisconnectCode.UnknownError;
			switch (a && a.code && (b = a.code), b) {
				case Module.DisconnectCode.AccountDisabled:
					return "SESSION_DISCONNECT_CODE_ACCOUNT_DISABLED";
				case Module.DisconnectCode.AccountExpired:
					return "SESSION_DISCONNECT_CODE_ACCOUNT_EXPIRED";
				case Module.DisconnectCode.AccountLockedOut:
					return "SESSION_DISCONNECT_CODE_ACCOUNT_LOCKED_OUT";
				case Module.DisconnectCode.AccountRestricted:
					return "SESSION_DISCONNECT_CODE_ACCOUNT_RESTRICTED";
				case Module.DisconnectCode.AutoReconnectFailed:
					return "SESSION_DISCONNECT_CODE_AUTO_RECONNECT_FAILED";
				case Module.DisconnectCode.CantUpgradeLicense:
					return "SESSION_DISCONNECT_CODE_CANT_UPGRADE_LICENSE";
				case Module.DisconnectCode.CertExpired:
					return "SESSION_DISCONNECT_CODE_CERT_EXPIRED";
				case Module.DisconnectCode.CertMismatch:
					return "SESSION_DISCONNECT_CODE_CERT_MISMATCH";
				case Module.DisconnectCode.CertValidationFailed:
					return "SESSION_DISCONNECT_CODE_GENERIC_PROTOCOL_ERROR";
				case Module.DisconnectCode.ConnectionBroken:
				case Module.DisconnectCode.WebsocketNormalDisconnect:
				case Module.DisconnectCode.SocketConnectionFailed:
				case Module.DisconnectCode.ConnectionBrokenMissedHeartbeatThresholdExceeded:
					return "SESSION_DISCONNECT_CODE_CONNECTION_BROKEN";
				case Module.DisconnectCode.ConnectionTimeout:
					return "SESSION_DISCONNECT_CODE_CONNECTION_TIMEOUT";
				case Module.DisconnectCode.DecompressionFailed:
					return "SESSION_DISCONNECT_CODE_DECOMPRESSION_FAILED";
				case Module.DisconnectCode.EncryptionFailed:
					return "SESSION_DISCONNECT_CODE_ENCRYPTION_FAILED";
				case Module.DisconnectCode.FreshCredsRequired:
					return "SESSION_DISCONNECT_CODE_FRESH_CREDS_REQUIRED";
				case Module.DisconnectCode.GenericByServer:
					return "SESSION_DISCONNECT_CODE_GENERIC_BY_SERVER";
				case Module.DisconnectCode.GenericLicenseError:
					return "SESSION_DISCONNECT_CODE_GENERIC_LICENSE_ERROR";
				case Module.DisconnectCode.GenericNetworkError:
					return "SESSION_DISCONNECT_CODE_GENERIC_NETWORK_ERROR";
				case Module.DisconnectCode.GenericProtocolError:
					return "SESSION_DISCONNECT_CODE_GENERIC_PROTOCOL_ERROR";
				case Module.DisconnectCode.WebWorkerError:
					return "SESSION_DISCONNECT_CODE_WEB_WORKER_ERROR";
				case Module.DisconnectCode.GenericSecurityError:
				case Module.DisconnectCode.NoLogonServers:
				case Module.DisconnectCode.TrustedRelationshipFailure:
				case Module.DisconnectCode.AuthenticationFirewallFailed:
				case Module.DisconnectCode.SecEUnsuportedFunction:
				case Module.DisconnectCode.NoSuchAuthPackage:
				case Module.DisconnectCode.RdsTlsSSOFailed:
					return "SESSION_DISCONNECT_CODE_GENERIC_SECURITY_ERROR";
				case Module.DisconnectCode.CredSSPRequired:
					return "SESSION_DISCONNECT_HYBRID_REQUIRED";
				case Module.DisconnectCode.IdleTimeout:
				case Module.DisconnectCode.CredPromptTimeout:
					return "SESSION_DISCONNECT_CODE_IDLE_TIMEOUT";
				case Module.DisconnectCode.InitFipsFailed:
					return "SESSION_DISCONNECT_CODE_INIT_FIPS_FAILED";
				case Module.DisconnectCode.InvalidLicense:
					return "SESSION_DISCONNECT_CODE_INVALID_LICENSE";
				case Module.DisconnectCode.InvalidLogonHours:
					return "SESSION_DISCONNECT_CODE_INVALID_LOGON_HOURS";
				case Module.DisconnectCode.InvalidWorkStation:
					return "SESSION_DISCONNECT_CODE_INVALID_WORK_STATION";
				case Module.DisconnectCode.KerberosUser2UserRequired:
					return "SESSION_DISCONNECT_CODE_KERBEROS_USER_2_USER_REQUIRED";
				case Module.DisconnectCode.LogonTimeout:
					return "SESSION_DISCONNECT_CODE_LOGON_TIMEOUT";
				case Module.DisconnectCode.LogonTypeNotGranted:
					return "SESSION_DISCONNECT_CODE_LOGON_TYPE_NOT_GRANTED";
				case Module.DisconnectCode.LoopbackUnsupported:
					return "SESSION_DISCONNECT_CODE_LOOPBACK_UNSUPPORTED";
				case Module.DisconnectCode.NoLicenseAvailable:
					return "SESSION_DISCONNECT_CODE_NO_LICENSE_AVAILABLE";
				case Module.DisconnectCode.NoLicenseServer:
					return "SESSION_DISCONNECT_CODE_NO_LICENSE_SERVER";
				case Module.DisconnectCode.NoRemoteConnectionLicense:
					return "SESSION_DISCONNECT_CODE_NO_REMOTE_CONNECTION_LICENSE";
				case Module.DisconnectCode.NoSuchUser:
					return "SESSION_DISCONNECT_CODE_NO_SUCH_USER";
				case Module.DisconnectCode.PasswordExpired:
					return "SESSION_DISCONNECT_CODE_PASSWORD_EXPIRED";
				case Module.DisconnectCode.PasswordMustChange:
					return "SESSION_DISCONNECT_CODE_PASSWORD_MUST_CHANGE";
				case Module.DisconnectCode.LogonFailed:
					return "SIGNIN_DIALOG_FAILED_TEXT";
				case Module.DisconnectCode.RemotingDisabled:
					return "SESSION_DISCONNECT_CODE_REMOTING_DISABLED";
				case Module.DisconnectCode.ReplacedByOtherConnection:
					return "SESSION_DISCONNECT_CODE_REPLACED_BY_OTHER_CONNECTION";
				case Module.DisconnectCode.ServerDeniedConnection:
					return "SESSION_DISCONNECT_CODE_SERVER_DENIED_CONNECTION";
				case Module.DisconnectCode.ServerInsufficientPrivileges:
					return "SESSION_DISCONNECT_CODE_SERVER_INSUFFICIENT_PRIVILEGES";
				case Module.DisconnectCode.ServerNameLookupFailed:
					return "SESSION_DISCONNECT_CODE_SERVER_NAME_LOOPUP_FAILED";
				case Module.DisconnectCode.ServerOutOfMemory:
					return "SESSION_DISCONNECT_CODE_SERVER_OUT_OF_MEMORY";
				case Module.DisconnectCode.ServerTool:
					return "SESSION_DISCONNECT_CODE_SERVER_TOOL";
				case Module.DisconnectCode.SSLHandshakeFailed:
					return "SESSION_DISCONNECT_CODE_SSL_HANDSHAKE_FAILED";
				case Module.DisconnectCode.TimeSkew:
					return "SESSION_DISCONNECT_CODE_TIME_SKEW";
				case Module.DisconnectCode.UnknownError:
					return "SESSION_DISCONNECT_CODE_UNKNOWN_ERROR";
				case Module.DisconnectCode.UserInitiated:
					return "SESSION_DISCONNECT_CODE_USER_INITIATED";
				case Module.DisconnectCode.VersionMismatch:
					return "SESSION_DISCONNECT_CODE_VERSION_MISMATCH";
				case Module.DisconnectCode.GatewayProtocolError:
				case Module.DisconnectCode.OrchestrationFailed:
				case Module.DisconnectCode.OrchestrationResponseError:
				case Module.DisconnectCode.OrchestrationNoGatewayResponse:
					return "SESSION_DISCONNECT_CODE_GATEWAY_PROTOCOL_ERROR";
				case Module.DisconnectCode.SessionHostResourceNotAvailable:
					return "SESSION_DISCONNECT_CODE_PROXY_RESOURCE_NOT_AVAILABLE";
				case Module.DisconnectCode.OrchestrationResourceNotAvailableError:
					return "SESSION_DISCONNECT_CODE_NO_RESOURCE_FOUND";
				case Module.DisconnectCode.GatewayTimeout:
					return "SESSION_DISCONNECT_CODE_GATEWAY_TIMEOUT";
				case Module.DisconnectCode.OutOfMemory:
					return "SESSION_DISCONNECT_CODE_OUT_OF_MEMORY";
				case Module.DisconnectCode.PipelineDecodeError:
					return "SESSION_DISCONNECT_PIPELINE_DECODE_ERROR";
				case Module.DisconnectCode.ScreenCaptureProtectNotSupported:
					return "SESSION_DISCONNECT_SCREEN_CAPTURE_PROTECT_NOT_SUPPORTED";
				default:
					return "SESSION_DISCONNECT_CODE_UNKNOWN_ERROR"
			}
		}, a
	}(),
	DeviceInfo = function (a) {
		"use strict";
		var b, c, d = {},
			e = {
				CHROME: 45,
				FIREFOX: 55,
				SAFARI: 9,
				IE: 11
			};
		return function (a) {
			b = void 0 === a ? new UAParser : new UAParser(a), c = b.getResult()
		}(a), d.getResultObject = function () {
			return c
		}, d.getBrowserInfo = function () {
			return c.browser
		}, d.getDeviceInfo = function () {
			return c.device
		}, d.getOSInfo = function () {
			return c.os
		}, d.getEngineInfo = function () {
			return c.engine
		}, d.getUAString = function () {
			return c.ua
		}, d.isSupportedBrowser = function () {
			var a = parseInt(c.browser.major);
			return "Chrome" === c.browser.name && a >= e.CHROME || "Safari" === c.browser.name && a >= e.SAFARI || "IE" === c.browser.name && a >= e.IE || "Firefox" === c.browser.name && a >= e.FIREFOX || "Edge" === c.browser.name
		}, d.isWindows = function () {
			return "Windows" === c.os.name
		}, d.osVersion = function () {
			return parseInt(c.os.version)
		}, d.isMac = function () {
			return "Mac OS" === c.os.name
		}, d.isMobile = function () {
			return "tablet" === c.device.type || "mobile" === c.device.type
		}, d.isChrome = function () {
			return "Chrome" === c.browser.name
		}, d.isFirefox = function () {
			return "Firefox" === c.browser.name
		}, d.isSafari = function () {
			return "Safari" === c.browser.name
		}, d.isIE = function () {
			return "IE" === c.browser.name
		}, d.isEdge = function () {
			return "Edge" === c.browser.name
		}, d
	};
angular.module("rdCommon", []),
	function () {
		function a(a) {
			var b = a.localStorage;
			if (!b) throw new Error("Persistent storage is not available!");
			var c = "RdWebAppSettings::",
				d = function (a, d) {
					try {
						return JSON.parse(b.getItem(c + a))
					} catch (a) {
						return d
					}
				},
				e = function (a, d) {
					b.setItem(c + a, JSON.stringify(d))
				},
				f = {
					InitializeSettings: function () {
						f.telemetryEnabled = !0, f.IMEEnabled = !1, f.SelectedKeyboardLayout = "Select", f.UseConnectionWebWorkers = !0, e("initialized", !0)
					},
					get telemetryEnabled() {
						return !!d("telemetryEnabled", !0)
					},
					set telemetryEnabled(a) {
						e("telemetryEnabled", a)
					},
					get resourceLaunchMethod() {
						return d("resourceLaunchMethod", "webclient")
					},
					set resourceLaunchMethod(a) {
						e("resourceLaunchMethod", a)
					},
					get dismissedGDPRBanner() {
						return !!d("dismissedGDPRBanner", !1)
					},
					set dismissedGDPRBanner(a) {
						e("dismissedGDPRBanner", a)
					},
					get dismissedUnsupportedBrowser() {
						return !!d("dismissedUnsupportedBrowser", !1)
					},
					set dismissedUnsupportedBrowser(a) {
						e("dismissedUnsupportedBrowser", a)
					},
					get dismissedAudioUnsupported() {
						return !!d("dismissedAudioUnsupported", !1)
					},
					set dismissedAudioUnsupported(a) {
						e("dismissedAudioUnsupported", a)
					},
					get IMEEnabled() {
						return !!d("IMEEnabled", !1)
					},
					set IMEEnabled(a) {
						e("IMEEnabled", a)
					},
					get SelectedKeyboardLayout() {
						try {
							return JSON.parse(b.getItem(c + "SelectedKeyboardLayout"))
						} catch (a) {
							return "Select"
						}
					},
					set SelectedKeyboardLayout(a) {
						e("SelectedKeyboardLayout", a)
					},
					isKeyboardLayoutSelected: function () {
						try {
							var a = JSON.parse(b.getItem(c + "SelectedKeyboardLayout"));
							return !!a && ("Select" !== a && "Others" !== a)
						} catch (a) {
							return !1
						}
					},
					get UseConnectionWebWorkers() {
						return !!d("UseConnectionWebWorkers", !0)
					},
					set UseConnectionWebWorkers(a) {
						e("UseConnectionWebWorkers", a)
					}
				};
			return d("initialized", !1) || f.InitializeSettings(), !0 === DeploymentSettings.launchResourceInBrowser ? f.resourceLaunchMethod = "webclient" : !1 === DeploymentSettings.launchResourceInBrowser ? f.resourceLaunchMethod = "nativeclient" : f.resourceLaunchMethod = f.resourceLaunchMethod || "webclient", e("resourceLaunchMethod", f.resourceLaunchMethod), f
		}
		angular.module("rdCommon").factory("appSettingsStore", ["$window", a])
	}(),
	function () {
		function a() {
			var a = !(void 0 === window.AudioContext && void 0 === window.webkitAudioContext),
				b = !(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia),
				c = !!navigator.serviceWorker,
				d = function (a) {
					function b(a, b) {
						a.map(function (c) {
							c.idx < b && c.idx++, a[b].idx = 0
						})
					}

					function c() {
						d.isSupportedBrowser() || (f = !0)
					}
					var d = new DeviceInfo(a),
						e = (d.getResultObject(), [{
							idx: 0,
							name: "Internet Explorer",
							show: !0,
							url: "http://windows.microsoft.com/en-us/internet-explorer/download-ie"
						}, {
							idx: 1,
							name: "Microsoft Edge",
							show: !0,
							url: "https://www.microsoft.com/en-us/windows/microsoft-edge"
						}, {
							idx: 2,
							name: "Google Chrome",
							show: !0,
							url: "https://www.google.com/chrome/browser/desktop/index.html"
						}, {
							idx: 3,
							name: "Safari",
							show: !0,
							url: "https://support.apple.com/en-us/HT204416"
						}, {
							idx: 4,
							name: "Mozilla Firefox",
							show: !0,
							url: "https://www.mozilla.org/en-US/firefox/new/"
						}]),
						f = !1,
						g = {
							IE: 0,
							EDGE: 1,
							CHROME: 2,
							SAFARI: 3,
							FIREFOX: 4
						};
					return function () {
						e[g.EDGE].show = d.isWindows() && d.osVersion() >= 10, d.isWindows() || (e[g.IE].show = !1, e[g.EDGE].show = !1), d.isMac() || (e[g.SAFARI].show = !1), c()
					}(), d.isMobile() ? f = !0 : d.isChrome() ? b(e, g.CHROME) : d.isFirefox() ? b(e, g.FIREFOX) : d.isSafari() ? b(e, g.SAFARI) : d.isIE() || d.isEdge() || (d.isMac() && b(e, g.SAFARI), f = !0), {
						deviceInfo: d,
						value: f,
						options: e
					}
				},
				e = {
					isAudioSupported: function () {
						return a
					},
					isAudioInputSupported: function () {
						return b
					},
					isIndexedDBSupported: function () {
						return c
					},
					getBrowserSupportData: d
				},
				f = Object.create(e);
			return f.$get = function () {
				return e
			}, f
		}
		angular.module("rdCommon").provider("browserCapabilities", a)
	}(),
	function () {
		var a = function () {
			var a;
			return {
				storeCreds: function (b, c) {
					a = new Credential, a.userName = b, a.password = c
				},
				getSavedCreds: function () {
					return a && angular.copy(a)
				}
			}
		};
		angular.module("rdCommon").service("credentialStore", a)
	}(),
	function () {
		var a = function (a, b, c) {
			var d = {},
				e = "RD Console Logs.txt";
			return b("CONSOLE_LOG_FILE_NAME").then(function (a) {
				e = a
			}, function (a) {
				e = a
			}), d.downloadLogs = function () {
				var b = c.getListOfLogs(),
					d = new Blob(b, {
						type: "text/plain"
					}),
					f = URL.createObjectURL(d);
				if (a.navigator.msSaveBlob) a.navigator.msSaveBlob(d, e);
				else {
					var g = a.document.getElementById("logDownloadLink");
					g ? (g.download = e, g.href = f, g.click()) : c.error("The link for downloading logs could not be found.")
				}
			}, d
		};
		angular.module("rdCommon").factory("consoleLogDownloader", ["$window", "$translate", "logger", a])
	}(),
	function () {
		var a = function (a, b) {
			var c = {},
				d = ".rdp";
			return DeploymentSettings.multiTenantConfig && (d = ".rdpw"), c.downloadRdpFile = function (c, e) {
				e = (e || "remoteApp") + d;
				var f = new Blob([c], {
					type: "text/plain"
				});
				if (a.navigator.msSaveBlob) a.navigator.msSaveBlob(f, e);
				else {
					var g = URL.createObjectURL(f),
						h = a.document.getElementById("rdpFileDownloadLink");
					h.setAttribute("download", e), h.href = g, h.click(), b(function () {
						URL.revokeObjectURL(g)
					}, 100)
				}
			}, c
		};
		angular.module("rdCommon").factory("rdpFileDownloader", ["$window", "$timeout", a])
	}(),
	function () {
		function a(a) {
			return {
				parseWorkspaceFeed: function (b) {
					function c(a, b) {
						const c = a._Title.toUpperCase(),
							d = b._Title.toUpperCase(),
							e = a._Type,
							f = b._Type;
						var g = 0;
						return e === f ? c > d ? g = 1 : d > c && (g = -1) : g = "RemoteApp" === f ? 1 : -1, g
					}
					var d = new X2JS,
						e = d.xml_str2json(b),
						f = {
							publisher: e.ResourceCollection.Publisher._Name,
							publisherId: e.ResourceCollection.Publisher._ID,
							bookmarks: [],
							folders: [],
							url: null,
							description: e.ResourceCollection.Publisher._Description,
							supportInfoPresent: !1,
							supportObj: {
								logoURL: null,
								supportURL: null,
								supportPhone: null,
								privacyURL: null
							}
						},
						g = f.description,
						h = g.indexOf("{");
					if (h >= 0 && (f.description = g.substr(0, h), g = g.substr(h), g = g.trim(), g.search("{*}"))) try {
						f.supportObj = JSON.parse(g), f.supportInfoPresent = !0
					} catch (b) {
						f.supportObj = null, a.log("Error in reading the following support information JSON : " + g)
					}
					var i, j = d.asArray(e.ResourceCollection.Publisher.Resources.Resource);
					j.sort(c);
					var k, l, m, n;
					for (k = 0; k < j.length; k++) {
						if (i = new Bookmark, i.id = j[k]._ID, i.friendlyName = j[k]._Title, i.thumbnail = j[k].Icons.Icon32._FileURL, i.rdpFileURL = d.asArray(j[k].HostingTerminalServers.HostingTerminalServer)[0].ResourceFile._URL, i.workspaceName = f.publisher, i.bookmarkType = "RemoteApp" === j[k]._Type ? BookmarkType.RemoteApp : BookmarkType.RemoteDesktop, j[k].Folders)
							for (m = d.asArray(j[k].Folders.Folder), l = 0; l < m.length; l++) n = m[l]._Name, "/" === n[0] && n.length > 1 && (n = n.substr(1)), f.folders.indexOf(n) < 0 && "/" !== n && f.folders.push(n), i.folderNames.push(n);
						f.bookmarks.push(i)
					}
					return f.folders.sort(function (a, b) {
						return a.localeCompare(b)
					}), f
				}
			}
		}
		angular.module("rdCommon").factory("feedParser", ["logger", a])
	}(), angular.module("rdCommon").provider("logger", [function () {
		var a = new Logger;
		a.setLogLevel(LogLevel.All);
		var b = Object.create(a);
		return b.$get = function () {
			return a
		}, b
	}]), angular.module("rdCommon").factory("platformInfo", ["$window", "$translate", function (a, b) {
		return new PlatformInfo(new DeviceInfo, a, b)
	}]),
	function () {
		var a = function () {
			return {
				getRetryInterval: function () {
					return 5e3
				},
				getWorkspaceUpdateInterval: function () {
					return 216e5
				},
				getFeedRetrivalMaxRetry: function () {
					return 5
				}
			}
		};
		angular.module("rdCommon").service("rdCommonRuntimeParameters", a)
	}(), angular.module("rdCommon").factory("telemetrySink", ["$window", function (a) {
		return a.awa || null
	}]),
	function () {
		function a(a, b, c, d, e, f, g) {
			var h = function () {
					var h, i = this,
						j = !1,
						k = !1,
						l = e.localStorage,
						m = null,
						n = null,
						o = null,
						p = {
							loaded: !1,
							multiTenant: !1,
							feedCount: 0,
							publishedFolderCount: 0,
							publishedAppCount: 0,
							publishedDesktopCount: 0
						},
						q = function () {
							if (d && !j) {
								var a = {
									coreData: {
										appId: "RdWebClient",
										sendEvents: !0
									}
								};
								l && (m = l.getItem("RdWebClient::Telemetry::supportID")), m || h(), d.ids.setAppUserId("c:" + m), d.init(a), c.log("Telemetry initialized and enabled."), j = !0
							}
						},
						r = function () {
							if (d && j) {
								var a = {
									name: "Microsoft.RDS.Web.Client.DailyDeviceInfo",
									data: {
										"Microsoft.RDS.Web.Client.DailyDeviceInfo": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											locale: b.getLocale(),
											hardwareModeEnabled: b.isHardwareModeEnabled()
										}
									}
								};
								d.writeEvent(a)
							}
						},
						s = function () {
							if (d && j) {
								const c = a.resourceLaunchMethod;
								var e = {
									name: "Microsoft.RDS.Web.Client.DailyResourceLaunchMethod",
									data: {
										"Microsoft.RDS.Web.Client.DailyResourceLaunchMethod": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											resourceLaunchMethod: c
										}
									}
								};
								d.writeEvent(e)
							}
						},
						t = function () {
							if (d && j) {
								var a = 0,
									c = 0,
									e = 0,
									f = 0,
									g = 0,
									h = 0,
									i = 0;
								p.multiTenant ? (a = p.feedCount, e = p.publishedDesktopCount, g = p.publishedAppCount, i = p.publishedFolderCount) : (c = p.publishedDesktopCount, f = p.publishedAppCount, h = p.publishedFolderCount);
								var k = {
									name: "Microsoft.RDS.Web.Client.DailyResourceInfo",
									data: {
										"Microsoft.RDS.Web.Client.DailyResourceInfo": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											feedCountMT: a,
											publishedDesktopCount: c,
											publishedDesktopCountMT: e,
											publishedAppCount: f,
											publishedAppCountMT: g,
											publishedFolderCount: h,
											publishedFolderCountMT: i
										}
									}
								};
								d.writeEvent(k)
							}
						},
						u = function (a) {
							if (d && j) {
								var c, e = 0,
									f = a.telemetry.initialWidth + "x" + a.telemetry.initialHeight,
									g = Math.round(100 * a.telemetry.initialScale);
								a.telemetry.timeConnected && (e = Math.round((a.telemetry.timeConnected - a.telemetry.timeLaunched) / 1e3)), c = p.multiTenant ? a.isRail ? "publishedAppMT" : "publishedDesktopMT" : a.isRail ? "publishedApp" : "publishedDesktop";
								var h = {
									name: "Microsoft.RDS.Web.Client.SessionLaunch",
									data: {
										"Microsoft.RDS.Web.Client.SessionLaunch": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											success: !!a.telemetry.timeConnected,
											sourceType: c,
											connectionId: a.bookmarkId,
											launchTime: e,
											correlationId: a.id,
											resolutionUsed: f,
											scaleUsed: g
										}
									}
								};
								d.writeEvent(h)
							}
						},
						v = function (a) {
							if (d && j) {
								var c = a.disconnectReason.code.value === Module.DisconnectCode.UserInitiated.value,
									e = 0,
									f = a.disconnectReason.code.value,
									g = a.disconnectReason.extendedCode,
									h = 0;
								a.telemetry.arcSuccess > 0 && (h = Math.round(a.telemetry.totalArcTime / a.telemetry.arcSuccess / 1e3)), a.telemetry.timeConnected && (e = Math.round((a.telemetry.timeDisconnected - a.telemetry.timeConnected) / 6e4));
								var i = {
									name: "Microsoft.RDS.Web.Client.SessionData",
									data: {
										"Microsoft.RDS.Web.Client.SessionData": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											simpleDisconnectCode: f,
											userInitiated: c,
											serverStackDisconnectCode: g,
											correlationId: a.id,
											minutes: e,
											arcTriggered: a.telemetry.arcAttempts,
											arcSuccess: a.telemetry.arcSuccess,
											arcAvgTimeToConnect: h
										}
									}
								};
								d.writeEvent(i)
							}
						},
						w = function (a) {
							var c = a.telemetry.appSwitchedCount,
								e = a.telemetry.sessionSwitchedCount;
							if (d && j) {
								var f = {
									name: "Microsoft.RDS.Web.Client.InSessionActivity",
									data: {
										"Microsoft.RDS.Web.Client.InSessionActivity": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											correlationId: a.id,
											sessionSwitched: e,
											appSwitched: c,
											resolutionChanged: a.telemetry.resolutionChanged,
											clipboardUsed: a.telemetry.clipboardUsed,
											audioUsed: a.telemetry.audioUsed
										}
									}
								};
								d.writeEvent(f)
							}
						},
						x = function (a) {
							if (d && j) {
								var c = {
									name: "Microsoft.RDS.Web.Client.CrashStackTrace",
									data: {
										"Microsoft.RDS.Web.Client.CrashStackTrace": {
											eventVersion: 1,
											appVersion: b.clientVersion,
											exception: a
										}
									}
								};
								d.writeEvent(c)
							}
						},
						y = function () {
							if (!n && l) try {
								n = parseInt(l.getItem("RdWebClient::Telemetry::dailyEventTimestamp"))
							} catch (a) {
								c.warn("Could not read the daily event timestamp from local storage: " + a)
							}
							return n
						},
						z = function (a) {
							if (n = a, l) try {
								l.setItem("RdWebClient::Telemetry::dailyEventTimestamp", n.toString())
							} catch (a) {
								c.warn("Could not write the daily event timestamp to local storage: " + a)
							}
						},
						A = function () {
							r(), t(), s(), z((new Date).getTime()), o = f(A, 864e5)
						},
						B = function () {
							if (!o && p.loaded) {
								var a, b = y(),
									c = (new Date).getTime();
								a = !b || c - b >= 864e5 ? 0 : 864e5 - (c - b), o = f(A, a)
							}
						},
						C = function () {
							o && (f.cancel(o), o = null)
						},
						D = function (a) {
							p.loaded = !a.loading && !a.loadFailed, p.multiTenant = a.multiTenant, p.feedCount = a.workspaces.length, p.publishedFolderCount = 0, p.publishedAppCount = 0, p.publishedDesktopCount = 0;
							for (var b = 0; b < a.workspaces.length; b++) {
								p.publishedFolderCount += a.workspaces[b].folders.length;
								for (var c = a.workspaces[b], e = 0; e < c.bookmarks.length; e++) {
									c.bookmarks[e].bookmarkType === BookmarkType.RemoteApp ? p.publishedAppCount++ : p.publishedDesktopCount++
								}
							}
							d && j && B()
						};
					h = function () {
						var a = new ObjectHelper;
						if (m = a.createGuid(), l) try {
							l.setItem("RdWebClient::Telemetry::supportID", m)
						} catch (a) {
							c.warn("Could not write support ID to local storage: " + a)
						}
					};
					var E = function () {
						m = null, l.removeItem("RdWebClient::Telemetry::supportID")
					};
					i.disable = function () {
						j && (d.getConfig().sendEvents = !1, c.log("Telemetry disabled")), k = !1, E(), C()
					}, i.enable = function () {
						DeploymentSettings.suppressTelemetry || (j && !k ? (h(), d.getConfig().sendEvents = !0, c.log("Telemetry enabled")) : q(), k = !0, B())
					}, i.onConnected = function (a) {
						0 === a.telemetry.arcAttempts && u(a)
					}, i.onDisconnected = function (a) {
						a.telemetry.timeConnected ? (v(a), w(a)) : (u(a), v(a))
					}, i.onException = function (a) {
						x(a)
					}, i.getSupportID = function () {
						return k ? m : null
					}, g.$on("rdFeedTracker:feedsLoaded", function (a, b) {
						D(b)
					})
				},
				i = new h;
			return a.telemetryEnabled && !DeploymentSettings.suppressTelemetry && i.enable(), i
		}
		angular.module("rdCommon").factory("telemetry", ["appSettingsStore", "platformInfo", "logger", "telemetrySink", "$window", "$timeout", "$rootScope", a])
	}(), angular.module("rdWeb", ["rdCommon"]),
	function () {
		function a(a, b, c) {
			var d, e = !0,
				f = !1;
			return function g() {
				f = !1, a.get("config/brokercert.cer", {
					rdFeedRequest: !0,
					responseType: "arraybuffer"
				}).then(function (a) {
					d = a.data, e = !1, b(g, c.getWorkspaceUpdateInterval())
				}, function (a) {
					404 === a.status ? (console.error("The broker certificate was not found on the server. It may not be properly configured."), b(g, c.getRetryInterval())) : (console.error("Error while trying to download the broker cert, reason: " + JSON.stringify(a)), b(g, c.getRetryInterval())), e && (f = !0)
				})
			}(), {
				getBrokerCert: function () {
					return d
				},
				isLoading: function () {
					return e
				},
				didLoadFail: function () {
					return f
				}
			}
		}
		angular.module("rdWeb").factory("rdCertTracker", ["$http", "$timeout", "rdCommonRuntimeParameters", a])
	}(),
	function () {
		function a() {
			return {
				onRdCoreDebuggingEvent: function () {},
				onException: function () {},
				onConnected: function () {},
				onDisconnected: function () {},
				onFeedStart: function () {},
				onFeedSuccess: function () {},
				onFeedFailure: function () {},
				onFeedResourceDownloadFailure: function () {},
				onSSOTokenRetrievalStarted: function () {},
				onSSOTokenRetrievalSuccess: function () {},
				onSSOTokenRetrievalFailed: function () {},
				onClientOperation: function () {},
				onClientEvent: function () {}
			}
		}
		angular.module("rdWeb").factory("rdDebuggingEvents", [a])
	}(),
	function () {
		function a() {
			return {
				triggerFeedStartEvent: function () {},
				triggerFeedSuccessEvent: function () {},
				triggerFeedFailedEvent: function () {},
				triggerConnectionStartEvent: function () {},
				triggerConnectionEndEvent: function () {},
				triggerConnectionCheckPointEvent: function () {},
				triggerSSOTokenRetrievalEvent: function () {},
				triggerSSOAuthenticationCompletedEvent: function () {}
			}
		}
		angular.module("rdWeb").factory("rdDiagnostics", [a])
	}(),
	function () {
		function a(a, b, c) {
			return {
				getWorkspace: function (d) {
					var e = a.defer(),
						f = {
							rdFeedRequest: !0,
							headers: {
								Accept: "application/x-msts-radc+xml;radc_schema_version=2.0,text/xml"
							}
						};
					return b.get(d, f).then(function (a) {
						200 !== a.status && e.reject("Unexpected HTTP status: " + a.status);
						try {
							e.resolve(c.parseWorkspaceFeed(a.data))
						} catch (a) {
							e.reject("Web feed processing failed!")
						}
					}, function (a) {
						e.reject(a)
					}), e.promise
				}
			}
		}
		angular.module("rdWeb").factory("rdWebFeedRetriever", ["$q", "$http", "feedParser", a])
	}(),
	function () {
		function a(a, b, c, d, e, f, g, h, i, j) {
			var k = new ObjectHelper,
				l = new FeedData;
			l.multiTenant = !1;
			var m, n, o = !0,
				p = !1,
				q = function (a) {
					var b = c.defer();
					return h.get(a, {
						rdFeedRequest: !0
					}).then(function (a) {
						b.resolve(a.data)
					}, function (a) {
						b.reject(JSON.stringify(a))
					}), b.promise
				},
				r = function () {
					l.loading = o || f.isLoading(), l.loadFailed = p || f.didLoadFail()
				},
				s = function () {
					var a = f.getBrokerCert();
					if (a && l.workspaces && 1 === l.workspaces.length && l.workspaces[0].bookmarks) {
						var b;
						for (b = 0; b < l.workspaces[0].bookmarks.length; b++) l.workspaces[0].bookmarks[b].endpointCert = a
					}
				},
				t = function (a) {
					a.rdpFileURL && q(a.rdpFileURL).then(function (b) {
						a.rdpFileString = b
					}, function (a) {
						j.error("RDP file retrieval failed, reason:" + a)
					})
				},
				u = function () {
					if (l.workspaces && 1 === l.workspaces.length && l.workspaces[0].bookmarks) {
						var a;
						for (a = 0; a < l.workspaces[0].bookmarks.length; a++) t(l.workspaces[0].bookmarks[a])
					}
				};
			a.$watch(f.getBrokerCert, s), a.$watch(f.isLoading, r), a.$watch(f.didLoadFail, r);
			var v = function () {
				var b = k.createGuid();
				i && i.triggerFeedStartEvent(b), p = !1, r(), e.getWorkspace("/RDWeb/Pages/WebFeed.aspx").then(function (c) {
					j.log("Successfully retrieved feed"), c.url = "/RDWeb/Pages/WebFeed.aspx", l.workspaces = [c], o = !1, r(), s(), u(), a.$broadcast("rdFeedTracker:feedsLoaded", l), i && i.triggerFeedSuccessEvent(b), m()
				}, function (a) {
					var c = 401 === a.status,
						d = new ErrorInfo("GetTenantResource", a.status, "WORKSPACE_RTVL_FAIL", "Feed retrieval failed, reason:" + JSON.stringify(a));
					j.error(d.errorMessage), o && (p = !0, r()), i && i.triggerFeedFailedEvent(d, b), c ? g.login().then(v, function (a) {
						j.error("Attempt to log back in to the site failed, reason:" + JSON.stringify(a)), n()
					}) : n()
				})
			};
			return m = function () {
				l.numRetry = 0, b(v, d.getWorkspaceUpdateInterval())
			}, n = function () {
				j.log("Retrying feed retrival, Current Retry count = " + l.numRetry), l.numRetry < d.getFeedRetrivalMaxRetry() ? (b(v, d.getRetryInterval()), l.numRetry++) : l.loading = !1
			}, a.$on("rdFeedTracker:loggedIn", v), {
				getFeedData: function () {
					return l
				},
				getFeedFile: q
			}
		}
		angular.module("rdWeb").factory("rdFeedTracker", ["$rootScope", "$timeout", "$q", "rdCommonRuntimeParameters", "rdWebFeedRetriever", "rdCertTracker", "userAuthInfoService", "$http", "rdDiagnostics", "logger", a])
	}(),
	function () {
		var a = function (a) {
				var b = function (a) {
					var b = !1;
					if (a.headers("content-type").toLowerCase().startsWith("text/xml;")) {
						(new DOMParser).parseFromString(a.data, "application/xml").querySelector("RDWAPage > HTMLMainContent > form[name=FrmLogin]") && (b = !0)
					}
					return b
				};
				return {
					request: function (a) {
						if (a && a.rdFeedRequest) {
							var b = angular.copy(a);
							return b.withCredentials = !0, b
						}
						return a
					},
					response: function (c) {
						return c && c.config && c.config.rdFeedRequest && b(c) ? (c.status = 401, c.statusText = "Authentication to RD Web Access Failed.", a.reject(c)) : c
					}
				}
			},
			b = function (a) {
				a.interceptors.push("rdWebHttpInterceptor")
			};
		angular.module("rdWeb").factory("rdWebHttpInterceptor", ["$q", a]).config(["$httpProvider", b])
	}(),
	function () {
		var a = function (a, b, c) {
			var d;
			return {
				getUrlPath: function () {
					var e = b.defer();
					return d ? c(function () {
						e.resolve(d)
					}) : a.get("/RDWeb/Pages/Default.aspx").then(function (a) {
						var b = new DOMParser,
							c = b.parseFromString(a.data, "application/xml"),
							e = c && c.documentElement && c.documentElement.getAttribute("baseurl");
						"RDWAPage" === c.documentElement.tagName && e && (d = new URL(e).pathname)
					}, angular.noop).finally(function () {
						d || (d = "/RDWeb/Pages/en-US/"), e.resolve(d)
					}), e.promise
				}
			}
		};
		angular.module("rdWeb").service("rdWebLocaleUrlFinder", ["$http", "$q", "$timeout", a])
	}(),
	function () {
		var a = function (a) {
			var b = !0;
			return {
				getPasswordChangeEnabled: function () {
					return b
				},
				checkPasswordChangeEnabled: function (c) {
					try {
						var d = document.createElement("iframe");
						d.setAttribute("aria-hidden", "true"), d.setAttribute("tabindex", "-1"), d.style.visibility = "hidden", d.style.position = "absolute", d.style.width = d.style.height = d.borderWidth = "0px", d.src = c, d.onload = function () {
							-1 === d.contentWindow.location.href.search("password.aspx") && (b = !1)
						}, document.getElementsByTagName("body")[0].appendChild(d)
					} catch (b) {
						a.log("Error in checking for PasswordChangeEnabled flag" + JSON.stringify(b))
					}
				}
			}
		};
		angular.module("rdWeb").service("checkPasswordChangeEnabledService", ["logger", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g, h, i) {
			var j = function () {
					var b = c.defer();
					return g.getUrlPath().then(function (c) {
						a.get(c + "logoff.aspx", {
							rdFeedRequest: !0
						}).then(function (a) {
							b.resolve(a)
						}, function (a) {
							b.reject(a)
						})
					}, angular.noop), b.promise
				},
				k = null,
				l = function (a) {
					try {
						return (new X2JS).xml_str2json(a).RDWAPage._baseurl + "password.aspx"
					} catch (a) {
						return f.log("Error in parsing password response xml" + JSON.stringify(a)), null
					}
				},
				m = function (a) {
					var b = {
							message: "SIGNIN_DIALOG_FAILED_TEXT",
							passwordResetLink: null
						},
						c = a.indexOf('style="display:"');
					if (c > 200) {
						var d = a.substring(c - 200, c); - 1 !== d.indexOf("trPasswordExpiredNoChange") ? b.message = "SESSION_DISCONNECT_CODE_PASSWORD_EXPIRED" : -1 !== d.indexOf("trPasswordExpired") && (b.message = "SESSION_DISCONNECT_CODE_PASSWORD_EXPIRED_WITH_CHANGE_LINK", b.passwordResetLink = l(a))
					}
					return b
				},
				n = !1;
			return {
				isAuthenticated: function () {
					return n
				},
				isInteractiveLoginRequired: function () {
					return !0
				},
				getUserName: function () {
					return null
				},
				getUserInitials: function () {
					return null
				},
				getUPN: function () {
					return null
				},
				getCachedToken: function () {
					return null
				},
				getPasswordResetLink: function () {
					return k
				},
				getPasswordChangeEnabled: function () {
					return i.getPasswordChangeEnabled()
				},
				login: function (b, j) {
					var o = c.defer(),
						p = !1;
					if (!b) {
						var q = h.getSavedCreds();
						q ? (b = q.userName, j = q.password, p = !0) : e(function () {
							o.reject({
								result: "ReLoginFailedNoSavedCreds"
							})
						})
					}
					return b && g.getUrlPath().then(function (c) {
						a.post(c + "login.aspx", "DomainUserName=" + encodeURIComponent(b) + "&UserPass=" + encodeURIComponent(j), {
							rdFeedRequest: !0,
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							}
						}).then(function (a) {
							p || (d.$broadcast("rdFeedTracker:loggedIn"), n = !0, h.storeCreds(b, j)), k = l(a.data), i.checkPasswordChangeEnabled(k), f.log("Log in succeeded."), o.resolve()
						}, function (a) {
							f.error("Log in failed."), o.reject(m(a.data))
						})
					}, angular.noop), o.promise
				},
				logout: function () {
					var a = function (a) {
						401 !== a.status && f.error("Sign out unexpectedly failed, reason:" + JSON.stringify(a)), b.location.reload()
					};
					j().then(a, a)
				}
			}
		};
		angular.module("rdWeb").service("userAuthInfoService", ["$http", "$window", "$q", "$rootScope", "$timeout", "logger", "rdWebLocaleUrlFinder", "credentialStore", "checkPasswordChangeEnabledService", a])
	}(), angular.module("rdStandalone", ["rdCommon"]),
	function () {
		var a = function (a) {
			var b, c = new Map,
				d = function (a, c) {
					b.push(c.substring(1, c.length - 1))
				};
			return {
				setActivityHintForCorrelationID: function (a, b) {
					c.has(a) || c.set(a, b)
				},
				getActivityHintForCorrelationID: function (b) {
					if (c.has(b)) return c.get(b);
					a.error("Requested correlation ID not found in Map correlation ID-Tenant ID map")
				},
				deleteCorrelationIDKey: function (b) {
					if (c.has(b)) return c.delete(b);
					a.log("Deletion failed, requested correlation ID not foundin Map correlation ID-Activity hint map")
				},
				getAllCurrentActivityIds: function () {
					return b = [], c.forEach(d), b
				}
			}
		};
		angular.module("rdStandalone").factory("rdStandaloneActivityHintLookup", ["logger", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f) {
			var g = this,
				h = "",
				i = a.getAuthConfig(),
				j = new ObjectHelper,
				k = location.href,
				l = function (a) {
					for (var b = {}, c = /([^&=]+)=([^&]*)/g, d = c.exec(a); d;) b[decodeURIComponent(d[1])] = decodeURIComponent(d[2]), d = c.exec(a);
					return b
				},
				m = function (a, b, d, e, f) {
					var g = [];
					g.push("?response_type=token"), g.push("client_id=" + encodeURIComponent(a)), b && g.push("resource=" + encodeURIComponent(b)), g.push("redirect_uri=" + encodeURIComponent(k)), d && g.push("login_hint=" + encodeURIComponent(d));
					var h = j.createGuid();
					g.push("client-request-id=" + encodeURIComponent(h));
					var i = e + "/oauth2/authorize" + g.join("&") + "&prompt=none" + f;
					return c.log("[GetCertLogonToken] Navigate url:" + i), i
				};
			return g.getADFSToken = function (a) {
				var g = d.defer(),
					j = a.connectionSettings.GatewayCertLogonAuthority,
					n = 0,
					o = function (a) {
						var b = a.hash;
						b.indexOf("#/") > -1 ? b = b.substring(b.indexOf("#/") + 2) : b.indexOf("#") > -1 && (b = b.substring(1));
						var d = l(b);
						if (!d.hasOwnProperty("access_token")) throw d.hasOwnProperty("error_description") ? (c.error("[GetCertLogonToken] Error retrieving cert logon token: " + d.error_description), d.error_description) : (c.error("[GetCertLogonToken] Unknown error: access_token missing"), "Unknown error: access_token missing");
						h = d.access_token, g.resolve(h)
					},
					p = function () {
						var a = n++,
							b = "popupAlertDescribedBy" + a,
							c = e.open({
								animation: !0,
								templateUrl: "app/rdp-client-ui/Session/popupAlert.html",
								windowClass: "rdhtml5-copyInstance",
								controller: "popupAlertCtrl",
								backdrop: "static",
								ariaDescribedBy: b,
								keyboard: !0,
								resolve: {
									params: function () {
										return {
											popupAlertDescribedByID: b
										}
									}
								}
							}),
							d = f(function () {
								c.dismiss()
							}, 6e3);
						c.result.then(function () {}).finally(function () {
							f.cancel(d)
						})
					},
					q = function (a, c) {
						var d = window.innerWidth,
							e = window.innerHeight,
							f = d / 2 - 241.5 + window.screenX,
							h = e / 2 - 300 + window.screenY,
							i = window.open(a, "Acquiring SSO Token for " + b.getUPN(), "width=483, height=600, top=" + h + ", left=" + f);
						if (null === i) return p(), void g.reject("Popup Window is null. This can happen if popups are blocked.");
						i.focus();
						var j = window.setInterval(function () {
							if (!i || i.closed || void 0 === i.closed) {
								return window.clearInterval(j), void g.reject("Popup Window closed by UI action")
							}
							try {
								var a = i.location;
								if (-1 !== encodeURI(a.href).indexOf(encodeURI(c))) return o(a), window.clearInterval(j), void i.close()
							} catch (a) {}
						}, 1)
					};
				if (i.resourceUrl || (c.error("[GetCertLogonToken] resource not found"), g.reject("resourceURL not found")), j) try {
					var r = location.href.split("/");
					r[r.lastIndexOf("index.html")] = "sso.html", k = r.join("/");
					var s = b.getUPN();
					if ("" !== s) {
						c.log("Acquiring SSO token for " + s);
						var t = m(i.clientID, i.resourceUrl, s, j, "&scope=logon_cert");
						a.connectionSettings.ADFSUserName = s,
							function (a, b) {
								c.log("Starting acquire SSO token");
								try {
									var d = document.createElement("iframe");
									d.setAttribute("aria-hidden", "true"), d.setAttribute("tabindex", "-1"), d.style.visibility = "hidden", d.style.position = "absolute", d.style.width = d.style.height = d.borderWidth = "0px", d.src = a, d.onload = function () {
										try {
											var e = d.contentWindow.location;
											o(e)
										} catch (d) {
											c.warn("[GetCertLogonToken] " + d), c.log("Trying popup mode");
											var f = a.replace("&prompt=none", "&prompt=select_account");
											q(f, b)
										}
									};
									document.getElementsByTagName("body")[0].appendChild(d)
								} catch (a) {
									c.error("[GetCertLogonToken] " + a), g.reject(a)
								}
							}(t, k)
					} else c.warn("[GetCertLogonToken] User name not retrieved"), g.reject("User name not found for SSO")
				} catch (a) {
					c.error("[GetCertLogonToken] " + a), g.reject(a)
				} else c.error("[GetCertLogonToken] GatewayCertLogonAuthority not found"), g.reject("GatewayCertLogonAuthority not found");
				return g.promise
			}, g
		};
		angular.module("rdStandalone").factory("rdStandaloneCertLogonTokenService", ["rdStandaloneConfigParameters", "userAuthInfoService", "logger", "$q", "$uibModal", "$timeout", a])
	}(),
	function () {
		var a = function () {
			var a = {
				getDiscoveryUrl: function () {
					return DeploymentSettings && DeploymentSettings.multiTenantConfig && DeploymentSettings.multiTenantConfig.discoveryUrl
				},
				getAuthConfig: function () {
					var a = DeploymentSettings && DeploymentSettings.multiTenantConfig && DeploymentSettings.multiTenantConfig.authConfig;
					return {
						authority: a && a.authority,
						clientID: a && a.clientID,
						resourceUrl: a && a.resourceUrl
					}
				},
				$get: function () {
					return {
						getDiscoveryUrl: a.getDiscoveryUrl,
						getAuthConfig: a.getAuthConfig
					}
				}
			};
			return a
		};
		angular.module("rdStandalone").provider("rdStandaloneConfigParameters", a)
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g) {
			var h, i, j, k = [],
				l = null,
				m = null,
				n = function () {
					h = a.getDebuggingEventInfoAndToken(), i = h.debuggingLogUploadUrl, j = h.debuggingLogSaSToken
				},
				o = function () {
					if (n(), k.length > 0 && j) {
						null === m && (m = k[0]);
						var a = {
							method: "POST",
							headers: {
								Authorization: j,
								"Content-Type": "application/atom+xml;type=entry;charset=utf-8",
								"X-MS-User-Agent": f.clientUserAgent
							}
						};
						c.post(i, k[0], a).then(function () {
							k.shift(), l = d(o)
						}, function (a) {
							if (e.error("Debugging logs upload failed, reason:" + JSON.stringify(a)), a && a.status) switch (a.status) {
								case 429:
									e.warn("Too many request to the server"), a.headers && a.headers("retry-after") ? (l = d(o, 1e3 * a.headers("retry-after")), e.log("Will retry debugging log upload after " + a.headers("retry-after") + " seconds")) : (e.error("Retry-After attribute is missing from the throtting request"), l = d(o, 5e4));
									break;
								case 400:
									e.warn("Discarding an event that has been rejected by the service..."), k.shift(), l = d(o, 5e3);
									break;
								default:
									l = d(o, 5e3)
							} else l = d(o, 5e3)
						})
					} else l = null
				},
				p = function (a) {
					n();
					try {
						for (; k.length > 0;) {
							var b = new XMLHttpRequest;
							b.open("POST", i, a), b.withCredentials = !0, b.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), b.setRequestHeader("Accept", "application/json, text/plain, */*"), b.setRequestHeader("Authorization", j), b.setRequestHeader("X-MS-User-Agent", f.clientUserAgent), b.send(JSON.stringify(k[0])), k.shift()
						}
					} catch (b) {
						e.warn("Could not send the debugging events synchronously: " + b), !1 === a && p(!0)
					}
				},
				q = function (a) {
					if (k.length >= 1e3) {
						var b = k[k.length - 1];
						if ("BufferFull" !== b.TaskName) {
							var c = new DebugInfo;
							c.ClientInstance = b.clientVersion, c.ClientOS = b.ClientOS, c.Level = 4, c.TaskName = "BufferFull", c.ChannelName = "RDWebClient", c.ActivityId = b.ActivityId, c.Msg = "pending events buffer is full, unable to upload more messages", c.Ex = "", k.push(c)
						}
					} else k.push(a);
					l || (l = d(o))
				};
			return window.addEventListener("beforeunload", function () {
				var a = g.getAllCurrentActivityIds();
				if (m)
					for (var b = 0; b < a.length; b++) {
						var c = new DebugInfo;
						c.ClientInstance = m.clientVersion, c.ClientOS = m.ClientOS, c.Level = 3, c.TaskName = "BeforeUnload", c.ChannelName = "RDWebClient", c.ActivityId = a[b], c.Msg = "The browser window is unloading", c.Ex = "", k.push(c)
					}
				p(!1)
			}), {
				debuggingEvent: q
			}
		};
		angular.module("rdStandalone").service("rdDebuggingEventUpload", ["rdDebuggingEventUploadSaSTokenManager", "$rootScope", "$http", "$timeout", "logger", "platformInfo", "rdStandaloneActivityHintLookup", a])
	}(),
	function () {
		function a(a, b, c, d, e) {
			var f = d.clientOS + " " + d.clientOSVersion + " " + d.browserName + " " + d.browserVersion,
				g = function (a) {
					switch (a) {
						case "Exception":
							return 101;
						case "connect":
							return 102;
						case "disconnect":
							return 103;
						case "SSOToken":
							return 104;
						case "launchConnectionFromURLParams":
							return 105;
						case "onClientEvent":
							return 106;
						case "FeedDiscovery":
							return 201;
						case "GetWorkspace":
							return 202;
						case "GetRDPFile":
							return 203;
						case "GetIconFile":
							return 204
					}
					return 300
				};
			return {
				onRdCoreDebuggingEvent: function (b, c, g, h) {
					var i = new DebugInfo;
					i.ClientInstance = d.clientVersion, i.ClientOS = f, i.Level = h, i.TaskName = c, i.ChannelName = "RDCoreHTML", i.ActivityId = b, i.Msg = g, i.Ex = "", i.EventId = 100, a.debuggingEvent(i), e.log("Core telemetry event: eventName=" + c + ", traceMessage=" + g)
				},
				onException: function (b, c) {
					var h = new DebugInfo;
					h.ClientInstance = d.clientVersion, h.ClientOS = f, h.Level = 2, h.TaskName = "Exception", h.ChannelName = "RDCoreHTML", h.ActivityId = b, h.Msg = "", h.Ex = c, h.ClientInstance = d.clientVersion, h.EventId = g(h.TaskName), a.debuggingEvent(h), e.log("exceptioncaught" + c + h)
				},
				onConnected: function (b) {
					var c = new DebugInfo;
					c.ClientInstance = d.clientVersion, c.ClientOS = f, c.Level = 4, c.TaskName = "connect", c.ChannelName = "RDHTML", c.ActivityId = b.id, c.Msg = "", c.Ex = "", c.EventId = g(c.TaskName), a.debuggingEvent(c)
				},
				onDisconnected: function (b, c) {
					var e = new DebugInfo;
					e.ClientInstance = d.clientVersion, e.ClientOS = f, e.Level = 4, e.TaskName = "disconnect", e.ChannelName = "RDHTML", e.ActivityId = b, e.Msg = Module.GetDisconnectCodeString(c.code), e.Ex = "", e.EventId = g(e.TaskName), a.debuggingEvent(e)
				},
				onFeedStart: function (b, c) {
					var e = new DebugInfo;
					e.ClientInstance = d.clientVersion, e.ClientOS = f, e.Level = 4, e.TaskName = c, e.ChannelName = "RDHTML", e.ActivityId = b, e.Msg = "Start", e.Ex = "", e.EventId = g(e.TaskName), a.debuggingEvent(e)
				},
				onFeedSuccess: function (b, c) {
					var e = new DebugInfo;
					e.ClientInstance = d.clientVersion, e.ClientOS = f, e.Level = 4, e.TaskName = c, e.ChannelName = "RDHTML", e.ActivityId = b, e.Msg = "Success", e.Ex = "", e.EventId = g(e.TaskName), a.debuggingEvent(e)
				},
				onFeedFailure: function (b, c, e) {
					var h = new DebugInfo;
					h.ClientInstance = d.clientVersion, h.ClientOS = f, h.Level = 2, h.TaskName = c, h.ChannelName = "RDHTML", h.ActivityId = b, h.Msg = e, h.Ex = "", h.EventId = g(h.TaskName), a.debuggingEvent(h)
				},
				onFeedResourceDownloadFailure: function (b, c, e) {
					var h = new DebugInfo;
					h.ClientInstance = d.clientVersion, h.ClientOS = f, h.Level = 3, h.TaskName = c, h.ChannelName = "RDHTML", h.ActivityId = b, h.Msg = e, h.Ex = "", h.EventId = g(h.TaskName), a.debuggingEvent(h)
				},
				onSSOTokenRetrievalStarted: function (b) {
					var c = new DebugInfo;
					c.ClientInstance = d.clientVersion, c.ClientOS = f, c.Level = 4, c.TaskName = "SSOToken", c.ChannelName = "RDHTML", c.ActivityId = b, c.Msg = "Start", c.Ex = "", c.EventId = g(c.TaskName), a.debuggingEvent(c)
				},
				onSSOTokenRetrievalSuccess: function (b) {
					var c = new DebugInfo;
					c.ClientInstance = d.clientVersion, c.ClientOS = f, c.Level = 4, c.TaskName = "SSOToken", c.ChannelName = "RDHTML", c.ActivityId = b, c.Msg = "Success", c.Ex = "", c.EventId = g(c.TaskName), a.debuggingEvent(c)
				},
				onSSOTokenRetrievalFailed: function (b, c) {
					var e = new DebugInfo;
					e.ClientInstance = d.clientVersion, e.ClientOS = f, e.Level = 3, e.TaskName = "SSOToken", e.ChannelName = "RDHTML", e.ActivityId = b, e.Msg = c, e.Ex = "", e.EventId = g(e.TaskName), a.debuggingEvent(e)
				},
				onClientOperation: function (b, c, e, h) {
					var i = new DebugInfo;
					i.ClientInstance = d.clientVersion, i.ClientOS = f, i.Level = h, i.TaskName = c, i.ChannelName = "ClientOperation", i.ActivityId = b, i.Msg = e, i.Ex = "", i.EventId = g(i.TaskName), a.debuggingEvent(i)
				},
				onClientEvent: function (b, c, e, h) {
					var i = new DebugInfo;
					i.ClientInstance = d.clientVersion, i.ClientOS = f, i.Level = h, i.TaskName = c, i.ChannelName = "RDHTML", i.ActivityId = b, i.Msg = e, i.Ex = "", i.EventId = g(i.TaskName), a.debuggingEvent(i)
				}
			}
		}
		angular.module("rdStandalone").factory("rdDebuggingEvents", ["rdDebuggingEventUpload", "userAuthInfoService", "$location", "platformInfo", "logger", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g) {
			var h, i, j = [],
				k = null,
				l = e.getDiscoveryUrl();
			h = -1 !== l.search("api/arm/feeddiscovery") ? "/api/arm/diagnosticevents/v1/" : "/api/diagnosticevents/v1/";
			try {
				i = new URL(h, l).href
			} catch (a) {
				d.error("Exception: " + a.message), d.error("Invalid diagnostics URL. Diagnostic events will not be sent.")
			}
			var m = function () {
					if (j.length > 0) {
						var a = j[0].Attributes.ActivityId,
							e = g.getActivityHintForCorrelationID(a),
							h = {
								withCredentials: !0,
								headers: {
									"X-MS-User-Agent": f.clientUserAgent,
									"x-ms-correlation-id": a,
									"MS-WVD-Activity-Hint": e
								}
							};
						b.post(i, j[0], h).then(function () {
							"Final" === j[0].Attributes.Type && g.deleteCorrelationIDKey(j[0].Attributes.ActivityId), j.shift(), k = c(m)
						}, function (a) {
							if (d.error("Diagnostics upload failed, reason:" + JSON.stringify(a)), a && a.status) switch (a.status) {
								case 429:
									d.warn("Too many request to the server"), a.headers && a.headers("retry-after") ? (k = c(m, 1e3 * a.headers("retry-after")), d.log("Will retry diagnostic upload after " + a.headers("retry-after") + " seconds")) : (d.error("Retry-After attribute is missing from the throtting request"), k = c(m, 5e4));
									break;
								case 400:
									d.warn("Discarding an event that has been rejected by the service..."), j.shift(), k = c(m, 5e3);
									break;
								default:
									k = c(m, 5e3)
							} else k = c(m, 5e3)
						})
					} else k = null
				},
				n = function (a) {
					try {
						for (; j.length > 0;) {
							var b = j[0].Attributes.ActivityId,
								c = g.getActivityHintForCorrelationID(b),
								e = new XMLHttpRequest;
							e.open("POST", i, a), e.withCredentials = !0, e.setRequestHeader("X-MS-User-Agent", f.clientUserAgent), e.setRequestHeader("x-ms-correlation-id", b), e.setRequestHeader("MS-WVD-Activity-Hint", c), e.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), e.setRequestHeader("Accept", "application/json, text/plain, */*"), e.send(JSON.stringify(j[0])), j.shift()
						}
					} catch (b) {
						!1 === a && (d.warn("Could not send the diagnotics events synchronously will try synchronously: " + b), n(!0))
					}
				},
				o = function (a, b) {
					b = b || !1, i && (j.push(a), !1 === b ? k || (k = c(m)) : n(!1))
				};
			return window.addEventListener("beforeunload", function () {
				n(!1)
			}), {
				triggerEvent: o
			}
		};
		angular.module("rdStandalone").service("rdDiagnosticsUpload", ["$rootScope", "$http", "$timeout", "logger", "rdStandaloneConfigParameters", "platformInfo", "rdStandaloneActivityHintLookup", a])
	}(),
	function () {
		function a(a, b, c, d, e) {
			var f = d.clientOS + " " + d.clientOSVersion + " " + d.browserName + " " + d.browserVersion,
				g = d.browserName,
				h = d.browserVersion,
				i = function (a) {
					return a === Module.DisconnectCode.ConnectionBroken.value || a === Module.DisconnectCode.ConnectionBrokenMissedHeartbeatThresholdExceeded.value || a === Module.DisconnectCode.ConnectionTimeout.value || a === Module.DisconnectCode.DecompressionFailed.value || a === Module.DisconnectCode.EncryptionFailed.value || a === Module.DisconnectCode.GenericNetworkError.value || a === Module.DisconnectCode.GenericProtocolError.value || a === Module.DisconnectCode.PipelineDecodeError.value || a === Module.DisconnectCode.GenericSecurityError.value || a === Module.DisconnectCode.GatewayProtocolError.value || a === Module.DisconnectCode.OrchestrationFailed.value || a === Module.DisconnectCode.SocketConnectionFailed.value || a === Module.DisconnectCode.NoLogonServers.value || a === Module.DisconnectCode.TrustedRelationshipFailure.value || a === Module.DisconnectCode.AuthenticationFirewallFailed.value || a === Module.DisconnectCode.SecEUnsuportedFunction.value || a === Module.DisconnectCode.NoSuchAuthPackage.value || a === Module.DisconnectCode.InvalidLogonHours.value || a === Module.DisconnectCode.NoSuchAuthPackage.value || a === Module.DisconnectCode.LogonTypeNotGranted.value || a === Module.DisconnectCode.AccountLockedOut.value || a === Module.DisconnectCode.PasswordExpired.value || a === Module.DisconnectCode.OutOfMemory.value || a === Module.DisconnectCode.PasswordMustChange.value || a === Module.DisconnectCode.AccountExpired.value || a === Module.DisconnectCode.AccountDisabled.value || a === Module.DisconnectCode.ServerDeniedConnection.value || a === Module.DisconnectCode.AccountRestricted.value || a === Module.DisconnectCode.OrchestrationNoGatewayResponse.value || a === Module.DisconnectCode.SessionHostResourceNotAvailable.value || a === Module.DisconnectCode.WebWorkerError.value || a === Module.DisconnectCode.UnknownError.value
				},
				j = function (a) {
					return a === Module.DisconnectCode.UserInitiated.value || a === Module.DisconnectCode.ServerTool.value || a === Module.DisconnectCode.IdleTimeout.value || a === Module.DisconnectCode.LogonTimeout.value || a === Module.DisconnectCode.ReplacedByOtherConnection.value || a === Module.DisconnectCode.ServerOutOfMemory.value || a === Module.DisconnectCode.ServerDeniedConnection.value || a === Module.DisconnectCode.ServerInsufficientPrivileges.value || a === Module.DisconnectCode.GenericLicenseError.value || a === Module.DisconnectCode.FreshCredsRequired.value || a === Module.DisconnectCode.NoLicenseServer.value || a === Module.DisconnectCode.NoLicenseAvailable.value || a === Module.DisconnectCode.InvalidLicense.value || a === Module.DisconnectCode.CantUpgradeLicense.value || a === Module.DisconnectCode.NoRemoteConnectionLicense.value || a === Module.DisconnectCode.OrchestrationResourceNotAvailableError.value || a === Module.DisconnectCode.GenericNetworkError.value || a === Module.DisconnectCode.ConnectionBroken.value || a === Module.DisconnectCode.ConnectionBrokenMissedHeartbeatThresholdExceeded.value || a === Module.DisconnectCode.WebsocketNormalDisconnect.value || a === Module.DisconnectCode.SocketConnectionFailed.value || a === Module.DisconnectCode.LogonFailed.value || a === Module.DisconnectCode.InvalidLogonHours.value || a === Module.DisconnectCode.LogonTypeNotGranted.value || a === Module.DisconnectCode.AccountLockedOut.value || a === Module.DisconnectCode.PasswordExpired.value || a === Module.DisconnectCode.GenericByServer.value || a === Module.DisconnectCode.PasswordMustChange.value || a === Module.DisconnectCode.AccountExpired.value || a === Module.DisconnectCode.AccountDisabled.value || a === Module.DisconnectCode.AccountRestricted.value || a === Module.DisconnectCode.OutOfMemory.value || a === Module.DisconnectCode.OrchestrationNoGatewayResponse.value || a === Module.DisconnectCode.OrchestrationResponseError.value || a === Module.DisconnectCode.SessionHostResourceNotAvailable.value || a === Module.DisconnectCode.AutoReconnectFailed.value || a === Module.DisconnectCode.RdsTlsSSOFailed.value || a === Module.DisconnectCode.ScreenCaptureProtectNotSupported.value
				},
				k = function (a, b) {
					switch (a) {
						case Module.DisconnectCode.SessionHostResourceNotAvailable.value:
							return "There are no remote resources available.";
						case Module.DisconnectCode.UserInitiated.value:
							return "User initiated the disconnect";
						case Module.DisconnectCode.ServerTool.value:
							return "Remote machine initiated disconnect";
						case Module.DisconnectCode.IdleTimeout.value:
							return "The connection was closed due to inactivity";
						case Module.DisconnectCode.LogonTimeout.value:
							return "The connection was closed due to inactivity during login";
						case Module.DisconnectCode.ReplacedByOtherConnection.value:
							return "Connected closed when another connection was started";
						case Module.DisconnectCode.ServerOutOfMemory.value:
							return "Server is out of memory";
						case Module.DisconnectCode.ServerDeniedConnection.value:
							return "Server denied the connection request";
						case Module.DisconnectCode.ServerInsufficientPrivileges.value:
							return "The user does not have privileges on the server to perform this operation";
						case Module.DisconnectCode.FreshCredsRequired.value:
							return "The user has to provide fresh credentials at logon, saved credentials cannot be used.";
						case Module.DisconnectCode.NoLicenseServer.value:
							return "License server not found.";
						case Module.DisconnectCode.NoLicenseAvailable.value:
							return "No license available for the user.";
						case Module.DisconnectCode.InvalidLicense.value:
							return "The license supplied is invalid.";
						case Module.DisconnectCode.CantUpgradeLicense.value:
							return "The requested license is not available.";
						case Module.DisconnectCode.NoRemoteConnectionLicense.value:
							return "No remote connection license available.";
						case Module.DisconnectCode.OrchestrationResponseError.value:
						case Module.DisconnectCode.OrchestrationResourceNotAvailableError.value:
							return "Orchestration failed, check RDBroker errors for more information.";
						case Module.DisconnectCode.GenericNetworkError.value:
							return "Network connection issue.";
						case Module.DisconnectCode.WebsocketNormalDisconnect.value:
							return "Connection was disconnected by gateway with status code 1000";
						case Module.DisconnectCode.LogonFailed.value:
							return "The user failed to authenticate to session host.";
						case Module.DisconnectCode.AutoReconnectFailed.value:
							return "Auto reconnect attempt rejected by server. Fresh credentials are needed";
						case Module.DisconnectCode.PasswordExpired.value:
							return "The user's password has expired";
						case Module.DisconnectCode.RdsTlsSSOFailed.value:
							return "The SSO token from ADFS could not be used to authenticate.";
						case Module.DisconnectCode.ScreenCaptureProtectNotSupported.value:
							return "Screen Capture Protection was enabled for resource but not supported by this client.";
						case Module.DisconnectCode.AccountDisabled.value:
							return "The user account is disabled";
						case Module.DisconnectCode.AccountExpired.value:
							return "The user's account has expired";
						case Module.DisconnectCode.AccountLockedOut.value:
							return "The user account is locked out by the session host.";
						case Module.DisconnectCode.AccountRestricted.value:
							return "User account access is restricted";
						case Module.DisconnectCode.ConnectionBroken.value:
							return "Client network connection to the Windows Virtual Desktop service was lost";
						case Module.DisconnectCode.ConnectionBrokenMissedHeartbeatThresholdExceeded.value:
							return "The connection was closed as the client stopped receiving heartbeats from the session host.";
						case Module.DisconnectCode.InvalidLogonHours.value:
							return "The user tried to logon during invalid logon hours.";
						case Module.DisconnectCode.LogonTypeNotGranted.value:
							return "The user is not granted interactive logon on the session host.";
						case Module.DisconnectCode.OrchestrationNoGatewayResponse.value:
							return "The client network connection to the Windows Virtual Desktop  service was lost";
						case Module.DisconnectCode.OutOfMemory.value:
							return "The client failed to allocate resources. Check that the computer where the client process is running is healthy and has memory available.";
						case Module.DisconnectCode.PasswordMustChange.value:
							return "The user has to change the password";
						case Module.DisconnectCode.SocketConnectionFailed.value:
							return "The client cannot establish a connection to the Windows Virtual Desktop service";
						default:
							return b
					}
				},
				l = function (a) {
					var b = "ClientRDPConnect";
					return a !== Module.DisconnectCode.OrchestrationResponseError.value && a !== Module.DisconnectCode.OrchestrationFailed.value && a !== Module.DisconnectCode.OrchestrationResourceNotAvailableError.value && a !== Module.DisconnectCode.OrchestrationNoGatewayResponse.value && a !== Module.DisconnectCode.LogonFailed.value || (b = "ClientOrchestration"), b
				},
				m = function (a) {
					return {
						Attributes: {
							Type: a,
							Timestamp: (new Date).toISOString(),
							Component: "Client",
							RoleInstance: "rdwebclient"
						}
					}
				},
				n = {
					triggerFeedStartEvent: function (c, i) {
						e.setActivityHintForCorrelationID(c, "ms-wvd-ws:" + i);
						var j = new m("Start");
						j.Attributes.ActivityType = "Feed", j.Attributes.UserName = b.getUPN(), j.Attributes.ActivityId = c, j.Attributes.ClientType = "HTML", j.Attributes.ClientVersion = d.clientVersion, j.Attributes.ClientOS = f, j.Attributes.PlatformName = g, j.Attributes.PlatformVersion = h, j.Attributes.ActivityHint = e.getActivityHintForCorrelationID(c), a.triggerEvent(j)
					},
					triggerFeedSuccessEvent: function (b, c, d, f) {
						f = f || !1;
						var g = new m("Final");
						g.Attributes.ActivityType = "Feed", g.Attributes.ActivityId = b, g.Attributes.ActivityHint = e.getActivityHintForCorrelationID(b), c && (g.Attributes.RDPTotal = c.total, g.Attributes.RDPDownload = c.download, g.Attributes.RDPFail = c.failed, g.Attributes.RDPCache = c.cache), d && (g.Attributes.IconTotal = d.total, g.Attributes.IconDownload = d.download, g.Attributes.IconFail = d.failed, g.Attributes.IconCache = d.cache), a.triggerEvent(g, f)
					},
					triggerFeedFailedEvent: function (b, c, d, f, g) {
						g = g || !1;
						var h = new m("Final");
						h.Attributes.ActivityType = "Feed", h.Attributes.ActivityId = c, h.Attributes.ActivityHint = e.getActivityHintForCorrelationID(c), d && (h.Attributes.RDPTotal = d.total, h.Attributes.RDPDownload = d.download, h.Attributes.RDPFail = d.failed, h.Attributes.RDPCache = d.cache), f && (h.Attributes.IconTotal = f.total, h.Attributes.IconDownload = f.download, h.Attributes.IconFail = f.failed, h.Attributes.IconCache = f.cache), b && (h.Attributes.ErrorSource = b.errorSource, h.Attributes.ErrorOperation = b.errorOperation, h.Attributes.ErrorCode = b.errorCode, h.Attributes.ErrorCodeSymbolic = b.errorCodeSymbolic, h.Attributes.ErrorMessage = b.errorMessage, h.Attributes.ErrorInternal = !0), a.triggerEvent(h, g)
					},
					triggerConnectionStartEvent: function (c) {
						var i = c.correlationId.ToString();
						e.setActivityHintForCorrelationID(i, "ms-wvd-hp:" + c.hostPoolId);
						var j = new m("Start");
						j.Attributes.ActivityHint = e.getActivityHintForCorrelationID(i), j.Attributes.ActivityType = "Connection", j.Attributes.UserName = b.getUPN(), j.Attributes.ActivityId = i, j.Attributes.ClientType = "HTML", j.Attributes.ClientVersion = d.clientVersion, j.Attributes.ClientOS = f, j.Attributes.PlatformName = g, j.Attributes.PlatformVersion = h, c.lastSuccessConnectionId && (j.Attributes.PredecessorConnectionId = c.lastSuccessConnectionId), a.triggerEvent(j)
					},
					triggerConnectionOnClientDisconnectedEvent: function (b, c) {
						c = c || !1;
						var d = new m("Checkpoint"),
							f = b.correlationId.ToString();
						d.Attributes.ActivityType = "Connection", d.Attributes.ActivityId = f, d.Attributes.CheckpointName = "OnClientDisconnected", d.Attributes.ActivityHint = e.getActivityHintForCorrelationID(f);
						var g = Module.GetDisconnectCodeString(b.disconnectReason.code);
						d.Attributes.DisconnectOperation = l(b.disconnectReason.code.value), d.Attributes.DisconnectCode = b.disconnectReason.code.value, d.Attributes.DisconnectCodeSymbolic = g, d.Attributes.DisconnectMessage = k(b.disconnectReason.code.value, g), a.triggerEvent(d, c)
					},
					triggerConnectionEndEvent: function (b, c) {
						c = c || !1;
						var d = new m("Final");
						if (d.Attributes.ActivityType = "Connection", i(b.disconnectReason.code.value)) {
							var f = Module.GetDisconnectCodeString(b.disconnectReason.code);
							d.Attributes.ErrorSource = "Client", d.Attributes.ErrorOperation = l(b.disconnectReason.code.value), d.Attributes.ErrorCode = b.disconnectReason.code.value, d.Attributes.ErrorCodeSymbolic = f, d.Attributes.ErrorMessage = k(b.disconnectReason.code.value, f), d.Attributes.ErrorInternal = !j(b.disconnectReason.code.value)
						}
						var g = b.correlationId.ToString();
						d.Attributes.ActivityId = g, d.Attributes.ActivityHint = e.getActivityHintForCorrelationID(g), a.triggerEvent(d, c), n.triggerConnectionOnClientDisconnectedEvent(b, c)
					},
					triggerConnectionCheckPointEvent: function (b, c, d, f) {
						f = f || !1;
						var g = new m("Checkpoint");
						g.Attributes.ActivityType = "Connection";
						var h = b.correlationId.ToString();
						g.Attributes.ActivityId = h, g.Attributes.ActivityHint = e.getActivityHintForCorrelationID(h), g.Attributes.CheckpointName = c, d && (g.Attributes.AppName = d), a.triggerEvent(g, f)
					},
					triggerSSOTokenRetrievalEvent: function (b, c, d, f) {
						var g = new m("Checkpoint");
						g.Attributes.ActivityType = "Connection";
						var h = b.correlationId.ToString();
						g.Attributes.ActivityId = h, g.Attributes.ActivityHint = e.getActivityHintForCorrelationID(h), g.Attributes.CheckpointName = "SSOTokenRetrieval", g.Attributes.TokenObtained = c, g.Attributes.DurationMs = d, f && (g.Attributes.Message = f), a.triggerEvent(g, !1)
					},
					triggerSSOAuthenticationCompletedEvent: function (b, c, d, f) {
						var g = new m("Checkpoint");
						g.Attributes.ActivityType = "Connection";
						var h = b.correlationId.ToString();
						g.Attributes.ActivityId = h, g.Attributes.ActivityHint = e.getActivityHintForCorrelationID(h), g.Attributes.CheckpointName = "SSOAuthenticationCompleted", g.Attributes.TokenValidated = c, g.Attributes.AuthSuccess = d, f && (g.Attributes.Message = f), a.triggerEvent(g, !1)
					}
				};
			return n
		}
		angular.module("rdStandalone").factory("rdDiagnostics", ["rdDiagnosticsUpload", "userAuthInfoService", "$location", "platformInfo", "rdStandaloneActivityHintLookup", a])
	}(),
	function () {
		var a = function (a, b, c) {
			var d = function () {
					this.displayName = "", this.feedURL = ""
				},
				e = function (a) {
					function b(a, b) {
						const c = a._TenantDisplayName.toUpperCase(),
							d = b._TenantDisplayName.toUpperCase();
						var e = 0;
						return c > d ? e = 1 : d > c && (e = -1), e
					}
					var c = [],
						e = new X2JS,
						f = e.xml_str2json(a),
						g = e.asArray(f.TenantFeedURLs.TenantFeedURL);
					g.sort(b);
					var h, i;
					for (i = 0; i < g.length; i++) h = new d, h.displayName = g[i]._TenantDisplayName, h.feedURL = g[i]._FeedURL, h.tenantID = g[i]._TenantId, c.push(h);
					return c
				};
			return {
				getFeedInfo: function (d, f) {
					var g = a.defer(),
						h = {
							withCredentials: !0,
							headers: {
								Accept: "application/x-msts-radc-discovery+xml,text/xml",
								"x-ms-correlation-id": f,
								"X-MS-User-Agent": c.clientUserAgent
							}
						},
						i = function (a) {
							b.get(d, h).then(function (a) {
								try {
									g.resolve(e(a.data))
								} catch (a) {
									g.reject("Discovery feed processing failed!")
								}
							}, function (b) {
								401 !== b.status || a ? g.reject(b) : i(!0)
							})
						};
					return i(!1), g.promise
				}
			}
		};
		angular.module("rdStandalone").factory("rdStandaloneFeedDiscoverer", ["$q", "$http", "platformInfo", a])
	}(),
	function () {
		function a(a, b, c, d, e) {
			return {
				getWorkspace: function (f, g) {
					var h = a.defer(),
						i = e.getActivityHintForCorrelationID(g),
						j = {
							withCredentials: !0,
							headers: {
								Accept: "application/x-msts-radc+xml;radc_schema_version=2.0,text/xml",
								"x-ms-correlation-id": g,
								"X-MS-User-Agent": d.clientUserAgent,
								"MS-WVD-Activity-Hint": i
							}
						};
					return b.get(f, j).then(function (a) {
						200 !== a.status && h.reject("Unexpected HTTP status: " + a.status);
						try {
							h.resolve(c.parseWorkspaceFeed(a.data))
						} catch (a) {
							h.reject("Web feed processing failed!")
						}
					}, function (a) {
						h.reject(a)
					}), h.promise
				}
			}
		}
		angular.module("rdStandalone").factory("rdStandaloneFeedRetriever", ["$q", "$http", "feedParser", "platformInfo", "rdStandaloneActivityHintLookup", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
			var o, p = new FeedData;
			p.multiTenant = !0;
			var q, r, s = {},
				t = {},
				u = !1,
				v = null,
				w = [],
				x = new Map,
				y = function (a, b, c) {
					return this.errorMessage = a, this.errorCode = b, this.errorCodeSym = c, this
				},
				z = new y("Icon or RDP file download failed", 201, "ICON_REQUEST_FAIL"),
				A = !0,
				B = function (a) {
					return !(403 === a || 429 === a)
				},
				C = function (a) {
					return A && B(a)
				},
				D = function () {
					t = {}, A = !0, v = Module.CorrelationID.CreateRandomCorrelationID(), x = new Map
				},
				E = function (a) {
					var b = JSON.stringify(a);
					return b.indexOf("Bearer") > 0 ? b.substr(0, b.indexOf("Bearer")) + "Bearer:(Redacted Credential)" + b.substr(b.indexOf("}", b.indexOf("Bearer"))) : b
				},
				F = null,
				G = function () {
					for (var a = 0; a < F.length; a++)
						if (x.has(w[a]) && !1 !== F[a].workspaceRequestSuccessful && F[a].iconCounts.total === F[a].iconCounts.download + F[a].iconCounts.failed && F[a].rdpCounts.total === F[a].rdpCounts.download + F[a].rdpCounts.failed)
							if (x.delete(w[a]), k && 0 === F[a].iconCounts.failed && 0 === F[a].rdpCounts.failed) k.triggerFeedSuccessEvent(w[a], F[a].rdpCounts, F[a].iconCounts);
							else {
								var b = new ErrorInfo("GetTenantResource", z.errorCode, z.errorCodeSym, z.errorMessage);
								k.triggerFeedFailedEvent(b, w[a], F[a].rdpCounts, F[a].iconCounts)
							}
				},
				H = function () {
					var a, c = !0,
						d = !1,
						e = !0,
						f = [],
						g = new FeedCounts(0, 0, 0),
						h = new FeedCounts(0, 0, 0);
					for (a = 0; a < F.length; a += 1) F[a].loaded && F[a].workspace && f.push(F[a].workspace), e = e && (F[a].loaded || F[a].failed), d = d || F[a].failed, c = c && F[a].loaded, g.total += F[a].iconCounts.total, g.download += F[a].iconCounts.download, g.failed += F[a].iconCounts.failed, h.total += F[a].rdpCounts.total, h.download += F[a].rdpCounts.download, h.failed += F[a].rdpCounts.failed;
					G(), c && (p.workspaces = f, p.loading = !1, p.loadFailed = !1, s = t, g.total === g.download + g.failed && h.total === h.download + h.failed && (b.$broadcast("rdFeedTracker:feedsLoaded", p), q())), d && p.loading && (p.loadFailed = !0), d && e && r()
				},
				I = function (c, d, f, g) {
					var h = n.getActivityHintForCorrelationID(g),
						i = {
							withCredentials: !0,
							responseType: "blob",
							headers: {
								"x-ms-correlation-id": g,
								"X-MS-User-Agent": m.clientUserAgent,
								"MS-WVD-Activity-Hint": h
							}
						};
					a.get(d, i).then(function (a) {
						f.iconCounts.download += 1;
						var e = new FileReader;
						e.addEventListener("load", function () {
							b.$apply(function () {
								c.thumbnail = e.result, t[d] = e.result
							})
						}), e.readAsDataURL(a.data), H()
					}, function (a) {
						if (l && l.onFeedResourceDownloadFailure(g, "GetIconFile", E(a)), z.errorMessage = "Icon retrieval failed," + E(a), z.errorCode = a.status, z.errorCodeSym = "ICON_REQUEST_FAIL", e.log(z.errorMessage), f.iconCounts.failed += 1, !0 === x.get(g)) {
							x.set(g, !1);
							var b = new ErrorInfo("GetTenantResource", z.errorCode, z.errorCodeSym, z.errorMessage);
							k.triggerFeedFailedEvent(b, g, new FeedCountswithCache(0, 0, 0, 0), new FeedCountswithCache(0, 0, 0, 0))
						}
						H()
					})
				},
				J = function (b, c, d) {
					var f = n.getActivityHintForCorrelationID(d),
						g = {
							withCredentials: !0,
							headers: {
								"x-ms-correlation-id": d,
								"X-MS-User-Agent": m.clientUserAgent,
								"MS-WVD-Activity-Hint": f
							}
						};
					a.get(b.rdpFileURL, g).then(function (a) {
						b.rdpFileString = a.data, c.rdpCounts.download += 1, H()
					}, function (a) {
						if (l && l.onFeedResourceDownloadFailure(d, "GetRDPFile", E(a)), z.errorMessage = "RDP file retrieval failed," + E(a), z.errorCode = a.status, z.errorCodeSym = "RDPFILE_REQUEST_FAIL", e.log(z.errorMessage), c.rdpCounts.failed += 1, !0 === x.get(d)) {
							x.set(d, !1);
							var b = new ErrorInfo("GetTenantResource", z.errorCode, z.errorCodeSym, z.errorMessage);
							k.triggerFeedFailedEvent(b, d, new FeedCountswithCache(0, 0, 0, 0), new FeedCountswithCache(0, 0, 0, 0))
						}
						H()
					})
				},
				K = function (a, b) {
					k && k.triggerFeedStartEvent(b, a.tenantID), l && l.onFeedStart(b, "GetWorkspace"), i.getWorkspace(a.feedURL, b).then(function (c) {
						e.log("Successfully retrieved tenant resources");
						var d, f;
						for (c.url = a.feedURL, a.rdpCounts.total = c.bookmarks.length, a.iconCounts.total = a.rdpCounts.total, a.workspaceRequestSuccessful = !0, l && l.onFeedSuccess(b, "GetWorkspace"), d = 0; d < c.bookmarks.length; d++) c.bookmarks[d].multiTenantMode = !0, c.bookmarks[d].tenantId = c.publisherId, f = c.bookmarks[d].thumbnail, s.hasOwnProperty(f) ? c.bookmarks[d].thumbnail = s[f] : c.bookmarks[d].thumbnail = "assets/images/defaultIcon.807effe8.png", I(c.bookmarks[d], f, a, b), J(c.bookmarks[d], a, b);
						a.loaded = !0, a.workspace = c, H()
					}, function (c) {
						var d = new y("Feed retrieval failed, reason:" + E(c), c.status, "FEED_REQUEST_FAIL");
						if (e.error(d.errorMessage), a.failed = !0, k) {
							var f = new ErrorInfo("GetTenantXML", d.errorCode, d.errorCodeSym, d.errorMessage);
							k.triggerFeedFailedEvent(f, b, new FeedCountswithCache(0, 0, 0, 0), new FeedCountswithCache(0, 0, 0, 0)), x.has(b) ? x.delete(b) : e.error("Key, " + b + "not found in the List " + x)
						}
						l && l.onFeedFailure(b, "GetWorkspace", E(c)), H()
					})
				},
				L = function () {
					if (!u && j.isAuthenticated() && !LaunchModeSettings.stopFeedDiscovery()) {
						var a = function () {
							D(), l && l.onFeedStart(v.ToString().slice(1, -1), "FeedDiscovery"), h.getFeedInfo(o, v.ToString().slice(1, -1)).then(function (a) {
								if (l && l.onFeedSuccess(v.ToString().slice(1, -1), "FeedDiscovery"), F = a, e.log("Successfully retrieved tenant information"), 0 === F.length) H();
								else
									for (var b = 0; b < F.length; b++) F[b].loaded = !1, F[b].failed = !1, F[b].iconCounts = new FeedCountswithCache(0, 0, 0, 0), F[b].rdpCounts = new FeedCountswithCache(0, 0, 0, 0), F[b].workspaceRequestSuccessful = !1, v.IncrementConnectionID(), w[b] = v.ToString().slice(1, -1), x.set(w[b], !0), K(F[b], w[b])
							}, function (a) {
								a && a.config && a.config.headers && a.config.headers.Authorization && (a.config.headers.Authorization = "<redacted>"), l && l.onFeedFailure(v.ToString().slice(1, -1), "FeedDiscovery", E(a)), e.error("Get tenant list failed, reason:" + JSON.stringify(a)), p.loading && 403 === a.status ? p.loading = !1 : p.loadFailed = !0, B(a.status) || (A = !1), p.numRetry !== f.getFeedRetrivalMaxRetry() && C(a.status) && r(), 429 === a.status && a.headers && a.headers("retry-after") && (r(1e3 * a.headers("retry-after")), e.log("Will retry getFeedInfo upload after " + a.headers("retry-after") + " seconds"))
							}), q = function () {
								p.numRetry = 0, c(a, f.getWorkspaceUpdateInterval())
							}, r = function (b) {
								b = b || f.getRetryInterval(), e.log("Retrying feed retrival, Current Retry count = " + p.numRetry), p.numRetry < f.getFeedRetrivalMaxRetry() ? (c(a, b), p.numRetry++) : p.loading = !1
							}
						};
						u = !0, o = g.getDiscoveryUrl(), o ? a() : (p.loading = !1, p.loadFailed = !0)
					}
				};
			return window.addEventListener("beforeunload", function () {
				if (k)
					for (var a = 0; a < w.length; a++) x.has(w[a]) && k.triggerFeedSuccessEvent(w[a], new FeedCountswithCache(0, 0, 0, 0), new FeedCountswithCache(0, 0, 0, 0), !0)
			}), j.isAuthenticated() ? L() : (b.$on("msal:acquireTokenSuccess", function () {
				L()
			}), b.$on("msal:acquireTokenFailure", function (a, b, c) {
				p.loading && "interaction_required" !== c && "login required" !== c && "login_required" !== c && "access_denied" !== c && (p.loadFailed = !0)
			})), {
				getFeedData: function () {
					return p
				},
				getFeedFile: function (b, c) {
					var f = d.defer(),
						g = Module.CorrelationID.CreateRandomCorrelationID().ToString().slice(1, -1);
					k && !u && (e.debug("[RDFeedTracker] RDP file download correlationID: " + g), k.triggerFeedStartEvent(g, c));
					var h = "ms-wvd-ws:" + c,
						i = {
							withCredentials: !0,
							headers: {
								"X-MS-User-Agent": m.clientUserAgent,
								"MS-WVD-Activity-Hint": h
							}
						};
					return a.get(b, i).then(function (a) {
						var b = a.headers()["content-type"];
						if ("application/x-rdp" === b) {
							var c = a.data;
							if (c) k && !u && k.triggerFeedSuccessEvent(g, new FeedCountswithCache(1, 0, 1, 0), new FeedCountswithCache(0, 0, 0, 0)), f.resolve(c);
							else {
								if (k && !u) {
									var d = new ErrorInfo("GetTenantResource", "50", "RDPFILE_REQUEST_FAIL", "RDP file download failed, reason: RdpFileString returned is empty");
									k.triggerFeedFailedEvent(d, g, new FeedCountswithCache(1, 1, 0, 0), new FeedCountswithCache(0, 0, 0, 0))
								}
								f.reject("Received empty RDPFileString.")
							}
						} else {
							var e = "Received unexpected content-type header for rdp file download: " + b;
							if (k && !u) {
								var h = new ErrorInfo("GetTenantResource", "52", "RDPFILE_REQUEST_FAIL", "RDP file download failed, reason: " + e);
								k.triggerFeedFailedEvent(h, g, new FeedCountswithCache(1, 1, 0, 0), new FeedCountswithCache(0, 0, 0, 0))
							}
							f.reject(e)
						}
					}, function (a) {
						if (k && !u) {
							var b = new ErrorInfo("GetTenantResource", "51", "RDPFILE_REQUEST_FAIL", "RDP file download failed. Status: " + a.status + ". Reason: " + a.statusText);
							k.triggerFeedFailedEvent(b, g, new FeedCountswithCache(1, 1, 0, 0), new FeedCountswithCache(0, 0, 0, 0))
						}
						const c = "Status: " + a.status + ", StatusText: " + a.statusText + ", url: " + a.config.url;
						f.reject(c)
					}), f.promise
				}
			}
		};
		angular.module("rdStandalone").factory("rdFeedTracker", ["$http", "$rootScope", "$timeout", "$q", "logger", "rdCommonRuntimeParameters", "rdStandaloneConfigParameters", "rdStandaloneFeedDiscoverer", "rdStandaloneFeedRetriever", "userAuthInfoService", "rdDiagnostics", "rdDebuggingEvents", "platformInfo", "rdStandaloneActivityHintLookup", a])
	}(),
	function () {
		var a = function (a, b, c) {
			var d, e, f = c.getDiscoveryUrl(),
				g = c.getAuthConfig(),
				h = !!(g && g.authority && g.clientID && g.resourceUrl),
				i = [g.resourceUrl + "/.default"],
				j = new Map;
			null !== f && "string" == typeof f && (b.log("discovery url " + f), j.set(f, i), -1 !== f.indexOf("api/arm/feeddiscovery") ? (d = new URL("/api/arm/hubdiscovery", f).href, e = new URL("/api/arm/diagnosticevents/v1/", f).href) : (d = new URL("/api/hubdiscovery", f).href, e = new URL("/api/diagnosticevents/v1/", f).href), j.set(d, i), j.set(e, i));
			var k, l = function (a, c, d) {
					if (!d) switch (a) {
						case msal.LogLevel.Error:
							return void b.error(c);
						case msal.LogLevel.Info:
							return void b.info(c);
						case msal.LogLevel.Verbose:
							return void b.debug(c);
						case msal.LogLevel.Warning:
							return void b.warn(c)
					}
				},
				m = {
					auth: {
						clientId: g.clientID,
						authority: g.authority,
						navigateToLoginRequestUrl: !1,
						postLogoutRedirectUri: location.href
					},
					cache: {
						cacheLocation: "localStorage",
						storeAuthStateInCookie: !0
					},
					framework: {
						unprotectedResources: ["app", "assets"],
						protectedResourceMap: j
					},
					system: {
						logger: new msal.Logger(l, {
							level: msal.LogLevel.Info,
							piiLoggingEnabled: !1
						})
					}
				},
				n = {
					scopes: i,
					forceRefresh: !1,
					authority: g.authority
				},
				o = {
					isAuthenticated: !1,
					userName: "",
					name: ""
				};
			if (h) b.log("authConfig found!"), k = new msal.PublicClientApplication(m);
			else {
				b.warn("Token based authentication is not configured. Proceeding without it...");
				const p = {
					auth: {
						clientId: "null"
					}
				};
				k = new msal.PublicClientApplication(p)
			}
			a && a.interceptors && a.interceptors.push("ProtectedResourceInterceptor"), this.$get = ["$rootScope", "$window", "logger", "$q", function (a, b, c, d) {
				function e(a) {
					o.isAuthenticated = !0, o.userName = a.username, o.name = a.name
				}

				function f() {
					var a = k.getAllAccounts();
					a && 0 !== a.length && (a.length > 1 && c.warn("More than one user signed in, this scenario is not currently supported using account with username : " + a[0].username), n.account = a[0], c.log("Setting user creds"), e(a[0]))
				}

				function i(b) {
					k.acquireTokenSilent(b).then(function (b) {
						c.debug("Acquired token silently of type: " + b.tokenType), a.$broadcast("msal:acquireTokenSuccess")
					}, function (d) {
						"InteractionRequiredAuthError" === d.name || "ClientAuthError" === d.name ? (c.log("Interaction required.. attempting to acquire token redirect"), k.loginRedirect(b)) : (c.error(d), a.$broadcast("msal:acquireTokenFailure"))
					})
				}

				function j(b) {
					return null !== b ? (f(), "id_token" === b.tokenType ? (c.log("id_token acquired at: " + (new Date).toString()), i(n)) : "access_token" === b.tokenType || "Bearer" === b.tokenType ? (c.debug("access_token acquired. Token type :" + b.tokenType), a.$broadcast("msal:acquireTokenSuccess")) : c.log("token type is: " + b.tokenType)) : h && (f(), n.account ? i(n) : (c.log("Have no account infomation, attempting to login"), k.loginRedirect(n))), null
				}
				return h && k.handleRedirectPromise().then(j).catch(function (a) {
					c.error("authRedirectFailure: " + a)
				}), {
					isUserAuthenticated: function () {
						return o.isAuthenticated
					},
					acquireTokenSilent: function () {
						return k.acquireTokenSilent(n)
					},
					isProtectedResource: function (a) {
						if (m.framework.unprotectedResources.length > 0)
							for (var b = 0; b < m.framework.unprotectedResources.length; b++)
								if (a.indexOf(m.framework.unprotectedResources[b]) > -1) return !1;
						if (m.framework.protectedResourceMap.size > 0) {
							var c = !1;
							if (m.framework.protectedResourceMap.forEach(function (b, d) {
									a.indexOf(d) > -1 && (c = !0)
								}), c) return !0
						}
						var d = String(a).replace(/^(https?:)\/\//, "");
						return (d = d.split("/")[0]) === window.location.host
					},
					logout: function () {
						var a = new ObjectHelper;
						return k.logout(a.createGuid())
					},
					getGatewayToken: function (a) {
						var b = ["logon_cert"],
							e = location.href.split("/");
						e[e.lastIndexOf("index.html")] = "sso.html";
						var f = e.join("/"),
							h = {
								auth: {
									clientId: g.clientID,
									navigateToLoginRequestUrl: !1,
									authority: a,
									redirectUri: f
								},
								system: {
									logger: new msal.Logger(l, {
										level: msal.LogLevel.Info,
										piiLoggingEnabled: !1
									})
								}
							},
							i = {
								scopes: b,
								authority: a,
								loginHint: k.getAllAccounts()[0].username
							},
							j = d.defer(),
							m = new msal.PublicClientApplication(h);
						return m.acquireTokenSilent(i).then(function (a) {
							c.log("Successfully retrieved gateway SSO token"), j.resolve(a.accessToken)
						}, function (a) {
							"InteractionRequiredAuthError" === a.name || "ClientAuthError" === a.name ? m.acquireTokenPopup(i).then(function (a) {
								c.log("Successfully retrieved gateway SSO token using popup"), j.resolve(a.accessToken)
							}, function (a) {
								c.error("Error getting gateway SSO token using popup: " + a.errorMessage), j.reject(a.errorMessage)
							}) : (c.error("Error getting gateway SSO token: " + a.errorMessage), j.reject(a.errorMessage))
						}), j.promise
					},
					userInfo: o
				}
			}]
		};
		angular.module("rdStandalone").factory("ProtectedResourceInterceptor", ["rdStandaloneMSALTokenManager", "logger", "$q", "$rootScope", "$templateCache", function (a, b, c, d, e) {
			return {
				request: function (b) {
					if (b) {
						if (b.headers = b.headers || {}, e.get(b.url)) return b;
						if (!a.isProtectedResource(b.url) && !b.withCredentials) return b;
						if (a.isUserAuthenticated()) {
							var d = c.defer();
							return a.acquireTokenSilent().then(function (a) {
								b.headers.Authorization = "Bearer " + a.accessToken, d.resolve(b)
							}, function (a) {
								b.data = a, d.reject(b)
							}), d.promise
						}
					}
				},
				responseError: function (a) {
					if (b.log("Getting error in the response: " + JSON.stringify(a)), a) return 401 === a.status ? d.$broadcast("msal:notAuthorized", a) : d.$broadcast("msal:errorResponse", a), c.reject(a)
				}
			}
		}]), angular.module("rdStandalone").provider("rdStandaloneMSALTokenManager", ["$httpProvider", "loggerProvider", "rdStandaloneConfigParametersProvider", a]).run(["rdStandaloneMSALTokenManager", function () {}])
	}(),
	function () {
		var a = function (a, b, c) {
			return {
				isAuthenticated: function () {
					return c.userInfo.isAuthenticated
				},
				isInteractiveLoginRequired: function () {
					return !1
				},
				getUserName: function () {
					return c.userInfo.name
				},
				getUserInitials: function () {
					const a = c.userInfo.name;
					var b = a ? a.split(" ") : null,
						d = "";
					return b ? (d += b[0].charAt(0), d += b.length > 1 ? b[b.length - 1].charAt(0) : "", d.length > 0 ? d.toUpperCase() : null) : null
				},
				getUPN: function () {
					return c.userInfo.userName
				},
				getCachedToken: function () {
					return c.acquireTokenSilent()
				},
				getGatewayToken: function () {
					c.getGatewayToken().then(function (a) {
						return a
					}, function () {
						return null
					})
				},
				getPasswordResetLink: function () {
					return "https://account.activedirectory.windowsazure.com/r#/profile"
				},
				getPasswordChangeEnabled: function () {
					return !0
				},
				login: function () {
					var c = a.defer();
					return b(function () {
						c.reject({
							result: "NotSupported"
						})
					}), c.promise
				},
				logout: function () {
					return c.logout()
				}
			}
		};
		angular.module("rdStandalone").service("userAuthInfoService", ["$q", "$timeout", "rdStandaloneMSALTokenManager", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g) {
			var h, i = null,
				j = null,
				k = null,
				l = null,
				m = null,
				n = 0,
				o = !1,
				p = e.getDiscoveryUrl();
			h = -1 !== p.search("api/arm/feeddiscovery") ? "/api/arm/hubdiscovery" : "/api/hubdiscovery/eventhubdiscovery.aspx";
			try {
				i = new URL(h, p).href
			} catch (a) {
				d.error("Exception: " + a.message), d.error("Invalid debuggingEvent URL. Diagnostic events will not be sent.")
			}
			var q = function (a, c) {
					m = null, d.log("Failed to get or parse token for logging debugging events" + a), n < 1 ? (b(s, c), n++, d.log("Failed to get or parse token for logging debugging events, retrying" + a)) : (n = 0, b(s, 72e5), d.log("Failed to get or parse token for logging debugging events,retrying after refresh interval" + a))
				},
				r = {
					withCredentials: !0,
					headers: {
						"X-MS-User-Agent": g.clientUserAgent
					}
				},
				s = function () {
					a.get(i, r).then(function (a) {
						try {
							var c = new X2JS,
								e = c.xml_str2json(a.data);
							k = e.EventHubSettings.EventHubName, l = "https" + e.EventHubSettings.EventHubUrl.substring(2), m = e.EventHubSettings.GeneratedSaS, d.log("Got a SAS token"), j = l + k + "/messages?timeout=60&api-version=2014-01", n = 0
						} catch (a) {
							d.error("Error in parsing SAS token request: " + a)
						} finally {
							b(s, 72e5)
						}
					}, function (a) {
						if (d.error("Failed to get SAS token, reason:" + JSON.stringify(a)), a && a.status) switch (a.status) {
							case 429:
								d.warn("Too many request to the server"), a.headers && a.headers("retry-after") ? (q(a, 1e3 * a.headers("retry-after")), d.log("Will retry SAS token retrival after " + a.headers("retry-after") + " seconds")) : (d.error("Retry-After attribute is missing from the throtting request"), q(a, 3e5));
								break;
							default:
								q(a, 3e4)
						} else q(a, 3e4)
					})
				},
				t = function () {
					!o && f.isAuthenticated() && (o = !0, s())
				};
			return f.isAuthenticated() ? t() : c.$on("msal:acquireTokenSuccess", function () {
				t()
			}), {
				getDebuggingEventInfoAndToken: function () {
					return {
						debuggingLogUploadUrl: j,
						debuggingLogSaSToken: m
					}
				}
			}
		};
		angular.module("rdStandalone").service("rdDebuggingEventUploadSaSTokenManager", ["$http", "$timeout", "$rootScope", "logger", "rdStandaloneConfigParameters", "userAuthInfoService", "platformInfo", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c, d, e) {
			Error.stackTraceLimit = 1 / 0, c.decorator("$exceptionHandler", ["$delegate", "logger", function (a, b) {
				return function (c, d) {
					a(c, d), b.error("Exception: " + c + " Cause: " + d)
				}
			}]), a.html5Mode({
				enabled: !0,
				requireBase: !1
			}).hashPrefix("!"), d.debugInfoEnabled(!1), b.setTriggers({
				openTrigger: "closeTrigger"
			}), e.useStaticFilesLoader({
				prefix: "assets/loc/",
				suffix: "/strings.json"
			}).uniformLanguageTag("bcp47").registerAvailableLanguageKeys(["da-DK", "de-DE", "en-US", "en-GB", "es-ES", "fi-FI", "fr-FR", "it-IT", "ja-JP", "nb-NO", "nl-NL", "pl-PL", "pt-BR", "ru-RU", "sv-SE", "zh-CN", "zh-TW"], {
				da: "da-DK",
				"da-*": "da-DK",
				de: "de-DE",
				"de-*": "de-DE",
				es: "es-ES",
				"es-*": "es-ES",
				fi: "fi-FI",
				"fi-*": "fi-FI",
				fr: "fr-FR",
				"fr-*": "fr-FR",
				it: "it-IT",
				"it-*": "it-IT",
				ja: "ja-JP",
				"ja-*": "ja-JP",
				nb: "nb-NO",
				"nb-*": "nb-NO",
				no: "nb-NO",
				nl: "nl-NL",
				"nl-*": "nl-NL",
				pl: "pl-PL",
				"pl-*": "pl-PL",
				pt: "pt-BR",
				"pt-*": "pt-BR",
				ru: "ru-RU",
				"ru-*": "ru-RU",
				sv: "sv-SE",
				"sv-*": "sv-SE",
				zh: "zh-CN",
				"*": "en-US"
			}).fallbackLanguage("en-US").determinePreferredLanguage().useSanitizeValueStrategy("escapeParameters")
		}

		function b(a, b, c, d, e, f) {
			try {
				Module.Tracing.Register(function (a, b, c, e) {
					d.onRdCoreDebuggingEvent(e, a, b, c)
				}, function (a) {
					b.logWithoutTimestamp(a)
				}, function (a) {
					b.warnWithoutTimestamp(a)
				}, function (a) {
					b.errorWithoutTimestamp(a)
				})
			} catch (a) {
				b.log("Tried to register debbugging event logger to collect trace function with RdCore but failed")
			}
			document.getElementById("rdcorelib") && (Module.SetWebWorkerBasePath(""), Module.SetWebWorkerLibName(document.getElementById("rdcorelib").src));
			var g = document.getElementById("rdAppTitle");
			g && e("REMOTE_DESKTOP_TITLE").then(function (a) {
				g.textContent = a
			}, function (a) {
				g.textContent = a
			});
			var h = "";
			e("BEFORE_UNLOAD_WARNING").then(function (a) {
				h = a
			}, function (a) {
				h = a
			}), a.addEventListener("beforeunload", function (a) {
				var b;
				return c.sessionList().length > 0 && (b = h, a.returnValue = b), b
			});
			var i = e.getTranslationTable(),
				j = !1;
			i ? (Module.UIStrings.RegisterTranslationTable(i), j = !0) : f.$on("$translateChangeSuccess", function () {
				var a = e.getTranslationTable();
				!j && a && (Module.UIStrings.RegisterTranslationTable(a), j = !0)
			})
		}
		var c = "rdMultiTenant" === DeploymentSettings.deploymentType ? "rdStandalone" : DeploymentSettings.deploymentType;
		(new LaunchModeHelper).setLaunchMode(), angular.module("rdpClientUI", ["ngAnimate", "ngAside", "ngAria", "ui.bootstrap", "pascalprecht.translate", c]).config(["$locationProvider", "$uibTooltipProvider", "$provide", "$compileProvider", "$translateProvider", a]).run(["$window", "logger", "sessionProvider", "rdDebuggingEvents", "$translate", "$rootScope", b])
	}(),
	function () {
		"use strict";
		var a = function (a, b) {
			var c = this;
			return c.isOpen = !1, a.enableHover(), c.focusSession = function (a) {
				b.focusToSession(a.id, !0)
			}, c.onTabClick = function (b) {
				1 === a.appGroup.sessionList.length ? c.focusSession(a.appGroup.sessionList[0]) : (a.isHoverEnabled() ? c.isOpen = !0 : c.isOpen = !c.isOpen, a.disableHover(), b.stopPropagation())
			}, c.onToggle = function (b) {
				b || a.enableHover()
			}, c.onTabHover = function () {
				a.isHoverEnabled() && (c.isOpen = !0)
			}, c.onTabLeave = function () {
				a.isHoverEnabled() && (c.isOpen = !1)
			}, c
		};
		angular.module("rdpClientUI").directive("rdpApplicationTab", function () {
			return {
				templateUrl: "app/rdp-client-ui/application-tab.html",
				controller: ["$scope", "sessionProvider", a],
				controllerAs: "ctrl",
				restrict: "A",
				scope: {
					appGroup: "<",
					enableHover: "&",
					disableHover: "&",
					isHoverEnabled: "&"
				}
			}
		})
	}(),
	function () {
		"use strict";

		function a(a, b, c, d, e, f, g, h, i) {
			a.openThirdParty = function () {
				c.open({
					animation: !0,
					templateUrl: "app/rdp-client-ui/Common/ThirdPartyNotices.html",
					controller: "ThirdPartyNoticesCtrl",
					controllerAs: "modalController",
					windowClass: "rdhtml5-sidepanel session-modal",
					placement: "right",
					backdrop: !0,
					keyboard: !0,
					ariaLabelledBy: "thirdparty_modal_title"
				})
			}, a.openTermsOfUse = function () {
				c.open({
					animation: !0,
					templateUrl: "app/rdp-client-ui/Common/TermsOfUse.html",
					controller: "TermsOfUseCtrl",
					controllerAs: "modalController",
					windowClass: "rdhtml5-sidepanel session-modal",
					placement: "right",
					backdrop: !0,
					keyboard: !0,
					ariaLabelledBy: "tou_modal_title"
				})
			}, a.openPrivacyStatement = function () {
				d.open("https://go.microsoft.com/fwlink/?LinkId=521839", "_blank")
			};
			var j = e && e.platformInfo || {};
			a.appVersion = j.clientVersion, "Live" !== j.clientTarget && (a.appVersion += " (" + j.clientTarget + ")"), a.supportID = f.getSupportID(), a.cancel = function () {
				b.dismiss("cancel")
			}, a.consoleRecordingStatus = g.getConsoleRecordingStatus(), a.startConsoleRecording = function () {
				a.consoleRecordingStatus = !0, g.startRecording()
			}, a.stopConsoleRecording = function () {
				a.consoleRecordingStatus = !1, g.stopRecording(), h.downloadLogs()
			};
			var k = i.resolveClientLocale();
			const l = {
				"fr-FR": "https://go.microsoft.com/fwlink/?linkid=2121428"
			};
			a.showAccessibilityNotice = function () {
				return !!l[k]
			}, a.openAccessibilityDeclaration = function () {
				l[k] && d.open(l[k], "_blank")
			}, a.focus = !1
		}
		angular.module("rdpClientUI").controller("AboutCtrl", ["$scope", "$uibModalInstance", "$aside", "$window", "params", "telemetry", "logger", "consoleLogDownloader", "$translate", a])
	}(),
	function () {
		"use strict";

		function a(a) {
			return {
				restrict: "A",
				scope: {},
				link: function (b, c) {
					c.text(""), a.isAuthenticated() && c.text(a.getUserName())
				}
			}
		}

		function b(a, b, c, d) {
			return {
				restrict: "A",
				scope: {},
				link: function (e, f) {
					f.text(""), a("SIGN_OUT_LABEL").then(function (a) {
						f.text(a)
					}, function (a) {
						f.text(a)
					}), f.on("click", function () {
						c.disconnect(), d.clearAllFileSystemIndexedDB(), setTimeout(b.logout, 2e3)
					})
				}
			}
		}

		function c(a) {
			return {
				restrict: "A",
				scope: {},
				link: function (b, c) {
					function d(a) {
						h = a.clientX - g, c.css({
							left: f + h + "px",
							"pointer-events": "none"
						})
					}

					function e() {
						a.unbind("mousemove", d), a.unbind("mouseup", e), c.css({
							"pointer-events": "visible"
						}), 0 === h && c.triggerHandler("click")
					}
					var f, g, h;
					c.css({
						position: "absolute"
					}), c.bind("mousedown", function (b) {
						f = c.prop("offsetLeft"), g = b.clientX, h = 0, a.bind("mousemove", d), a.bind("mouseup", e)
					})
				}
			}
		}

		function d(a, b) {
			function c(a, b, c) {
				if (angular.isArray(a))
					for (var d = a.length; d--;)
						if (c(a[d], b)) return !0;
				return !1
			}

			function d(a, b, d) {
				return a = angular.isArray(a) ? a : [], c(a, b, d) || a.push(b), a
			}

			function e(a, b, c) {
				if (angular.isArray(a))
					for (var d = a.length; d--;)
						if (c(a[d], b)) {
							a.splice(d, 1);
							break
						}
				return a
			}

			function f(f, g, h) {
				function i(a) {
					f.checked = c(a, m, n)
				}
				b(g)(f);
				var j = a(h.checklistModel),
					k = j.assign,
					l = a(h.checklistChange),
					m = a(h.checklistValue)(f.$parent),
					n = angular.equals;
				h.hasOwnProperty("checklistComparator") && (n = a(h.checklistComparator)(f.$parent)), f.$watch("checked", function (a, b) {
					if (a !== b) {
						var c = j(f.$parent);
						!0 === a ? k(f.$parent, d(c, m, n)) : k(f.$parent, e(c, m, n)), l && l(f)
					}
				}), angular.isFunction(f.$parent.$watchCollection) ? f.$parent.$watchCollection(h.checklistModel, i) : f.$parent.$watch(h.checklistModel, i, !0)
			}
			return {
				restrict: "A",
				priority: 1e3,
				terminal: !0,
				scope: !0,
				compile: function (a, b) {
					if ("INPUT" !== a[0].tagName || "checkbox" !== b.type) throw 'checklist-model should be applied to `input[type="checkbox"]`.';
					if (!b.checklistValue) throw "You should provide `checklist-value`.";
					return a.removeAttr("checklist-model"), a.attr("ng-model", "checked"), f
				}
			}
		}

		function e() {
			return {
				restrict: "EA",
				scope: {
					loaderType: "@"
				},
				templateUrl: "app/rdp-client-ui/Common/loadingSpinner.html",
				link: function (a, b) {
					"sessionLoader" === a.loaderType && b[0].removeChild(b.children()[1])
				}
			}
		}

		function f() {
			return {
				restrict: "A",
				link: function (a, b) {
					function c(a) {
						a.keyCode === KeyCodes.Tab ? b.tooltip("show") : a.keyCode !== KeyCodes.Shift && b.tooltip("hide")
					}
					b.on("focusout", function () {
						b.unbind("keyup", c), b.tooltip("hide")
					}), b.on("focusin", function () {
						b.bind("keyup", c), b.tooltip("hide")
					})
				}
			}
		}

		function g() {
			return {
				restrict: "A",
				link: function (a, b, c) {
					var d = a.$eval(c.fileInputOnChange);
					b.on("change", d), b.on("$destroy", function () {
						b.off()
					})
				}
			}
		}

		function h(a) {
			return {
				link: function (b, c, d) {
					var e = function (a) {
							var e = c[0].contains(a.target),
								f = c[0] === a.target;
							e || f || b.$apply(d.clickOutsideElement)
						},
						f = function (a) {
							a.keyCode === KeyCodes.Esc && e(a)
						};
					b.$watch(d.isActive, function (b, c) {
						b !== c && !0 === b ? (a.bind("click", e), a.bind("keyup", f)) : b !== c && !1 === b && (a.unbind("click", e), a.unbind("keyup", f))
					})
				}
			}
		}
		var i = function (a) {
			return {
				restrict: "A",
				link: function (b, c) {
					a(function () {
						c.focus()
					}, 0, !1)
				}
			}
		};
		angular.module("rdpClientUI").directive("checklistModel", ["$parse", "$compile", d]).directive("loadingSpinner", [e]).directive("navbarUsernameDisplay", ["userAuthInfoService", a]).directive("navbarLogoutButton", ["$translate", "userAuthInfoService", "sessionProvider", "driveRedirection", b]).directive("rdpGrabFocus", ["$timeout", i]).directive("draggable", ["$document", c]).directive("tooltip", [f]).directive("fileInputOnChange", [g]).directive("clickOutsideElement", ["$document", h])
	}(),
	function () {
		"use strict";

		function a(a, b, c, d) {
			function e(a) {
				return !0 === DeploymentSettings.launchResourceInBrowser ? "webclient" === a : !1 !== DeploymentSettings.launchResourceInBrowser || "nativeclient" === a
			}
			a.telemetryEnabled = function (a) {
				return arguments.length >= 1 && !DeploymentSettings.suppressTelemetry && (c.telemetryEnabled = a), c.telemetryEnabled && !DeploymentSettings.suppressTelemetry
			}, a.telemetryChoiceDisabled = DeploymentSettings.suppressTelemetry, a.onTelemetryChanged = function () {
				c.telemetryEnabled && !DeploymentSettings.suppressTelemetry ? d.enable() : d.disable()
			}, a.IMEEnabled = function () {
				return c.IMEEnabled
			}, a.onIMEChanged = function () {
				c.IMEEnabled ? c.IMEEnabled = !1 : c.IMEEnabled = !0
			}, a.SelectedKeyboardLayoutModel = c.SelectedKeyboardLayout, a.onKeyboardLayoutSelect = function (a) {
				c.SelectedKeyboardLayout = a
			}, a.resourceLaunchMethod = c.resourceLaunchMethod, a.hasResourceLaunchMethodSet = "boolean" == typeof DeploymentSettings.launchResourceInBrowser, a.isDisabledResourceLaunchMethod = function (b) {
				return a.hasResourceLaunchMethodSet && a.resourceLaunchMethod !== b
			}, a.showResourceLaunchMethod = function () {
				return !0
			}, a.$watch("resourceLaunchMethod", function (a) {
				e(a) && (c.resourceLaunchMethod = a)
			}), a.cancel = function () {
				b.dismiss("cancel")
			}, a.focus = !1
		}
		angular.module("rdpClientUI").controller("SettingsCtrl", ["$scope", "$uibModalInstance", "appSettingsStore", "telemetry", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c) {
			this.cancel = function () {
				c.dismiss("cancel")
			}, a.termsUrl = "assets/loc/" + b.use() + "/termsofuse.html"
		}
		angular.module("rdpClientUI").controller("TermsOfUseCtrl", ["$scope", "$translate", "$uibModalInstance", a])
	}(),
	function () {
		"use strict";

		function a(a) {
			this.cancel = function () {
				a.dismiss("cancel")
			}
		}
		angular.module("rdpClientUI").controller("ThirdPartyNoticesCtrl", ["$uibModalInstance", a])
	}(),
	function () {
		function a(a, b, c, d, e, f) {
			var g = 0,
				h = [],
				i = function (a) {
					return h.filter(function (b) {
						return b.connectionId === a
					})
				},
				j = function (a) {
					var b = i(a);
					return 0 === b.length ? null : b[b.length - 1]
				},
				k = function (b, c, g) {
					var i = this,
						k = !0,
						l = null,
						m = function () {
							if (k) {
								b.remove();
								for (var c = 0; c < h.length; c++)
									if (h[c].dialogId === g) {
										h.splice(c, 1);
										break
									}
								k = !1, a.$broadcast("rdpClientUI:sessionTakeFocus")
							}
						};
					return i.onClose = null, i.onCancel = null, i.close = function (a) {
						m(), i.onClose && i.onClose(a)
					}, i.cancel = function () {
						m(), i.onCancel && i.onCancel()
					}, i.focus = function () {
						e(function () {
							var a = l || b[0].querySelector("[autofocus]") || b[0].querySelector("input,button");
							a && a.focus()
						})
					}, i.onFocus = function () {
						l = angular.element(d[0].activeElement)
					}, i.onKeyDown = function (a) {
						27 === a.keyCode && (i.cancel(), a.preventDefault())
					}, i.isVisible = function () {
						return k && f.activeSession && f.activeSession.getConnectionId() === c
					}, i.isTopMost = function () {
						return i.isVisible() && j(c).dialogId === g
					}, i.getControlTabIndex = function () {
						return i.isTopMost() ? "3" : "-1"
					}, i.labelID = "connDialogLabel" + g, i
				};
			return {
				open: function (d, e) {
					var f = angular.element(document.getElementById("dialog-container")),
						i = a.$new(),
						j = {},
						l = angular.element("<div connection-dialog-instance></div>"),
						m = new k(l, d, g);
					if (i.dialog = m, l.attr("ng-show", "dialog.isVisible()"), l.on("focusin", m.onFocus), l.on("keydown", m.onKeyDown), e.templateUrl && l.attr("template-url", e.templateUrl), e.params && (j = e.params), e.controller) {
						var n = e.controller;
						e.controllerAs && (n += " as " + e.controllerAs), b(n, {
							$scope: i,
							params: j
						})
					}
					return l.addClass("rdp-connection-dialog"), e.windowClass && l.addClass(e.windowClass), f.append(c(l)(i)), h.push({
						dialogId: g,
						connectionId: d,
						instance: m
					}), g++, m
				},
				isDialogVisible: function () {
					return f.activeSession && i(f.activeSession.getConnectionId()).length > 0
				},
				focusTopMostDialog: function () {
					if (f.activeSession) {
						var a = j(f.activeSession.getConnectionId());
						a && a.instance.focus()
					}
				}
			}
		}
		angular.module("rdpClientUI").factory("connectionDialog", ["$rootScope", "$controller", "$compile", "$document", "$timeout", "sessionProvider", a]).directive("connectionDialogInstance", function () {
			return {
				templateUrl: function (a, b) {
					return b.templateUrl
				}
			}
		})
	}(),
	function () {
		"use strict";
		var a = 0,
			b = function (b, c) {
				var d = this,
					e = a++;
				return d.sessionTitle = function () {
					return d.session ? d.session.connection.hadSuccessfulConnection ? d.session.getBookmark().desktopLabel() : d.session.getBookmark().label() : null
				}, d.errorMessage = function () {
					return d.session && d.session.getDisconnectReason()
				}, d.reconnect = function () {
					if (d.session) {
						var a = angular.copy(d.session.getBookmark());
						d.session.connection.hadSuccessfulConnection && (a.friendlyName = a.desktopLabel()), b.setReconnecting(!0), b.createSession(a, d.session.connection.hadSuccessfulConnection, c)
					}
				}, d.dismissSession = function () {
					d.session && d.session.id && b.dismissSession(d.session.id)
				}, d.onKeyUp = function (a) {
					"Escape" !== a.key && 27 !== a.keyCode || d.dismissSession()
				}, d.labelID = "connErrorLabel" + e, d
			};
		angular.module("rdpClientUI").component("connectionError", {
			templateUrl: "app/rdp-client-ui/connection-error.html",
			controller: ["sessionProvider", "$window", b],
			controllerAs: "connErrController",
			bindings: {
				session: "<"
			}
		})
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g) {
			var h = "Uploading files",
				i = "Redirected Drive - Default",
				j = "Uploads",
				k = 0;
			d("REDIRECTED_DRIVE_NAME").then(function (a) {
				i = a
			}), d("REDIRECTED_DRIVE_UPLOAD_FOLDER_NAME").then(function (a) {
				j = a
			});
			var l = function (a) {
				try {
					var c = b.indexedDB.deleteDatabase(a);
					c.onerror = function (b) {
						f.error("[Drive redirection] Error deleting database with path " + a), f.error(b)
					}, c.onsuccess = function () {
						f.debug("[Drive redirection] Removed " + a)
					}
				} catch (b) {
					f.error("[Drive redirection] Failed to delete IndexedDB with path " + a + b)
				}
			};
			return {
				onDriveUploadStart: function (a, b) {
					k = a, g.onRdCoreDebuggingEvent(b, "Drive redirection", "File upload started for " + a + " files", 4), 1 === k ? d("UPLOADING_SINGLE_FILE", {
						redirectedDriveName: i
					}).then(function (a) {
						h = a
					}) : d("UPLOADING_FILES", {
						currentItem: "1",
						itemCount: a
					}).then(function (a) {
						h = a
					}), c(function () {
						e.$broadcast("rdDriveRedir:uploadAlertText", h), e.$broadcast("rdDriveRedir:startUpload", a)
					})
				},
				logFileInformation: function (a, b) {
					g.onRdCoreDebuggingEvent(b, "Drive redirection", "File uploaded. Size: " + a, 4)
				},
				onDriveUploadCurrentItem: function (a) {
					d("UPLOADING_FILES", {
						currentItem: a,
						itemCount: k
					}).then(function (a) {
						h = a
					}), c(function () {
						e.$broadcast("rdDriveRedir:uploadAlertText", h)
					})
				},
				onFileUploadError: function () {
					d("FILE_SYSTEM_FATAL_ERROR", {}).then(function (a) {
						h = a
					}), c(function () {
						e.$broadcast("rdDriveRedir:uploadAlertText", h), e.$broadcast("rdDriveRedir:startUpload", 0)
					})
				},
				onDriveUploadComplete: function () {
					d("FILE_UPLOAD_COMPLETE", {
						redirectedDriveName: i
					}).then(function (a) {
						h = a
					}), c(function () {
						e.$broadcast("rdDriveRedir:uploadAlertText", h), e.$broadcast("rdDriveRedir:uploadComplete")
					}, 1e3)
				},
				onUpdateFileUploadStatus: function (a) {
					a ? e.$broadcast("rdDriveRedir:showFileUploadIcon") : e.$broadcast("rdDriveRedir:hideFileUploadIcon")
				},
				getUploadsFolderName: function () {
					return j
				},
				fileTooLarge: function (a, b) {
					g.onRdCoreDebuggingEvent(b, "Drive redirection", "Attempt to upload file over size limit. Size: " + a, 4), d("FILE_TOO_LARGE_ERROR", {}).then(function (a) {
						h = a
					}), c(function () {
						e.$broadcast("rdDriveRedir:uploadAlertText", h), e.$broadcast("rdDriveRedir:uploadComplete")
					}, 2e3)
				},
				clearAllFileSystemIndexedDB: function () {
					try {
						f.debug("[Drive redirection] Attempting to remove databases from IndexedDB...");
						var a = b.localStorage,
							c = JSON.parse(a.getItem("RdWebAppIndexedDB")) || [];
						for (var d in c) l(c[d]);
						a.removeItem("RdWebAppIndexedDB")
					} catch (a) {
						f.error("[Drive redirection] Unexpected error while trying to delete IndexedDB: " + a)
					}
				},
				registerIndexedDB: function (a) {
					var c = b.localStorage;
					if (c) {
						var d = JSON.parse(c.getItem("RdWebAppIndexedDB")) || [],
							e = !1;
						for (var g in d)
							if (a === d[g]) {
								e = !0;
								break
							}
						e || (f.debug("[Drive redirection] Registering DB with path " + a + " to local storage"), d.push(a), c.setItem("RdWebAppIndexedDB", JSON.stringify(d)))
					}
				},
				onDownloadUrl: function (a, d) {
					c(function () {
						if (f.debug("Downloading file: " + d + " with url: " + a), b.navigator.msSaveBlob) return void f.error("[DriveService] File download on IE is not supported");
						var c = b.document.getElementById("fileDownloadLink");
						c ? (c.href = a, c.download = d, c.click()) : f.error("The link for downloading files could not be found.")
					})
				}
			}
		};
		angular.module("rdpClientUI").factory("driveRedirection", ["$http", "$window", "$timeout", "$translate", "$rootScope", "logger", "rdDebuggingEvents", a])
	}(),
	function () {
		var a = function (a, b, c, d, e, f) {
			var g = "Remote Print Job.pdf";
			return d("PRINT_JOB_FILE_NAME").then(function (a) {
				g = a
			}, function (a) {
				g = a
			}), {
				onPrintStart: function () {
					c(function () {
						e.$broadcast("rdPrinting:printStart")
					})
				},
				onPrintUrl: function (d) {
					c(function () {
						if (f.log("Saving printed document as a file"), b.navigator.msSaveBlob) a.get(d, {
							responseType: "blob"
						}).then(function (a) {
							b.navigator.msSaveBlob(a.data, g)
						}, function (a) {
							f.error("Extracting the PDF print job failed unexpectedly, details=" + angular.toJson(a))
						});
						else {
							var c = b.document.getElementById("printDownloadLink");
							c ? (c.href = d, c.click()) : f.error("The link for downloading printed documents could not be found.")
						}
					})
				}
			}
		};
		angular.module("rdpClientUI").factory("printing", ["$http", "$window", "$timeout", "$translate", "$rootScope", "logger", a])
	}(),
	function () {
		"use strict";
		angular.module("rdpClientUI").directive("rdResourceList", function () {
			return {
				restrict: "E",
				templateUrl: "app/rdp-client-ui/rd-resource-list.html",
				controller: ["$scope", "$aside", function (a, b) {
					var c = this;
					c.isBookmarkDisplayed = function (b) {
						return 0 === b.folderNames.length && "/" === a.displayFolder || b.folderNames.indexOf(a.displayFolder) >= 0
					}, c.setFolder = function (b) {
						a.displayFolder = b, a.displayWorkspaceUrl = a.workspace.url
					}, c.clearFolder = function () {
						a.displayFolder = "/", a.displayWorkspaceUrl = null
					}, c.showSupportModal = function (a) {
						b.open({
							animation: !0,
							controller: "SupportController",
							templateUrl: "app/rdp-client-ui/SupportInformation.html",
							windowClass: "rdhtml5-sidepanel session-modal",
							placement: "right",
							backdrop: !0,
							keyboard: !0,
							ariaLabelledBy: "Support_modal_title",
							resolve: {
								params: function () {
									return {
										supportObj: a.supportObj
									}
								}
							}
						})
					}
				}],
				controllerAs: "resourceListController",
				scope: {
					launch: "&launchAction",
					displayFolder: "=",
					displayWorkspaceUrl: "=",
					workspace: "<"
				}
			}
		})
	}(),
	function () {
		"use strict";

		function a(a, b, c, d, e, f, g, h, i, j, k, l) {
			var m = {
					displayFolder: "/",
					displayWorkspaceUrl: null,
					rdpFileDownloadFailed: !1,
					rdpFileDownloadFailedReason: ""
				},
				n = function (a) {
					if (m.displayWorkspaceUrl && "/" !== m.displayFolder) {
						var b = a.find(function (a) {
							return a.url === m.displayWorkspaceUrl
						});
						b && -1 !== b.folders.indexOf(m.displayFolder) || (m.displayFolder = "/", m.displayWorkspaceUrl = null)
					}
				},
				o = function () {
					var a, b = !1,
						d = c.getFeedData();
					for (a = 0; a < d.workspaces.length && !b; a++) b = d.workspaces[a].bookmarks.length >= 0;
					return !d.loading && !d.loadFailed && !b
				};
			a.$watch(function () {
				return c.getFeedData().workspaces
			}, n);
			var p = function (a) {
				a.rdpFileString ? g.downloadRdpFile(a.rdpFileString, a.friendlyName) : (j.debug("[RdpClientUiAllResourcesPane] Retrieving RDP file: " + a.rdpFileURL), c.getFeedFile(a.rdpFileURL, a.tenantId).then(function (b) {
					a.rdpFileString = b, a.rdpFileString ? m.launchBookmark(a) : (j.error("Retrieving the RDP file for download failed: Received an empty rdpFileString."), m.rdpFileDownloadFailed = !0, m.rdpFileDownloadFailedReason = "RDPFILE_DOWNLOAD_FAIL_TEXT")
				}, function (a) {
					j.error("Retrieving the RDP file for download failed. " + a), m.rdpFileDownloadFailed = !0, m.rdpFileDownloadFailedReason = "RDPFILE_DOWNLOAD_FAIL_TEXT"
				}))
			};
			m.launchBookmark = function (b) {
				const c = i.resourceLaunchMethod;
				b.id && (document.getElementById(b.id).style.pointerEvents = "none", setTimeout(function () {
					document.getElementById(b.id).style.pointerEvents = "auto"
				}, 1e3)), DeploymentSettings.launchMode === LaunchMode.DownloadFileOnly ? (p(b), document.getElementById("rdp-page-loading").style.display = "none") : "webclient" === c ? e.createSession(b, null, l) : (p(b), m.rdpFileDownloadFailed && (a.$broadcast("rdpClientUI:ErrorMessageModal", "RDPFileURLParseErrorMessage"), event.preventDefault(), m.rdpFileDownloadFailed = !1))
			};
			var q = function (b, c, d) {
					m.rdpFileDownloadFailed = !0, m.rdpFileDownloadFailedReason = "RDPFILEURL_PARSE_FAIL_TEXT";
					var e;
					switch (b.message) {
						case LaunchModeErrors.GUIDNotFound:
							e = "End-failure: parsing the URL for tenant id failed";
							break;
						case LaunchModeErrors.InvalidGUID:
							e = "End-failure: GUID with invalid format was found";
							break;
						case LaunchModeErrors.UnexpectedToken:
							e = "End-failure: Unexpected token was found in url";
							break;
						case LaunchModeErrors.RDPFileUrlNotFound:
							e = "End-failure: rdp file url parameter was not found";
							break;
						case LaunchModeErrors.NotSameOrigin:
							e = "End-failure: rdp file url is different then webclient origin";
							break;
						case LaunchModeErrors.DiscoveryUrlNotFound:
							e = "End-failure: discovery url in deploymentSettings is invalid or missing";
							break;
						default:
							j.error("RDPFile launch failed with params: " + l.location.toString() + JSON.stringify(b)), e = "End-failure: exception while launching a connection using RDP file"
					}
					j.error(e), h && h.onClientOperation(c, d, e, 2), DeploymentSettings.launchMode !== LaunchMode.DownloadFileOnly && (a.$broadcast("rdpClientUI:ErrorMessageModal", "RDPFileURLParseErrorMessage"), event.preventDefault())
				},
				r = function () {
					var a = new LaunchModeHelper,
						b = Module.CorrelationID.CreateRandomCorrelationID().ToString().slice(1, -1),
						c = "launchConnectionFromURLParams";
					try {
						if (a.urlContainsParameters()) {
							h && h.onClientOperation(b, c, "Start: Found url parameters " + a.rawLoc, 4);
							var d = new Bookmark;
							if (d.friendlyName = "RDP file launched resource", d.multiTenantMode = DeploymentSettings && "rdMultiTenant" === DeploymentSettings.deploymentType, d.multiTenantMode) {
								var e = new LaunchInfo;
								e = a.getLaunchInfo(), e.rdpfileURL && e.tenantId && (d.rdpFileURL = e.rdpfileURL, d.tenantId = e.tenantId, h && h.onClientOperation(b, c, "End-success: launching connection with parsed RDPFile URL", 4), m.launchBookmark(d))
							} else {
								var f = a.sanitizedParams();
								if (!f || 0 !== f.indexOf(l.location.origin)) throw new Error(LaunchModeErrors.NotSameOrigin);
								d.rdpfileURL = f, m.launchBookmark(d)
							}
						}
					} catch (a) {
						q(a, b, c)
					}
				};
			return k.isAuthenticated() ? r() : a.$on("msal:acquireTokenSuccess", function () {
				r()
			}), m.unsupportedBrowserData = b.getBrowserSupportData(), m.showUnsupportedBrowser = function () {
				const a = i.dismissedUnsupportedBrowser;
				return !!m.unsupportedBrowserData.value && !a
			}, m.setDismissedUnsupportedBrowser = function () {
				i.dismissedUnsupportedBrowser = !0
			}, m.showAudioUnsupported = function () {
				const a = i.dismissedAudioUnsupported;
				return !m.unsupportedBrowserData.value && !b.isAudioSupported() && !a
			}, m.showAudioInputUnsupported = function () {
				const a = i.dismissedAudioUnsupported;
				return !m.unsupportedBrowserData.value && !b.isAudioInputSupported() && !a
			}, m.setDismissedAudioUnsupported = function () {
				i.dismissedAudioUnsupported = !0
			}, m.showGDPRBanner = function () {
				return !i.dismissedGDPRBanner
			}, m.setDismissedGDPRBanner = function () {
				i.dismissedGDPRBanner = !0
			}, m.showResourceList = function () {
				return !(m.showFeedLoader() || o() || m.displayWorkspaceUrl && m.workspace.url !== m.displayWorkspaceUrl)
			}, m.hideAllRessourcesUI = function () {
				return LaunchModeSettings.hideAllResourcesUI()
			}, m.showFeedLoader = function () {
				var a = c.getFeedData();
				return a.loading && !a.loadFailed && !m.hideAllRessourcesUI()
			}, m.showFileDownloadUI = function () {
				return DeploymentSettings.launchMode === LaunchMode.DownloadFileOnly
			}, m.isRdpFileDownloadFailed = function () {
				return m.hideAllRessourcesUI() && m.rdpFileDownloadFailed
			}, m.showFirstRetryMessage = function () {
				var a = c.getFeedData();
				return a.loadFailed && a.loading && 1 === a.numRetry && !m.showResourceList()
			}, m.showFeedFailedRecoverable = function () {
				var a = c.getFeedData();
				return a.loadFailed && a.loading && a.numRetry > 1 && a.numRetry < f.getFeedRetrivalMaxRetry() && !m.showResourceList()
			}, m.showFeedFailedIrrecoverable = function () {
				var a = c.getFeedData();
				return a.loadFailed && (!a.loading || a.numRetry >= f.getFeedRetrivalMaxRetry()) && !m.showResourceList()
			}, m.getUPN = function () {
				return k.getUPN()
			}, m.showFeedEmptyOnPrem = function () {
				return null === m.getUPN() && o()
			}, m.showFeedEmptyWVD = function () {
				return m.getUPN() && o()
			}, m.getWorkspaces = function () {
				return c.getFeedData().workspaces
			}, m
		}
		angular.module("rdpClientUI").component("rdpAllResourcesPane", {
			templateUrl: "app/rdp-client-ui/rdp-client-ui-all-resources-pane.html",
			controller: ["$rootScope", "browserCapabilities", "rdFeedTracker", "viewManager", "sessionProvider", "rdCommonRuntimeParameters", "rdpFileDownloader", "rdDebuggingEvents", "appSettingsStore", "logger", "userAuthInfoService", "$window", a],
			controllerAs: "allResourcesCtrl"
		})
	}(),
	function () {
		"use strict";

		function a(a) {
			return {
				prompt: function (b) {
					console.log(b);
					var c = null,
						d = null;
					switch (b) {
						case "AADSTS65005ErrorMessage":
							c = "ERROR_AADSTS65005_TITLE", d = "ERROR_AADSTS65005_TEXT";
							break;
						case "RDPFileDownloadErrorMessage":
							c = "RDPFILE_DOWNLOAD_FAIL_TITLE", d = "RDPFILE_DOWNLOAD_FAIL_TEXT";
							break;
						case "RDPFileURLParseErrorMessage":
							c = "RDPFILEURL_PARSE_FAIL_TITLE", d = "RDPFILEURL_PARSE_FAIL_TEXT"
					}
					a.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/rdp-client-ui-BroadcastError-modal.html",
						windowClass: "rdhtml5-sign-in dark",
						ariaDescribedBy: "ErrorDescribedByID",
						backdrop: "static",
						keyboard: !0,
						controller: ["$scope", function (a) {
							a.errorTitle = c, a.errorText = d
						}]
					})
				}
			}
		}
		angular.module("rdpClientUI").factory("BroadcastError", ["$uibModal", a]).run(["BroadcastError", "$rootScope", function (a, b) {
			b.$on("rdpClientUI:ErrorMessageModal", function (b, c) {
				a.prompt(c)
			})
		}])
	}(),
	function () {
		"use strict";

		function a(a, b, c, d) {
			var e = [],
				f = {},
				g = null,
				h = function () {
					e = c.desktopSessionList(), f = c.sessionListGrouped()
				};
			c.events.subscribe(SessionProviderEvent.SessionCreated, h), c.events.subscribe(SessionProviderEvent.SessionDestroyed, h), c.events.subscribe(SessionProviderEvent.SessionOrderChanged, h), c.events.subscribe(SessionProviderEvent.SessionGroupingChanged, h), c.events.subscribe(SessionProviderEvent.SessionIconChanged, h);
			var i, j, k, l;
			return a("FULLSCREEN_LABEL").then(function (a) {
				i = a
			}, function (a) {
				i = a
			}), a("EXIT_FULLSCREEN_LABEL").then(function (a) {
				j = a
			}, function (a) {
				j = a
			}), a("NAVBAR_PIN_LABEL").then(function (a) {
				k = a
			}, function (a) {
				k = a
			}), a("NAVBAR_UNPIN_LABEL").then(function (a) {
				l = a
			}, function (a) {
				l = a
			}), {
				isAuthenticated: function () {
					return b.isAuthenticated()
				},
				isDesktopSessionActive: function (a) {
					return !(!d.isSessionPaneActive() || c.activeSession.id !== a.id)
				},
				isAppGroupActive: function (a) {
					return !(!d.isSessionPaneActive() || c.activeSession.getApplicationId() !== a)
				},
				isSessionConnected: function (a) {
					return !(!a.connection || a.connection.getState() !== ConnectionState.Connected)
				},
				isSessionDisconnected: function (a) {
					return !(!a.connection || a.connection.getState() !== ConnectionState.Disconnected)
				},
				getUserName: function () {
					return b.getUserName()
				},
				getUserEmail: function () {
					return b.getUPN()
				},
				getUserInitials: function () {
					return b.getUserInitials()
				},
				getRemoteDesktopSessions: function () {
					return e
				},
				getAppGroups: function () {
					return f
				},
				focusSession: function (a) {
					c.focusToSession(a.id, !0)
				},
				dismissSession: function (a) {
					c.dismissSession(a.id)
				},
				showDesktopDivider: function () {
					return e.length > 0 && !LaunchModeSettings.hideAllResourcesUI()
				},
				showAppsDivider: function () {
					return Object.keys(f).length > 0 && !LaunchModeSettings.hideAllResourcesUI()
				},
				disableHover: function (a) {
					g = a
				},
				enableHover: function (a) {
					g === a && (g = null)
				},
				isHoverEnabled: function () {
					return !g || !f.hasOwnProperty(g)
				},
				getFullscreenButtonText: function () {
					return d.inFullscreen() ? j : i
				},
				getPinButtonText: function () {
					return d.isNavbarPinned() ? l : k
				},
				isPrintingActive: function () {
					for (var a = d.isPrintJobAlertActive(), b = c.connectionList(), e = 0; !a && e < b.length; e++) a = b[e].getPendingPrintJobCount() > 0;
					return a
				},
				isUserAccountDetailsOpen: function () {
					return d.isUserAccountDetailsOpen()
				},
				handleHideUserAccountDetails: function () {
					d.closeUserAccountDetails()
				},
				handleShowUserAccountDetails: function () {
					d.openUserAccountDetails()
				},
				handleToggleUserAccountDetails: function () {
					d.toggleUserAccountDetails()
				},
				showDriveUploadIcon: function () {
					return d.showDriveUpload()
				},
				isDriveUploadActive: function () {
					return d.isDriveUploadJobActive()
				},
				driveUploadText: function () {
					return d.driveUploadJobText()
				},
				setFocusMoreOptionsEscape: function (a) {
					if (27 === a.keyCode) {
						var b = document.querySelector("#MoreOptionMenuButton");
						b && b.focus()
					}
				},
				setFocusUserAccountEscape: function (a) {
					if (27 === a.keyCode) {
						var b = document.querySelector("#UserAccountMenuButton");
						b && b.focus()
					}
				},
				isMoreMenuOpen: !1,
				isUserMenuOpen: !1,
				getMyAccountLink: function () {
					return b.getPasswordResetLink()
				},
				getPasswordChangeEnabled: function () {
					return b.getPasswordChangeEnabled()
				},
				onFilesUploaded: function (a) {
					c.uploadTest(a)
				},
				hideAllResourcesTab: function () {
					return LaunchModeSettings.hideAllResourcesUI()
				},
				viewManager: d
			}
		}
		angular.module("rdpClientUI").component("rdpClientNavbar", {
			templateUrl: "app/rdp-client-ui/rdp-client-ui-navbar.html",
			controller: ["$translate", "userAuthInfoService", "sessionProvider", "viewManager", a],
			controllerAs: "ctrl"
		})
	}(),
	function () {
		function a(a) {
			var b, c = a.localStorage,
				d = {};
			if (!c) throw new Error("Local storage is not supported");
			try {
				b = !!JSON.parse(c.getItem("rdpClientUI.suppressClipHelpGlobally"))
			} catch (a) {
				b = !1
			}
			return {
				getSuppressClipHelpForConnection: function (a) {
					return !(!b && !d[a])
				},
				setSuppressClipHelpForConnection: function (a, b) {
					d[a] = !!b
				},
				setSuppressClipHelpGlobally: function (a) {
					b = !!a, c.setItem("rdpClientUI.suppressClipHelpGlobally", JSON.stringify(b))
				}
			}
		}
		angular.module("rdpClientUI").factory("rdpClientUIProperties", ["$window", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c) {
			return b.isInteractiveLoginRequired() && a.prompt(), {
				viewManager: c,
				hideNavBar: function () {
					return LaunchModeSettings.hideNavbar()
				}
			}
		}
		angular.module("rdpClientUI").component("rdpClientTopView", {
			templateUrl: "app/rdp-client-ui/rdp-client-ui-top-view.html",
			controller: ["signInModal", "userAuthInfoService", "viewManager", a],
			controllerAs: "topViewCtrl"
		})
	}(),
	function () {
		var a = function (a, b, c, d, e, f, g) {
			var h, i = !0,
				j = {
					HIDDEN: 0,
					VISIBLE: 1,
					PINNED: 2
				},
				k = j.PINNED,
				l = null,
				m = !0,
				n = e !== e.top,
				o = function () {
					i = !0
				},
				p = function () {
					i = !1
				},
				q = function () {
					0 === f.sessionList().length && o()
				},
				r = function () {
					0 !== f.sessionList().length && f.activeSession && p()
				},
				s = function () {
					return b[0].fullscreenEnabled || b[0].webkitFullscreenEnabled || b[0].mozFullScreenEnabled || b[0].msFullscreenEnabled
				},
				t = function () {
					return b[0].fullscreenElement || b[0].webkitFullscreenElement || b[0].mozFullScreenElement || b[0].msFullscreenElement
				},
				u = function () {
					t() ? b[0].exitFullscreen ? b[0].exitFullscreen() : b[0].webkitExitFullscreen ? b[0].webkitExitFullscreen() : b[0].mozCancelFullScreen ? b[0].mozCancelFullScreen() : b[0].msExitFullscreen && b[0].msExitFullscreen() : b[0].documentElement.webkitRequestFullscreen ? b[0].documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : b[0].documentElement.requestFullscreen ? b[0].documentElement.requestFullscreen() : b[0].documentElement.mozRequestFullScreen ? b[0].documentElement.mozRequestFullScreen() : b[0].documentElement.msRequestFullscreen && b[0].documentElement.msRequestFullscreen()
				},
				v = function () {
					l && (c.cancel(l), l = null)
				},
				w = function () {
					l && (c.cancel(l), l = null), k === j.VISIBLE && m && (l = c(h, 3e3))
				},
				x = !1,
				y = null,
				z = function () {
					x ? c(function () {
						x = !1, y && (c.cancel(y), y = null), c(z, 500)
					}) : (x = !0, y = c(function () {
						x = !1, y = null
					}, 6e3).catch(function () {}))
				},
				A = !1,
				B = "",
				C = null,
				D = !1,
				E = function () {
					return k === j.PINNED
				},
				F = function () {
					E() || (k = j.VISIBLE), A = !0
				},
				G = function () {
					C = c(function () {
						A = !1, C = null, E() || w()
					}, 6e3).catch(function () {})
				},
				H = function (a) {
					B = a
				},
				I = function () {
					D = !0
				},
				J = function () {
					D = !1
				},
				K = function (a) {
					k === j.HIDDEN && (k = j.VISIBLE, "keydown" === a.type && c(function () {
						var a = b.find("#rdp-navbar-pin");
						a.length > 0 && a[0].focus()
					}, 0)), w()
				};
			h = function () {
				k === j.VISIBLE && m && (k = j.HIDDEN)
			};
			var L = function () {
					k = k === j.PINNED ? j.HIDDEN : j.PINNED, w()
				},
				M = function () {
					return k !== j.HIDDEN
				},
				N = !1,
				O = function () {
					return N
				},
				P = function () {
					m = !0, N = !1, E() || w()
				},
				Q = function () {
					m = !1, N = !0
				},
				R = function () {
					N = !N, N ? m = !1 : E() || w()
				},
				S = function () {
					d.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/Common/About.html",
						controller: "AboutCtrl",
						windowClass: "rdhtml5-sidepanel session-modal",
						placement: "right",
						backdrop: !0,
						keyboard: !0,
						ariaLabelledBy: "about_modal_title",
						resolve: {
							params: function () {
								return {
									platformInfo: g
								}
							}
						}
					}).result.finally(function () {
						m = !0, w()
					}), m = !1
				},
				T = function () {
					d.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/Common/Settings.html",
						controller: "SettingsCtrl",
						windowClass: "rdhtml5-sidepanel session-modal",
						placement: "right",
						backdrop: !0,
						keyboard: !0,
						ariaLabelledBy: "settings_modal_title"
					}).result.finally(function () {
						m = !0, w()
					}), m = !1
				};
			return a.$watch(function () {
				return f.sessionList().length
			}, q), a.$watch(function () {
				return f.activeSession
			}, r), a.$on("rdPrinting:printStart", z), a.$on("rdDriveRedir:startUpload", F), a.$on("rdDriveRedir:uploadComplete", G), a.$on("rdDriveRedir:uploadAlertText", function (a, b) {
				H(b)
			}), a.$on("rdDriveRedir:showFileUploadIcon", I), a.$on("rdDriveRedir:hideFileUploadIcon", J), b.on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function () {
				a.$digest()
			}), {
				isClientEmbedded: function () {
					return n
				},
				isAllResourcesPaneActive: function () {
					return i
				},
				tabIndexForAllResourcesPane: function () {
					return i ? -1 : 1
				},
				isSessionPaneActive: function () {
					return !i
				},
				activateAllResourcesPane: o,
				activateSessionPane: p,
				showNavbar: K,
				toggleNavbarPinState: L,
				isNavbarVisible: M,
				isNavbarPinned: E,
				onNavbarEnter: v,
				onNavbarLeave: w,
				isUserAccountDetailsOpen: O,
				closeUserAccountDetails: P,
				openUserAccountDetails: Q,
				toggleUserAccountDetails: R,
				isFullscreenSupported: s,
				inFullscreen: t,
				toggleFullscreen: u,
				openAboutModal: S,
				openSettingsModal: T,
				isPrintJobAlertActive: function () {
					return x
				},
				isDriveUploadJobActive: function () {
					return A
				},
				showDriveUpload: function () {
					return D
				},
				driveUploadJobText: function () {
					return B
				},
				dismissPrintJobAlert: function () {
					x = !1
				},
				dismissDriveUploadJobAlert: function () {
					A = !1
				}
			}
		};
		angular.module("rdpClientUI").factory("viewManager", ["$rootScope", "$document", "$timeout", "$aside", "$window", "sessionProvider", "platformInfo", a])
	}(), angular.module("rdpClientUI").factory("sessionProvider", ["rdFeedTracker", "sessionStore", "logger", "trustedCollections", "telemetry", "printing", "driveRedirection", "platformInfo", "rdDiagnostics", "rdDebuggingEvents", "$injector", "$window", "$rootScope", function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
		var n;
		try {
			n = new(l.AudioContext || l.webkitAudioContext)
		} catch (a) {
			c.warn("Failed to create audio context")
		}
		try {
			g.clearAllFileSystemIndexedDB(), c.debug("Cleared file system IndexedDB")
		} catch (a) {
			c.error("Failed to clear file system IndexedDB")
		}
		var o = null;
		k.has("rdStandaloneCertLogonTokenService") && (o = k.get("rdStandaloneCertLogonTokenService"));
		var p = new ConnectionFactory(ConnectionFactoryType.RdpConnection, c, n, e, f, g, h, i, o, j),
			q = new SessionFactory(p, c, a, d, j, m);
		return new SessionProvider(q, p, b, null, null, c, l)
	}]), angular.module("rdpClientUI").factory("sessionStore", [function () {
		return new SessionStore
	}]),
	function () {
		"use strict";

		function a(a, b) {
			a.getRetryCount = function () {
				return b.retryState[b.sessionId] && b.retryState[b.sessionId].retryCount
			}, a.cancel = function () {
				a.dialog.cancel()
			}
		}
		angular.module("rdpClientUI").controller("autoreconCtrl", ["$scope", "params", a])
	}(),
	function () {
		"use strict";

		function a(a) {
			a.dontShowAgain = !1, a.isMac = navigator.platform.indexOf("Mac") > -1, a.close = function () {
				a.dialog.close(a.dontShowAgain)
			}
		}
		angular.module("rdpClientUI").controller("ClipHelptipCtrl", ["$scope", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c) {
			a.ok = function () {
				try {
					document.execCommand("copy")
				} catch (a) {}
				b.close()
			}, a.copyAlertDescribedByID = c.copyAlertDescribedByID
		}
		angular.module("rdpClientUI").controller("copyAlertCtrl", ["$scope", "$uibModalInstance", "params", a])
	}(),
	function () {
		"use strict";

		function a(a, b) {
			b && b.credRequest && b.credRequest.cred && (a.user = b.credRequest.cred), a.userName = b.username || "", a.userPrefilled = !!a.userName, a.cancel = function () {
				a.dialog.cancel()
			}, a.submit = function (c, d) {
				a.dialog.close({
					username: c,
					password: d || "",
					params: b
				})
			}
		}
		angular.module("rdpClientUI").controller("credPromptCtrl", ["$scope", "params", a])
	}(),
	function () {
		"use strict";

		function a(a, b) {
			a.displayShowDetails = b.displayShowDetails, a.cancel = function () {
				a.dialog.cancel()
			}, a.isSessionConnected = function () {
				return b.desktopBackgroundHandler.isSessionConnected(b.sessionId)
			}, a.displayDesktopBackground = function () {
				b.desktopBackgroundHandler.displayDesktopBackground(!0, b.sessionId)
			}, a.getConnState = function () {
				return b.connState[b.sessionId] && b.connState[b.sessionId].state
			}, a.appPackageName = b.appPackageName
		}
		angular.module("rdpClientUI").controller("loaderTemplateCtrl", ["$scope", "params", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c) {
			a.ok = function () {
				b.close()
			}, a.popupAlertDescribedByID = c.popupAlertDescribedByID
		}
		angular.module("rdpClientUI").controller("popupAlertCtrl", ["$scope", "$uibModalInstance", "params", a])
	}(),
	function () {
		"use strict";

		function a(a, b, c, d) {
			d && d.redirectionRequest && d.redirectionRequest.properties && (a.redirectionsRequested = [], d.redirectionRequest.properties.connectionSettings.EnableClipboard && a.redirectionsRequested.push({
				id: "clipboard",
				locKey: "REDIRECTION_DIALOG_CLIPBOARD_LABEL",
				available: !0
			}), d.redirectionRequest.properties.connectionSettings.EnablePrinting && a.redirectionsRequested.push({
				id: "printer",
				locKey: "REDIRECTION_DIALOG_PRINTER_LABEL",
				available: !0
			}), d.redirectionRequest.properties.connectionSettings.EnableAudioInput && a.redirectionsRequested.push({
				id: "audioInput",
				locKey: "REDIRECTION_DIALOG_AUDIOINPUT_LABEL",
				available: c.isAudioInputSupported()
			}), d.redirectionRequest.properties.connectionSettings.EnableDriveRedirection && a.redirectionsRequested.push({
				id: "drive",
				locKey: "REDIRECTION_DIALOG_DRIVEREDIRECTION_LABEL",
				available: c.isIndexedDBSupported()
			}), a.redirections = {
				clipboard: !0,
				printer: !0,
				audioInput: c.isAudioInputSupported(),
				drive: !1
			}, a.rememberCollection = !1, a.redirDialogDescribedByID = d.redirDialogDescribedByID), a.cancel = function () {
				b.dismiss("cancel")
			}, a.submit = function (a, c) {
				b.close({
					clipboard: a.clipboard,
					printer: a.printer,
					audioInput: a.audioInput,
					drive: a.drive,
					rememberCollection: c,
					params: d
				})
			}
		}
		angular.module("rdpClientUI").controller("redirectionPromptCtrl", ["$scope", "$uibModalInstance", "browserCapabilities", "params", a])
	}(),
	function () {
		"use strict";

		function a(a, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
			function t() {}

			function u(b, c) {
				var d = s.getSavedCreds();
				d ? b.complete(d) : a.openCredentialPromptModal(b, c.id)
			}

			function v(a) {
				O.hasOwnProperty(a) && (O[a].cancel(), delete O[a])
			}

			function w(b) {
				a.openRedirectionPromptModal(b, o)
			}

			function x(b, c) {
				a.vm.disconnectSession(b, c)
			}

			function y(a) {
				var b = o.find(a);
				return !(!b || !b.connection || b.connection.getState() !== ConnectionState.Connected)
			}

			function z(b, c) {
				a.vm.displayDesktopBackground(b, c)
			}

			function A(a, b, c, d) {
				if (!M.hasOwnProperty(a)) {
					var e = {
							isSessionConnected: y,
							displayDesktopBackground: z
						},
						f = o.find(a);
					const g = f && f.getBookmark() && f.getBookmark().bookmarkType === BookmarkType.RemoteApp;
					var h = r.open(b, {
						templateUrl: "app/rdp-client-ui/Session/loaderTemplate.html",
						controller: "loaderTemplateCtrl",
						windowClass: "rdhtml5-loader session-modal dark",
						params: {
							appPackageName: d,
							sessionId: a,
							connState: c,
							desktopBackgroundHandler: e,
							displayShowDetails: g
						}
					});
					h.onClose = function (b) {
						b && x(a, !1), M.hasOwnProperty(a) && delete M[a]
					}, h.onCancel = function () {
						h.onClose(!0)
					}, M[a] = h
				}
			}

			function B(a) {
				M.hasOwnProperty(a) && (M[a].close(!1), delete M[a])
			}

			function C(a, b, c) {
				if (!N.hasOwnProperty(a)) {
					var d = r.open(b, {
						templateUrl: "app/rdp-client-ui/Session/autoreconDialogTemplate.html",
						controller: "autoreconCtrl",
						windowClass: "rdhtml5-loader session-modal dark",
						params: {
							sessionId: a,
							retryState: c
						}
					});
					d.onClose = function (b) {
						b && x(a, !0), N.hasOwnProperty(a) && delete N[a]
					}, d.onCancel = function () {
						d.onClose(!0)
					}, N[a] = d
				}
			}

			function D(a) {
				N.hasOwnProperty(a) && (N[a].close(!1), delete N[a])
			}

			function E(a, b) {
				return e.open({
					animation: !0,
					templateUrl: "app/rdp-client-ui/Session/toast.html",
					windowClass: "rdhtml5-toast",
					controller: "toastCtrl",
					resolve: {
						params: function () {
							return {
								message: a,
								toastType: b
							}
						}
					}
				})
			}

			function F(a, b) {
				var c = E(a, b);
				g(function () {
					c.close()
				}, 3e3)
			}

			function G(c) {
				var d = b++,
					f = "copyAlertDescribedBy" + d,
					h = e.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/Session/copyAlert.html",
						windowClass: "rdhtml5-copyInstance",
						controller: "copyAlertCtrl",
						backdrop: "static",
						ariaDescribedBy: f,
						keyboard: !0,
						resolve: {
							params: function () {
								return {
									copyAlertDescribedByID: f
								}
							}
						}
					}),
					i = g(function () {
						h.dismiss()
					}, L);
				h.result.then(function () {
					c && c()
				}).finally(function () {
					g.cancel(i), a.vm.postCopyDialogCleanup(), a.$broadcast("rdpClientUI:sessionTakeFocus")
				})
			}

			function H(b) {
				r.open(b, {
					templateUrl: "app/rdp-client-ui/Session/clipHelptipTemplate.html",
					controller: "ClipHelptipCtrl",
					windowClass: "rdhtml5-cliphelptip session-modal dark"
				}).onClose = function (b) {
					a.vm.setDontShowHelpTipValue(b)
				}
			}

			function I(a) {
				var b = d++,
					c = "noGatewayDescribedBy" + b;
				e.open({
					animation: !0,
					templateUrl: "app/rdp-client-ui/Session/noGatewayErrorTemplate.html",
					windowClass: "rdhtml5-nogatewayerror session-modal dark",
					backdrop: "static",
					keyboard: !0,
					ariaDescribedBy: c,
					controller: ["$scope", function (b) {
						b.describedByID = c, b.sessionTitle = a.bookmark.label()
					}]
				})
			}

			function J() {
				var b = e.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/Session/localIMEAlert.html",
						windowClass: "rdhtml5-localimealert session-modal dark",
						backdrop: "static",
						ariaDescribedBy: "localIMEAlertModalID",
						keyboard: !0
					}),
					c = g(function () {
						b.dismiss()
					}, L);
				b.result.then(function () {}).finally(function () {
					g.cancel(c), a.$broadcast("rdpClientUI:sessionTakeFocus")
				})
			}
			var K, L = 6e3,
				M = {},
				N = {},
				O = {};
			K = new SessionViewModel(g, o, p, n, m, l, k, function () {
				return j("<canvas rd-input />")(a)[0]
			}, q, i), h.trustAsUrl("app/rdp-client-ui/Session/clipHelptipTemplate.html"), o && o.events && o.events.subscribe(SessionProviderEvent.RedirectionsRequest, w), a.connectionDialog = r, a.vm = K, a.vm.delegate.allSessionsDisconnected = t, a.vm.delegate.onCredentialsNeeded = u, a.vm.delegate.onTrustChallenge = function (a) {
				a.complete(0)
			}, a.vm.delegate.openLoaderModal = A, a.vm.delegate.closeLoaderModal = B, a.vm.delegate.closeCredentialsPrompt = v, a.vm.delegate.openAutoreconDialog = C, a.vm.delegate.closeAutoreconDialog = D, a.vm.delegate.sessionTakeFocus = function () {
				a.$broadcast("rdpClientUI:sessionTakeFocus")
			}, a.vm.delegate.showToast = F, a.vm.delegate.showCopyConfirmationDialog = G, a.vm.delegate.showClipHelptip = H, a.vm.delegate.showNoGatewayError = I, a.currentOpenAppGroup = [], a.vm.init(), a.$on("$destroy", function () {
				a.vm.dismissed()
			}), a.disconnectAllSessions = function () {
				a.vm.disconnectAllSessions()
			}, a.focusToSession = function (b) {
				a.vm.focusToSession(b)
			}, a.closeAppGroup = function (b) {
				a.vm.closeAppGroup(b)
			}, a.openPopover = function (b) {
				g(function () {
					a.vm.openPopover(b), a.currentOpenAppGroup = a.vm.getAppListForId(b)
				})
			}, a.closePopover = function (b) {
				g(function () {
					a.vm.closePopover(b)
				})
			}, a.isAuthenticated = function () {
				return q.isAuthenticated()
			}, a.getUserName = function () {
				return q.getUserName()
			}, a.openCredentialPromptModal = function (a, b) {
				var c = r.open(b, {
						templateUrl: "app/rdp-client-ui/Session/credentialPromptTemplate.html",
						controller: "credPromptCtrl",
						windowClass: "rdhtml5-credPrompt session-modal dark",
						params: {
							credRequest: a,
							username: q.getUPN()
						}
					}),
					d = new Credential;
				c.onClose = function (c) {
					d.userName = c.username, d.password = c.password, a.complete(d), O.hasOwnProperty(b) && delete O[b]
				}, c.onCancel = function () {
					a.cancel(), O.hasOwnProperty(b) && delete O[b]
				}, O[b] = c
			}, a.openRedirectionPromptModal = function (a, b) {
				var d = c++,
					f = "redirDialogDescribedBy" + d,
					g = e.open({
						animation: !0,
						templateUrl: "app/rdp-client-ui/Session/redirectionPromptTemplate.html",
						windowClass: "rdhtml5-redirectionPrompt session-modal dark",
						controller: "redirectionPromptCtrl",
						backdrop: "static",
						keyboard: !0,
						ariaDescribedBy: f,
						resolve: {
							params: function () {
								return {
									redirectionRequest: a,
									redirDialogDescribedByID: f
								}
							}
						}
					}),
					h = new Redirections;
				g.result.then(function (b) {
					h.clipboard = b.clipboard, h.printer = b.printer, h.audioInput = b.audioInput, h.drive = b.drive, h.rememberCollection = b.rememberCollection, a.complete(h)
				}, function () {
					b.setReconnecting(!1), a.cancel()
				})
			}, a.hasBookmarks = function (b) {
				return a.vm.hasBookmarks(b.id)
			}, a.getActiveSession = function () {
				return o.activeSession
			}, a.getReconnecting = function () {
				return o.getReconnecting()
			}, a.vm.delegate.openLocalIMEAlert = J
		}
		var b = 0,
			c = 0,
			d = 0;
		angular.module("rdpClientUI").component("sessionView", {
			templateUrl: "app/rdp-client-ui/Session/Session.html",
			controller: ["$scope", "$uibModal", "$aside", "$timeout", "$sce", "$window", "$compile", "platformInfo", "logger", "rdpClientUIProperties", "sessionStore", "sessionProvider", "driveRedirection", "userAuthInfoService", "connectionDialog", "credentialStore", a]
		})
	}(),
	function () {
		"use strict";

		function a() {
			return {
				restrict: "A",
				link: function (a, b) {
					a.vm.canvas = b[0]
				}
			}
		}

		function b() {
			return {
				restrict: "A",
				link: function () {}
			}
		}

		function c() {
			return {
				restrict: "A",
				scope: !0,
				link: function (a, b) {
					b.on({
						dragenter: function (a) {
							a.stopPropagation(), a.preventDefault()
						},
						dragover: function (a) {
							a.stopPropagation(), a.preventDefault()
						},
						drop: function (b) {
							b.stopPropagation(), b.preventDefault(), a.vm.handleFilePasteEvent(b.originalEvent)
						},
						mousedown: function (b) {
							a.vm.mouseDown(b.pageX, b.pageY, b.which), b.preventDefault()
						},
						mouseup: function (b) {
							a.vm.mouseUp(b.pageX, b.pageY, b.which), b.preventDefault()
						},
						mousemove: function (b) {
							a.vm.mouseMove(b.pageX, b.pageY), b.preventDefault()
						},
						mouseleave: function (b) {
							a.vm.mouseLeave(b.pageX, b.pageY)
						},
						mouseenter: function () {
							a.vm.mouseEnter()
						},
						wheel: function (b) {
							a.vm.mouseWheel(-b.originalEvent.deltaX, -b.originalEvent.deltaY), b.preventDefault()
						},
						contextmenu: function (a) {
							a.preventDefault()
						},
						touchstart: function (b) {
							a.vm.touchStart(b.originalEvent.changedTouches)
						},
						touchmove: function (b) {
							a.vm.touchMove(b.originalEvent.changedTouches)
						},
						touchend: function (b) {
							a.vm.touchEnd(b.originalEvent.changedTouches)
						},
						touchcancel: function (b) {
							a.vm.touchCancel(b.originalEvent.changedTouches)
						}
					})
				}
			}
		}

		function d(a, b, c, d, e, f) {
			return {
				restrict: "A",
				link: function (g, h) {
					var i = !0,
						j = !1,
						k = function () {
							return a(function () {
								i = !0
							}, 550)
						};
					g.vm.textBox = h[0];
					var l = function () {
						a(function () {
							d.isSessionPaneActive() && (e.isDialogVisible() ? e.focusTopMostDialog() : h.focus())
						})
					};
					g.vm.canvasContainer.addEventListener("click", l), g.$on("rdpClientUI:sessionTakeFocus", l), g.$on("$destroy", function () {
						g.vm.canvasContainer.removeEventListener("click", l)
					}), h.on({
						blur: function () {
							g.vm.canvasLostFocus()
						},
						keypress: function (a) {
							g.vm.keyPress(a.which, a, f.IMEEnabled) && a.preventDefault()
						},
						keydown: function (a) {
							if ("Home" === a.key && a.altKey && a.ctrlKey && !a.metaKey) {
								var b;
								b = d.isNavbarVisible() ? c.find("#rdp-all-resources-link") : c.find("#rdp-collapsed-toolbar"), b.length > 0 && b[0].focus(), a.preventDefault()
							} else g.vm.keyDown(a, f.IMEEnabled) && a.preventDefault()
						},
						keyup: function (a) {
							g.vm.executeCopy(), g.vm.keyUp(a, f.IMEEnabled) && a.preventDefault()
						},
						cut: function () {
							g.vm.sendCutEvent(), j = !0
						},
						copy: function () {
							!j && i ? (g.vm.sendCopyEvent(), i = !1) : j = !1, k()
						},
						paste: function (a) {
							var c = b.clipboardData || a.originalEvent.clipboardData,
								d = c.getData("text") || "";
							g.vm.handleTextPasteEvent(d), a.preventDefault()
						}
					})
				}
			}
		}

		function e() {
			return {
				restrict: "A",
				link: function (a, b) {
					a.vm.textBox = b[0]
				}
			}
		}

		function f(a, b, c, d) {
			return {
				restrict: "A",
				scope: !0,
				link: function (e, f) {
					function g() {
						var a = {
							width: f[0].offsetWidth,
							height: f[0].offsetHeight
						};
						if (i.width !== a.width || i.height !== a.height) {
							var b, c = d.connectionList();
							for (b = 0; b < c.length; b++) c[b].updateMonitorLayout()
						}
						i.width = a.width, i.height = a.height
					}
					var h = angular.element(a),
						i = {
							width: null,
							height: null
						},
						j = _.debounce(function () {
							g()
						}, 125);
					e.$watch(function () {
						return c.isNavbarPinned()
					}, function (a, b) {
						a !== b && j()
					}), h.on("resize", j), b.on("webkitfullscreenchange mozfullscreenchange fullscreenchange", j), e.$on("$destroy", function () {
						h.off("resize", j), b.off("webkitfullscreenchange mozfullscreenchange fullscreenchange", j)
					})
				}
			}
		}

		function g(a) {
			return {
				restrict: "A",
				scope: {
					modalType: "@",
					closeModal: "&",
					textContent: "@"
				},
				link: function (b, c) {
					function d() {
						a(function () {
							b.closeModal({
								result: "showToast"
							})
						}, e)
					}
					var e = 50;
					switch (b.modalType) {
						case "copy":
							a(function () {
								angular.element(c).attr("readonly", "readonly"), c[0].select()
							}, e);
							break;
						case "paste":
							c.on("paste", d)
					}
				}
			}
		}

		function h(a, b) {
			return {
				scope: !1,
				restrict: "A",
				link: function (c, d) {
					function e(c) {
						var d = 0,
							e = 0,
							f = c || b.event;
						return f.pageX || f.pageY ? (d = f.pageX, e = f.pageY) : (f.clientX || f.clientY) && (d = f.clientX + a[0].body.scrollLeft + a[0].documentElement.scrollLeft, e = f.clientY + a[0].body.scrollTop + a[0].documentElement.scrollTop), {
							x: d,
							y: e
						}
					}

					function f(a) {
						l = e(a), m = l.x, n = l.y, o = u[0].offsetWidth + 4, p = u[0].offsetHeight + 4, q = window.innerWidth, r = window.innerHeight, u[0].style.left = q - m < o ? q - o - y + "px" : m - y + "px", u[0].style.top = r - n < p ? r - p - y + "px" : n - y + "px"
					}

					function g() {
						w !== v.menuOn ? (w = v.menuOn, u.addClass(x)) : w !== v.menuOff && (s.removeClass("hover-class-dup"), w = v.menuOff, u.removeClass(x))
					}

					function h(a) {
						s = angular.element(a.srcElement || a.target), t = s.attr("id") || s.parent().attr("id"), s.is("img") ? s.addClass("hover-class-dup") : s.children().first().addClass("hover-class-dup"), z = t, t && (a.preventDefault(), g(), f(a))
					}

					function i(a) {
						27 === a.keyCode && 0 !== w && g()
					}

					function j(a) {
						z && (angular.element(a.target).hasClass("context-menu__link") || angular.element(a.target).hasClass("mdl-Cancel")) ? (c.closeAppGroup(z), g()) : 0 !== w && g()
					}

					function k() {
						0 !== w && g()
					}
					var l, m, n, o, p, q, r, s, t, u = angular.element(a[0].getElementById("context-menu")),
						v = {
							menuOn: 1,
							menuOff: 0
						},
						w = 0,
						x = "context-menu--active",
						y = 2,
						z = null;
					a.on("click", j), d.on("contextmenu", h), u.on("mouseleave", k), angular.element(b).on("keyup", i), c.$on("$destroy", function () {
						a.off("click", j), d.off("contextmenu", h), u.off("mouseleave", g), angular.element(b).off("keyup", i)
					})
				}
			}
		}
		angular.module("rdpClientUI").directive("canvasSizeHandler", ["$window", "$document", "viewManager", "sessionProvider", f]).directive("connectionIndicator", [b]).directive("contextmenuHandler", ["$document", "$window", h]).directive("clipTextbox", ["$timeout", "$window", "$document", "viewManager", "connectionDialog", "appSettingsStore", d]).directive("auxTextboxElement", e).directive("rdCanvas", [a]).directive("rdInput", [c]).directive("textareaHandler", ["$timeout", g])
	}();
var SessionViewModelDelegate = function () {
		"use strict";
		this.allSessionsDisconnected = null, this.onCredentialsNeeded = null, this.onTrustChallenge = null, this.openLoaderModal = null, this.closeLoaderModal = null, this.closeCredentialsPrompt = null, this.openAutoreconDialog = null, this.closeAutoreconDialog = null, this.sessionTakeFocus = null, this.showToast = null, this.showCopyConfirmationDialog = null, this.showClipHelptip = null, this.showNoGatewayError = null, this.openLocalIMEAlert = null
	},
	ClipTipHelper = function (a, b) {
		"use strict";
		var c = this;
		return c.showCliphelpTip = function (c, d, e) {
			try {
				a.getSuppressClipHelpForConnection(d) || !c.isChrome && !c.isIE || e && e(d), a.setSuppressClipHelpForConnection(d, !0)
			} catch (a) {
				b.error("[CliptipHelper] Unable to show the helptip template " + a.message)
			}
		}, c.setDontShowHelpTipValue = function (b) {
			a.setSuppressClipHelpGlobally(b)
		}, c
	},
	KbHelper = function (a, b) {
		"use strict";
		var c = this;
		c.nonCharKeySet = new Set;
		for (var d in KeyCodes) KeyCodes.hasOwnProperty(d) && c.nonCharKeySet.add(KeyCodes[d]);
		return c.isNonCharacterKey = function (a) {
			return c.nonCharKeySet.has(a)
		}, c.isCmdPressed = function () {
			return a.isMac && (void 0 !== b[KeyCodes.Cmd1] && b[KeyCodes.Cmd1] || void 0 !== b[KeyCodes.Cmd2] && b[KeyCodes.Cmd2] || void 0 !== b[KeyCodes.Cmd3] && b[KeyCodes.Cmd3])
		}, c.isAltPressed = function (a) {
			return a.altKey || void 0 !== b[KeyCodes.Alt] && b[KeyCodes.Alt]
		}, c.isCtrlPressed = function (a) {
			return a.ctrlKey || void 0 !== b[KeyCodes.Ctrl] && b[KeyCodes.Ctrl]
		}, c.convertToCRLF = function (a) {
			return a.replace(/\r?\n/g, "\r\n")
		}, c.isNumericPadKey = function (a) {
			return a in NumericPadKeyCodes
		}, c.isCtrlAltCharacterShortCuts = function (a) {
			return a in CtrlAltCharacterShortCuts
		}, c
	},
	SessionViewModel = function (a, b, c, d, e, f, g, h, i, j) {
		"use strict";
		var k, l, m = {
				sessionList: {},
				events: new EventProvider,
				canvas: null,
				canvases: {},
				canvasContainer: document.getElementById("canvas-container"),
				textBox: null,
				clipboard: {}
			},
			n = !1,
			o = null,
			p = !1,
			q = [100, 250, 500],
			r = [],
			s = !1,
			t = {},
			u = {},
			v = !1,
			w = {},
			x = !1,
			y = new ClipTipHelper(e, f),
			z = new KbHelper(g, w),
			A = {},
			B = null,
			C = "",
			D = !0,
			E = _.throttle(function () {
				a()
			}, 100),
			F = function (a) {
				return m.canvases.hasOwnProperty(a) || (m.canvases[a] = h()), m.canvases[a]
			},
			G = function () {
				m.canvas.width > m.canvasContainer.offsetWidth ? m.canvasContainer.style.overflowX = "auto" : m.canvasContainer.style.overflowX = "hidden", m.canvas.height > m.canvasContainer.offsetHeight ? m.canvasContainer.style.overflowY = "auto" : m.canvasContainer.style.overflowY = "hidden"
			},
			H = function (a) {
				var b = F(a);
				b && (b !== m.canvas && (m.canvas && m.canvasContainer.removeChild(m.canvas), m.canvas = b, m.canvasContainer.appendChild(m.canvas), G(), m.updateFileUploadStatus()), m.delegate.sessionTakeFocus && m.delegate.sessionTakeFocus())
			},
			I = function () {
				m.sessionList = b.sessionListGrouped(m.sessionList), E()
			},
			J = function () {
				b.hasActiveConnections() || m.delegate.allSessionsDisconnected()
			},
			K = function (a, b, c) {
				var e = "";
				switch (b) {
					case ConnectionState.OpeningRemotePort:
						e = "CONNECTION_OPENING_REMOTE_PORT";
						break;
					case ConnectionState.EstablishingSecureConnection:
						e = "CONNECTION_ESTABLISHING_SECURE_CONNECTION";
						break;
					case ConnectionState.ConfiguringRemoteConnection:
						e = "CONNECTION_CONFIGURING_REMOTE_CONNECTION";
						break;
					case ConnectionState.DetectingNetworkQuality:
						e = "CONNECTION_DETECTING_NETWORK_QUALITY";
						break;
					case ConnectionState.SessionBrokerFindingDestination:
						e = "CONNECTION_SESSION_BROKER_FINDING_DESTINATION";
						break;
					case ConnectionState.SessionBrokerLoadingDestination:
						e = "CONNECTION_SESSION_BROKER_LOADING_DESTINATION";
						break;
					case ConnectionState.SessionBrokerBringingSessionOnline:
						e = "CONNECTION_SESSION_BROKER_BRINGING_SESSION_ONLINE";
						break;
					case ConnectionState.SessionBrokerRedirectingToDestination:
						e = "CONNECTION_SESSION_BROKER_REDIRECTING_TO_DESTINATION";
						break;
					case ConnectionState.VirtualMachineLoading:
						e = "CONNECTION_VIRTUAL_MACHINE_LOADING";
						break;
					case ConnectionState.VirtualMachineWaking:
						e = "CONNECTION_VIRTUAL_MACHINE_WAKING";
						break;
					case ConnectionState.VirtualMachineStarting:
						e = "CONNECTION_VIRTUAL_MACHINE_STARTING";
						break;
					case ConnectionState.VirtualMachineRetryingSessionMonitoring:
						e = "CONNECTION_VIRTUAL_MACHINE_RETRYING_SESSION_MONITORING";
						break;
					case ConnectionState.VirtualMachineStartingSessionMonitoring:
					case ConnectionState.VirtualMachineStartingSessionMonitoring:
						e = "CONNECTION_VIRTUAL_MACHINE_STARTING_SESSION_MONITORING";
						break;
					case ConnectionState.StartingWVDVirtualMachine:
						e = "EVENT_BASED_SCALING_START";
						break;
					case ConnectionState.WaitingForWVDVirtualMachineToFinishBooting:
						e = "EVENT_BASED_SCALING_INPROGRESS"
				}
				if (t.hasOwnProperty(a) ? t[a].state = e : t[a] = {
						state: e
					}, 0 !== c) {
					u.hasOwnProperty(a) ? u[a].retryCount = c : u[a] = {
						retryCount: c
					};
					var f = d.find(a);
					m.delegate.openAutoreconDialog && f && m.delegate.openAutoreconDialog(a, f.getConnectionId(), u)
				}
				E()
			},
			L = function (a) {
				f.debug("[SessionViewModel] Received didConnect event on UI layer for session " + a);
				var c = b.find(a);
				c.getBookmark() && c.getBookmark().bookmarkType !== BookmarkType.RemoteApp && m.delegate.closeLoaderModal && m.delegate.closeLoaderModal(a), m.delegate.closeAutoreconDialog && m.delegate.closeAutoreconDialog(a), I(), H(k.getConnectionId())
			},
			M = function (a) {
				f.debug("[SessionViewModel] Received didDisconnect event on UI layer"), m.delegate.closeCredentialsPrompt && m.delegate.closeCredentialsPrompt(k.getConnectionId());
				var b = d.find(a);
				!m.delegate.closeLoaderModal || b && 0 !== b.getSiblingCount() || m.delegate.closeLoaderModal(a), !m.delegate.closeAutoreconDialog || b && 0 !== b.getSiblingCount() || m.delegate.closeAutoreconDialog(a), I(), J()
			},
			N = function (a, b) {
				f.error("[SessionViewModel] Session " + a + " had error: " + b)
			},
			O = function (a) {
				f.debug("[SessionViewModel] Received canvasNeeded event on UI layer, connectionID=" + a);
				var b = F(a);
				return f.debug(b), b
			},
			P = function (a) {
				f.debug("[SessionViewModel] Received retireCanvas event on UI layer, connectionID=" + a), delete m.canvases[a]
			},
			Q = function () {
				return f.debug("[SessionViewModel] Received monitorBound event on UI layer"), m.getMonitorBounds()
			},
			R = function (a, b) {
				!0 === a.isTokenRequired ? (f.debug("[SessionViewModel] Credentials requested (token)"), i.getCachedToken().then(function (b) {
					f.debug("[SessionViewModel] Token found, completing credential request with token"), a.completeWithToken("Bearer " + b.accessToken)
				}, function (b) {
					f.error("[SessionViewModel] Token not found, cancel credential request: " + b), a.cancel()
				})) : (f.debug("[SessionViewModel] Credentials requested (username/password)"), m.delegate.onCredentialsNeeded && m.delegate.onCredentialsNeeded(a, b))
			},
			S = function (a) {
				m.handleFileInputEvent(a)
			},
			T = function (a) {
				f.debug("[SessionViewModel] Certificate trust challenge"), m.delegate.onTrustChallenge && m.delegate.onTrustChallenge(a)
			},
			U = function (a) {
				m.canvas.style.cursor = 'url("' + a + '"), auto'
			},
			V = function (a) {
				switch (f.debug("[SessionViewModel] Default mouse pointer value changed to " + a), a) {
					case !0:
						m.canvas.style.cursor = "auto";
						break;
					case !1:
						g.isMac && g.isFirefox || (m.canvas.style.cursor = "none")
				}
			},
			W = function (a, b) {
				B = k.getConnectionId(), m.setLocalClipboardContent(a, b), m.setRemoteClipboardFormats(), p = !0, C = b, m.textBox.value = b, f.log("[SessionViewModel] Setting textbox value from remote clipboard")
			},
			X = function (a) {
				var b = m.clipboard[a.GetFormat()];
				b ? a.complete(b) : a.cancel(), a.delete()
			},
			Y = function (a) {
				a.value === Module.ClipboardResponse.ResponseOk.value && f.log("[SessionViewModel] Set remote clipboard formats complete")
			},
			Z = function () {
				I()
			},
			$ = function () {
				I()
			},
			aa = function () {
				I()
			},
			ba = function () {
				I()
			},
			ca = function (a, b, c) {
				a.getConnectionId() === k.getConnectionId() && (m.canvas.width = b, m.canvas.height = c, G())
			},
			da = function (a) {
				k = d.find(a), f.log("[SessionViewModel] Session focused event received in view model session id: " + k.id), I(), H(k.getConnectionId())
			},
			ea = function (a) {
				f.debug("[SessionViewModel] Session destroy event received for: " + a), I(), J()
			},
			fa = function (a) {
				f.log("[SessionViewModel] Session created event received for: " + a), (k = d.find(a)) && (l(k, !0), k.state === SessionState.Initialized && (k.connect(), m.delegate.openLoaderModal && k && 0 === k.getSiblingCount() && m.delegate.openLoaderModal(a, k.getConnectionId(), t, k.getLabel())), I(), H(k.getConnectionId()))
			},
			ga = function (a) {
				f.debug("[SessionViewModel] SessionCreateFailed event received in view model"), a && a.propertiesRejectedReason === ConnectionPropertiesRejectedReason.GatewayNotSpecified && m.delegate.showNoGatewayError && m.delegate.showNoGatewayError(a)
			},
			ha = function () {
				f.debug("[SessionViewModel] Session order changed event received in view model"), I()
			},
			ia = function () {
				f.debug("[SessionViewModel] Sessions loaded event received in view model"), I()
			},
			ja = function () {
				var a = m.canvas.getBoundingClientRect();
				return {
					x: a.x + j.pageXOffset,
					y: a.y + j.pageYOffset,
					width: a.width,
					height: a.height,
					top: a.top + j.pageYOffset,
					bottom: a.bottom + j.pageYOffset,
					left: a.left + j.pageXOffset,
					right: a.right + j.pageXOffset
				}
			},
			ka = function (a, b) {
				var c, d, e = 0,
					f = 0,
					g = ja();
				return e += g.left, f += g.top, c = m.canvas.offsetWidth / m.canvas.width, d = m.canvas.offsetHeight / m.canvas.height, a = (a - e) / c, b = (b - f) / d, {
					x: a,
					y: b
				}
			},
			la = function (a, b) {
				var c = ja(),
					d = m.canvas.width / (c.right - c.left),
					e = m.canvas.height / (c.bottom - c.top);
				return {
					clientX: (a - c.left) * d,
					clientY: (b - c.top) * e
				}
			},
			ma = function (a) {
				var b;
				return 1 === a ? b = MouseButton.Left : 2 === a ? b = MouseButton.Middle : 3 === a ? b = MouseButton.Right : 4 === a ? b = MouseButton.Button4 : 5 === a && (b = MouseButton.Button5), b
			},
			na = !1,
			oa = function (a, b) {
				return !g.isMac || a.keyCode !== KeyCodes.Cmd1 && a.keyCode !== KeyCodes.Cmd2 && a.keyCode !== KeyCodes.Cmd3 ? "End" === a.key && a.altKey && a.ctrlKey && !a.metaKey && !a.shiftKey ? (a.key = "Delete", a.keyCode = KeyCodes.Delete, !1) : !("Meta" !== a.key && "Win" !== a.key && "OS" !== a.key || a.altKey || a.ctrlKey || a.shiftKey) || !("F3" !== a.key || !a.altKey || a.ctrlKey || a.metaKey || a.shiftKey) && (k.keyUp(KeyCodes.Alt), !1 === na && (na = !0, a.key = "Meta", a.keyCode = KeyCodes.Cmd1), !1 === b && (na = !1, a.key = "Meta", a.keyCode = KeyCodes.Cmd1), !1) : (a.key = "Ctrl", a.keyCode = KeyCodes.Ctrl, a.metaKey = !1, a.ctrlKey = !0, !1)
			},
			pa = function (a) {
				if ("code" in a.originalEvent) {
					var b = a.originalEvent.code;
					if (CodesToKeycodes.hasOwnProperty(b)) return CodesToKeycodes[b]
				}
				return a.keyCode
			},
			qa = function (a, b) {
				if (oa(a, b)) return !1;
				var c = a.keyCode;
				if ((z.isNonCharacterKey(c) || z.isAltPressed(a) || a.metaKey || z.isCtrlPressed(a) || z.isCmdPressed()) && (w[c] = b), b) {
					if (setTimeout(function () {
							k.keyDown(pa(a))
						}, 25), (z.isCmdPressed() || z.isCtrlPressed(a)) && (c === ASCIICodes.c || c === ASCIICodes.C || c === ASCIICodes.v || c === ASCIICodes.V || c === ASCIICodes.x || c === ASCIICodes.X)) return n = !0, !1
				} else setTimeout(function () {
					k.keyUp(pa(a))
				}, 25);
				return !!(z.isNonCharacterKey(c) || z.isAltPressed(a) || a.metaKey || z.isCtrlPressed(a) || z.isCmdPressed()) && (!g.isMac && c !== KeyCodes.Ctrl || g.isMac && c !== KeyCodes.Cmd1 && c !== KeyCodes.Cmd2 && c !== KeyCodes.Cmd3)
			},
			ra = function (a, b) {
				if (oa(a, b)) return !1;
				var c = a.keyCode;
				if (z.isNonCharacterKey(c) || z.isAltPressed(a) || a.metaKey || z.isCtrlPressed(a) || z.isCmdPressed()) {
					if (x && "AltGraph" !== a.key && c !== KeyCodes.Ctrl) return !1;
					"AltGraph" === a.key && (x = b), w[c] = b;
					var d = String.fromCharCode(c);
					if (!z.isNumericPadKey(c)) {
						if (!g.isMac && (z.isAltPressed(a) || x) && !z.isNonCharacterKey(c) && d.toLowerCase() !== a.key && d.toUpperCase() !== a.key) return !1;
						if (g.deviceInfo.isWindows() && z.isAltPressed(a) && z.isCtrlPressed(a) && !z.isNonCharacterKey(c) && !z.isCtrlAltCharacterShortCuts(c)) return !1
					}
					if (b) {
						if (setTimeout(function () {
								k.keyDown(c)
							}, 25), (z.isCmdPressed() || z.isCtrlPressed(a)) && (c === ASCIICodes.c || c === ASCIICodes.C || c === ASCIICodes.v || c === ASCIICodes.V || c === ASCIICodes.x || c === ASCIICodes.X)) return n = !0, !1
					} else setTimeout(function () {
						k.keyUp(c)
					}, 25);
					return !g.isMac && c !== KeyCodes.Ctrl || g.isMac && c !== KeyCodes.Cmd1 && c !== KeyCodes.Cmd2 && c !== KeyCodes.Cmd3
				}
				return !1
			},
			sa = function () {
				for (; r.length > 0;) clearTimeout(r.shift())
			},
			ta = function () {
				if (p) {
					sa();
					var a = document.activeElement;
					document.getElementById("auxTextbox").focus(), m.textBox.select();
					try {
						document.execCommand("copy") ? (f.log("[SessionViewModel] successfully copied data to local clipboard"), p = !1, a.focus()) : (f.log("[SessionViewModel] Unable to copy to local clipboard because execcommand returned false."), a.focus(), m.delegate.showCopyConfirmationDialog && !v && (v = !0, s = !0, m.delegate.showCopyConfirmationDialog(ta)))
					} catch (b) {
						f.log("[SessionViewModel] Unable to copy to local clipboard because execcommand failed."), a.focus(), m.delegate.showCopyConfirmationDialog && !v && (v = !0, s = !0, m.delegate.showCopyConfirmationDialog(ta))
					}
				}
			},
			ua = function (a, c) {
				var d = b.find(c);
				if (d.getBookmark() && d.getBookmark().bookmarkType === BookmarkType.RemoteApp) {
					a && m.delegate.closeLoaderModal && m.delegate.closeLoaderModal(c);
					const e = !0 === a ? "block" : "none";
					var g = F(d.getConnectionId());
					g.style.display !== e && (g.style.display = e, f.log("[SessionViewModel] Session " + c + " changed canvas display to " + e))
				}
			};
		return l = function (a, b) {
			b ? (a.events.subscribe(SessionEvent.DisplayDesktopBackground, ua), a.events.subscribe(SessionEvent.WillConnect, K), a.events.subscribe(SessionEvent.DidDisconnect, M), a.events.subscribe(SessionEvent.DidConnect, L), a.events.subscribe(SessionEvent.ViewSizeChanged, ca), a.events.subscribe(SessionEvent.WindowIconChanged, Z), a.events.subscribe(SessionEvent.WindowTitleChanged, $), a.events.subscribe(SessionEvent.WindowLaunched, aa), a.events.subscribe(SessionEvent.ApplicationIdChanged, ba), a.events.subscribe(SessionEvent.CredentialsNeeded, R), a.events.subscribe(SessionEvent.TrustChallenge, T), a.events.subscribe(SessionEvent.MousePointerChanged, U), a.events.subscribe(SessionEvent.ShowDefaultMousePointer, V), a.events.subscribe(SessionEvent.GetRemoteClipboardContent, W), a.events.subscribe(SessionEvent.ClipboardContentRequest, X), a.events.subscribe(SessionEvent.SetRemoteClipboardFormatsComplete, Y), a.events.subscribe(SessionEvent.Error, N)) : (a.events.unsubscribe(SessionEvent.DisplayDesktopBackground, ua), a.events.unsubscribe(SessionEvent.WillConnect, K), a.events.unsubscribe(SessionEvent.DidDisconnect, M), a.events.unsubscribe(SessionEvent.DidConnect, L), a.events.unsubscribe(SessionEvent.ViewSizeChanged, ca), a.events.unsubscribe(SessionEvent.WindowIconChanged, Z), a.events.unsubscribe(SessionEvent.WindowTitleChanged, $), a.events.unsubscribe(SessionEvent.WindowLaunched, aa), a.events.unsubscribe(SessionEvent.ApplicationIdChanged, ba), a.events.unsubscribe(SessionEvent.CredentialsNeeded, R), a.events.unsubscribe(SessionEvent.TrustChallenge, T), a.events.unsubscribe(SessionEvent.MousePointerChanged, U), a.events.unsubscribe(SessionEvent.ShowDefaultMousePointer, V), a.events.unsubscribe(SessionEvent.GetRemoteClipboardContent, W), a.events.unsubscribe(SessionEvent.ClipboardContentRequest, X), a.events.unsubscribe(SessionEvent.SetRemoteClipboardFormatsComplete, Y), a.events.unsubscribe(SessionEvent.Error, N))
		}, m.displayDesktopBackground = ua, m.isIdTypeOrgId = function () {
			return !1
		}, m.setDontShowHelpTipValue = function (a) {
			y.setDontShowHelpTipValue(a)
		}, m.runExeccommandOnKey = function () {
			s = !0
		}, m.sendCutEvent = function () {
			y.showCliphelpTip(g, k.getConnectionId(), m.delegate.showClipHelptip)
		}, m.sendCopyEvent = function () {
			y.showCliphelpTip(g, k.getConnectionId(), m.delegate.showClipHelptip)
		}, m.executeCopy = function () {
			n && (n = !1, q.map(function (a) {
				setTimeout(ta, a)
			}))
		}, m.init = function () {
			b.events.subscribe(SessionProviderEvent.SessionCreated, fa), b.events.subscribe(SessionProviderEvent.SessionCreateFailed, ga), b.events.subscribe(SessionProviderEvent.SessionFocused, da), b.events.subscribe(SessionProviderEvent.SessionDestroyed, ea), b.events.subscribe(SessionProviderEvent.SessionOrderChanged, ha), b.events.subscribe(SessionProviderEvent.SessionsLoaded, ia), b.delegate.canvasNeeded = O, b.delegate.retireCanvas = P, b.delegate.monitorBounds = Q, b.delegate.filesUploaded = S
		}, m.delegate = new SessionViewModelDelegate, m.handleTextPasteEvent = function (a) {
			var b = a;
			g.isMac && (b = z.convertToCRLF(a)), y.showCliphelpTip(g, k.getConnectionId(), m.delegate.showClipHelptip), m.isClipboardReady() && (a !== C && (B = null, m.setLocalClipboardContent(Module.ClipboardFormatType.Text, b), m.setLocalClipboardContent(Module.ClipboardFormatType.UnicodeText, b), m.setRemoteClipboardFormats()), C = a)
		}, m.handleFilePasteEvent = function (a) {
			if (m.isFileUploadSupported() && a.dataTransfer.files) {
				const b = a.dataTransfer.files;
				m.handleAddFile(b)
			}
		}, m.handleFileInputEvent = function (a) {
			if (m.isFileUploadSupported() && a.target.files) {
				const b = a.target.files;
				m.handleAddFile(b)
			}
		}, m.handleAddFile = function (a) {
			function b(h) {
				var i = new FileReader;
				if (h >= d) return void c.onDriveUploadComplete();
				c.onDriveUploadCurrentItem(h + 1);
				const j = a[h];
				if (j.size > 267386880) return void c.fileTooLarge(j.size, g);
				c.logFileInformation(j.size, g), i.onload = function (a) {
					const c = a.target.result,
						d = new Uint8Array(c);
					f.debug("[SessionViewModel] Adding file using html5 file system"), FS.writeFile(e + "/" + j.name, d), FS.syncfs(function (a) {
						a ? k.driveUploadError(a) : (b(h + 1), k.syncFileSystem())
					})
				}, i.readAsArrayBuffer(j)
			}
			const d = a.length,
				e = k.getUploadFolderPath(),
				g = k.getConnectionId();
			c.onDriveUploadStart(d, g);
			try {
				FS.syncfs(!0, function (a) {
					a ? k.driveUploadError(a) : b(0)
				})
			} catch (a) {
				k.driveUploadError(a)
			}
		}, m.updateFileUploadStatus = function () {
			c.onUpdateFileUploadStatus(m.isFileUploadSupported())
		}, m.setLocalClipboardContent = function (a, b) {
			m.clipboard[a] = b
		}, m.setRemoteClipboardFormats = function () {
			var a, c = b.connectionList(),
				d = new Module.ClipboardFormatList;
			for (d.push_back(new Module.ClipboardFormat(Module.ClipboardFormatType.Text)), d.push_back(new Module.ClipboardFormat(Module.ClipboardFormatType.UnicodeText)), a = 0; a < c.length; a++) {
				var e = c[a];
				e.id !== B && e.clipboardHandler.setRemoteClipboardFormats(d)
			}
			d.delete()
		}, m.isClipboardReady = function () {
			return !!k && k.isClipboardReady()
		}, m.isFileUploadSupported = function () {
			return !!k && k.isFileUploadSupported()
		}, m.getMonitorBounds = function () {
			var a, b;
			return a = m.canvasContainer.offsetWidth, b = m.canvasContainer.offsetHeight, a = Math.max(a, 800), a = Math.min(a, 3840), b = Math.max(b, 600), b = Math.min(b, 2160), a = 16 * Math.floor(a / 16), b = 16 * Math.floor(b / 16), {
				width: a,
				height: b
			}
		}, m.postCopyDialogCleanup = function () {
			p = !1, v = !1, s = !1
		}, m.disconnectAllSessions = function () {
			b.disconnect(), I(), J()
		}, m.disconnectSession = function (a, c) {
			var d = b.find(a);
			d && d.disconnect(c)
		}, m.cancelAutoreconnect = function () {}, m.openPopover = function (a) {
			var b = null;
			try {
				b = new j.Event("openTrigger")
			} catch (a) {
				b = document.createEvent("Event"), b.initEvent("openTrigger", !0, !0)
			}
			document.getElementById(a).dispatchEvent(b)
		}, m.closePopover = function (a) {
			var b = null;
			try {
				b = new j.Event("closeTrigger")
			} catch (a) {
				b = document.createEvent("Event"), b.initEvent("closeTrigger", !0, !0)
			}
			document.getElementById(a).dispatchEvent(b)
		}, m.getConnectionStateForId = function (a) {
			return t[a]
		}, m.getAppListForId = function (a) {
			return m.sessionList[a]
		}, m.closeAppGroup = function (a) {
			var b = m.getAppListForId(a);
			if (b && b.sessionList)
				for (var c = 0; c < b.sessionList.length; c++) b.sessionList[c].disconnect()
		}, m.hasBookmarks = function (a) {
			return m.bookmarkList(a).length > 0
		}, m.shown = function () {
			var a, c;
			f.log("[SessionViewModel] Session shown"), I();
			for (a in m.sessionList)
				if (m.sessionList.hasOwnProperty(a)) {
					var d = m.sessionList[a].sessionList;
					for (a in d) d.hasOwnProperty(a) && (c = d[a], l(c, !0))
				}
			k = b.activeSession, setTimeout(function () {
				b.invalidateCanvasForActiveConnections()
			}, 500)
		}, m.dismissed = function () {
			var a, c;
			f.log("[SessionViewModel] Session dissmissed"), b.events.unsubscribe(SessionProviderEvent.SessionCreated, fa), b.events.unsubscribe(SessionProviderEvent.SessionCreateFailed, ga), b.events.unsubscribe(SessionProviderEvent.SessionFocused, da), b.events.unsubscribe(SessionProviderEvent.SessionDestroyed, ea), b.events.unsubscribe(SessionProviderEvent.SessionOrderChanged, ha), b.events.unsubscribe(SessionProviderEvent.SessionsLoaded, ia);
			for (a in m.sessionList)
				if (m.sessionList.hasOwnProperty(a)) {
					var d = m.sessionList[a].sessionList;
					for (a in d) d.hasOwnProperty(a) && (c = d[a], l(c, !1))
				}
		}, m.mouseDown = function (a, b, c) {
			var d = ka(a, b);
			c = ma(c), k.mouseDown(d.x, d.y, c), A[c] = !0
		}, m.mouseUp = function (a, b, c) {
			var d = ka(a, b);
			c = ma(c), k.mouseUp(d.x, d.y, c), c === MouseButton.Left && o === MouseButton.Right && (n = !0, m.executeCopy()), o = c, delete A[c]
		}, m.mouseMove = function (a, b) {
			var c = ka(a, b);
			k.mouseMove(c.x, c.y)
		}, m.mouseWheel = function (a, b) {
			k.mouseWheel(a, b)
		}, m.mouseEnter = function () {}, m.mouseLeave = function (a, b) {
			var c, d = ka(a, b);
			f.debug("[SessionViewModel] Mouse left canvas mouse position: " + d.x + ":" + d.y), d.x < 0 ? d.x = 0 : d.x > m.canvas.width && (d.x = m.canvas.width), d.y < 0 ? d.y = 0 : d.y > m.canvas.height && (d.y = m.canvas.height);
			for (c in A) A.hasOwnProperty(c) && A[c] && (f.debug("[SessionViewModel Resetting key state for mouse button: " + c), k.mouseUp(d.x, d.y, parseInt(c)), delete A[c])
		}, m.addAdjustedTouchPos = function (a) {
			for (var b = 0; b < a.length; b++) a[b].adjustedTouchPos = la(a[b].clientX, a[b].clientY)
		}, m.touchStart = function (a) {
			m.addAdjustedTouchPos(a), k.sendTouchEvents(TouchState.Start, a)
		}, m.touchMove = function (a) {
			m.addAdjustedTouchPos(a), k.sendTouchEvents(TouchState.Move, a)
		}, m.touchEnd = function (a) {
			m.addAdjustedTouchPos(a), k.sendTouchEvents(TouchState.End, a)
		}, m.touchCancel = function (a) {
			m.addAdjustedTouchPos(a), k.sendTouchEvents(TouchState.Cancel, a)
		}, m.keyPress = function (a, b, c) {
			if (x || z.isAltPressed(b) && z.isCtrlPressed(b) || !z.isCmdPressed() && !z.isCtrlPressed(b) || !b || "KeyV" !== b.code && "KeyC" !== b.code && "KeyX" !== b.code && (!g.isSafari || a !== ASCIICodes.c && a !== ASCIICodes.v && a !== ASCIICodes.x)) {
				var d = b.altKey;
				return d && !g.isMac && setTimeout(function () {
					k.keyUp(KeyCodes.Alt)
				}, 25), c || setTimeout(function () {
					k.keyUnicodeDown(a), k.keyUnicodeUp(a)
				}, 25), d && !g.isMac && setTimeout(function () {
					k.keyDown(KeyCodes.Alt)
				}, 25), !0
			}
			return !1
		}, m.keyDown = function (a, b) {
			return 229 === a.keyCode && D && (m.delegate.openLocalIMEAlert(), D = !1), s && document.execCommand("copy"), b ? qa(a, !0) : ra(a, !0)
		}, m.keyUp = function (a, b) {
			return b ? qa(a, !1) : ra(a, !1)
		}, m.canvasFocus = function () {
			f.debug("[SessionViewModel] Canvas gains focus")
		}, m.canvasLostFocus = function () {
			var a;
			f.debug("[SessionViewModel] Canvas lost focus"), setTimeout(function () {
				for (a in w) w.hasOwnProperty(a) && w[a] && (k.keyUp(parseInt(a)), w[a] = !1)
			}, 26)
		}, m.activeSessionId = function () {
			return k ? k.id : null
		}, m.getAppIdForActiveSession = function () {
			return k ? k.getApplicationId() : null
		}, m.getSessionListForAppId = function (a) {
			return m.sessionList[a]
		}, m.checkAndSwitchActiveWindow = function (a, b) {
			if (b.is("img")) {
				var c;
				c = m.getSessionListForAppId(a).sessionList[0].id, m.focusToSession(c)
			}
		}, m.focusToSession = function (a) {
			f.debug("[SessionViewModel] Session switched to " + a), b.focusToSession(a)
		}, m
	};
! function () {
	"use strict";

	function a(a, b) {
		switch (a.message = b.message, b.toastType) {
			case "pasteToast":
				a.type = 1;
				break;
			case "infoToast":
				a.type = 2
		}
	}
	angular.module("rdpClientUI").controller("toastCtrl", ["$scope", "params", a])
}(),
function () {
	"use strict";

	function a(a, b) {
		var c = {
			userName: null,
			password: null
		};
		a.user = c, a.signInPending = !1, a.signIn = function () {
			a.loginFailMessage = null, a.passwordResetLink = null, a.signInPending = !0, b.login(c.userName, c.password).then(function () {
				a.$close()
			}, function (b) {
				a.loginFailMessage = b.message, a.passwordResetLink = b.passwordResetLink, a.signInPending = !1
			})
		}, a.loginFailMessage = null, a.passwordResetLink = null
	}
	angular.module("rdpClientUI").controller("signInModalCtrl", ["$scope", "userAuthInfoService", a])
}(),
function () {
	"use strict";

	function a(a) {
		return {
			prompt: function () {
				a.open({
					animation: !0,
					templateUrl: "app/rdp-client-ui/sign-in-modal.html",
					windowClass: "rdhtml5-sign-in dark",
					controller: "signInModalCtrl",
					backdrop: "static",
					ariaDescribedBy: "signInTitle",
					keyboard: !1
				})
			}
		}
	}
	angular.module("rdpClientUI").factory("signInModal", ["$uibModal", a])
}(),
function () {
	"use strict";
	var a = function (a, b) {
		var c = b && b.supportObj || null;
		null === c && (c = {
			logoURL: null,
			supportURL: null,
			supportPhone: null,
			privacyURL: null
		}), a.supportObj = c
	};
	angular.module("rdpClientUI").controller("SupportController", ["$scope", "params", a])
}(),
function () {
	function a(a) {
		var c = a.localStorage;
		if (!c) throw new Error("Persistent storage is not available!");
		var d = function () {
				try {
					return JSON.parse(c.getItem("RdWebAppTrustedCollections")) || []
				} catch (a) {
					return []
				}
			},
			e = function () {
				try {
					return JSON.parse(c.getItem("RdWebAppRedirectionsStateCollections")) || []
				} catch (a) {
					return []
				}
			},
			f = function (a) {
				var b = d();
				for (var e in b) {
					var f = b[e];
					if (a.isSameHostPool(f)) {
						b.splice(e, 1), c.setItem("RdWebAppTrustedCollections", JSON.stringify(b));
						break
					}
				}
			},
			g = {
				clearTrustedCollections: function () {
					c.removeItem("RdWebAppTrustedCollections")
				},
				isCollectionTrusted: function (a) {
					var c = d(),
						e = new b(a);
					for (var f in c) {
						var g = c[f];
						if (e.isSameHostPool(g)) {
							var h = a.connectionSettings,
								i = g.Redirections;
							return h.EnableClipboard = i.Clipboard, h.EnablePrinting = i.AudioInput, h.EnableAudioInput = i.Printer, h.EnableDriveRedirection = i.Drive, !0
						}
					}
					return !1
				},
				trustCollection: function (a) {
					if (!g.isCollectionTrusted(a)) {
						var e = d(),
							f = new b(a);
						e.push(f), c.setItem("RdWebAppTrustedCollections", JSON.stringify(e))
					}
				},
				checkRedirectionsStateChanges: function (a) {
					var d = e(),
						g = new b(a);
					for (var h in d) {
						var i = d[h];
						if (g.isSameHostPool(i)) {
							if (g.isRedirectionsEqual(i)) return;
							d.splice(h, 1);
							break
						}
					}
					f(g), d.push(g), c.setItem("RdWebAppRedirectionsStateCollections", JSON.stringify(d))
				}
			};
		return g
	}
	var b = function (a) {
		var b = {},
			c = a && a.connectionSettings;
		return c && (b.HostName = c.HostName.toLowerCase(), b.Port = c.Port, b.LBInfo = c.LBInfo, b.GatewayHostName = c.GatewayHostName.toLowerCase(), b.GatewayPort = c.GatewayPort, b.Redirections = {
			Clipboard: c.EnableClipboard,
			AudioInput: c.EnableAudioInput,
			Printer: c.EnablePrinting,
			Drive: c.EnableDriveRedirection
		}), b.isSameHostPool = function (a) {
			return b.HostName === a.HostName && b.Port === a.Port && b.LBInfo === a.LBInfo && b.GatewayHostName === a.GatewayHostName && b.GatewayPort === a.GatewayPort
		}, b.isRedirectionsEqual = function (a) {
			var c = b.Redirections || {},
				d = a.Redirections || {};
			return c.Clipboard === d.Clipboard && c.AudioInput === d.AudioInput && c.Printer === d.Printer && c.Drive === d.Drive
		}, b
	};
	angular.module("rdpClientUI").factory("trustedCollections", ["$window", a])
}(), angular.module("rdpClientUI").run(["$templateCache", function (a) {
	"use strict";
	a.put("app/rdp-client-ui/application-tab.html", '<div class="rdp-appgroup-tab dropdown" uib-dropdown is-open=ctrl.isOpen ng-mouseenter=ctrl.onTabHover() ng-mouseleave=ctrl.onTabLeave() on-toggle=ctrl.onToggle(open)><a href=javascript:void(0) ng-click=ctrl.onTabClick($event) tabindex=1 ng-attr-aria-label={{appGroup.sessionList[0].getLabel()}} role=menuitem><img class=rdp-app-large-icon ng-src={{appGroup.thumbnail}} ng-if=appGroup.thumbnail> <span class="mdl mdl-fw mdl-AppIconDefault rdp-app-large-icon" ng-if=!appGroup.thumbnail></span> <span class=badge ng-if="appGroup.sessionList.length > 1">{{appGroup.sessionList.length}}</span></a><ul class=dropdown-menu role=menu><li ng-repeat="app in appGroup.sessionList"><a href=javascript:void(0) ng-click=ctrl.focusSession(app) tabindex=1 role=menuitem><img class=rdp-app-small-icon ng-src={{app.getThumbnail()}} ng-if=app.getThumbnail()> <span class="mdl mdl-fw mdl-AppIconDefault rdp-app-small-icon" ng-if=!app.getThumbnail()></span> <span class=rdp-app-label>{{app.getLabel()}}</span></a></li></ul></div>'), a.put("app/rdp-client-ui/Common/About.html", "<div class=sidepanel-header><h4 id=about_modal_title class=sidepanel-header-title translate=ABOUT_LABEL></h4><a href=javascript:void(0) class=\"close close-button qoe-close\" ng-click=cancel() rdp-grab-focus translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" role=button ng-blur=\"focus=true\"><i class=\"mdl mdl-fw mdl-20x mdl-Cross\"></i></a></div><div class=sidepanel-content><p translate=ABOUT_PANE_APP_TITLE></p><p translate=ABOUT_PANE_VERSION translate-values=\"{'appVersion': appVersion}\"></p><div translate=ABOUT_PANE_COPYRIGHT></div></div><div class=sidepanel-content><div ng-if=supportID translate=ABOUT_PANE_SUPPORT_ID translate-values=\"{'supportID': supportID}\"></div><div ng-if=!supportID translate=ABOUT_PANE_TELEMETRY_DISABLED></div></div><div aria-hidden={{!focus}}><div class=sidepanel-content><p id=about_modal_recording_button_label translate=ABOUT_PANE_CONSOLE_RECORDING><br></p><p><button id=startConsoleRecording ng-attr-aria-describedby=about_modal_recording_button_label ng-show=!consoleRecordingStatus ng-click=startConsoleRecording() translate=ABOUT_PANE_START_RECORDING_CONSOLE></button></p><p><button id=stopConsoleRecording ng-attr-aria-describedby=about_modal_recording_button_label ng-show=consoleRecordingStatus ng-click=stopConsoleRecording() translate=ABOUT_PANE_STOP_RECORDING_CONSOLE></button></p></div><div class=sidepanel-content><p><a href=javascript:void(0) ng-click=openTermsOfUse() translate-attr=\"{'aria-label': 'TERMS_OF_USE_LABEL'}\" translate=TERMS_OF_USE_LABEL></a></p><p><a href=javascript:void(0) ng-click=openThirdParty() translate-attr=\"{'aria-label': 'THIRD_PARTY_LABEL'}\" translate=THIRD_PARTY_LABEL></a></p><p><a href=javascript:void(0) ng-click=openPrivacyStatement() translate-attr=\"{'aria-label': 'ABOUT_PANE_PRIVACY_LABEL'}\" translate=ABOUT_PANE_PRIVACY_LABEL></a></p><div ng-if=showAccessibilityNotice()><p><a href=javascript:void(0) ng-click=openAccessibilityDeclaration() translate-attr=\"{'aria-label': 'ABOUT_PANE_ACCESSIBILITY_NOTICE'}\" translate=ABOUT_PANE_ACCESSIBILITY_NOTICE></a></p></div></div></div>"), a.put("app/rdp-client-ui/Common/loadingSpinner.html", "<div id=circularG><div id=circularG_1 class=circularG></div><div id=circularG_2 class=circularG></div><div id=circularG_3 class=circularG></div><div id=circularG_4 class=circularG></div><div id=circularG_5 class=circularG></div><div id=circularG_6 class=circularG></div><div id=circularG_7 class=circularG></div><div id=circularG_8 class=circularG></div></div><span class=loader-text>Loading...</span>"), a.put("app/rdp-client-ui/Common/Settings.html", "<div class=sidepanel-header><h4 id=settings_modal_title class=sidepanel-header-title translate=SETTINGS_LABEL></h4><a href=javascript:void(0) class=\"close close-button qoe-close\" ng-click=cancel() rdp-grab-focus translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" role=button><i class=\"mdl mdl-fw mdl-20x mdl-Cross\"></i></a></div><div aria-hidden={{!focus}}><div class=sidepanel-content><div class=sidepanel-content-wrapper><div class=sidepanel-content-title id=settings_modal_data_gathering_label translate=SETTINGS_PANE_DATA_GATHERING_TITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_DATA_GATHERING_TITLE_LABEL'}\"></div><div class=sidepanel-content-subtitle id=settings_modal_data_gathering_description translate=SETTINGS_PANE_DATA_GATHERING_SUBTITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_DATA_GATHERING_SUBTITLE_LABEL'}\"></div><div ng-show=telemetryChoiceDisabled class=sidepanel-content-admin-setting-message translate=SETTINGS_PANE_ADMIN_SETTING_MESSAGE_LABEL></div><div class=form-group><label class=checkbox-toggle-label><input ng-focus=\"focus=true\" type=checkbox ng-model=telemetryEnabled ng-model-options=\"{ getterSetter:true }\" ng-change=onTelemetryChanged() ng-attr-aria-labelledby=settings_modal_data_gathering_label ng-attr-aria-describedby=settings_modal_data_gathering_description ng-disabled=telemetryChoiceDisabled style=\"position: absolute;\"> <i class=checkbox-toggle></i><span translate=ON_LABEL ng-show=telemetryEnabled()></span><span translate=OFF_LABEL ng-show=!telemetryEnabled()></span></label></div></div></div><div class=sidepanel-content ng-show=showResourceLaunchMethod()><div class=sidepanel-content-wrapper><div class=sidepanel-content-title translate=SETTINGS_PANE_LAUNCH_METHOD_TITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_LAUNCH_METHOD_TITLE_LABEL'}\"></div><div class=sidepanel-content-subtitle translate=SETTINGS_PANE_LAUNCH_METHOD_SUBTITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_LAUNCH_METHOD_SUBTITLE_LABEL'}\"></div><div ng-show=hasResourceLaunchMethodSet class=sidepanel-content-admin-setting-message translate=SETTINGS_PANE_ADMIN_SETTING_MESSAGE_LABEL></div><div class=form-group role=radiogroup><label class=rdp-radio-container ng-disabled=\"isDisabledResourceLaunchMethod('webclient')\"><input ng-focus=\"focus=true\" type=radio ng-model=resourceLaunchMethod value=webclient ng-disabled=\"isDisabledResourceLaunchMethod('webclient')\" translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_LAUNCH_METHOD_WEBCLIENT_RADIO_LABEL'}\"><div class=rdp-radio-container-focused></div><span translate=SETTINGS_PANE_LAUNCH_METHOD_WEBCLIENT_RADIO_LABEL></span> <span class=rdp-radio-checkmark></span></label> <label ng-focus=\"focus=true\" class=rdp-radio-container ng-disabled=\"isDisabledResourceLaunchMethod('nativeclient')\"><input type=radio ng-model=resourceLaunchMethod value=nativeclient ng-disabled=\"isDisabledResourceLaunchMethod('nativeclient')\" translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_LAUNCH_METHOD_NATIVECLIENT_RADIO_LABEL'}\"><div class=rdp-radio-container-focused></div><span translate=SETTINGS_PANE_LAUNCH_METHOD_NATIVECLIENT_RADIO_LABEL></span> <span class=rdp-radio-checkmark></span></label></div></div></div><div class=sidepanel-content tabindex=-1><div class=sidepanel-content-wrapper><div class=sidepanel-content-title id=settings_modal_ime_label translate=SETTINGS_PANE_IME_TITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_IME_TITLE_LABEL'}\"></div><div class=sidepanel-content-subtitle id=settings_modal_ime_description translate=SETTINGS_PANE_IME_SUBTITLE_LABEL translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_IME_SUBTITLE_LABEL'}\"></div><div class=form-group><label class=checkbox-toggle-label><input ng-focus=\"focus=true\" type=checkbox ng-model=IMEEnabled ng-model-options=\"{ getterSetter:true }\" ng-change=onIMEChanged() ng-attr-aria-labelledby=settings_modal_ime_label ng-attr-aria-describedby=settings_modal_ime_description style=\"position: absolute;\" tabindex=0> <i class=checkbox-toggle tabindex=-1></i> <span translate=ON_LABEL ng-show=IMEEnabled()></span> <span translate=OFF_LABEL ng-show=!IMEEnabled()></span></label></div></div></div><div class=sidepanel-content ng-show=IMEEnabled()><div class=sidepanel-content-wrapper><div class=sidepanel-content-title id=settings_modal_ime_dropdown_label translate=SETTINGS_PANE_IME_DROPDOWN_TITLE translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_IME_DROPDOWN_TITLE'}\"></div><div class=sidepanel-content-subtitle translate=SETTINGS_PANE_IME_DROPDOWN_SUBTITLE translate-attr=\"{'ng-attr-aria-label': 'SETTINGS_PANE_IME_DROPDOWN_SUBTITLE'}\"></div><div class=form-group><select ng-focus=\"focus=true\" class=custom-select ng-model=SelectedKeyboardLayoutModel ng-model-options=\"{ getterSetter:true }\" ng-change=onKeyboardLayoutSelect(SelectedKeyboardLayoutModel) ng-attr-aria-labelledby=settings_modal_ime_dropdown_label><option value=Select translate=KEYBOARD_LAYOUT_SELECT translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_SELECT'}\"></option><option value=Amharic translate=KEYBOARD_LAYOUT_AMHARIC translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_AMHARIC'}\"></option><option value=ChinesePRC translate=KEYBOARD_LAYOUT_CHINESE_PRC translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_CHINESE_PRC'}\"></option><option value=ChineseTaiwan translate=KEYBOARD_LAYOUT_CHINESE_TAIWAN translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_CHINESE_TAIWAN'}\"></option><option value=ChineseTraditinal translate=KEYBOARD_LAYOUT_CHINESE_TRADITIONAL translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_CHINESE_TRADITIONAL'}\"></option><option value=ChineseSimplified translate=KEYBOARD_LAYOUT_CHINESE_SIMPLIFIED translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_CHINESE_SIMPLIFIED'}\"></option><option value=Japanese_101_102 translate=KEYBOARD_LAYOUT_JAPANESE_101_102 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_JAPANESE_101_102'}\"></option><option value=Japanese_106_109 translate=KEYBOARD_LAYOUT_JAPANESE_106_109 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_JAPANESE_106_109'}\"></option><option value=Korean_101_TYPE1 translate=KEYBOARD_LAYOUT_KOREAN_101_TYPE1 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_KOREAN_101_TYPE1'}\"></option><option value=Korean_101_TYPE2 translate=KEYBOARD_LAYOUT_KOREAN_101_TYPE2 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_KOREAN_101_TYPE2'}\"></option><option value=Korean_101_TYPE3 translate=KEYBOARD_LAYOUT_KOREAN_101_TYPE3 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_KOREAN_101_TYPE3'}\"></option><option value=Korean_103_106 translate=KEYBOARD_LAYOUT_KOREAN_103_106 translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_KOREAN_103_106'}\"></option><option value=Tigrinya translate=KEYBOARD_LAYOUT_TIGRINYA translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_TIGRINYA'}\"></option><option value=Others translate=KEYBOARD_LAYOUT_OTHERS translate-attr=\"{'ng-attr-aria-label': 'KEYBOARD_LAYOUT_OTHERS'}\"></option></select></div></div></div></div>"), a.put("app/rdp-client-ui/Common/TermsOfUse.html", "<div class=sidepanel-header><h4 id=tou_modal_title class=sidepanel-header-title translate=TERMS_OF_USE_LABEL></h4><a href=javascript:void(0) class=\"close close-button qoe-close\" ng-click=modalController.cancel() rdp-grab-focus translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" role=button><i class=\"mdl mdl-fw mdl-20x mdl-Cross\"></i></a></div><div class=sidepanel-text-content><div ng-include=termsUrl class=terms-of-use></div></div>"), a.put("app/rdp-client-ui/Common/ThirdPartyNotices.html", "<div class=sidepanel-header><h4 id=thirdparty_modal_title class=sidepanel-header-title translate=THIRD_PARTY_LABEL></h4><a href=javascript:void(0) class=\"close close-button qoe-close\" ng-click=modalController.cancel() rdp-grab-focus translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" role=button><i class=\"mdl mdl-fw mdl-20x mdl-Cross\"></i></a></div><div class=sidepanel-text-content><div ng-include=\"'assets/license/thirdpartynotices.html'\"></div></div>"), a.put("app/rdp-client-ui/connection-error.html", '<div class=error-container ng-keyup=connErrController.onKeyUp($event)><div class="error-content dark" role=dialog ng-attr-aria-labelledby={{connErrController.labelID}}><div class=modal-header><h3 ng-attr-id={{connErrController.labelID}} translate=CONNECTION_ERROR_DIALOG_TITLE translate-values="{\'sessionTitle\': connErrController.sessionTitle()}"></h3></div><div class=modal-body><span translate={{connErrController.errorMessage()}}></span><div ng-if="!!(connErrController.session.connection.disconnectReason && connErrController.session.connection.disconnectReason.certInfo)" class=cert-info><h4 translate=CONNECTION_ERROR_CERTIFICATE_HEADING></h4><div class=cert-details><div class=cert-field-name translate=CONNECTION_ERROR_SERVER_NAME_LABEL></div><div class=cert-field-value>{{connErrController.session.connection.disconnectReason.certInfo.subject}}</div><div class=cert-field-name translate=CONNECTION_ERROR_THUMBPRINT_LABEL></div><div class=cert-field-value>{{connErrController.session.connection.disconnectReason.certInfo.fingerprintSha1}}</div></div></div></div><div class=modal-footer><button class="btn btn-primary reconnect-button" ng-click=connErrController.reconnect() translate=BUTTON_RECONNECT rdp-grab-focus></button> <button class="btn btn-default" ng-click=connErrController.dismissSession() translate=BUTTON_CANCEL></button></div></div></div>'), a.put("app/rdp-client-ui/driveUpload-alert-popover.html", "<div><a href=javascript:void(0) role=button class=close translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" ng-click=ctrl.viewManager.dismissDriveUploadJobAlert();><span class=\"mdl mdl-fw mdl-Cross\" aria-hidden=true tabindex=-1></span></a><div role=alert>{{ctrl.driveUploadText()}}</div></div>"), a.put("app/rdp-client-ui/print-alert-popover.html", "<div><a href=javascript:void(0) role=button class=close translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'aria-label': 'BUTTON_CLOSE'}\" ng-click=ctrl.viewManager.dismissPrintJobAlert();><span class=\"mdl mdl-fw mdl-Cross\" aria-hidden=true tabindex=-1></span></a><div role=alert translate=PRINTING_START_NOTIFICATION_TEXT></div></div>"), a.put("app/rdp-client-ui/rd-resource-list.html", '<div class=rdhtml5-workspace-group ng-init="status = {open:true}" ng-style="{\'padding-bottom\' : status.open ? \'0px\' : \'15px\'}">\x3c!-- Heading for the root display folder --\x3e<div class=rdhtml5-workspace-header role=heading aria-level=1 ng-show="displayFolder === \'/\'"><div class="rdhtml5-workspace-title supportRow"><div class=supportCell ng-show="displayFolder === \'/\'"><i class="mdl mdl-fw mdl-ChevronRightSmall chevron-rotate" ng-class="{\'chevron-rotate-down\': status.open, \'chevron-rotate-right\': !status.open}" ng-click="status.open = !status.open" tabindex=3 role=button ng-attr-aria-expanded={{!!status.open}} ng-attr-aria-controls=resource-list-{{workspace.url}} ng-attr-aria-label={{workspace.publisher}}></i></div><div class="supportCell tenantName" ng-show="displayFolder === \'/\'" ng-click="status.open = !status.open" tabindex=-1 role=button ng-attr-aria-expanded={{!!status.open}} ng-attr-aria-controls=resource-list-{{workspace.url}}>{{workspace.publisher}}</div><div class="supportCell supportInfo"><a alt="" ng-click=resourceListController.showSupportModal(workspace) ng-show={{workspace.supportInfoPresent}} role=button tabindex=3 translate-attr="{ \'title\': \'SUPPORT\', \'aria-label\': \'SUPPORT\'}"><span class="mdl mdl-Info mdl-15x mdl-fw"></span></a></div></div></div>\x3c!-- Heading for subfolder display --\x3e<ol class=breadcrumb ng-show="displayFolder !== \'/\'" role=heading aria-level=1><li><a ng-click=resourceListController.clearFolder() translate=ALL_RESOURCES_TAB_LABEL tabindex=3 href=javascript:void(0)></a></li><li>{{workspace.publisher}}</li><li>{{displayFolder}}</li></ol><div uib-collapse=!status.open ng-attr-id=resource-list-{{workspace.url}}>\x3c!-- Folder icons --\x3e<div ng-repeat="folder in workspace.folders" ng-show="displayFolder === \'/\'" class="rdhtml5-folder rdhtml5-tooltip" ng-click=resourceListController.setFolder(folder) title={{folder}} tabindex=3 role=link><span class="mdl mdl-fw mdl-FolderHorizontal rdhtml5-foldericons"></span><div class=rdhtml5-folderlabel>{{folder}}</div></div>\x3c!-- App and desktop icons --\x3e<div ng-repeat="bookmark in workspace.bookmarks" ng-show=resourceListController.isBookmarkDisplayed(bookmark) class="rdhtml5-app rdhtml5-tooltip" ng-click="launch({bookmark: bookmark})" id={{bookmark.id}} title={{bookmark.label()}} tabindex=3 role=link><img class="img img-responsive rdhtml5-appicons" ng-src="{{bookmark.thumbnail ||\n                bookmark.defaultThumbnai}}" alt=""><div class=rdhtml5-applabel>{{bookmark.clippedDisplayLabel()}}</div></div><div ng-show="workspace.folders.length === 0 && workspace.bookmarks.length === 0"><div class="col-lg-offset-3 rdhtml5-tenant-noresources" translate=NO_RESOURCES_FOR_TENANT_MESSAGE translate-values="{\'tenantName\': workspace.publisher}"></div></div></div></div>'), a.put("app/rdp-client-ui/rdp-client-ui-all-resources-pane.html", '<div class=container>\x3c!-- Show GDPR compliance banner--\x3e<div class="alert alert-warning alert-dismissible banner" role=alert ng-if=allResourcesCtrl.showGDPRBanner()><a class=banner-text translate=GDPR_COMPLIANCE_MESSAGE></a> <a class=banner-link href="https://go.microsoft.com/fwlink/?linkid=2083433" translate=GDPR_LINK_TEXT target=_blank></a> <a href=javascript:void(0) class="close banner-close banner-text" data-dismiss=alert rdp-grab-focus translate-attr="{ \'title\': \'BUTTON_CLOSE\', \'ng-attr-aria-label\': \'BUTTON_CLOSE\'}" role=button ng-click=allResourcesCtrl.setDismissedGDPRBanner()>×</a></div>\x3c!-- Show an alert for an unsupported browser or capability --\x3e<div class="alert alert-warning alert-dismissible" role=alert ng-if=allResourcesCtrl.showUnsupportedBrowser()><a class=banner-text translate=UNSUPPORTED_BROWSER_MESSAGE></a> <a href=javascript:void(0) class="close banner-close banner-text" data-dismiss=alert rdp-grab-focus translate-attr="{ \'title\': \'BUTTON_CLOSE\', \'ng-attr-aria-label\': \'BUTTON_CLOSE\'}" role=button ng-click=allResourcesCtrl.setDismissedUnsupportedBrowser()>×</a></div><div class="alert alert-warning alert-dismissible" role=alert ng-if="(allResourcesCtrl.showAudioUnsupported() || allResourcesCtrl.showAudioInputUnsupported()) && !allResourcesCtrl.hideAllRessourcesUI()"><a class=banner-text translate="{{allResourcesCtrl.showAudioUnsupported() ? \'AUDIO_UNSUPPORTED_MESSAGE\' : \'AUDIO_INPUT_UNSUPPORTED_MESSAGE\' }}"></a> <a href=javascript:void(0) class="close banner-close banner-text" data-dismiss=alert rdp-grab-focus translate-attr="{ \'title\': \'BUTTON_CLOSE\', \'ng-attr-aria-label\': \'BUTTON_CLOSE\'}" role=button ng-click=allResourcesCtrl.setDismissedAudioUnsupported()>×</a></div><div class=inner ng-show=!allResourcesCtrl.hideAllRessourcesUI()><div class=cc-loader ng-if=allResourcesCtrl.showFeedLoader()><div class="dark loading-animation" style="margin-left: -160px"><div></div><div></div><div></div><div></div><div></div></div><div style="text-align: center" translate=LOADING_MESSAGE></div></div><div class="col-lg-6 col-lg-offset-3 centered rdhtml5-nocontent" ng-show=allResourcesCtrl.showFeedEmptyOnPrem() translate=NO_RESOURCES_MESSAGE role=alert></div><div class="col-lg-6 col-lg-offset-3 centered rdhtml5-nocontent" ng-show=allResourcesCtrl.showFeedEmptyWVD() translate=NO_RESOURCES_MESSAGE_WVD translate-values="{\'UPN\': allResourcesCtrl.getUPN()}" role=alert></div><div class="col-lg-6 col-lg-offset-3 centered rdhtml5-nocontent" ng-show=allResourcesCtrl.showFeedFailedRecoverable() translate=RESOURCE_LOAD_FAILED role=alert></div><div class="col-lg-6 col-lg-offset-3 centered rdhtml5-nocontent" ng-show=allResourcesCtrl.showFirstRetryMessage() translate=FETCHING_RESOURCES role=alert></div><div class="col-lg-6 col-lg-offset-3 centered rdhtml5-nocontent" ng-show=allResourcesCtrl.showFeedFailedIrrecoverable() translate=RESOURCE_LOAD_FAILED_IRRECOVERABLE role=alert></div><rd-resource-list display-folder=allResourcesCtrl.displayFolder display-workspace-url=allResourcesCtrl.displayWorkspaceUrl launch-action=allResourcesCtrl.launchBookmark(bookmark) ng-repeat="workspace in allResourcesCtrl.getWorkspaces()" workspace=workspace ng-if=allResourcesCtrl.showResourceList()></div><div ng-if=allResourcesCtrl.showFileDownloadUI() class="centered launchMode-download-message"><span aria-hidden=true class="md2 mdl-40x mdl-fw md2-Download"></span><div ng-if=!allResourcesCtrl.isRdpFileDownloadFailed() class=launchMode-download-message-title translate=RDP_FILE_DOWNLOAD_TITLE role=alert></div><div ng-if=!allResourcesCtrl.isRdpFileDownloadFailed() class=launchMode-download-message-tagline translate=RDP_FILE_DOWNLOAD_TAGLINE></div><div ng-if=allResourcesCtrl.isRdpFileDownloadFailed() class=launchMode-download-message-title translate=RDP_FILE_DOWNLOAD_FAILED_MESSAGE role=alert></div><div ng-if=allResourcesCtrl.isRdpFileDownloadFailed() class=launchMode-download-message-tagline translate={{allResourcesCtrl.rdpFileDownloadFailedReason}}></div></div><a href=javascript:void(0) id=rdpFileDownloadLink aria-hidden=true tabindex=-1></a></div>'), a.put("app/rdp-client-ui/rdp-client-ui-BroadcastError-modal.html", '<div class=modal-header><h4 class="modal-title centered" style="text-transform: none; margin-bottom: 10px; font-size: 15px" translate={{errorTitle}} ng-attr-id={{ErrorDescribedByID}}></h4></div><div class=modal-body><span translate={{errorText}}></span></div><div class=modal-footer><button class="btn btn-primary" ng-click=$close(0) translate=BUTTON_CLOSE rdp-grab-focus></button></div>'),
		a.put("app/rdp-client-ui/rdp-client-ui-navbar.html", '<nav class="navbar navbar-rdp-client navbar-static-top" ng-if=ctrl.viewManager.isNavbarVisible() ng-mouseenter=ctrl.viewManager.onNavbarEnter() ng-mouseleave=ctrl.viewManager.onNavbarLeave() role=menubar><div class=rdp-tabgroup role=menuitem><ul class="nav navbar-nav">\x3c!-- The "All Resources" tab --\x3e<li ng-class="{\'active\':ctrl.viewManager.isAllResourcesPaneActive()}" ng-if=!ctrl.hideAllResourcesTab()><a id=rdp-all-resources-link href=javascript:void(0) class=rdp-all-resources-tab ng-click=ctrl.viewManager.activateAllResourcesPane() tabindex={{ctrl.viewManager.tabIndexForAllResourcesPane()}}><span class="mdl mdl-fw mdl-Waffle"></span> <span translate=ALL_RESOURCES_TAB_LABEL></span></a></li><li class=navbar-separator ng-show=ctrl.showDesktopDivider() role=separator aria-orientation=vertical></li>\x3c!-- The desktop session tabs --\x3e<li ng-class="{\'active\':ctrl.isDesktopSessionActive(desktopSession)}" ng-repeat="desktopSession in ctrl.getRemoteDesktopSessions()" role=menu><div class=rdp-desktop-tab ng-click=ctrl.focusSession(desktopSession) tabindex=1 role=menuitem ng-attr-aria-label={{desktopSession.getBookmark().desktopLabel()}}><span class="mdl mdl-fw mdl-Desktop"></span> {{desktopSession.getBookmark().desktopLabel()}} <span class="badge mdl" ng-class="{\'success mdl-StatusCheckmark\': ctrl.isSessionConnected(desktopSession),\n                                                       \'error mdl-StatusError\': ctrl.isSessionDisconnected(desktopSession),\n                                                       \'info mdl-StatusInfo\': !ctrl.isSessionConnected(desktopSession) && !ctrl.isSessionDisconnected(desktopSession) }"></span> <a href=javascript:void(0) class=rdp-session-close translate-attr="{ \'title\': \'CLOSE_CONNECTION_LABEL\', \'aria-label\': \'CLOSE_CONNECTION_LABEL\'}" ng-class="{\'rdp-hidden\':!ctrl.isDesktopSessionActive(desktopSession)}" ng-click=ctrl.dismissSession(desktopSession) tabindex=1 role=button><span class="mdl mdl-fw mdl-Cross"></span></a></div></li><li class=navbar-separator ng-show=ctrl.showAppsDivider() role=separator aria-orientation=vertical></li>\x3c!-- The app window icons --\x3e<li ng-class="{\'active\':ctrl.isAppGroupActive(appId)}" ng-repeat="(appId, appGroup) in ctrl.getAppGroups()" rdp-application-tab app-group=appGroup disable-hover=ctrl.disableHover(appId) enable-hover=ctrl.enableHover(appId) is-hover-enabled=ctrl.isHoverEnabled()></li></ul></div><div class="nav navbar-right"><div class=rdp-navitem ng-if=ctrl.isPrintingActive() translate-attr="{ \'title\': \'PRINTING_IN_PROGRESS_LABEL\', \'aria-label\': \'PRINTING_IN_PROGRESS_LABEL\'}" uib-popover-template="\'app/rdp-client-ui/print-alert-popover.html\'" popover-is-open=ctrl.viewManager.isPrintJobAlertActive() popover-placement=bottom popover-trigger="\'none\'"><span aria-hidden=true tabindex=-1 class="mdl mdl-20x mdl-fw mdl-Printer"></span></div><div class="rdp-navitem rdp-navitem-fileupload" ng-if="ctrl.showDriveUploadIcon() && !ctrl.viewManager.isAllResourcesPaneActive()" translate-attr="{ \'title\': \'UPLOAD_FILE_LABEL\', \'aria-label\': \'UPLOAD_FILE_LABEL\'}" role=button data-toggle=tooltip data-placement=bottom tooltip uib-popover-template="\'app/rdp-client-ui/driveUpload-alert-popover.html\'" popover-is-open=ctrl.viewManager.isDriveUploadJobActive() popover-placement=bottom popover-trigger="\'none\'" popover-class=rdp-navitem-fileupload-alert><label for=fileUpload class=rdp-navitem-fileupload><span aria-hidden=true tabindex=2 class="md2 mdl-20x mdl-fw md2-Upload"></span></label> <input type=file file-input-on-change=ctrl.onFilesUploaded id=fileUpload multiple></div><div class=pinUnPin><a id=rdp-navbar-pin class="rdp-navitem rdhtml5-tooltip navbar-link navbar-link" href=javascript:void(0) role=button ng-click=ctrl.viewManager.toggleNavbarPinState() tabindex=2 ng-attr-title={{ctrl.getPinButtonText()}} ng-attr-aria-label={{ctrl.getPinButtonText()}} data-toggle=tooltip data-placement=bottom tooltip><span class="mdl mdl-20x mdl-fw" ng-class="{\'mdl-Unpin\': ctrl.viewManager.isNavbarPinned(),\n                                                            \'mdl-Pin\': !ctrl.viewManager.isNavbarPinned()}"></span></a></div><div class=fullscreen ng-if=ctrl.viewManager.isFullscreenSupported()><a class="rdp-navitem rdhtml5-tooltip navbar-link" href=javascript:void(0) ng-click=ctrl.viewManager.toggleFullscreen() ng-attr-title={{ctrl.getFullscreenButtonText()}} ng-attr-aria-label={{ctrl.getFullscreenButtonText()}} role=button tabindex=2 data-toggle=tooltip data-placement=bottom tooltip><span class="mdl mdl-20x mdl-fw" ng-class="{\'mdl-ExitFullScreen\':ctrl.viewManager.inFullscreen(),\n                                                           \'mdl-EnterFullScreen\':!ctrl.viewManager.inFullscreen()}"></span></a></div><div class=settings><a class="rdp-navitem rdhtml5-tooltip navbar-link" href=javascript:void(0) ng-click=ctrl.viewManager.openSettingsModal() role=button tabindex=2 translate-attr="{ \'title\': \'SETTINGS_LABEL\', \'aria-label\': \'SETTINGS_LABEL\'}" data-toggle=tooltip data-placement=bottom tooltip><span class="mdl mdl-Gear mdl-20x mdl-fw"></span></a></div><div class="dropdown more-options" uib-dropdown keyboard-nav is-open=ctrl.isMoreMenuOpen><a id=MoreOptionMenuButton href=javascript:void(0) class="rdp-navitem rdhtml5-tooltip navbar-link" translate-attr="{ \'title\': \'MOREOPTIONS_LABEL\', \'aria-label\': \'MOREOPTIONS_LABEL\'}" role=button ng-attr-aria-expanded={{!!ctrl.isMoreMenuOpen}} tabindex=2 ng-click="ctrl.isMoreMenuOpen = !ctrl.isMoreMenuOpen; $event.stopPropagation(); ctrl.handleHideUserAccountDetails();" data-toggle=tooltip data-placement=bottom tooltip><span class="mdl mdl-More mdl-20x mdl-fw"></span></a><ul class="dropdown-menu more-options" role=menu><li role=none><a href=javascript:void(0) ng-click=ctrl.viewManager.openAboutModal() translate-attr="{\'ng-attr-aria-label\': \'ABOUT_LABEL\'}" translate=ABOUT_LABEL tabindex=2 role=menuitem ng-keydown=ctrl.setFocusMoreOptionsEscape($event)></a></li><li role=none><a href="https://go.microsoft.com/fwlink/?linkid=872108" translate-attr="{\'ng-attr-aria-label\': \'FEEDBACK_LABEL\'}" translate=FEEDBACK_LABEL tabindex=2 role=menuitem target=_blank ng-keydown=ctrl.setFocusMoreOptionsEscape($event)></a></li><li role=none><a href="https://go.microsoft.com/fwlink/?linkid=872109" translate-attr="{\'ng-attr-aria-label\': \'HELP_LABEL\'}" translate=HELP_LABEL tabindex=2 role=menuitem target=_blank ng-keydown=ctrl.setFocusMoreOptionsEscape($event)></a></li></ul></div><div class="dropdown more-options" uib-dropdown keyboard-nav is-open=ctrl.isUserMenuOpen ng-class="{\'user-account-details-open\': ctrl.isUserAccountDetailsOpen()}"><a id=UserAccountMenuButton class="rdp-navitem rdp-navitem-useraccount rdhtml5-tooltip navbar-link" href=javascript:void(0) ng-click="ctrl.isUserMenuOpen = !ctrl.isUserMenuOpen; ctrl.isMoreMenuOpen = false; $event.stopPropagation();" translate-attr="{ title: \'USERACCOUNT_LABEL\', \'aria-label\': \'USERACCOUNT_LABEL\'}" role=button tabindex=2 ng-attr-aria-expanded={{!!ctrl.isUserMenuOpen}} ng-if="ctrl.isAuthenticated() && !ctrl.getUserInitials()" data-toggle=tooltip data-placement=bottom tooltip><span class="mdl mdl-Contact mdl-20x mdl-fw"></span> </a><a id=UserAccountMenuButton class="rdp-navitem rdp-navitem-username rdhtml5-tooltip navbar-link" href=javascript:void(0) ng-click="ctrl.handleToggleUserAccountDetails(); ctrl.isMoreMenuOpen = false; $event.stopPropagation();" translate-attr="{ title: \'USERACCOUNT_LABEL\'}" role=button tabindex=2 ng-attr-aria-expanded={{!!ctrl.isUserAccountDetailsOpen()}} ng-if="ctrl.isAuthenticated() && ctrl.getUserInitials()" data-toggle=tooltip data-placement=bottom tooltip><div class=userInitialsIcon><span class=userInitialsIcon-text>{{ctrl.getUserInitials()}}</span></div></a><ul class="dropdown-menu more-options" role=menu><li role=none ng-if="ctrl.getPasswordChangeEnabled() && !ctrl.getUserName()"><a href={{ctrl.getMyAccountLink()}} translate-attr="{\'ng-attr-aria-label\': \'CHANGE_PASSWORD_LABEL\'}" translate=CHANGE_PASSWORD_LABEL tabindex=2 role=menuitem target=_blank ng-keydown=ctrl.setFocusUserAccountEscape($event)></a></li><li role=none><a href=javascript:void(0) navbar-logout-button tabindex=2 role=menuitem ng-keydown=ctrl.setFocusUserAccountEscape($event)></a></li></ul></div></div></nav><div click-outside-element=ctrl.handleHideUserAccountDetails() is-active=ctrl.isUserAccountDetailsOpen()><div class=rdp-useraccount-dropdown-body ng-if=ctrl.isUserAccountDetailsOpen()><div class=rdp-useraccount-dropdown-signout><a href=javascript:void(0) navbar-logout-button tabindex=2 ng-keydown=ctrl.setFocusUserAccountEscape($event)></a></div><div class=rdp-useraccount-dropdown-container><div class=rdp-useraccount-dropdown-container-left><div class=userInitialsIcon><span class=userInitialsIcon-text>{{ctrl.getUserInitials()}}</span></div></div><div class=rdp-useraccount-dropdown-container-right><div class=rdp-useraccount-dropdown-container-name>{{ctrl.getUserName()}}</div><div class=rdp-useraccount-dropdown-container-email>{{ctrl.getUserEmail()}}</div><div class=rdp-useraccount-dropdown-container-account><a href={{ctrl.getMyAccountLink()}} translate-attr="{\'ng-attr-aria-label\': \'MY_ACCOUNT_LABEL\'}" translate=MY_ACCOUNT_LABEL tabindex=2 target=_blank ng-keydown=ctrl.setFocusUserAccountEscape($event)></a></div></div></div></div></div>\x3c!-- Collapsed navbar --\x3e<div ng-style="{\'display\' : ctrl.viewManager.isNavbarVisible() ? \'none\' : \'block\'}"><div draggable id=rdp-collapsed-toolbar class=navbar-rdp-client-collapsed ng-click=ctrl.viewManager.showNavbar($event) tabindex=3 rdp-grab-focus translate-attr="{ \'title\': \'EXPAND_NAVBAR_LABEL\', \'aria-label\': \'EXPAND_NAVBAR_LABEL\'}"><i class="mdl mdl-fw mdl-ThreeLines"></i></div></div>'), a.put("app/rdp-client-ui/rdp-client-ui-top-view.html", "<div class=rdp-client-top-view ng-if=!topViewCtrl.viewManager.isClientEmbedded()><rdp-client-navbar ng-if=!topViewCtrl.hideNavBar() ng-style=\"{'height': topViewCtrl.viewManager.isNavbarPinned() ? 'auto' : '0', 'min-height': topViewCtrl.viewManager.isNavbarPinned() ? '48px' : '0' }\"></rdp-client-navbar><div class=top-view-container><div class=rdp-content-pane-container ng-class=\"{'maximized': !topViewCtrl.viewManager.isNavbarPinned()}\"><session-view autoscroll ng-style=\"{'visibility' : topViewCtrl.viewManager.isSessionPaneActive() ? 'visible' : 'hidden'}\"></session-view><rdp-all-resources-pane ng-show=topViewCtrl.viewManager.isAllResourcesPaneActive()></div><div style=\"display: none\">\x3c!-- Hidden link to enable printing support --\x3e <a translate-attr=\"{download: 'PRINT_JOB_FILE_NAME'}\" href=javascript:void(0) id=printDownloadLink tabindex=-1 aria-hidden=true></a>\x3c!-- Hidden link to enable downloading console logs--\x3e <a translate-attr=\"{download: 'CONSOLE_LOG_FILE_NAME'}\" href=javascript:void(0) id=logDownloadLink tabindex=-1 aria-hidden=true></a>\x3c!-- Hidden link to enable file downloads support --\x3e <a href=javascript:void(0) id=fileDownloadLink tabindex=-1 aria-hidden=true></a></div></div></div>"), a.put("app/rdp-client-ui/Session/autoreconDialogTemplate.html", '<div class=modal-dialog ng-init=dialog.focus() role=dialog ng-attr-aria-labelledby={{dialog.labelID}} ng-attr-aria-hidden={{!dialog.isTopMost()}}><div class=modal-content><div class=loading-animation><div></div><div></div><div></div><div></div><div></div></div><div class=modal-header><h3 translate=AUTORECONNECT_DIALOG_MESSAGE ng-attr-id={{dialog.labelID}}></h3></div><div class=modal-body><span translate=AUTORECONNECT_DIALOG_RETRY_LABEL></span> {{getRetryCount()}}</div><div class=modal-footer><button class="btn btn-default" ng-click=cancel() translate=BUTTON_CANCEL ng-attr-tabindex={{dialog.getControlTabIndex()}}></button></div></div></div>'), a.put("app/rdp-client-ui/Session/clipHelptipTemplate.html", '<div class=modal-dialog ng-init=dialog.focus() role=dialog ng-attr-aria-labelledby={{dialog.labelID}} ng-attr-aria-hidden={{!dialog.isTopMost()}}><div class=modal-content><div class=modal-header><h3 translate=CLIPHELPTIP_TITLE ng-attr-id={{dialog.labelID}}></h3></div><form><div class=modal-body><p><span translate=CLIPBOARD_SHORTCUT_MESSAGE_MAC ng-if=isMac></span> <span translate=CLIPBOARD_SHORTCUT_MESSAGE_NON_MAC ng-if=!isMac></span></p><p><span translate=CLIPHELPTIP_BODYTEXTP2></span></p><div class=form-group><label class=checkbox-label><input type=checkbox ng-model=dontShowAgain ng-attr-tabindex={{dialog.getControlTabIndex()}}> <i class=checkbox-tick></i><span translate=CLIPHELPTIP_DONOTSHOWAGAIN></span></label></div></div><div class=modal-footer><button class="btn btn-primary" ng-click=close() translate=BUTTON_GOTIT autofocus ng-attr-tabindex={{dialog.getControlTabIndex()}}></button></div></form></div></div>'), a.put("app/rdp-client-ui/Session/copyAlert.html", '\x3c!--Raw HTML template to show a modal whose content is clipboard copy confirmation dialog--\x3e<div class=modal-header style="padding-bottom: 0"><h4 class="modal-title centered" style="text-transform: none; margin-bottom: 10px; font-size: 15px" translate=CLIPCONFIRMATION_TITLE ng-attr-id={{copyAlertDescribedByID}}></h4></div><div class=modal-body style="padding: 0 15px 0 15px"><button class="btn btn-primary skip-button" style="margin-bottom: 15px; margin-left:\n  42%;padding: 0 22px; width: 65px; height: 30px;" ng-click=ok() translate=BUTTON_OK rdp-grab-focus></button></div>'), a.put("app/rdp-client-ui/Session/credentialPromptTemplate.html", '<div class=modal-dialog ng-init=dialog.focus() role=dialog ng-attr-aria-labelledby={{dialog.labelID}} ng-attr-aria-hidden={{!dialog.isTopMost()}}><div class=modal-content><div class=modal-header><h3 translate=CREDENTIAL_DIALOG_HEADER ng-attr-id={{dialog.labelID}}></h3></div><form name=user><div class=modal-body style="padding: 20px 40px 40px 40px"><div class=form-group style="display: block;"><label style="display: block;"><span translate=USER_NAME_LABEL></span> <input class=form-control style="width: 100%;" ng-model=userName name=userName ng-attr-autofocus="{{!userPrefilled || undefined}}" spellcheck=false translate-attr="{placeholder: \'USER_NAME_LABEL\'}" ng-attr-tabindex={{dialog.getControlTabIndex()}} autocomplete=username required></label> <label style="margin-top: 20px; display: block;"><span translate=PASSWORD_LABEL></span> <input type=password autocomplete=current-password class=form-control style="width: 100%;" ng-model=password name=password ng-attr-autofocus="{{userPrefilled || undefined}}" translate-attr="{placeholder: \'PASSWORD_LABEL\'}" ng-attr-tabindex={{dialog.getControlTabIndex()}} required></label></div></div><div class=modal-footer><button class="btn btn-primary" ng-click="submit(user.userName.$modelValue, user.password.$modelValue)" translate=BUTTON_SUBMIT ng-attr-tabindex={{dialog.getControlTabIndex()}} ng-disabled=user.$invalid></button> <button class="btn btn-default" ng-click=cancel() translate=BUTTON_CANCEL ng-attr-tabindex={{dialog.getControlTabIndex()}}></button></div></form></div></div>'), a.put("app/rdp-client-ui/Session/loaderTemplate.html", "<div class=modal-dialog ng-init=dialog.focus() role=dialog ng-attr-aria-labelledby={{dialog.labelID}} ng-attr-aria-hidden={{!dialog.isTopMost()}}><div class=modal-content><div class=loading-animation><div></div><div></div><div></div><div></div><div></div></div><div class=modal-header><h3 translate=LOADER_DIALOG_CONNECTING_MESSAGE translate-values=\"{'appPackageName': appPackageName}\" ng-attr-id={{dialog.labelID}}></h3></div><div class=modal-body aria-live=assertive translate={{getConnState()}}></div><div class=rdp-connection-dialog__footer><div ng-style=\"{'visibility': displayShowDetails ? 'visible' : 'hidden'}\" aria-live=assertive class=rdp-connection-dialog__footer-details><a class=\"disabled no-text-decoration\" href=javascript:void(0) translate=SHOW_DETAILS_LABEL aria-disabled=\"{{isSessionConnected() ? 'false' : 'true'}}\" ng-attr-tabindex={{dialog.getControlTabIndex()}} ng-class=\"isSessionConnected() ? '' : 'disabled'\" ng-click=displayDesktopBackground()></a></div><div class=\"modal-footer modal-footer--no-left-padding\"><button class=\"btn btn-default\" ng-click=cancel() translate=BUTTON_CANCEL ng-attr-tabindex={{dialog.getControlTabIndex()}}></button></div></div></div></div>"), a.put("app/rdp-client-ui/Session/localIMEAlert.html", '\x3c!--Raw HTML template to show a modal whose content is notification to turn off local IME--\x3e<div class=modal-header></div><div id=localIMEAlertModalID class=modal-body><span translate=LOCALIMEALERT_TITLE></span></div><div class=modal-footer><button class="btn btn-primary skip-button" ng-click=$close(0) translate=BUTTON_OK rdp-grab-focus></button></div>'), a.put("app/rdp-client-ui/Session/noGatewayErrorTemplate.html", '<div class=modal-header><h3><span translate=CONNECTION_ERROR_DIALOG_TITLE ng-attr-id={{describedByID}} translate-values="{\'sessionTitle\': sessionTitle}"></span></h3></div><div class=modal-body><span translate=NO_GATEWAY_ERROR_TEXT></span></div><div class=modal-footer><button class="btn btn-primary" ng-click=$close(0) translate=BUTTON_CLOSE rdp-grab-focus></button></div>'), a.put("app/rdp-client-ui/Session/popupAlert.html", '\x3c!--Raw HTML template to show a modal whose content is popup alert dialog--\x3e<div class=modal-header style="padding-bottom: 0"><h4 class="modal-title centered" style="text-transform: none; margin-bottom: 10px; font-size: 15px" translate=POPUPALERT_TITLE ng-attr-id={{popupAlertDescribedByID}}></h4></div><div class=modal-body style="padding: 0 15px 0 15px"><button class="btn btn-primary skip-button" style="margin-bottom: 15px; margin-left:\n  42%;padding: 0 22px; width: 65px; height: 30px;" ng-click=ok() translate=BUTTON_OK rdp-grab-focus></button></div>'), a.put("app/rdp-client-ui/Session/redirectionPromptTemplate.html", '<div class=modal-header><h3><span class="mdl mdl-fw mdl-Warning" style="font-size: 40px; position: relative; top: 9px; color: white"></span> <span translate=REDIRECTION_DIALOG_HEADER ng-attr-id={{redirDialogDescribedByID}}></span></h3></div><form><div class=modal-body><div class=form-group translate=REDIRECTION_DIALOG_MESSAGE></div><div class=form-group><div style="display: inline-block; width: 250px;" ng-repeat="redirection in redirectionsRequested"><label class=checkbox-label ng-class="{\'redirection-unavailable\':  !redirection.available}" popover-enable=!redirection.available uib-popover-template="\'app/rdp-client-ui/Session/redirectionUnavailable-popover.html\'" popover-trigger="\'mouseenter\'" popover-class=redirection-unavailable-popover popover-placement=bottom><input type=checkbox ng-disabled="rememberCollection || !redirection.available" ng-checked=redirections[redirection.id] ng-model=redirections[redirection.id]> <i class=checkbox-tick></i><span translate={{redirection.locKey}}></span></label></div></div><div class=form-group><label class=checkbox-label><input id=remember-server type=checkbox ng-model=rememberCollection> <i class=checkbox-tick></i><span translate=REDIRECTION_DIALOG_DONT_ASK_AGAIN></span></label></div></div><div class=modal-footer><button class="btn btn-default" ng-click="submit(redirections, rememberCollection)" translate=BUTTON_ALLOW></button> <button class="btn btn-default" ng-click=cancel() translate=BUTTON_CANCEL></button></div>\x3c!-- Needed for class to be picked up in tidy.css --\x3e <span class=redirection-unavailable></span></form>'), a.put("app/rdp-client-ui/Session/redirectionUnavailable-popover.html", "<div class=redirection-unavailable-popover translate=REDIRECTION_NOT_AVAILABLE></div>"), a.put("app/rdp-client-ui/Session/Session.html", '<div class=session-top-layer-container><div class=top-layer id=background-loader><loading-spinner class=top-spinner loader-type=sessionLoader></loading-spinner></div><input type=password id=hiddenClipboardBox style="position:fixed; left:-10000px; top: -500px;" clip-textbox tabindex=-1 role=none aria-hidden=true translate-attr="{\'aria-label\': \'SESSION_PANEL_LABEL\'}"><textarea id=auxTextbox aux-textbox-element style="position:fixed; height:10px; width:10px; left:-10010px; top: -510px;" tabindex=-1 aria-hidden=true></textarea><div class=main-container><div class=canvas-container id=canvas-container canvas-size-handler aria-hidden=true tabindex=-1></div><div class="dialog-container rdp-dialog-backdrop" id=dialog-container ng-show=connectionDialog.isDialogVisible()></div></div><connection-error session=getActiveSession() ng-if="getActiveSession().getDisconnectReason() && !getReconnecting()"></connection-error></div>'), a.put("app/rdp-client-ui/Session/toast.html", '\x3c!--Raw HTML template to show a modal whose content is the list of invitations--\x3e<div class=modal-body style="padding: 16px 24px 20px 20px"><i class="mdl mdl-fw mdl-CheckMark" ng-class="{\'mdl-CheckMark\': type === 1, \'mdl-Info\': type === 2}" style="font-size: 20px; position: relative; top: 4px; color: white"></i> <span style="font-size: 20px; color: white; margin-left: 12px">{{message}}</span></div>'), a.put("app/rdp-client-ui/sign-in-modal.html", '<div class=modal-header><h3 translate=SIGNIN_DIALOG_TITLE id=signInTitle style=color:#ffffff;font-family:inherit;font-size:27px;font-style:initial;font-weight:bold></h3></div><form><div class=modal-body><div class=form-group><label style=display:block><span translate=USER_NAME_LABEL class=rdp-field-label></span><br><input class=form-control style="width: 100%" ng-disabled=signInPending translate-attr="{placeholder: \'USER_NAME_LABEL\'}" ng-model=user.userName autofocus spellcheck=false ng-attr-tabindex=3></label> <label style="margin-top: 20px; display:block"><span translate=PASSWORD_LABEL class=rdp-field-label></span><br><input type=password class=form-control style="width: 100%" ng-disabled=signInPending translate-attr="{placeholder: \'PASSWORD_LABEL\'}" ng-model=user.password ng-attr-tabindex=3></label></div><div role=alert ng-show=loginFailMessage class=sign-in-warning style="display:table-row; color:#ff1313"><span class="mdl mdl-fw mdl-Warning" style="font-size:25px; margin-right:5px; display:inline-block; position:relative; top:5px"></span><div style="display:table-cell; align-items: center;"><span translate={{loginFailMessage}}></span> <a ng-show="loginFailMessage && passwordResetLink " ng-href={{passwordResetLink}} target=_blank translate=SESSION_DISCONNECT_CODE_PASSOWORD_CHANGE_LINK></a></div></div></div><div class=modal-footer style=position:relative><button class="btn btn-primary" ng-click=signIn() translate=BUTTON_SIGNIN ng-attr-tabindex=3 ng-disabled=signInPending></button><div style="position:absolute; bottom:20px"><a href="https://go.microsoft.com/fwlink/?LinkId=521839" target=_blank translate=PRIVACY_POLICY_LABEL ng-attr-tabindex=3></a></div></div></form>'), a.put("app/rdp-client-ui/SupportInformation.html", "\x3c!-- Support information --\x3e<div><div class=sidepanel-header><h4 id=Support_modal_title class=sidepanel-header-title translate=SUPPORT translate-attr=\"{ 'title': 'SUPPORT', 'ng-attr-aria-label': 'SUPPORT'}\"></h4><a href=javascript:void(0) class=\"close close-button qoe-close\" ng-click=$close(0) rdp-grab-focus translate-attr=\"{ 'title': 'BUTTON_CLOSE', 'ng-attr-aria-label': 'BUTTON_CLOSE'}\" role=button><i class=\"mdl mdl-fw mdl-20x mdl-Cross\"></i></a></div><div ng-show=supportObj.logoURL class=sidepanel-content><img class=\"img supportIconImage\" ng-src={{supportObj.logoURL}} alt=\"\"></div><div style=\"display: table\" class=sidepanel-content><div ng-show=supportObj.supportURL class=supportRow><div class=supportCell><img class=\"img img-responsive supportImage\" src=\"assets/images/Globe (E774).03f2790f.png\" translate-attr=\"{ 'title': 'SUPPORT_URL'}\" alt=\"\"></div><div class=supportCell><a role=button translate-attr=\"{ 'title': 'SUPPORT_URL', 'ng-attr-aria-label': 'SUPPORT_URL'}\" ng-href={{supportObj.supportURL}} target=_blank>{{supportObj.supportURL}}</a></div></div><div ng-show=supportObj.supportPhone class=supportRow><div class=supportCell><img class=\"img img-responsive supportImage\" src=\"assets/images/Phone (E717).97ff6f38.png\" translate-attr=\"{ 'title': 'SUPPORT_PHONE'}\" alt=\"\"></div><div class=supportCell><a role=button translate-attr=\"{ 'title': 'SUPPORT_PHONE', 'ng-attr-aria-label': 'SUPPORT_PHONE'}\" href=tel: {{supportobj.supportphone}} target=_blank>{{supportObj.supportPhone}}</a></div></div><div ng-show=supportObj.privacyURL class=supportRow><div class=supportCell><img class=\"img img-responsive supportImage\" src=\"assets/images/MobSIMLock (E875).4e720678.png\" translate-attr=\"{ 'title': 'PRIVACY_INFO'}\" alt=\"\"></div><div class=supportCell><a role=button translate-attr=\"{ 'title': 'PRIVACY_INFO', 'ng-attr-aria-label': 'PRIVACY_INFO'}\" ng-href={{supportObj.privacyURL}} target=_blank translate=PRIVACY_INFO></a></div></div></div></div>")
}]);