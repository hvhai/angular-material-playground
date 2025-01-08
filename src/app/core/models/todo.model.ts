
export interface TodoNote {
  readonly __typename: 'TodoNote';
  id: string;
  note: string;
  isDone: boolean;
}
export function instanceOfTodoNote(
  object: any
): object is TodoNote {
  return object.__typename === 'TodoNote';
}

export const DEFAULT_APP_TODO: TodoNote = {
  __typename: 'TodoNote',
  id: "",
  note: 'Default title',
  isDone: false
};
