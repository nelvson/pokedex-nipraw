declare module '*.jpg';
declare module '*.png';

type ObjectKey<T = any> = { [key: string]: T };
type Nullable<T> = T | null;
type Maybe<T> = Nullable<T> | undefined;
