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

const symbolS = Symbol("s");

const typeUnknown: unknown = <any> null;
const typeNever: never = null as any as never;

// $ExpectType 5
imuter(5);

// $ExpectType number
imuter(num);

// $ExpectType "s"
imuter("s");

// $ExpectType string
imuter(str);

// $ExpectType true
imuter(true);

// $ExpectType boolean
imuter(boo);

// $ExpectType symbol
imuter(Symbol("s"));

// $ExpectType typeof symbolS
imuter(symbolS);

// $ExpectType null
imuter(null);

// $ExpectType undefined
imuter(undefined);

// $ExpectType unknown
imuter(typeUnknown);

// $ExpectType never
imuter(typeNever);

// $ExpectType string | undefined
imuter(optionalStr);

// $ExpectType readonly 5[]
imuter([5]);

// $ExpectType readonly number[]
imuter([num]);

// $ExpectType readonly number[]
imuter(numA);

// $ExpectType readonly "s"[]
imuter(["s"]);

// $ExpectType readonly string[]
imuter([str]);

// $ExpectType readonly string[]
imuter(strA);

// $ExpectType readonly (string | undefined)[]
imuter([optionalStr]);

// $ExpectType readonly true[]
imuter([true]);

// $ExpectType readonly boolean[]
imuter([boo]);

// $ExpectType readonly boolean[]
imuter(imuter([boo]));

// $ExpectType readonly boolean[]
imuter(booA);

// $ExpectType readonly symbol[]
imuter([Symbol("s")]);

// $ExpectType readonly (typeof symbolS)[]
imuter([symbolS]);

// $ExpectType readonly null[]
imuter([null]);

// $ExpectType readonly undefined[]
imuter([undefined]);

// $ExpectType readonly undefined[]
imuter(imuter([undefined]));

// $ExpectType string | number | boolean
imuter(strOrNumOrBoo);

// $ExpectType readonly (string | number | boolean)[]
imuter([strOrNumOrBoo]);

// $ExpectType readonly (string | number | boolean)[]
imuter(imuter([strOrNumOrBoo]));

// $ExpectType readonly (string | number | boolean)[]
imuter([imuter(strOrNumOrBoo)]);

// $ExpectType readonly Readonly<Clazz>[]
imuter([new Clazz()]);

// $ExpectType readonly Readonly<Clazz>[]
imuter([imuter(new Clazz())]);

// $ExpectType readonly Readonly<Clazz>[]
imuter(imuter([new Clazz()]));

// $ExpectType Readonly<Clazz>
imuter(new Clazz());

// $ExpectType Readonly<Clazz>
imuter(imuter(new Clazz()));

// $ExpectType Readonly<TypeA>
imuter(typeA);

// $ExpectType readonly Readonly<TypeA>[]
imuter([typeA]);

// $ExpectType readonly Readonly<TypeA>[]
imuter([imuter(typeA)]);

// $ExpectType readonly Readonly<TypeA>[]
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
