/// <reference path="../test/jasmine-matchers.d.ts" />

export function addMatchers() {
    jasmine.addMatchers({toBeFrozen});
}

function toBeFrozen(util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]): jasmine.CustomMatcher {
    return {
        compare(actual: any, expectationFailOutput?: any) {
            return {
                pass: Object.isFrozen(actual),
                message: expectationFailOutput || `Expected ${actual} to be frozen`
            };
        }
    };
}