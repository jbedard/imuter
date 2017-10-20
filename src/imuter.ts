"use strict";

//Should be determined at compile time to allow tree-shaking
const FREEZING_ENABLED = typeof process !== "undefined" && process.env.NODE_ENV !== "production";

const NO_FREEZE_MSG = "Freezing a Window, global, Node, Blob, TypedArray or ArrayBuffer is unsupported";

const toString = {}.toString;


export type ReadonlyArrayInput<T> = ReadonlyArray<T> | T[];
export type ReadonlyObjectInput<T> = Readonly<T> | T;

export function recursiveFreeze<T = any>(value: ReadonlyArrayInput<T>): ReadonlyArray<T>;
export function recursiveFreeze<T = any>(value: ReadonlyObjectInput<T>): Readonly<T>;
export function recursiveFreeze<T = number>(value: number): number;
export function recursiveFreeze<T = string>(value: string): string;
export function recursiveFreeze<T = boolean>(value: boolean): boolean;
export function recursiveFreeze<T = symbol>(value: symbol): symbol;
export function recursiveFreeze(value: any) {
    //Primitives
    switch (typeof value) {
        case "number":
        case "string":
        case "boolean":
        case "symbol":
        case "undefined":
            return value;
    }

    //Already frozen or already immutable, assume it was deep frozen
    if (Object.isFrozen(value)) {
        return value;
    }

    //Unfreezable
    if (+(<any>value).nodeType) {
        throw new Error(NO_FREEZE_MSG);
    }

    switch (toString.call(value)) {
        //Unfreezable types
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
            throw new Error(NO_FREEZE_MSG);

        //No need to recurse
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


function identity<T>(o: T): T { return o; }
function valueFn<T>(v: T): () => T { return function() { return v; }; }

//The signature of recursiveFreeze is nicer then Object.freeze so use that
export type Freezer = typeof recursiveFreeze;

export const shallowFreeze: Freezer = FREEZING_ENABLED ? Object.freeze   : identity;
export const deepFreeze: Freezer    = FREEZING_ENABLED ? recursiveFreeze : identity;

export const imuter = deepFreeze;


const DELETE_VALUE: any = Object.freeze({});


// Objects

export function object_set<T>(obj: ReadonlyObjectInput<T> | T, prop: keyof T, value: any): Readonly<T> {
    if ((value === DELETE_VALUE) ? !(prop in <any>obj) : obj[prop] === value) {
        return obj;
    }

    const newObj: T = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

    if (value === DELETE_VALUE) {
        delete newObj[prop];
    }
    else {
        newObj[prop] = deepFreeze(value);
    }

    return shallowFreeze(newObj);
}

export function object_delete<T>(obj: ReadonlyObjectInput<T>, prop: keyof T): Readonly<T> {
    return object_set(obj, prop, DELETE_VALUE);
}

//Shallow merge like Object.assign, always into a plain JSON object
export function object_assign<T, U>(a: T, b: U): Readonly<T & U>;
export function object_assign<T, U, V>(a: T, b: U, c: V): Readonly<T & U & V>;
export function object_assign(a: any, b: any, ...sources: any[]): Readonly<any> {
    return deepFreeze(Object.assign({}, a, b, ...sources));
}


// Arrays

export function array_set<T = any>(arr: ReadonlyArrayInput<T>, index: number, value: T): ReadonlyArray<T> {
    if ((value === DELETE_VALUE) ? !(index in arr) : arr[index] === value) {
        return arr;
    }

    const newArr = arr.slice();
    if (value === DELETE_VALUE) {
        delete newArr[index];
    }
    else {
        newArr[index] = deepFreeze(value);
    }
    return shallowFreeze(newArr);
}

export function array_delete<T = any>(arr: ReadonlyArrayInput<T>, index: number): ReadonlyArray<T> {
    return array_set<T>(arr, index, DELETE_VALUE);
}

export function array_push<T = any>(arr: ReadonlyArrayInput<T>, ...values: T[]): ReadonlyArray<T> {
    deepFreeze(values);

    const newArr = arr.slice();
    newArr.push(...values);
    return shallowFreeze(newArr);
}

export function array_shift<T = any>(arr: ReadonlyArrayInput<T>): ReadonlyArray<T> {
    if (arr.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.shift();
    return shallowFreeze(newArr);
}

export function array_pop<T = any>(arr: ReadonlyArrayInput<T>): ReadonlyArray<T> {
    if (arr.length === 0) {
        return arr;
    }

    const newArr = arr.slice();
    newArr.pop();
    return shallowFreeze(newArr);
}

export function array_unshift<T = any>(arr: ReadonlyArrayInput<T>, ...values: T[]): ReadonlyArray<T> {
    deepFreeze(values);

    const newArr = arr.slice();
    newArr.unshift(...values);
    return shallowFreeze(newArr);
}

export function array_slice<T = any>(arr: ReadonlyArrayInput<T>, start: number, end?: number) {
    return shallowFreeze(arr.slice(start, end));
}

export function array_insert<T = any>(arr: ReadonlyArrayInput<T>, index: number, ...values: T[]): ReadonlyArray<T> {
    deepFreeze(values);

    const newArr = arr.slice();
    newArr.splice(index, 0, ...values);
    return shallowFreeze(newArr);
}

export function array_map<T = any, U = any>(arr: ReadonlyArrayInput<T>, callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => U, context?: any): ReadonlyArray<U> {
    if (arr.length === 0) {
        return <any>arr;
    }

    const mapped: U[] = (arr as ReadonlyArray<T>).map(callbackfn, context);
    return deepFreeze(mapped);
}

export function array_filter<T = any>(arr: ReadonlyArrayInput<T>, callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => any, context?: any): ReadonlyArray<T> {
    if (arr.length === 0) {
        return arr;
    }

    const filtered = (arr as ReadonlyArray<T>).filter(callbackfn, context);
    return shallowFreeze(filtered);
}


//Write a deep value via a factory function
export function write<T = any, V = any>(data: ReadonlyArrayInput<T>, path: Array<string | number> | number, factory: (newValue: any, data: ReadonlyArrayInput<T>) => V): ReadonlyArray<T>;
export function write<T = any, V = any>(data: ReadonlyObjectInput<T>, path: Array<string | number> | keyof T, factory: (newValue: any, data: ReadonlyArrayInput<T>) => V): Readonly<T>;
export function write(data: any, path: Array<string | number> | string | number, factory: any) {
    if (!Array.isArray(path)) {
        path = [path];
    }

    //Follow the path into the object, except for the last value being replaced
    const objs: any[] = [data];
    for (let i = 0; i < path.length; i++) {
        objs.push( objs[i][path[i]] );
    }

    if (typeof factory === "function") {
        factory = factory(objs[objs.length - 1], data);
    }

    //Replace the last object with the new value
    objs[objs.length - 1] = factory;

    //Write the new immutable data back into the objects
    for (let i = objs.length - 2; i >= 0; i--) {
        const key = path[i];
        const obj = objs[i];
        const val = objs[i + 1];

        if (Array.isArray(obj)) {
            objs[i] = array_set(obj, <number>key, val);
        }
        else {
            objs[i] = object_set<any>(obj, <string>key, val);
        }
    }

    return objs[0];
}

//Write a deep value
export function writeValue<T = any>(data: ReadonlyArrayInput<T>, path: Array<string | number> | number, value: any): ReadonlyArray<T>;
export function writeValue<T = any>(data: ReadonlyObjectInput<T>, path: Array<string | number> | keyof T, value: any): Readonly<T>;
export function writeValue(data: any, path: Array<string | number>, value: any): any {
    return write(data, path, (typeof value === "function") ? valueFn(value) : value);
}

//Delete a deep value
export function removeValue<T = any>(data: ReadonlyArrayInput<T>, path: Array<string | number> | number): ReadonlyArray<T>;
export function removeValue<T = any>(data: ReadonlyObjectInput<T>, path: Array<string | number> | keyof T): Readonly<T>;
export function removeValue(data: any, path: Array<string | number>) {
    return write(data, path, DELETE_VALUE);
}