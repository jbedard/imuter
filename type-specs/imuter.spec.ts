import { imuter } from "imuter";

class Clazz {}
function identityC(c: Clazz) { return c; }

// $ExpectType number
imuter(5);

// $ExpectType string
imuter("s");

// $ExpectType boolean
imuter(true);

// $ExpectType symbol
imuter(Symbol("s"));

// $ExpectType null
imuter(null);

// $ExpectType undefined
imuter(undefined);

// $ExpectType ReadonlyArray<number>
imuter([5]);

// $ExpectType ReadonlyArray<string>
imuter(["s"]);

// $ExpectType ReadonlyArray<boolean>
imuter([true]);

// $ExpectType ReadonlyArray<symbol>
imuter([Symbol("s")]);

// $ExpectType ReadonlyArray<null>
imuter([null]);

// $ExpectType ReadonlyArray<undefined>
imuter([undefined]);

// $ExpectType ReadonlyArray<undefined>
imuter([undefined] as ReadonlyArray<undefined>);

// $ExpectType ReadonlyArray<Clazz>
imuter([new Clazz()]);

// $ExpectType Readonly<Clazz>
imuter(new Clazz());

// $ExpectType Readonly<typeof Clazz>
imuter(Clazz);

// $ExpectType Readonly<(c: Clazz) => Clazz>
imuter(identityC);
