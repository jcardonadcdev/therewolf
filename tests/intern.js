define([
	'intern'
], function(
	intern
) {
	return {
		reporters: ['console', 'html'],

		loader: {
			async: true,
			packages: [{
				name: 'dojo',
				location: 'tests/libs/dojo'
			}, {
				name: 'esri',
				location: 'tests/libs/esri'
			}]
		},

		suites: ['tests/therewolf_test'],

		// A regular expression matching URLs to files that should not be included in code coverage analysis
		excludeInstrumentation: /(?:^|\\)(node_modules|tests)/
	};
});
