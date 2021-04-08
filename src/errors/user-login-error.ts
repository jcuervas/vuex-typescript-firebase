export default class UserLoginError {
  code: number;
  message: string;
  stack: string|undefined;
  constructor (e: Error) {
    this.code = 400
    this.message = e.message
    this.stack = e.stack
  }
}
