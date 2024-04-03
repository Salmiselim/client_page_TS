export class Client {
  code: string;
  adherant: string;
  password: string;
  email: string;

  constructor(code: string, adherant: string, password: string, email: string) {
    this.code = code;
    this.adherant = adherant;
    this.password = password;
    this.email = email;
  }
}
