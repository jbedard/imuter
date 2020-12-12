import {expectError, expectType} from 'tsd';

import { array_set, array_replace, array_exclude, array_remove, array_delete, array_push, array_shift, array_unshift, array_pop, array_slice, array_insert, array_map, array_filter, imuter, object_set, object_delete, object_assign, write, writeValue, writeValues, removeValues, removeValue } from "../src/imuter";

class Clazz { n = 3; }
interface TypeA { n: number; }
interface NestedType { a: TypeA; }

function identityC(c: Clazz) { return c; }

const num: number  = <any> 5;
const boo: boolean = <any> true;
const str: string  = <any> "s";

const numA: number[]  = <any> [num];
const booA: boolean[] = <any> [boo];
const strA: string[]  = <any> [str];

const optionalStr: string | undefined = <any> "s";
const strOrNumOrBoo: string | number | boolean = <any> "s";

const typeA: TypeA = {n: 3};
const nestedType: NestedType = {a: {n: 3}};

const symbolS = Symbol("s");

const typeUnknown: unknown = <any> null;
const typeNever: never = null as any as never;

// Freezer ----------------------------------------------------------------------------------------

expectType<5>(imuter(5))

expectType<number>(imuter(num))

expectType<"s">(imuter("s"))

expectType<string>(imuter(str))

expectType<true>(imuter(true))

expectType<boolean>(imuter(boo))

expectType<symbol>(imuter(Symbol("s")))

expectType<typeof symbolS>(imuter(symbolS))

expectType<null>(imuter(null))

expectType<undefined>(imuter(undefined))

expectType<unknown>(imuter(typeUnknown))

expectType<never>(imuter(typeNever))

expectType<string | undefined>(imuter(optionalStr))

expectType<number>(imuter(Number(0)))

expectType<boolean>(imuter(Boolean(true)))

expectType<string>(imuter(String("foo")))

expectType<readonly 5[]>(imuter([5]))

expectType<readonly number[]>(imuter([num]))

expectType<readonly number[]>(imuter(numA))

expectType<readonly "s"[]>(imuter(["s"]))

expectType<readonly string[]>(imuter([str]))

expectType<readonly string[]>(imuter(strA))

expectType<readonly (string | undefined)[]>(imuter([optionalStr]))

expectType<readonly true[]>(imuter([true]))

expectType<readonly boolean[]>(imuter([boo]))

expectType<readonly boolean[]>(imuter(imuter([boo])))

expectType<readonly boolean[]>(imuter(booA))

expectType<readonly symbol[]>(imuter([Symbol("s")]))

expectType<readonly (typeof symbolS)[]>(imuter([symbolS]))

expectType<readonly null[]>(imuter([null]))

expectType<readonly undefined[]>(imuter([undefined]))

expectType<readonly undefined[]>(imuter(imuter([undefined])))

expectType<string | number | boolean>(imuter(strOrNumOrBoo))

expectType<readonly (string | number | boolean)[]>(imuter([strOrNumOrBoo]))

expectType<readonly (string | number | boolean)[]>(imuter(imuter([strOrNumOrBoo])))

expectType<readonly (string | number | boolean)[]>(imuter([imuter(strOrNumOrBoo)]))

expectType<readonly Readonly<Clazz>[]>(imuter([new Clazz()]))

expectType<readonly Readonly<Clazz>[]>(imuter([imuter(new Clazz())]))

expectType<readonly Readonly<Clazz>[]>(imuter(imuter([new Clazz()])))

expectType<Readonly<Clazz>>(imuter(new Clazz()))

expectType<Readonly<Clazz>>(imuter(imuter(new Clazz())))

expectType<Readonly<TypeA>>(imuter(typeA))

expectType<readonly Readonly<TypeA>[]>(imuter([typeA]))

expectType<readonly Readonly<TypeA>[]>(imuter([imuter(typeA)]))

expectType<readonly Readonly<TypeA>[]>(imuter(imuter([typeA])))

expectType<Readonly<NestedType>>(imuter(nestedType))

expectType<Readonly<NestedType>>(imuter(imuter(nestedType)))

expectType<typeof Clazz>(imuter(Clazz))

expectType<(c: Clazz) => Clazz>(imuter(identityC))

expectType<Readonly<NestedType>>(imuter(nestedType))

expectType<Readonly<NestedType>>(imuter(imuter(nestedType)))

expectType<typeof Clazz>(imuter(Clazz))

expectType<(c: Clazz) => Clazz>(imuter(identityC))

