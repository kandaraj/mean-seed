// Karma configuration
// Generated on Tue May 10 2016 14:39:22 GMT+1000 (AUS Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'app/public/scripts/**/*.directives.js',
      'app/public/scripts/*.js',
      'app/public/features/**/*.mod.js',
      'app/public/!(libs)/**/*.js', // dont include the libs
      'tests/**/*.js',

      // fixtures
      {pattern: 'tests/mocks/*.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
      'app/public/bower_components/**/*.js'
    ],

    plugins : ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-coverage'],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    coverageReporter : {
      type : 'html',
      dir : 'coverage/'
    },

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      'app/**/*.js' : ['coverage'],
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome', 'PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
