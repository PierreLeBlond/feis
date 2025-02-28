export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","CNAME","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.6zaEBxn-.js",app:"_app/immutable/entry/app.B4Nsgcwj.js",imports:["_app/immutable/entry/start.6zaEBxn-.js","_app/immutable/chunks/Ca7uqeW1.js","_app/immutable/chunks/DRF9QMb9.js","_app/immutable/chunks/DJLOelGB.js","_app/immutable/entry/app.B4Nsgcwj.js","_app/immutable/chunks/DRF9QMb9.js","_app/immutable/chunks/C6vZ3gDl.js","_app/immutable/chunks/DRR3ANIp.js","_app/immutable/chunks/B1ENoBDp.js","_app/immutable/chunks/DJLOelGB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
