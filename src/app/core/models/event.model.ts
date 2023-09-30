export interface AppEvent {
  readonly __typename: 'AppEvent';
  id: number;
  title: string;
  time: Date;
}
export function instanceOfAppEvent(object: any): object is AppEvent {
  return object.__typename === 'AppEvent';
}
