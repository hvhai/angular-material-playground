export interface CreateEventRequest {
  name: string;
  dateTime: Date;
}

type OneOrMany<T> = T | T[];

export interface ApiResponse<OneOrMany> {
  data: OneOrMany;
  errors: [];
  meta: MetaDataModel;
}

export interface MetaDataModel {}

export interface EventDto {
  id: number;
  name: string;
  dateTime: Date;
}

export interface UpdateEventRequest {
  id?: number;
  name?: string;
  dateTime?: Date;
}
