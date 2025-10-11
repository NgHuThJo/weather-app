export type Column = {
  id: string;
  name: string;
};

export type UpdateColumn = Column & {
  realId: number;
};

export type Unpack<T> = T extends (infer U)[] ? U : T;
