import { hash, compare } from 'bcrypt';

import { IHashProvider } from '../../IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  async hash(text: string, salt: number): Promise<string> {
    const hashedText = await hash(text, salt);

    return hashedText;
  }

  compare(text: string, hasedText: string): Promise<boolean> {
    return compare(text, hasedText);
  }
}
