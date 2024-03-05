import { decodeJwt, jwtVerify } from 'jose';
import { type KeyLike } from 'jose';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      decodeJwt: (token: string) => {
        return decodeJwt(token);
      },
      verifyJwtToken: (token: string, secret: KeyLike | Uint8Array, options: object) => {
        return jwtVerify(token, secret, options);
      }
    }
  }
})
