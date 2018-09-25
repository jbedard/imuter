import { object_set, object_delete, object_assign } from "imuter";

class Clazz {
    x = 1;
    y = "2";
    z = true;
}

// $ExpectError
object_set({1: 2}, 1, "2");

// $ExpectError
object_set({1: 2}, "1", "2");

// $ExpectError
object_set({key: 2}, "other", 3);

// $ExpectError
object_set(new Clazz(), "other", 3);

// $ExpectType Readonly<{ key: number; }>
object_set({key: 2}, "key", 3);

// $ExpectType Readonly<Clazz>
object_set(new Clazz(), "x", 3);


// $ExpectError
object_delete({1: 2}, 1, "2");

// $ExpectError
object_delete({key: 2}, "other");

// $ExpectError
object_delete(new Clazz(), "other");

// $ExpectType Readonly<{ key: number; }>
object_delete({key: 2}, "key");

// $ExpectType Readonly<Clazz>
object_delete(new Clazz(), "x");


// $ExpectType Readonly<{ a: number; } & { b: string; }>
object_assign({a: 2}, {b: "3"});

// $ExpectType Readonly<{ a: number; } & { a: string; }>
object_assign({a: 2}, {a: "3"});

// $ExpectType Readonly<Clazz>
object_assign(new Clazz(), new Clazz());

// $ExpectType Readonly<{ a: number; } & Clazz>
object_assign({a: 2}, new Clazz());

// $ExpectType Readonly<{ a: number; } & Clazz>
object_assign({a: 2}, new Clazz(), new Clazz());

// $ExpectType Readonly<{ a: number; } & Clazz>
object_assign({a: 2}, new Clazz(), new Clazz(), new Clazz());

// $ExpectType Readonly<{ a: number; } & Clazz>
object_assign({a: 2}, new Clazz(), new Clazz(), new Clazz(), new Clazz());

// $ExpectType Readonly<{ a: number; } & Clazz>
object_assign({a: 2}, new Clazz(), new Clazz(), new Clazz(), new Clazz(), new Clazz());
