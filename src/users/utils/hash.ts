import * as crypto from 'crypto';

const hash = (password: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const salt = crypto.randomBytes(256).toString('hex');
    crypto.pbkdf2(password, salt, 1000, 512, 'sha512', (error, derivedKey) => {
      if (error) {
        reject(error);
      } else {
        resolve(derivedKey.toString('hex'));
      }
    });
  });

export default hash;
