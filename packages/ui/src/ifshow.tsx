import { FC, ReactNode } from 'react';

export interface IIfShow {
  cond: boolean;
  children: ReactNode;
  tElse?: ReactNode;
}

export const IfShow: FC<IIfShow> = ({ cond, children, tElse }) => {
  return <>{cond ? children : tElse}</>;
};
