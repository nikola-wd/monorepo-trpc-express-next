import { useAuthStore } from '@w-store/ZustandStore';

export const useSession = () => {
  const { user, authStatus, isRefetching, sessionExpiresIn } = useAuthStore();

  return {
    user,
    authStatus,
    sessionExpiresIn,
    isRefetching,
  };
};
