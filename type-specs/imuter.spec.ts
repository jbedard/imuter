import { imuter } from "imuter";


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


// $ExpectType number
imuter(5);

// $ExpectType number
imuter(num);

// $ExpectType string
imuter("s");

// $ExpectType string
imuter(str);

// $ExpectType boolean
imuter(true);

// $ExpectType boolean
imuter(boo);

// $ExpectType symbol
imuter(Symbol("s"));

// $ExpectType null
imuter(null);

// $ExpectType undefined
imuter(undefined);

// $ExpectType string | undefined
imuter(optionalStr);

// $ExpectType ReadonlyArray<number>
imuter([5]);

// $ExpectType ReadonlyArray<number>
imuter([num]);

// $ExpectType ReadonlyArray<number>
imuter(numA);

// $ExpectType ReadonlyArray<string>
imuter(["s"]);

// $ExpectType ReadonlyArray<string>
imuter([str]);

// $ExpectType ReadonlyArray<string>
imuter(strA);

// $ExpectType ReadonlyArray<string | undefined>
imuter([optionalStr]);

// $ExpectType ReadonlyArray<boolean>
imuter([true]);

// $ExpectType ReadonlyArray<boolean>
imuter([boo]);

// $ExpectType ReadonlyArray<boolean>
imuter(imuter([boo]));

// $ExpectType ReadonlyArray<boolean>
imuter(booA);

// $ExpectType ReadonlyArray<symbol>
imuter([Symbol("s")]);

// $ExpectType ReadonlyArray<null>
imuter([null]);

// $ExpectType ReadonlyArray<undefined>
imuter([undefined]);

// $ExpectType ReadonlyArray<undefined>
imuter(imuter([undefined]));

// $ExpectType string | number | boolean
imuter(strOrNumOrBoo);

// $ExpectType ReadonlyArray<string | number | boolean>
imuter([strOrNumOrBoo]);

// $ExpectType ReadonlyArray<string | number | boolean>
imuter(imuter([strOrNumOrBoo]));

// $ExpectType ReadonlyArray<string | number | boolean>
imuter([imuter(strOrNumOrBoo)]);

// $ExpectType ReadonlyArray<Clazz>
imuter([new Clazz()]);

// $ExpectType ReadonlyArray<Readonly<Clazz>>
imuter([imuter(new Clazz())]);

// $ExpectType ReadonlyArray<Clazz>
imuter(imuter([new Clazz()]));

// $ExpectType Readonly<Clazz>
imuter(new Clazz());

// $ExpectType Readonly<Clazz>
imuter(imuter(new Clazz()));

// $ExpectType Readonly<TypeA>
imuter(typeA);

// $ExpectType ReadonlyArray<TypeA>
imuter([typeA]);

// $ExpectType ReadonlyArray<Readonly<TypeA>>
imuter([imuter(typeA)]);

// $ExpectType ReadonlyArray<TypeA>
imuter(imuter([typeA]));

// $ExpectType Readonly<NestedType>
imuter(nestedType);

// $ExpectType Readonly<NestedType>
imuter(imuter(nestedType));

// $ExpectType Readonly<typeof Clazz>
imuter(Clazz);

// $ExpectType Readonly<(c: Clazz) => Clazz>
imuter(identityC);

// $ExpectType Readonly<NestedType>
imuter(nestedType);

// $ExpectType Readonly<NestedType>
imuter(imuter(nestedType));

// $ExpectType Readonly<typeof Clazz>
imuter(Clazz);

// $ExpectType Readonly<(c: Clazz) => Clazz>
imuter(identityC);

// $ExpectType Readonly<(c: Clazz) => Clazz>
imuter(imuter(identityC));
