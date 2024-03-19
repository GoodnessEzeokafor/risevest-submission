import { Injectable } from '@nestjs/common';
import * as bcrypt from '@node-rs/bcrypt';

@Injectable()
export class EncryptionUtilsService {
  /**
   * compares hash password with a password
   * @param password password to compare
   * @param hashedPassword hashed password to compare password with
   * @returns true or false
   */
  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const bool = await bcrypt.compare(password, hashedPassword);
      return bool;
    } catch (e) {
      throw e;
    }
  }

  /**
   * hashes a string, character, words. We mostly use it to hash passwords
   * @param password character or string to hash
   * @returns
   */
  public async hash(password: string) {
    const saltRound = 10;
    const hash = await bcrypt.hashSync(password, saltRound);
    return hash;
  }
}
