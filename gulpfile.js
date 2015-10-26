var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var tsProject = $.typescript.createProject('tsconfig.json')
var del = require('del');
var wiredep = require('wiredep');
var browserSync = require('browser-sync');

var config = require('./gulp.config')();

/**
 * Task: tslint
 */
gulp.task('ts-lint', function() {
	log('Linting ts files...')
	return gulp
			.src(config.ts)
			.pipe($.tslint())
			.pipe($.tslint.report('prose'));
});
	
/**
 * Task: compile ts
 */
gulp.task('compile-ts', ['ts-lint'], function() {
	log('Compiling ts files...');
	var sourceTsFiles = [
		config.ts,
		config.libraryTsDefinitions
	];
	var tsResult = gulp
					.src(sourceTsFiles, { base: '.'})
					.pipe($.sourcemaps.init())
					.pipe($.typescript(tsProject));
					
	tsResult.dts.pipe(gulp.dest('.'));
	
	return tsResult.js
				.pipe($.sourcemaps.write('.'))
				.pipe(gulp.dest('.'));
});

/**
 * Task: clean js
 */
gulp.task('clean-js', function(callback) {
	var typescriptGenFiles = [
		config.tsOutputPath + '**/*.js',
		config.tsOutputPath + '**/*.js.map'
	];
	
	del(typescriptGenFiles, callback);
});

gulp.task('serve-ts', function() {
	gulp.watch(
		[config.ts], 
		['ts-lint', 'compile-ts']
	);
});

gulp.task('wiredep', function () {
    log('wire up the bower css js in index.html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep'], function () {
    log('wire up the app css  in index.html and call wiredep');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

//////////

function log (msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}