export interface CreateEventRequest {
  title: string;
  time: Date;
}

export interface CreateEventResponse {
  id: number;
  title: string;
  time: Date;
}

export interface DeleteEventResponse {
  result: string;
}

export interface EventResponse {
  id: number;
  title: string;
  time: Date;
}

export interface GetAllEventResponse {
  events: EventResponse[];
}

export interface UpdateEventRequest {
  title: string;
  time: Date;
}

export interface UpdateEventResponse {
  result: string;
}
