'use client';

// TODO: Create separate toastify component and import css there and the ocmponent below
import 'react-toastify/dist/ReactToastify.css'; // TODO: Replace with custom coded toastify component

import { type PropsWithChildren, type ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import { TrpcProvider } from './TrpcProvider';
import { SessionProvider } from './SessionProvider';
// import { ModalProvider } from '@/providers/ModalsProvider';
// import { AutoLogoutProvider } from '@/providers/AutoLogoutProvider';

export default function Providers({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <SessionProvider>
      {/* <AutoLogoutProvider> */}
      {/* <ModalProvider>{children}</ModalProvider> */}
      <TrpcProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </TrpcProvider>
      {/* </AutoLogoutProvider> */}
    </SessionProvider>
  );
}
