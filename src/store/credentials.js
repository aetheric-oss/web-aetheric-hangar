import { defineStore } from 'pinia';

export const useCredentialStore = defineStore('credentials', {
  id: 'credential-store',
  state: () => {
    return {
      credentials: [
        {
          username: 'user_123',
          password: 'password123',
        },
        {
          username: 'john_doe',
          password: 'secret456',
        },
        {
          username: 'alice_smith',
          password: 'securePass',
        },
        {
          username: 'jane_doe',
          password: '12345678',
        },
        {
          username: 'bob_thompson',
          password: 'qwerty',
        },
      ],
    };
  },
});
