type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

export class Notification {
  createdAt: Number;
  data: AnyJson;
  id: number;
  type: string;
  updatedAt: Number;
}
