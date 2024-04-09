export type NullIt<Type> = {
  [Property in keyof Type]: Type[Property] | null;
};
