declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeFrozen(expectationFailOutput?: any): boolean;
        }
    }
}

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