import {useAuthStore} from '@store/ZustandStore';

export const useSession = () => {
  const { user, authStatus, isRefetching } = useAuthStore();
  // const { user, authStatus, sessionExpiresIn, isRefetching } = useAuthStore();

  return {
    user,
    authStatus,
    // sessionExpiresIn,
    isRefetching,
  };
};
