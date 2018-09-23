"use strict";

const fs = require("fs");

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
            exclude: {
                mode: "merge",
                values: ["type-specs"]
            },
            compilerOptions: Object.assign(
                JSON.parse(fs.readFileSync("./tsconfig.json", {encoding: "utf8"})).compilerOptions,
                {module: undefined}
            )
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