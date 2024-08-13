'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  userCreateInputSchema,
  type TuserCreateInputSchema,
} from '@repo/validation-schemas';
import { useFetchUsersAndPosts } from '@w-hooks/useFetchUsersAndPosts';
import { trpc } from '@w-utils/trpc';
import { FieldWrap, Input } from '@w-components/UI';

export const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TuserCreateInputSchema>({
    resolver: zodResolver(userCreateInputSchema),
  });

  const { refetchUsers } = useFetchUsersAndPosts();

  const createUserMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      void refetchUsers();
      reset();
    },
  });

  const onSubmit: SubmitHandler<TuserCreateInputSchema> = (data) => {
    createUserMutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-slate-700">
        Create New User
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <FieldWrap label="Name" className="mb-12" error={errors.name}>
            <Input {...register('name')} type="text" />
          </FieldWrap>
        </div>
        <div className="mb-4">
          <FieldWrap label="Email" className="mb-12" error={errors.email}>
            <Input {...register('email')} type="email" />
          </FieldWrap>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
};
