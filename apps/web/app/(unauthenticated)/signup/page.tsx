import { type Metadata } from 'next';
import { RegisterUser } from '@w-components/auth/RegisterUser';

// import { redirectIfNoSession } from '@/util/server/redirectIfNoSession'

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Page() {
// export default async function Page() {
  // await redirectIfNoSession()

  return <RegisterUser />;
}
