export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  type: T;
  payload: P;
}

export interface ActionWithData<T extends string, D> extends Action<T> {
  type: T;
  data: D;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, D>(
  type: T,
  data: D
): ActionWithData<T, D>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

export type FunctionType = (...args: any[]) => any;
export type ActionCreatorsMapObject = { [actionCreate: string]: FunctionType };

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export type PayloadType<
  T extends { [key: string]: FunctionType },
  M extends keyof T
> = ReturnType<T[M]>['payload'];

export type AllPayloadTypes<T extends { [key: string]: FunctionType }> = {
  [P in keyof T]: ReturnType<T[P]>['payload']
};
