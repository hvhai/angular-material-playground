export interface CreateTodoRequest {
  note: string;
}

type OneOrMany<T> = T | T[];

export interface TodoApiResponse<OneOrMany> {
  data: OneOrMany;
  errors: [];
}


export interface TodoDto {
  id: string;
  note: string;
  isDone: boolean;
}

export interface UpdateTodoRequest {
  id?: string;
  note?: string;
}
