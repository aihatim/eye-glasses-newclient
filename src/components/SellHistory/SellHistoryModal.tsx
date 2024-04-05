import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';

export default function SellHistoryModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className='px-2 py-1 rounded-lg bg-gray-200 hover:bg-blue-300 duration-300 border'
      >
        <InfoCircleOutlined />
      </button>

      <div className='lg:grid grid-cols-2'>
        <Modal
          title='Product Info'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ className: 'hidden' }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Modal
          title='Seller Info'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ className: 'hidden' }}
          cancelText='ok'
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  );
}
