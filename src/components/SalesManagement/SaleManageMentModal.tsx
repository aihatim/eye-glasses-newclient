/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { SetStateAction, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import DealSvg from '../../assets/DealSvg';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import { useCreateSellMutation } from '../../redux/features/sell/sellApi';
import { TError } from '../../types';
import PrintInvoice from '../Invoice/PrintInvoice';
import EGForm from '../form/EGForm';
import EGInput from '../form/EGInput';
import EGLabel from '../form/EGLabel';
import EGButton from '../ui/EGButton';
import { EGLoadElement } from '../ui/EGLoading';
import SuccessFull from '../ui/SuccessFull';

export default function SaleManageMentModal({
  productName,
  id,
  productId,
}: {
  productName: string;
  id: string;
  productId: string;
}) {
  const { data: me, isLoading } = useGetMeQuery(undefined);
  const [createSell, { data, isLoading: sellLoading }] =
    useCreateSellMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printModal, setPrintModal] = useState(false);
  const [sellDate, setSellDate] = useState<SetStateAction<string | string[]>>(
    null || ''
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPrintModal(false);
  };
  const handleSales: SubmitHandler<FieldValues> = async (data) => {
    const { quantity, buyerName } = data;
    const sellInfo = {
      buyerName,
      productId,
      quantity: Number(quantity),
      sellerId: me?.data?._id,
      sellDate,
    };
    const sellToast = toast.loading('Try to sell Product', { duration: 2000 });
    try {
      const sellProduct = await createSell({ sellInfo, id }).unwrap();
      toast.success(`${sellProduct.message}`, {
        id: sellToast,
        duration: 2000,
      });
      setPrintModal(true);
    } catch (error: TError | any) {
      toast.error(
        `${error?.data?.errorSources[0]?.message || error?.data?.message}`,
        {
          id: sellToast,
          duration: 2000,
        }
      );
    }
  };
  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setSellDate(dateString);
  };

  return (
    <>
      <button
        onClick={showModal}
        className='px-2 py-1 rounded-lg bg-gray-200 hover:bg-blue-300 duration-300 border'
      >
        <DealSvg />
      </button>

      <Modal
        title={`${productName}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: 'hidden' }}
      >
        {printModal ? (
          <>
            <SuccessFull />
            <p>If You want to download invoice click print</p>
            <div className='absolute bottom-5'>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPrintModal(false);
                }}
              >
                {sellLoading ? (
                  <EGLoadElement />
                ) : (
                  <PrintInvoice id={data?.data?._id} />
                )}
              </button>
            </div>
          </>
        ) : (
          <EGForm onSubmit={handleSales}>
            <EGLabel title='Buyer Name ' />
            <EGInput
              type='text'
              name='buyerName'
              placeholder='Enter The Buyer Name'
            />
            <EGLabel title='Sell Quantity ' />
            <EGInput
              type='number'
              name='quantity'
              placeholder='Quantity of the product to be sold'
            />
            <EGLabel title='Pick The Date ' />
            <DatePicker className='w-full' onChange={onChange} />
            <div className='absolute bottom-0'>
              <EGButton disable={isLoading || sellLoading}>Submit</EGButton>
            </div>
          </EGForm>
        )}
      </Modal>
    </>
  );
}
