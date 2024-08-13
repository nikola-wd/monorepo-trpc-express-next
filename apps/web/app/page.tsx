'use client';

import { useFetchUsersAndPosts } from '@w-hooks/useFetchUsersAndPosts';
import { CreateUser } from '@w-components/CreateUser/CreateUser';
import { CreatePost } from '@w-components/CreatePost/CreatePost';

export default function HomePage() {
  const { usersQuery, postsQuery } = useFetchUsersAndPosts();

  let UsersRender = null;
  if (usersQuery.isLoading) {
    UsersRender = <p className="text-slate-800">Loading users...</p>;
  }
  if (usersQuery.error) {
    UsersRender = <p>Error loading users: {usersQuery.error.message}</p>;
  }
  if (usersQuery.data) {
    UsersRender = usersQuery.data.map((user) => (
      <div key={user.id} className="p-4 border rounded-lg shadow bg-white mb-4">
        <h2 className="text-xl font-semibold">{user.email}</h2>
        <p>{user.name}</p>
      </div>
    ));
  }

  let PostsRender = null;
  if (postsQuery.isLoading) {
    PostsRender = <p className="text-slate-800">Loading posts...</p>;
  }
  if (postsQuery.error) {
    PostsRender = <p>Error loading posts: {postsQuery.error.message}</p>;
  }
  if (postsQuery.data) {
    PostsRender = postsQuery.data.map((post) => (
      <li
        key={post.id}
        className="mb-4 p-4 border rounded-lg shadow bg-white text-slate-800"
      >
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p>{post.content}</p>
      </li>
    ));
  }

  return (
    <div className="mx-auto p-4 flex gap-8 justify-center">
      <div className="w-[800px]">
        <div className="text-slate-800">
          <h1 className="text-3xl font-bold mb-4">Users</h1>
          {UsersRender}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4 text-slate-800">Posts</h1>
          {PostsRender}
        </div>
      </div>

      <div className="bg-white rounded-md border-2 border-solid border-slate-300 p-4 w-[400px]">
        <CreateUser />

        <hr className="my-8" />

        <CreatePost />
      </div>
    </div>
  );
}
