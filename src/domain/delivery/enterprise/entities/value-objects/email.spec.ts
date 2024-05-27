import { Email } from "./email";

describe("Email", () => {
  it("should be able to create a valid email", () => {
    const email = "john@doe.com";
    const emailInstance = Email.create(email);

    expect(emailInstance).toBeDefined();
  });

  it("should not be able to create an invalid email", () => {
    const email = "john@doe";
    expect(() => Email.create(email)).toThrowError("Invalid email");
  });
});
