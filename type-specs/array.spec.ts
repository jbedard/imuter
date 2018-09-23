import { array_set, array_replace, array_exclude, array_remove, array_delete, array_push, array_shift, array_unshift, array_pop, array_slice, array_insert, array_map, array_filter } from "imuter";

// $ExpectType ReadonlyArray<number>
array_set([3], 0, 1);

// $ExpectType ReadonlyArray<number>
array_set(Object.freeze([3]), 0, 1);

// $ExpectError
array_set([3], 0, "s");


// $ExpectType ReadonlyArray<number>
array_delete([3], 1);

// $ExpectType ReadonlyArray<number>
array_delete(Object.freeze([3]), 1);

// $ExpectError
array_delete([3], "s");


// $ExpectType ReadonlyArray<number>
array_remove([3], 1);

// $ExpectType ReadonlyArray<number>
array_remove(Object.freeze([3]), 1);

// $ExpectError
array_remove([3], "s");


// $ExpectType ReadonlyArray<number>
array_exclude([3], 1);

// $ExpectError
array_exclude([3], "s");

// $ExpectType ReadonlyArray<number>
array_exclude(Object.freeze([3]), 1);


// $ExpectType ReadonlyArray<number>
array_replace([3], 0, 1);

// $ExpectError
array_replace([3], 0, "1");

// $ExpectError
array_replace([3], "0", 1);

// $ExpectType ReadonlyArray<number>
array_replace(Object.freeze([3]), 0, 1);


// $ExpectType ReadonlyArray<number>
array_push([3]);

// $ExpectType ReadonlyArray<number>
array_push([3], 0);

// $ExpectError
array_push("0");

// $ExpectError
array_push([3], "0");

// $ExpectType ReadonlyArray<number>
array_push([3], 0, 1);

// $ExpectType ReadonlyArray<number>
array_push(Object.freeze([3]), 0, 1);


// $ExpectType ReadonlyArray<number>
array_shift([3]);

// $ExpectType ReadonlyArray<number>
array_shift(Object.freeze([3]));


// $ExpectType ReadonlyArray<number>
array_pop([3]);

// $ExpectType ReadonlyArray<number>
array_pop(Object.freeze([3]));


// $ExpectType ReadonlyArray<number>
array_unshift([3], 1);

// $ExpectType ReadonlyArray<number>
array_unshift(Object.freeze([3]), 1);


// $ExpectType ReadonlyArray<number>
array_slice([3], 0);

// $ExpectType ReadonlyArray<number>
array_slice([3], 0, 1);

// $ExpectType ReadonlyArray<number>
array_slice(Object.freeze([3]), 0, 1);


// $ExpectType ReadonlyArray<number>
array_insert([3], 0, 1);

// $ExpectType ReadonlyArray<number>
array_insert([3], 0, 1, 2, 3);

// $ExpectType ReadonlyArray<number>
array_insert(Object.freeze([3]), 0, 1);


// $ExpectType ReadonlyArray<boolean>
array_map([3], (x: number, i: number, a: ReadonlyArray<number>) => true);

// $ExpectError
array_map([3], (x: number, i: number, a: number[]) => true);

// $ExpectType ReadonlyArray<boolean>
array_map(Object.freeze([3]), (x: number, i: number, a: ReadonlyArray<number>) => true);


// $ExpectType ReadonlyArray<number>
array_filter([3], (x: number, i: number, a: ReadonlyArray<number>) => true);

// $ExpectError
array_filter([3], (x: number, i: number, a: number[]) => true);

// $ExpectType ReadonlyArray<number>
array_filter(Object.freeze([3]), (x: number, i: number, a: ReadonlyArray<number>) => true);
