'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../utils/trpc';
import {
  authSignUpSchema,
  type TauthSignUpSchema,
} from '@repo/validation-schemas'; // adjust the path as necessary
import { FieldWrap, Input } from '../UI';

export const RegisterUser: React.FC = () => {
  const registerUserMutation = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TauthSignUpSchema>({
    resolver: zodResolver(authSignUpSchema),
  });

  const onSubmit: SubmitHandler<TauthSignUpSchema> = (data) => {
    registerUserMutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-slate-700">
        Register New User
      </h2>
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
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
        >
          Register User
        </button>
      </form>
    </div>
  );
};
