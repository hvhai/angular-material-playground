export interface AppEvent {
  readonly __typename: 'AppEvent';
  id: number;
  title: string;
  time: Date;
}
export function instanceOfAppEvent(object: any): object is AppEvent {
  return object.__typename === 'AppEvent';
}

export const DEFAULT_APP_EVENT: AppEvent = {
  __typename: 'AppEvent',
  id: -1,
  title: 'Default title',
  time: new Date(),
};
