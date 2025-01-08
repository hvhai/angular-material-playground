
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
