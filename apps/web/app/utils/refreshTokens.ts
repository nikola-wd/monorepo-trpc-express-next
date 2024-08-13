import {useAuthStore} from '@store/ZustandStore';

export async function refreshTokens() {
  const { signIn } = useAuthStore.getState();

  try {
    console.log('+======START REFRESH TOKENS======+');

    const response = await fetch(
      'http://localhost:3002/trpc/auth.refreshTokens',
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    console.log('response from refreshTokens:', response);

    if (!response.ok) {
      throw new Error('Failed to refresh tokens');
    }

    const data = await response.json();

    console.log('data from refreshTokens:', data.result.data);

    const { accessToken } = data.result.data;

    if (!accessToken) {
      throw new Error('Failed to refresh tokens');
    }

    signIn(accessToken);
  } catch (error) {
    console.error('Failed to refresh tokens', error);
    throw error;
  }
}
