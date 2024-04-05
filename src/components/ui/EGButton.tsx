import { Spin } from 'antd';
import { ReactNode } from 'react';

export default function EGButton({
  disable,
  children,
}: {
  disable?: boolean;
  children: ReactNode;
}) {
  return (
    <button 
      disabled={disable}
      className='px-3 py-1 rounded-md my-5 hover:bg-slate-600 duration-150 bg-gray-700 text-white'
    >
      {disable ? <Spin /> : children}
    </button>
  );
}
