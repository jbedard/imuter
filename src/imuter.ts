 /// <amd-module name="imuter" />

"use strict";

//Should be determined at compile time to allow tree-shaking
const FREEZING_ENABLED = typeof process !== "undefined" && process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = {}.toString;

export type PrimitiveType = number | string | boolean | symbol | null | undefined | Function;

function recursiveFreeze<T extends PrimitiveType>(value: T): T;
function recursiveFreeze<T extends PrimitiveType>(value: readonly T[]): readonly T[];
function recursiveFreeze<T extends object>(value: ReadonlyArray<Readonly<T>>): ReadonlyArray<Readonly<T>>;
function recursiveFreeze<T extends object>(value: Readonly<T>): Readonly<T>;
function recursiveFreeze(value: unknown): unknown;
function recursiveFreeze(value: never): never;
function recursiveFreeze(value: any): any {
    // Primitives, naturally frozen and already frozen.
    // Assume it was deep frozen already as this must stop the recursion.
    if (Object.isFrozen(value)) {
        return value;
    }

    // Unfreezable nodes, assuming a numeric nodeType is a DOM Node
    if (+value.nodeType) {
        return value;
    }

    switch (toString.call(value)) {
        // Unfreezable types via toString()
        case "[object Int8Array]":
        case "[object Int16Array]":
        case "[object Int32Array]":
        case "[object Float32Array]":
        case "[object Float64Array]":
        case "[object Uint8Array]":
        case "[object Uint8ClampedArray]":
        case "[object Uint16Array]":
        case "[object Uint32Array]":
        case "[object ArrayBuffer]":
        case "[object Blob]":
        case "[object DOMWindow]":
        case "[object Window]":
        case "[object global]":
        case "[object XMLHttpRequest]":
            return value;

        // No need to recurse
        case "[object Boolean]":
        case "[object Number]":
        case "[object String]":
        case "[object Date]":
        case "[object RegExp]":
            return Object.freeze(value);
    }

    //Freeze before recursing in case of recursive references
    Object.freeze(value);

    if (Array.isArray(value)) {
        for (const entry of value) {
            recursiveFreeze(entry);
        }
    }
    else {
        for (const key in value) {
            recursiveFreeze(value[key]);
        }
    }

    return value;
}


function identity<T>(value: T): T { return value; }
function valueFn<T>(v: T): () => T { return function() { return v; }; }

//The signature of recursiveFreeze is nicer then Object.freeze so use that
export type Freezer = typeof recursiveFreeze;

const shallowFreeze: Freezer = FREEZING_ENABLED ? <any>Object.freeze   : identity;
const deepFreeze: Freezer    = FREEZING_ENABLED ? <any>recursiveFreeze : identity;

/**
 * Freezes the passed object.
 *
 * NOTE: in production this is a noop/identity function.
 *
 * @param value the object to freeze
 * @returns the passed object, now frozen
 */
export const imuter = deepFreeze;


const DELETE_VALUE: any = deepFreeze({});
const REMOVE_VALUE: any = deepFreeze({});
const REMOVE_VALUE_FN = valueFn(REMOVE_VALUE);