expectType<(c: Clazz) => Clazz>(imuter(imuter(identityC)))

expectType<Readonly<RegExp>>(imuter(/foo/));

// Array ------------------------------------------------------------------------------------------

// array_set
expectType<ReadonlyArray<number>>(array_set([3], 0, 1))

expectType<ReadonlyArray<number>>(array_set(Object.freeze([3]), 0, 1))

expectError(array_set([3], 0, "s"));

expectError(array_set([{}], 0, 1));

// array_delete
expectType<ReadonlyArray<3>>(array_delete([3], 1))

expectType<ReadonlyArray<number>>(array_delete(Object.freeze([3]), 1))

expectError(array_delete([3], "s"));

// array_remove
expectType<ReadonlyArray<number>>(array_remove([3], 1))

expectType<ReadonlyArray<number>>(array_remove(Object.freeze([3]), 1))

expectError(array_remove([3], "s"));

// array_exclude
expectType<ReadonlyArray<number>>(array_exclude([3], 1))

expectError(array_exclude([3], "s"));

expectType<ReadonlyArray<number>>(array_exclude(Object.freeze([3]), 1))

// array_replace
expectType<ReadonlyArray<number>>(array_replace([3], 0, 1))

expectError(array_replace([3], 0, "1"));

expectError(array_replace([3], "0", 1));

expectType<ReadonlyArray<number>>(array_replace(Object.freeze([3]), 0, 1))

// array_push
expectType<ReadonlyArray<number>>(array_push([3]))

expectType<ReadonlyArray<number>>(array_push([3], 0))

expectError(array_push("0"));

expectError(array_push([3], "0"));

expectType<ReadonlyArray<number>>(array_push([3], 0, 1))

expectType<ReadonlyArray<number>>(array_push(Object.freeze([3]), 0, 1))

// array_shift
expectType<ReadonlyArray<number>>(array_shift([3]))

expectType<ReadonlyArray<number>>(array_shift(Object.freeze([3])))

// array_pop
expectType<ReadonlyArray<number>>(array_pop([3]))

expectType<ReadonlyArray<number>>(array_pop(Object.freeze([3])))

// array_unshift
expectType<ReadonlyArray<number>>(array_unshift([3], 1))

expectType<ReadonlyArray<number>>(array_unshift(Object.freeze([3]), 1))

// array_slice
expectType<ReadonlyArray<number>>(array_slice([3], 0))

expectType<ReadonlyArray<number>>(array_slice([3], 0, 1))

expectType<ReadonlyArray<number>>(array_slice(Object.freeze([3]), 0, 1))

// array_insert
expectType<ReadonlyArray<number>>(array_insert([3], 0, 1))

expectType<ReadonlyArray<number>>(array_insert([3], 0, 1, 2, 3))

expectType<ReadonlyArray<number>>(array_insert(Object.freeze([3]), 0, 1))

// array_map
expectType<ReadonlyArray<3>>(array_map([3], (_: number, __:number, ___: ReadonlyArray<number>) => 3))

expectType<ReadonlyArray<true>>(array_map([3], (_: number, __:number, ___: ReadonlyArray<number>) => true))

expectType<ReadonlyArray<boolean>>(array_map([3], (_: number, __:number, a: ReadonlyArray<number>) => a !== null))

expectError(array_map([3], (_: number, __:number, ___: number[]) => true));

expectType<ReadonlyArray<boolean>>(array_map(Object.freeze([3]), (_: number, __:number, a: ReadonlyArray<number>) => a !== null))

// array_filter
expectType<ReadonlyArray<number>>(array_filter([3], (_: number, __:number, ___: ReadonlyArray<number>) => true))

expectError(array_filter([3], (_: number, __:number, ___: number[]) => true));

expectType<ReadonlyArray<number>>(array_filter(Object.freeze([3]), (_: number, __:number, ___: ReadonlyArray<number>) => true))

// Object -----------------------------------------------------------------------------------------

class ObjectClazz {
    x = 1;
    y = "2";
    z = true;
}

// object_set
expectError(object_set({1: 2}, 1, "2"));

expectError(object_set({1: 2}, "1", "2"));

expectError(object_set({key: 2}, "other", 3));

expectError(object_set(new ObjectClazz(), "other", 3));

expectType<Readonly<{ key: number; }>>(object_set({key: 2}, "key", 3))

expectType<Readonly<ObjectClazz>>(object_set(new ObjectClazz(), "x", 3))

// object_delete
expectError(object_delete({1: 2}, 1, "2"));

