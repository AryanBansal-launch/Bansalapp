export default {
	displayName: "functions",
	preset: "../jest.preset.js",
	testEnvironment: "node",
	transform: {
		"^.+\\.js$": "babel-jest"
	},
	moduleFileExtensions: ["js", "json"],
	coverageDirectory: "../coverage/functions",
	testMatch: ["<rootDir>/__tests__/**/*.(test|spec).js"],
	transformIgnorePatterns: [
		"node_modules/(?!(.*\\.mjs$))"
	]
};
