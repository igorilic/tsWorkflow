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
		tsOutputPath: clientApp,
		
		// js files
		js: [
			clientApp + '**/*.module.js',
			clientApp + '**/*.js',
			'!' + clientApp + '**/*.spec.js'
		],
		// css files
		
		
		// bower
		bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
		index: client + 'index.html'
	};
	
	config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
	
	return config;
}