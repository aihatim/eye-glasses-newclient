import { Popconfirm } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ReactNode } from 'react';

export default function PopConfirm({
  children,
  description,
  title,
  confirm,
  cancel,
  placement,
}: {
  children: ReactNode;
  description: string;
  title: string;
  confirm?: (e: React.MouseEvent<HTMLElement> | undefined) => void;
  cancel?: (e: React.MouseEvent<HTMLElement> | undefined) => void;
  placement: TooltipPlacement | undefined;
}) {
  return (
    <Popconfirm
      cancelButtonProps={{ className: 'text-red-500' }}
      okButtonProps={{
        className: 'text-green-500 border border-green-500 hover:bg-white',
      }}
      placement={placement || 'topRight'}
      title={title}
      description={description}
      onConfirm={confirm}
      onCancel={cancel}
      okText='Yes'
      cancelText='No'
    >
      {children}
    </Popconfirm>
  );
}