function shallowCloneObject<T extends object>(obj: Readonly<T>): T {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

// Objects

/**
 * Sets a property on an object.
 *
 * If the `obj[prop]` already equals the `value` the existing object is returned.
 *
 * @param obj the object
 * @param prop the property
 * @param value the value
 * @returns a new (frozen) instance of the object with the property updated
 */
export function object_set<K extends keyof T, T extends object>(obj: Readonly<T>, prop: K, value: T[K]): Readonly<T> {
    if ((value === DELETE_VALUE || value === REMOVE_VALUE) ? !(prop in <any>obj) : obj[prop] === value) {
        return obj;
    }

    const newObj: T = shallowCloneObject(obj);

    if (value === DELETE_VALUE || value === REMOVE_VALUE) {
        delete newObj[prop];
    }
    else {
        FREEZING_ENABLED && deepFreeze(value);
        newObj[prop] = value;
    }

    FREEZING_ENABLED && shallowFreeze(newObj);
    return newObj;
}

/**
 * `delete`s a property from an object.
 *
 * If the `obj[prop]` already does not exist the existing object is returned.
 *
 * @param obj the object
 * @param prop the property to delete
 * @returns a new (frozen) instance of the object with the property deleted
 */
export function object_delete<T extends object>(obj: Readonly<T>, prop: keyof T): Readonly<T> {
    return object_set(obj, prop, DELETE_VALUE);
}

/**
 * Shallow merge into a new JSON object.
 *
 * @returns `a` and `b` merged into a new JSON object
 */
export function object_assign<T, U>(a: T, b: U): Readonly<T & U>;
/**
 * Shallow merge into a new JSON object.
 *
 * @returns `a`, `b` and `c` merged into a new JSON object
 */
export function object_assign<T, U, V>(a: T, b: U, c: V): Readonly<T & U & V>;
/**
 * Shallow merge into a new JSON object.
 *
 * @returns `a`, `b`, `c` and `d` merged into a new JSON object
 */
export function object_assign<T, U, V, W>(a: T, b: U, c: V, d: W): Readonly<T & U & V & W>;
/**
 * Shallow merge into a new JSON object.
 *
 * @param sources the objects to merge
 * @returns `a`, `b`, `c`, `d` and all `sources` merged into a new JSON object
 */
export function object_assign<T, U, V, W, X>(a: T, b: U, c: V, d: W, ...sources: X[]): Readonly<T & U & V & W & X>;
export function object_assign(...sources: any[]) {
    const newObj = Object.assign({}, ...sources);
    FREEZING_ENABLED && deepFreeze(newObj);
    return newObj;
}


// Arrays

/**
 * Assign to an index of the passed array.
 *
 * If the `array[index]` already equals the `value` the existing array is returned.
 *
 * @param arr the array
 * @param index the index assign to
 * @param value the value
 * @returns a new (frozen) instance of the array with the specified `index` set to `value`
 */
export function array_set<T>(arr: readonly T[], index: number, value: T): readonly T[] {
    if ((value === DELETE_VALUE || value === REMOVE_VALUE) ? !(index in arr) : arr[index] === value) {
        return arr;
    }

    const newArr = arr.slice();
    if (value === DELETE_VALUE) {
        delete newArr[index];
    }
    else if (value === REMOVE_VALUE) {
        newArr.splice(index, 1);
    }
    else {
        FREEZING_ENABLED && deepFreeze(value);
        newArr[index] = value;
    }
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * `delete`s an index from the passed array.
 *
 * If the `array[index]` already does not exist the existing array is returned.
 *
 * @param arr the array
 * @param index the index to delete
 * @returns a new (frozen) instance of the array with `index` `delete`ed
 */
export function array_delete<T>(arr: readonly T[], index: number): readonly T[] {
    return array_set<T>(arr, index, DELETE_VALUE);
}

/**
 * Removes entries from an array. Equivelent to the standard `splice`.
 *
 * If the `array[index]` does not exist the existing array is returned.
 *
 * @param arr the array
 * @param index the index to remove from
 * @param deleteCount the number of entries to remove (default: 1)
 * @returns a new (frozen) instance of the array with `deleteCount` entries removed at `index`
 */
export function array_remove<T>(arr: readonly T[], index: number, deleteCount = 1): readonly T[] {
    if (arr.length <= index || deleteCount === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.splice(index, deleteCount);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

function notEqualThis(this: any, x: any) {
    return x !== this;
}

/**
 * Remove all occurances of a value from an array.
 *
 * If no occurances exist the existing array is returned.
 *
 * @param arr the array
 * @param value the value to remove from the array
 * @returns a new (frozen) instance of the array with `value` removed
 */
export function array_exclude<T>(arr: readonly T[], value: T): readonly T[] {
    return array_filter(arr, notEqualThis, value);
}

/**
 * Replace all occurances of a value with a new value.
 *
 * @param arr the array
 * @param oldValue the value to replace
 * @param newValue the new value
 * @returns a new (frozen) instance of the array with `oldValue` replaced with `newValue`
 */
export function array_replace<T>(arr: readonly T[], oldValue: T, newValue: T): readonly T[] {
    FREEZING_ENABLED && deepFreeze(newValue);

    let found = false;

    const n = array_map(arr, v => v === oldValue ? (found = true) && newValue : v);

    return found ? n : arr;
}

/**
 * Push values onto an array.
 *
 * @param arr the array
 * @param values the values to push
 * @returns a new (frozen) instance of the array with the values pushed
 */
export function array_push<T>(arr: readonly T[], ...values: T[]): readonly T[] {
    if (values.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.push(...values);
    FREEZING_ENABLED && deepFreeze(values);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Shift a value off the array.
 *
 * If the array is empty the existing array is returned.
 *
 * @param arr the array
 * @returns a new (frozen) instance of the array with an entry shifted
 */
export function array_shift<T>(arr: readonly T[]): readonly T[] {
    if (arr.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.shift();
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Pops a value off the array.
 *
 * If the array is empty the existing array is returned.
 *
 * @param arr the array
 * @returns a new (frozen) instance of the array with an entry popped
 */
export function array_pop<T>(arr: readonly T[]): readonly T[] {
    if (arr.length === 0) {
        return arr;
    }

    const newArr = arr.slice(0, -1);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Unshift values onto the array.
 *
 * @param arr the array
 * @returns a new (frozen) instance of the array with the `values` `unshift`ed
 */
export function array_unshift<T>(arr: readonly T[], ...values: T[]): readonly T[] {
    if (values.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.unshift(...values);
    FREEZING_ENABLED && deepFreeze(values);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Slice off a portion of the array.
 *
 * @param arr the array
 * @param start the start of the slice
 * @param end the end of the slice (default: the end)
 * @returns a slice of the array
 */
export function array_slice<T>(arr: readonly T[], start: number, end?: number): readonly T[] {
    if (start === 0 && (end === undefined || arr.length <= end)) {
        return arr;
    }

    const newArr = arr.slice(start, end);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Insert values into an array.
 *
 * @param arr the array
 * @param index the index to insert at
 * @param values the values to insert
 * @returns a new (frozen) instance of the array with the `values` inserted at `index`
 */
export function array_insert<T>(arr: readonly T[], index: number, ...values: T[]): readonly T[] {
    if (values.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.splice(index, 0, ...values);
    FREEZING_ENABLED && deepFreeze(values);
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

/**
 * Map the entries of the array to (potentially) new values.
 *
 * @param arr the array
 * @param callbackFn the mapping function
 * @param context the context to execute `callbackFn`
 * @returns a new mapped array
 */
export function array_map<T, U = unknown, C = unknown>(arr: readonly T[], callbackFn: (value: T, index: number, array: readonly T[]) => U, context?: C): readonly U[] {
    if (arr.length === 0) {
        return arr as any;
    }

    const mapped: U[] = arr.map(callbackFn, context);
    FREEZING_ENABLED && deepFreeze(mapped);
    return mapped;
}

/**
 * Filter the entries of an array.
 *
 * @param arr the array
 * @param filterFn the filter function
 * @param context the context to execute `filterFn`
 * @returns a new filtered array
 */
export function array_filter<T, C = unknown>(arr: readonly T[], filterFn: (value: T, index: number, array: readonly T[]) => unknown, context?: C): readonly T[] {
    if (arr.length === 0) {
        return arr;
    }

    const filtered = arr.filter(filterFn, context);
    const newArr = (filtered.length === arr.length) ? arr : filtered;
    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}

function arrayEqualsThis<T>(this: readonly T[], o: T, i: number) {
    return o === this[i];
}

/**
 * Sort an array
 *
 * @param arr the array
 * @param sortFn the sort comparison function
 * @returns a new sorted array
 */
export function array_sort<T>(arr: readonly T[], sortFn: (a: T, b: T) => number): readonly T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const newArr = arr
        .slice()
        .sort(sortFn);

    if (newArr.every(arrayEqualsThis, arr)) {
        return arr;
    }

    FREEZING_ENABLED && shallowFreeze(newArr);
    return newArr;
}


/**
 * Set an array entry via factory method.
 *
 * @param array the array
 * @param index the index
 * @param factory the value factory method
 * @returns a new (frozen) instance of the array with the `index` set to the `factory` method result
 */
export function write<T>(array: readonly T[], index: number | [number], factory: (oldValue: T, array: readonly T[]) => T): readonly T[];
/**
 * Set an object value within an array via factory method.
 *
 * @param array the array
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the array+object with the `path` set to the `factory` method result
 */
export function write<K1 extends keyof T, T extends object>(array: readonly T[], path: [number, K1], factory: (oldValue: T[K1], array: readonly T[]) => T[K1]): readonly T[];
/**
 * Set an object deep value within an array via factory method.
 *
 * @param array the array
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the array+objects with the `path` set to the `factory` method result
 */
export function write<K1 extends keyof T, K2 extends keyof T[K1], T extends object>(array: readonly T[], path: [number, K1, K2], factory: (oldValue: T[K1][K2], array: readonly T[]) => T[K1][K2]): readonly T[];
/**
 * Set an object deep value within an array via factory method.
 *
 * @param array the array
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the array+objects with the `path` set to the `factory` method result
 */
export function write<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T extends object>(array: readonly T[], path: [number, K1, K2, K3], factory: (oldValue: T[K1][K2][K3], data: readonly T[]) => T[K1][K2][K3]): readonly T[];
/**
 * Set an object deep value within an array via factory method.
 *
 * @param array the array
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the array+objects with the `path` set to the `factory` method result
 */
export function write<T>(array: readonly T[], path: Array<string | number>, factory: (oldValue: any, array: readonly T[]) => any): readonly T[];
/**
 * Set an object value via factory method.
 *
 * @param object the object
 * @param key the key to set
 * @param factory the value factory method
 * @returns a new (frozen) instance of the object with the `key` set to the `factory` method result
 */
export function write<K1 extends keyof T, T extends object>(object: Readonly<T>, key: K1 | [K1], factory: (oldValue: T[K1], object: Readonly<T>) => T[K1]): Readonly<T>;
/**
 * Set an object deep value via factory method.
 *
 * @param object the object
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the objects with the `key` set to the `factory` method result
 */
export function write<K1 extends keyof T, K2 extends keyof T[K1], T extends object>(object: Readonly<T>, path: [K1, K2], factory: (oldValue: T[K1][K2], object: Readonly<T>) => T[K1][K2]): Readonly<T>;
/**
 * Set an object deep value via factory method.
 *
 * @param object the object
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the objects with the `key` set to the `factory` method result
 */
export function write<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T extends object>(object: Readonly<T>, path: [K1, K2, K3], factory: (oldValue: T[K1][K2][K3], object: Readonly<T>) => T[K1][K2][K3]): Readonly<T>;
/**
 * Set an object deep value via factory method.
 *
 * @param object the object
 * @param path the path to the value
 * @param factory the value factory method
 * @returns a new (frozen) instance of the objects with the `key` set to the `factory` method result
 */
export function write<T extends object>(object: Readonly<T>, path: Array<string | number>, factory: (oldValue: any, data: Readonly<T>) => any): Readonly<T>;
export function write<T>(data: T, pathOrKey: Array<string | number> | number | keyof T, factory: Function) {
    const path = Array.isArray(pathOrKey) ? pathOrKey : [pathOrKey];

    //Follow the path into the object, except for the last value being replaced
    const objs: any[] = [data];
    for (let i = 0; i < path.length; i++) {
        // Support non-existing parent values for the removeValue case
        if (factory === REMOVE_VALUE_FN && !objs[i].hasOwnProperty(path[i])) {
            return data;
        }

        objs.push( objs[i][path[i]] );
    }

    //Replace the last object with the new value
    objs[objs.length - 1] = factory(objs[objs.length - 1], data);

    //Write the new immutable data back into the objects
    for (let i = objs.length - 2; i >= 0; i--) {
        const key = path[i] as any;
        const obj = objs[i];
        const val = objs[i + 1];

        if (Array.isArray(obj)) {
            objs[i] = array_set(obj, key, val);
        }
        else {
            objs[i] = object_set<any, any>(obj, key, val);
        }
    }

    return objs[0];
}


function read(data: any, path: Array<string | number>) {
    let obj = data;
    for (const p of path) {
        obj = obj[p];
    }
    return obj;
}


/**
 * Set an array entry. Equivelent to `array_set`.
 *
 * @param array the array
 * @param index the index
 * @param value the value
 * @returns a new (frozen) instance of the array with the `index` set to the `value`
 */
export function writeValue<T>(array: readonly T[], index: number | [number], value: T): readonly T[];
/**
 * Set an object value within an array.
 *
 * @param array the array
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object+array with the `index` set to the `value`
 */
export function writeValue<K1 extends keyof T, T>(array: readonly T[], path: [number, K1], value: T[K1]): readonly T[];
/**
 * Set a nested object value within an array.
 *
 * @param array the array
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object+array with the `index` set to the `value`
 */
export function writeValue<K1 extends keyof T, K2 extends keyof T[K1], T>(array: readonly T[], path: [number, K1, K2], value: T[K1][K2]): readonly T[];
/**
 * Set a nested object value within an array.
 *
 * @param array the array
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object+array with the `index` set to the `value`
 */
export function writeValue<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T>(array: readonly T[], path: [number, K1, K2, K3], value: T[K1][K2][K3]): readonly T[];
/**
 * Set a nested object value within an array.
 *
 * @param array the array
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object+array with the `index` set to the `value`
 */
export function writeValue<T>(array: readonly T[], path: Array<string | number>, value: any): readonly T[];
/**
 * Set an object value. Equivelent to `object_set`.
 *
 * @param object the object
 * @param key the key
 * @param value the value
 * @returns a new (frozen) instance of the object with the `key` set to the `value`
 */
export function writeValue<K1 extends keyof T, T extends object>(object: Readonly<T>, key: K1 | [K1], value: T[K1]): Readonly<T>;
/**
 * Set a nested object value.
 *
 * @param object the object
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object with the `path` set to the `value`
 */
export function writeValue<K1 extends keyof T, K2 extends keyof T[K1], T extends object>(object: Readonly<T>, path: [K1, K2], value: T[K1][K2]): Readonly<T>;
/**
 * Set a nested object value.
 *
 * @param object the object
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object with the `path` set to the `value`
 */
export function writeValue<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T extends object>(object: Readonly<T>, path: [K1, K2, K3], value: T[K1][K2][K3]): Readonly<T>;
/**
 * Set a nested object value.
 *
 * @param object the object
 * @param path the path to the value
 * @param value the value
 * @returns a new (frozen) instance of the object with the `path` set to the `value`
 */
export function writeValue<T extends object>(object: Readonly<T>, path: Array<string | number>, value: any): Readonly<T>;
export function writeValue<T extends object>(data: T, pathOrKey: Array<string | number> | number | keyof T, value: any) {
    return write<T>(data, <any>pathOrKey, valueFn(value));
}


/**
 * Merge values into an object within an array. Equivelent to `object_assign`.
 *
 * @param array the array
 * @param index the index of the object
 * @param values the values to merge
 * @returns a new (frozen) instance of the object+array with the `values` merged in
 */
export function writeValues<T>(array: readonly T[], index: number | [number], values: Partial<T>): readonly T[];
/**
 * Merge values into an object within an array.
 *
 * @param array the array
 * @param path the path to the object within the array
 * @param values the values to merge
 * @returns a new (frozen) instance of the object+array with the `values` merged in
 */
export function writeValues<K1 extends keyof T, T>(array: readonly T[], path: [number, K1], values: Partial<T[K1]>): readonly T[];
/**
 * Merge values into an object deep within an array.
 *
 * @param array the array
 * @param path the path to the deep object within the array
 * @param values the values to merge
 * @returns a new (frozen) instance of the object+array with the `values` merged in
 */
export function writeValues<K1 extends keyof T, K2 extends keyof T[K1], T>(array: readonly T[], path: [number, K1, K2], values: Partial<T[K1][K2]>): readonly T[];
/**
 * Merge values into an object deep within an array.
 *
 * @param array the array
 * @param path the path to the deep object within the array
 * @param values the values to merge
 * @returns a new (frozen) instance of the object+array with the `values` merged in
 */
export function writeValues<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T>(array: readonly T[], path: [number, K1, K2, K3], values: Partial<T[K1][K2][K3]>): readonly T[];
/**
 * Merge values into an object deep within an array.
 *
 * @param array the array
 * @param path the path to the deep object within the array
 * @param values the values to merge
 * @returns a new (frozen) instance of the object+array with the `values` merged in
 */
export function writeValues<T>(array: readonly T[], path: Array<string | number>, values: {[k: string]: any}): readonly T[];
/**
 * Merge values into an object. Equivelent to `object_assign`.
 *
 * @param object the object
 * @param key the key
 * @param values the values to merge
 * @returns a new (frozen) instance of the object with the `values` merged in
 */
export function writeValues<K1 extends keyof T, T extends object>(object: Readonly<T>, key: K1 | [K1], values: Partial<T[K1]>): Readonly<T>;
/**
 * Merge values into a nested object.
 *
 * @param object the object
 * @param path the path to the deep object
 * @param values the values to merge
 * @returns a new (frozen) instance of the object with the `values` merged in
 */
export function writeValues<K1 extends keyof T, K2 extends keyof T[K1], T extends object>(object: Readonly<T>, path: [K1, K2], values: Partial<T[K1][K2]>): Readonly<T>;
/**
 * Merge values into a nested object.
 *
 * @param object the object
 * @param path the path to the deep object
 * @param values the values to merge
 * @returns a new (frozen) instance of the object with the `values` merged in
 */
export function writeValues<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T extends object>(object: Readonly<T>, path: [K1, K2, K3], values: Partial<T[K1][K2][K3]>): Readonly<T>;
/**
 * Merge values into a nested object.
 *
 * @param object the object
 * @param path the path to the deep object
 * @param values the values to merge
 * @returns a new (frozen) instance of the object with the `values` merged in
 */
export function writeValues<T extends object>(object: Readonly<T>, path: Array<string | number>, values: {[k: string]: any}): Readonly<T>;
export function writeValues<T extends object>(data: T, pathOrKey: Array<string | number> | number | keyof T, values: {[k: string]: any}) {
    const path = Array.isArray(pathOrKey) ? pathOrKey : [<string | number>pathOrKey];
    const oldValue = read(data, path);
    const newValue = object_assign(oldValue, values);
    return writeValue<T>(data, path, newValue);
}


/**
 * `delete` an entry from an object within an array.
 *
 * @param array the array
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object+array with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, T>(array: readonly T[], path: [number, K1]): readonly T[];
/**
 * `delete` an entry from an object within an array.
 *
 * @param array the array
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object+array with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, K2 extends keyof T[K1], T>(array: readonly T[], path: [number, K1, K2]): readonly T[];
/**
 * `delete` an entry from an object within an array.
 *
 * @param array the array
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object+array with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T>(array: readonly T[], path: [number, K1, K2, K3]): readonly T[];
/**
 * `delete` an entry from an object within an array.
 *
 * @param array the array
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object+array with the `path` `delete`ed
 */
export function removeValue<T>(array: readonly T[], path: Array<string | number>): readonly T[];
/**
 * `delete` an entry from an object. Equivelent to `object_delete`.
 *
 * @param object the object
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, T extends object>(object: Readonly<T>, path: K1 | [K1]): Readonly<T>;
/**
 * `delete` a nested entry from an object.
 *
 * @param object the object
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, K2 extends keyof T[K1], T extends object>(object: Readonly<T>, path: [K1, K2]): Readonly<T>;
/**
 * `delete` a nested entry from an object.
 *
 * @param object the object
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object with the `path` `delete`ed
 */
export function removeValue<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], T extends object>(object: Readonly<T>, path: [K1, K2, K3]): Readonly<T>;
/**
 * `delete` a nested entry from an object.
 *
 * @param object the object
 * @param path the path to the entry
 * @returns a new (frozen) instance of the object with the `path` `delete`ed
 */
export function removeValue<T extends object>(object: Readonly<T>, path: Array<string | number>): Readonly<T>;
export function removeValue<T extends object>(data: T, pathOrKey: Array<string | number> | keyof T) {
    return write<T>(data, <any>pathOrKey, REMOVE_VALUE_FN);
}

/**
 * `delete` multiple properties from an object.
 *
 * If none of the values exist the existing object is returned.
 *
 * @param data the object
 * @param keys the properties to `delete`
 * @returns a new (frozen) instance of the object with all `keys` deleted
 */
export function removeValues<T extends object>(data: Readonly<T>, ...keys: Array<keyof T>): Readonly<T> {
    let newValue: T | undefined;

    for (const key of keys) {
        if (data.hasOwnProperty(key)) {
            if (newValue === undefined) {
                newValue = shallowCloneObject(data);
            }
            delete newValue[key];
        }
    }

    FREEZING_ENABLED && shallowFreeze(newValue);
    return newValue ? newValue : data;
}