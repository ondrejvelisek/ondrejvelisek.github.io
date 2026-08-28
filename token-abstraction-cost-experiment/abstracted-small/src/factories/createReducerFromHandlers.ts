export type DiscriminatedAction = { readonly type: string };

export type NarrowedHandlerMap<TState, TAction extends DiscriminatedAction> = {
  readonly [K in TAction['type']]: (
    state: TState,
    action: Extract<TAction, { readonly type: K }>,
  ) => TState;
};

export function createReducerFromHandlers<TState, TAction extends DiscriminatedAction>(
  handlers: NarrowedHandlerMap<TState, TAction>,
): (state: TState, action: TAction) => TState {
  return (state, action) => {
    const handler = handlers[action.type as TAction['type']] as
      | ((state: TState, action: TAction) => TState)
      | undefined;

    if (!handler) return state;
    return handler(state, action);
  };
}

export function mergeHandlerSlices<TState, TAction extends DiscriminatedAction>(
  ...slices: readonly Partial<NarrowedHandlerMap<TState, TAction>>[]
): NarrowedHandlerMap<TState, TAction> {
  return Object.assign({}, ...slices) as NarrowedHandlerMap<TState, TAction>;
}
