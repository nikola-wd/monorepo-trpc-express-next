import { trpc } from '../utils/trpc';

export const useFetchUsersAndPosts = () => {
  const usersQuery = trpc.user.list.useQuery();
  const postsQuery = trpc.post.list.useQuery();

  const utils = trpc.useUtils();

  const refetchUsers = () => utils.user.list.invalidate();
  const refetchPosts = () => utils.post.list.invalidate();

  return {
    usersQuery,
    postsQuery,
    refetchUsers,
    refetchPosts,
  };
};
