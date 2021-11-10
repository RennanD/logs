export interface IHashProvider {
  hash(text: string, salt: number): Promise<string>;
  compare(text: string, hashedText: string): Promise<boolean>;
}
