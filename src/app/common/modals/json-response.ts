export interface JsonResponse {
  readonly code: number;
  readonly message?: string;
  readonly data?: Object;
  readonly timestamp: number;
  readonly [propName: string]: any;
}
