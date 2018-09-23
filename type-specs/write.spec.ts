import { write, writeValue, writeValues, removeValues, removeValue } from "imuter";

class Clazz {
    x = 1;
    y = "2";
    z = true;
}

// $ExpectError
write({1: 2}, "2", 1);

// $ExpectError
write({1: 2}, "1", "s");

// $ExpectError
write(new Clazz(), "a", () => 3);

// $ExpectError
write(new Clazz(), "x", () => true);

// $ExpectType ReadonlyArray<number>
write([2], 0, (n: number, a: ReadonlyArray<number>): number => 3);

// $ExpectType ReadonlyArray<number>
write([2], [0], (n: number, a: ReadonlyArray<number>): number => 3);

// $ExpectType ReadonlyArray<Clazz>
write([new Clazz()], [0], (n: Clazz, a: ReadonlyArray<Clazz>): Clazz => new Clazz());

// $ExpectType ReadonlyArray<{ x: number; }>
write([{x: 2}], [0, "x"], (n: number, a: ReadonlyArray<{ x: number; }>): number => 3);

// $ExpectType ReadonlyArray<{ x: { y: number; }; }>
write([{x: {y: 2}}], [0, "x", "y"], (n: number, a: ReadonlyArray<{ x: { y: number; }; }>): number => 3);

// $ExpectType ReadonlyArray<{ x: { y: { z: number; }; }; }>
write([{x: {y: {z: 2}}}], [0, "x", "y", "z"], (n: number, a: ReadonlyArray<{ x: { y: { z: number; }; }; }>): number => 3);

// $ExpectType Readonly<{ w: number; }>
write({w: 2}, "w", (n: number, o: Readonly<{ w: number; }>): number => 3);

// $ExpectType Readonly<{ w: number; }>
write({w: 2}, ["w"], (n: number, o: Readonly<{ w: number; }>): number => 3);

// $ExpectType Readonly<Clazz>
write(new Clazz(), "x", (x: number, o: Readonly<Clazz>): number => 3);

// $ExpectType Readonly<{ w: { x: number; }; }>
write({w: {x: 2}}, ["w", "x"], (n: number, a: Readonly<{ w: { x: number; }; }>): number => 3);

// $ExpectType Readonly<{ w: { x: { y: number; }; }; }>
write({w: {x: {y: 2}}}, ["w", "x", "y"], (n: number, a: Readonly<{ w: { x: { y: number; }; }; }>): number => 3);