expectError(object_delete({key: 2}, "other"));

expectError(object_delete(new ObjectClazz(), "other"));

expectType<Readonly<{ key: number; }>>(object_delete({key: 2}, "key"))

expectType<Readonly<ObjectClazz>>(object_delete(new ObjectClazz(), "x"))

// object_assign
expectType<Readonly<{ a: number; } & { b: string; }>>(object_assign({a: 2}, {b: "3"}))

expectType<Readonly<{ a: number; } & { a: string; }>>(object_assign({a: 2}, {a: "3"}))

expectType<Readonly<ObjectClazz>>(object_assign(new ObjectClazz(), new ObjectClazz()))

expectType<Readonly<{ a: number; } & ObjectClazz>>(object_assign({a: 2}, new ObjectClazz()))

expectType<Readonly<{ a: number; } & ObjectClazz>>(object_assign({a: 2}, new ObjectClazz(), new ObjectClazz()))

expectType<Readonly<{ a: number; } & ObjectClazz>>(object_assign({a: 2}, new ObjectClazz(), new ObjectClazz(), new ObjectClazz()))

expectType<Readonly<{ a: number; } & ObjectClazz>>(object_assign({a: 2}, new ObjectClazz(), new ObjectClazz(), new ObjectClazz(), new ObjectClazz()))

expectType<Readonly<{ a: number; } & ObjectClazz>>(object_assign({a: 2}, new ObjectClazz(), new ObjectClazz(), new ObjectClazz(), new ObjectClazz(), new ObjectClazz()))

// Write ------------------------------------------------------------------------------------------
class WriteClazz {
    x = 1;
    y = "2";
    z = true;

}

// write
expectError(write({1: 2}, "2", 1));

expectError(write({1: 2}, "1", "s"));

expectError(write(new WriteClazz(), "a", () => 3));

expectError(write(new WriteClazz(), "x", () => true));

expectType<ReadonlyArray<number>>(write([2], 0, (_: number, __: ReadonlyArray<number>): number => 3))

expectType<ReadonlyArray<number>>(write([2], [0], (_: number, __: ReadonlyArray<number>): number => 3))

expectType<ReadonlyArray<WriteClazz>>(write([new WriteClazz()], [0], (_: WriteClazz, __: ReadonlyArray<WriteClazz>): WriteClazz => new WriteClazz()))

expectType<ReadonlyArray<{ x: number; }>>(write([{x: 2}], [0, "x"], (_: number, __: ReadonlyArray<{ x: number; }>): number => 3))

expectType<ReadonlyArray<{ x: { y: number; }; }>>(write([{x: {y: 2}}], [0, "x", "y"], (_: number, __: ReadonlyArray<{ x: { y: number; }; }>): number => 3))

expectType<ReadonlyArray<{ x: { y: { z: number; }; }; }>>(write([{x: {y: {z: 2}}}], [0, "x", "y", "z"], (_: number, __: ReadonlyArray<{ x: { y: { z: number; }; }; }>): number => 3))

expectType<Readonly<{ w: number; }>>(write({w: 2}, "w", (_: number, __: Readonly<{ w: number; }>): number => 3))

expectType<Readonly<{ w: number; }>>(write({w: 2}, ["w"], (_: number, __: Readonly<{ w: number; }>): number => 3))

expectType<Readonly<WriteClazz>>(write(new WriteClazz(), "x", (_: number, __: Readonly<WriteClazz>): number => 3))

expectType<Readonly<{ w: { x: number; }; }>>(write({w: {x: 2}}, ["w", "x"], (_: number, __: Readonly<{ w: { x: number; }; }>): number => 3))

expectType<Readonly<{ w: { x: { y: number; }; }; }>>(write({w: {x: {y: 2}}}, ["w", "x", "y"], (_: number, __: Readonly<{ w: { x: { y: number; }; }; }>): number => 3))

