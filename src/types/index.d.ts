// export as namespace Net;
// import * as Prism from 'prismjs';


declare interface IResponse<T> {
  code: number;
  data: T;
  msg: string;
}