// $ExpectType Readonly<{ w: { x: { y: { z: number; }; }; }; }>
write({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"], (n: number, a: Readonly<{ w: { x: { y: { z: number; }; }; }; }>): number => 3);


// $ExpectError
writeValue({1: 2}, "2", 1);

// $ExpectError
writeValue({1: 2}, "1", "s");

// $ExpectType ReadonlyArray<number>
writeValue([2], 0, 3);

// $ExpectType ReadonlyArray<number>
writeValue([2], [0], 3);

// $ExpectType ReadonlyArray<{ x: number; }>
writeValue([{x: 2}], [0, "x"], 3);

// $ExpectType ReadonlyArray<Clazz>
writeValue([new Clazz()], [0, "x"], 3);

// $ExpectType ReadonlyArray<{ x: { y: number; }; }>
writeValue([{x: {y: 2}}], [0, "x", "y"], 3);

// $ExpectType ReadonlyArray<{ x: { y: { z: number; }; }; }>
writeValue([{x: {y: {z: 2}}}], [0, "x", "y", "z"], 3);

// $ExpectType Readonly<{ w: number; }>
writeValue({w: 2}, "w", 3);

// $ExpectType Readonly<{ w: number; }>
writeValue({w: 2}, ["w"], 3);

// $ExpectType Readonly<{ w: { x: number; }; }>
writeValue({w: {x: 2}}, ["w", "x"], 3);

// $ExpectType Readonly<{ w: { x: { y: number; }; }; }>
writeValue({w: {x: {y: 2}}}, ["w", "x", "y"], 3);

// $ExpectType Readonly<{ w: { x: { y: { z: number; }; }; }; }>
writeValue({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"], 3);


// $ExpectError
writeValues({1: 2}, "2", {1: 2});

// $ExpectError
writeValues({1: 2}, "1", {1: "2"});

// $ExpectError
writeValues({1: 2}, "1", {2: 3});

// $ExpectError
writeValues({1: 2}, "1", "s");

// $ExpectType ReadonlyArray<{ x: number; }>
writeValues([{x: 2}], 0, {x: 3});

// $ExpectType ReadonlyArray<{ x: number; }>
writeValues([{x: 2}], [0], {x: 3});

// $ExpectType ReadonlyArray<Clazz>
writeValues([new Clazz()], [0], {x: 2, y: "s"});

// $ExpectType ReadonlyArray<{ x: number; }>
writeValues([{x: 2}], [0, "x"], 3);

// $ExpectType ReadonlyArray<{ x: { y: { z: number; }; }; }>
writeValues([{x: {y: {z: 2}}}], [0, "x", "y"], {z: 3});

// $ExpectType Readonly<{ x: number; }>
writeValues({x: 2}, "x", 2);

// $ExpectType Readonly<{ w: { x: number; }; }>
writeValues({w: {x: 2}}, "w", {x: 3});

// $ExpectType Readonly<{ w: { x: number; }; }>
writeValues({w: {x: 2}}, ["w"], {x: 3});

// $ExpectType Readonly<{ w: { x: { y: number; }; }; }>
writeValues({w: {x: {y: 2}}}, ["w", "x"], {y: 3});

// $ExpectType Readonly<{ w: { x: { y: { z: number; }; }; }; }>
writeValues({w: {x: {y: {z: 2}}}}, ["w", "x", "y"], {z: 3});


// $ExpectType ReadonlyArray<{ x: number; }>
removeValue([{x: 2}], [0, "x"]);

// $ExpectType ReadonlyArray<Clazz>
removeValue([new Clazz()], [0, "x"]);

// $ExpectType ReadonlyArray<{ x: { y: number; }; }>
removeValue([{x: {y: 2}}], [0, "x", "y"]);

// $ExpectType ReadonlyArray<{ x: { y: { z: number; }; }; }>
removeValue([{x: {y: {z: 2}}}], [0, "x", "y", "z"]);

// $ExpectType Readonly<{ x: number; }>
removeValue({x: 2}, "x");

// $ExpectType Readonly<Clazz>
removeValue(new Clazz(), "x");

// $ExpectType Readonly<{ x: number; }>
removeValue({x: 2}, ["x"]);

// $ExpectType Readonly<{ w: { x: number; }; }>
removeValue({w: {x: 2}}, ["w", "x"]);

// $ExpectType Readonly<{ w: { x: { y: number; }; }; }>
removeValue({w: {x: {y: 2}}}, ["w", "x", "y"]);

// $ExpectType Readonly<{ w: { x: { y: { z: number; }; }; }; }>
removeValue({w: {x: {y: {z: 2}}}}, ["w", "x", "y", "z"]);


// $ExpectError
removeValues({x: 1}, "y");

// $ExpectError
removeValues({x: 1}, "x", "y");

// $ExpectType Readonly<{ x: number; }>
removeValues({x: 1}, "x");

// $ExpectType Readonly<Clazz>
removeValues(new Clazz(), "x");

// $ExpectType Readonly<{ x: number; y: number; }>
removeValues({x: 1, y: 2}, "x", "y");

// $ExpectType Readonly<Clazz>
removeValues(new Clazz(), "x", "y");

// $ExpectType Readonly<{ x: number; y: number; z: number; }>
removeValues({x: 1, y: 2, z: 3}, "x", "y", "z");
