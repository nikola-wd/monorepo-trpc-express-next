'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  authSignInSchema,
  type TauthSignInSchema,
} from '@repo/validation-schemas';
import { trpc } from '../../utils/trpc';
import { FieldWrap, Input } from '../UI';
import {useAuthStore} from '@store/ZustandStore';

export const LoginUser: React.FC = () => {
  const { signIn } = useAuthStore();

  const loginUserMutation = trpc.auth.signIn.useMutation({
    onSuccess: (data) => {
      // Handle successful login, e.g., store tokens, redirect, etc.
      console.log('Login successful', data);
      signIn(data.accessToken);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TauthSignInSchema>({
    resolver: zodResolver(authSignInSchema),
  });

  const onSubmit: SubmitHandler<TauthSignInSchema> = (data) => {
    loginUserMutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-slate-700">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-8">
        <div className="mb-4">
          <FieldWrap label="Email" className="mb-12" error={errors.email}>
            <Input {...register('email')} type="email" />
          </FieldWrap>
        </div>
        <div className="mb-4">
          <FieldWrap label="Password" className="mb-12" error={errors.password}>
            <Input {...register('password')} type="password" />
          </FieldWrap>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};
