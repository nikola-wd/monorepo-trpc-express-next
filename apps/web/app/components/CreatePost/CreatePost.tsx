'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../utils/trpc';
import {
  postCreateInputSchema,
  type TpostCreateInputSchema,
} from '@repo/validation-schemas'; // adjust the path as necessary
import { FieldWrap, Input } from '../UI';
import { useFetchUsersAndPosts } from '../../hooks/useFetchUsersAndPosts';

export const CreatePost: React.FC = () => {
  const { refetchPosts } = useFetchUsersAndPosts();

  const createPostMutation = trpc.post.create.useMutation({
    onSuccess: () => {
      refetchPosts();
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TpostCreateInputSchema>({
    resolver: zodResolver(postCreateInputSchema),
  });

  const onSubmit: SubmitHandler<TpostCreateInputSchema> = (data) => {
    createPostMutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-slate-700">
        Create New Post
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-8">
        <div className="mb-4">
          <FieldWrap label="Title" className="mb-12" error={errors.title}>
            <Input {...register('title')} type="text" />
          </FieldWrap>
        </div>
        <div className="mb-12">
          <FieldWrap label="Author ID" className="mb-6" error={errors.authorId}>
            <Input {...register('authorId')} type="text" />
          </FieldWrap>
        </div>
        <div className="mb-4">
          <textarea
            {...register('content')}
            placeholder="Post Content"
            className="w-full p-2 border rounded"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
