"use strict";

module.exports = function(config) {
    config.set({
        basePath: "",

        frameworks: ["jasmine", "karma-typescript"],

        client: {
            jasmine: {
                random: true
            }
        },

        files: [
            {pattern: "src/**/*.ts"},
            {pattern: "test/**/*.ts"}
        ],

        reporters: ["progress", "karma-typescript"],

        coverageReporter: {
            type: "in-memory"
        },

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            coverageOptions: {
                //Enabled coverage when running in non-server mode
                instrumentation: config.singleRun
            },
        },

        port: 9876,

        colors: true,

        logLevel: "INFO",

        reportSlowerThan: 100,

        browsers: config.browsers.length ? config.browsers : ["Chrome"],

        captureTimeout: 60000,
        browserNoActivityTimeout: 60000
    });
};