export interface ApiResponse<T> {
  infoService: InfoService;
  status: Status;
  responsePayload: ResponsePayload<T>;
}

export interface InfoService {
  timestamp: string;
  host: string;
  method: string;
}

export interface ResponsePayload<T> {
  result: boolean;
  data: T;
}

export interface Status {
  code: number;
  message: string;
}
