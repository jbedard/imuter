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

function toBeFrozen(util: jasmine.MatchersUtil, customEqualityTesters: readonly jasmine.CustomEqualityTester[]): jasmine.CustomMatcher {
    return {
        compare(actual: any, expectationFailOutput?: any) {
            return {
                message: expectationFailOutput || `Expected ${actual} to be frozen`,
                pass: Object.isFrozen(actual)
            };
        }
    };
}