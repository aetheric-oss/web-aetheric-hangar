import jwt from 'jsonwebtoken';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      decodeJwt: (token: string) => {
        return jwt.decode(token);
      },
      verifyJwtToken: (token: string, secret: string, options: object) => {
        return jwt.verify(token, secret, options);
      }
    }
  }
})
