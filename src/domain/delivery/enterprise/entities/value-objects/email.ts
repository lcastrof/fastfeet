export class Email {
  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  static create(email: string): Email {
    if (!this.validate(email)) {
      throw new Error("Invalid email");
    }

    return new Email(email);
  }

  private static validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