expectType<Readonly<{ w: { x: { y: { z: number; }; }; }; }>>(write({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"], (_: number, __: Readonly<{ w: { x: { y: { z: number; }; }; }; }>): number => 3))

// writeValue
expectError(writeValue({1: 2}, "2", 1));

expectError(writeValue({1: 2}, "1", "s"));

expectType<ReadonlyArray<number>>(writeValue([2], 0, 3))

expectType<ReadonlyArray<number>>(writeValue([2], [0], 3))

expectType<ReadonlyArray<{ x: number; }>>(writeValue([{x: 2}], [0, "x"], 3))

expectType<ReadonlyArray<WriteClazz>>(writeValue([new WriteClazz()], [0, "x"], 3))

expectType<ReadonlyArray<{ x: { y: number; }; }>>(writeValue([{x: {y: 2}}], [0, "x", "y"], 3))

expectType<ReadonlyArray<{ x: { y: { z: number; }; }; }>>(writeValue([{x: {y: {z: 2}}}], [0, "x", "y", "z"], 3))

expectType<Readonly<{ w: number; }>>(writeValue({w: 2}, "w", 3))

expectType<Readonly<{ w: number; }>>(writeValue({w: 2}, ["w"], 3))

expectType<Readonly<{ w: { x: number; }; }>>(writeValue({w: {x: 2}}, ["w", "x"], 3))

expectType<Readonly<{ w: { x: { y: number; }; }; }>>(writeValue({w: {x: {y: 2}}}, ["w", "x", "y"], 3))

expectType<Readonly<{ w: { x: { y: { z: number; }; }; }; }>>(writeValue({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"], 3))

// writeValues
expectError(writeValues({1: 2}, "2", {1: 2}));

expectError(writeValues({1: 2}, "1", {1: "2"}));

expectError(writeValues({1: 2}, "1", {2: 3}));

expectError(writeValues({1: 2}, "1", "s"));

expectType<ReadonlyArray<{ x: number; }>>(writeValues([{x: 2}], 0, {x: 3}))

expectType<ReadonlyArray<{ x: number; }>>(writeValues([{x: 2}], [0], {x: 3}))

expectType<ReadonlyArray<WriteClazz>>(writeValues([new WriteClazz()], [0], {x: 2, y: "s"}))

expectType<ReadonlyArray<{ x: number; }>>(writeValues([{x: 2}], [0, "x"], 3))

expectType<ReadonlyArray<{ x: { y: { z: number; }; }; }>>(writeValues([{x: {y: {z: 2}}}], [0, "x", "y"], {z: 3}))

expectType<Readonly<{ x: number; }>>(writeValues({x: 2}, "x", 2))

expectType<Readonly<{ w: { x: number; }; }>>(writeValues({w: {x: 2}}, "w", {x: 3}))

expectType<Readonly<{ w: { x: number; }; }>>(writeValues({w: {x: 2}}, ["w"], {x: 3}))

expectType<Readonly<{ w: { x: { y: number; }; }; }>>(writeValues({w: {x: {y: 2}}}, ["w", "x"], {y: 3}))

expectType<Readonly<{ w: { x: { y: { z: number; }; }; }; }>>(writeValues({w: {x: {y: {z: 2}}}}, ["w", "x", "y"], {z: 3}))

// removeValue
expectType<ReadonlyArray<{ x: number; }>>(removeValue([{x: 2}], [0, "x"]))

expectType<ReadonlyArray<WriteClazz>>(removeValue([new WriteClazz()], [0, "x"]))

expectType<ReadonlyArray<{ x: { y: number; }; }>>(removeValue([{x: {y: 2}}], [0, "x", "y"]))

expectType<ReadonlyArray<{ x: { y: { z: number; }; }; }>>(removeValue([{x: {y: {z: 2}}}], [0, "x", "y", "z"]))

expectType<Readonly<{ x: number; }>>(removeValue({x: 2}, "x"))

expectType<Readonly<WriteClazz>>(removeValue(new WriteClazz(), "x"))

expectType<Readonly<{ x: number; }>>(removeValue({x: 2}, ["x"]))

expectType<Readonly<{ w: { x: number; }; }>>(removeValue({w: {x: 2}}, ["w", "x"]))

expectType<Readonly<{ w: { x: { y: number; }; }; }>>(removeValue({w: {x: {y: 2}}}, ["w", "x", "y"]))

expectType<Readonly<{ w: { x: { y: { z: number; }; }; }; }>>(removeValue({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"]))

// removeValues
expectError(removeValues({x: 1}, "y"));

expectError(removeValues({x: 1}, "x", "y"));

expectType<Readonly<{ x: number; }>>(removeValues({x: 1}, "x"))

expectType<Readonly<WriteClazz>>(removeValues(new WriteClazz(), "x"))

expectType<Readonly<{ x: number; y: number; }>>(removeValues({x: 1, y: 2}, "x", "y"))

expectType<Readonly<WriteClazz>>(removeValues(new WriteClazz(), "x", "y"))

expectType<Readonly<{ x: number; y: number; z: number; }>>(removeValues({x: 1, y: 2, z: 3}, "x", "y", "z"))
