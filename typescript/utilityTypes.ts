type User = {
  name: string;
  age: number;
  phone?: string;
};

/**
 * 从 T 中提取出 U
 */
type MyExtract<T, U> = T extends U ? T : never;
// type ExtractUser = MyExtract<keyof User, "age">;

/**
 * 从 T 中排除那些可分配给 U 的类型
 */
type MyExclude<T, U> = T extends U ? never : T;
// 原理： 联合类型进行运算会一个一个进行，所以等价于 name extends age ? never : name |  age extends age ? never : age | phone extends age ? never : phone
// 上一步得到：name ｜ never | phone ,  由于没有类型是 never 的子类型， 所以最后得到 name ｜ phone
// type ExcludeUser = MyExclude<keyof User, "age">;

/**
 * 从 T 中选择一组属性，其键位于并集 K 中
 */
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
// type PickUser = MyPick<User, "age">;

/**
 * 构造一个具有 T 属性（类型 K 中的属性除外）的类型。
 */
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
// type OmitUser = MyOmit<User, "age">;

/**
 * 将类型 T 里的属性全部变为可选项 ?
 */
type MyPartial<T> = { [P in keyof T]?: T[P] };
// type PartialUser = MyPartial<User>;

/**
 * 将类型 T 里的属性全部变为必选项
 */
type MyRequired<T> = { [P in keyof T]-?: T[P] };
// type RequiredUser = MyRequired<User>;

/**
 * 将 K 中所有的属性的值转化为 T 类型
 */
type MyRecord<K extends string | number | symbol, T> = { [P in K]: T };
// type RecordUser = MyRecord<"user1" | "user2", User>;

/**
 * 获取函数类型 T 的返回类型
 */
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
// 利用 TS 自身的类型推导能力 infer
// type ReturnTypeTest = MyReturnType<() => string>;
