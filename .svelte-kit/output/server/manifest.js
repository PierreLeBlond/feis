export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.C4Eca3lj.js",app:"_app/immutable/entry/app.BYmY2JfT.js",imports:["_app/immutable/entry/start.C4Eca3lj.js","_app/immutable/chunks/CHfxqMlv.js","_app/immutable/chunks/DRF9QMb9.js","_app/immutable/chunks/DJLOelGB.js","_app/immutable/entry/app.BYmY2JfT.js","_app/immutable/chunks/DRF9QMb9.js","_app/immutable/chunks/C6vZ3gDl.js","_app/immutable/chunks/DRR3ANIp.js","_app/immutable/chunks/B1ENoBDp.js","_app/immutable/chunks/DJLOelGB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
