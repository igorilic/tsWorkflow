module.exports = function() {
	var root = './';
	var client = root + 'src/';
	var clientApp = client + 'app/';
	
	var config = {
		// global paths
		root: root,
		client: client,
		clientApp: clientApp,
		
		// ts files
		ts: clientApp + '**/*.ts',
		libraryTsDefinitions: './typings/**/*.ts',
		tsOutputPath: clientApp
	};
	
	return config;
}