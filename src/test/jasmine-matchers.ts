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

function toBeFrozen(_: jasmine.MatchersUtil, __: readonly jasmine.CustomEqualityTester[]): jasmine.CustomMatcher {
    return {
        compare(actual: any, expectationFailOutput?: any) {
            return {
                message: expectationFailOutput || `Expected ${actual} to be frozen`,
                pass: Object.isFrozen(actual)
            };
        }
    };
}