// export as namespace Net;
// import * as Prism from 'prismjs';

declare interface IResponse<T = any> {
  data: T;
  msg: string;
  error?: string;
}
