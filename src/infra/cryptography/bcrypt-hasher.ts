import { HashComparer } from "@/domain/delivery/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/delivery/application/cryptography/hash-generator";
import { compare, hash } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT = 8;

  hash(plaintext: string): Promise<string> {
    return hash(plaintext, this.HASH_SALT);
  }

  compare(plaintext: string, hashed: string): Promise<boolean> {
    return compare(plaintext, hashed);
  }
}
