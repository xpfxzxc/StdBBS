export interface Pagination<PaginationObject> {
  readonly items: PaginationObject[];
  readonly itemCount: number;
  readonly totalItems: number;
  readonly pageCount: number;
  readonly next?: string;
  readonly previous?: string;
}
