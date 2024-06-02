export class Email {
  private constructor(public value: string) {
    this.value = value;
  }

  static create(email: string): Email {
    if (!this.validate(email)) {
      throw new Error("Invalid email");
    }

    return new Email(email);
  }

  static validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
