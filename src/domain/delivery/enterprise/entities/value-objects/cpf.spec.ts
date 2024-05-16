import { Cpf } from "./cpf";

describe("CPF", () => {
  it("should be able to create a valid CPF", () => {
    const cpf = "12345678909";
    const cpfInstance = new Cpf(cpf);

    expect(cpfInstance).toBeDefined();
  });

  it("should not be able to create an invalid CPF", () => {
    const cpf = "1234567890";
    expect(() => new Cpf(cpf)).toThrowError("Invalid CPF");
  });

  it("should be able to validate a CPF", () => {
    const cpf = "12345678909";
    const isValid = Cpf.validate(cpf);

    expect(isValid).toBe(true);

    const cpf2 = "52998224733";
    const isValid2 = Cpf.validate(cpf2);

    expect(isValid2).toBe(false);
  });
});
