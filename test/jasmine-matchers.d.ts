declare namespace jasmine {
    interface Matchers<T> {
        toBeFrozen(expectationFailOutput?: any): boolean;
    }
}