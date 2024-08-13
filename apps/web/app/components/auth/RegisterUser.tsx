'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  VS_signup_schema,
  type TVS_signup_schema,
} from '@repo/validation-schemas'; // adjust the path as necessary
import { trpc } from '@w-utils/trpc';
import {
  FieldWrap,
  Input,
  Toggle,
  Form,
  Card,
  Button,
  Txt,
} from '@w-components/UI';
import { classNames } from '@w-utils/classNames';

export const RegisterUser: React.FC = () => {
  const [toggleChecked, setToggleChecked] = useState(false);

  const router = useRouter();

  const registerUserMutation = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      reset();
      router.push('/login');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TVS_signup_schema>({
    defaultValues: {
      email: '',
      password: '',
      registerAs: 'owner',
    },
    resolver: zodResolver(VS_signup_schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TVS_signup_schema> = (data) => {
    registerUserMutation.mutate(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-[80px] space-y-4">
        <Card
          asTag="div"
          className="w-full max-w-md mx-auto py-6 flex-col gap-2 items-stretch"
        >
          <FieldWrap label="Email" className="mb-6" error={errors.email}>
            <Input
              {...register('email')}
              isError={Boolean(errors.email)}
              type="email"
            />
          </FieldWrap>
          <FieldWrap label="Password" className="mb-6" error={errors.password}>
            <Input
              {...register('password')}
              type="password"
              isError={Boolean(errors.password)}
              revealable
            />
          </FieldWrap>

          <Txt className="text-md text-center">Register as:</Txt>

          {/* TODO: Refactor this toggle to accept useForm validation */}
          <Toggle
            checked={toggleChecked}
            setChecked={setToggleChecked}
            labelLeft="Owner"
            labelRight="Client"
          />

          <Button
            theme="primary"
            size="medium"
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={classNames(
              isSubmitting && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>
        </Card>
      </Form>

      <Txt className="text-center mt-4">
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Sign In
        </Link>{' '}
        <span className="text-slate-600">instead: or go</span>{' '}
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
      </Txt>
    </>
  );
};
