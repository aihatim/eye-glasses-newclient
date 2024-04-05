/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { useGetInvoiceQuery } from '../../redux/features/sell/sellApi';
import SvgLogo from '/eye.svg';
export default function Invoice({ componentRef, product, id }: any) {
  const { data } = useGetInvoiceQuery(id, { refetchOnMountOrArgChange: true });
  const {
    buyerName: bName,
    productId,
    sellDate: date,
    quantity: soldQuantity,
    totalPrice: overallPrice,
  } = data?.data || {};
  const { totalPrice, name, price, sellDate, buyerName, quantity } =
    product || {};

  return (
    <div
      ref={componentRef}
      className='hide-on-screen my-[2.45cm] mx-[3.17cm]  text-gray-500'
    >
      <div className='flex justify-between items-center'>
        <p>
          <img src={SvgLogo} alt='' />
        </p>
        <div className='flex flex-col items-end text-[16px]'>
          <p className='inline-block text-white uppercase text-2xl bg-[--light-purple] py-3 px-4 border-2 border-[--base-color]'>
            Paid
          </p>
          <br />

          <p>Order ID:#0000</p>
          <p>
            Date Of Purchase: {moment(sellDate || date).format('DD-MMM-YYYY')}
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='flex justify-between'>
        <div>
          <p>Eye Glass</p>
          <p>Halishahar,Chittagong</p>
          <p>eye.glass@gmail.com</p>
        </div>
        <div className='flex flex-col items-end'>
          <p>{buyerName || bName}</p>
          <p>Eye.glass@gmail.com</p>
          <p>Contact</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className='grid grid-cols-4 capitalize px-2 text-2xl justify-between py-1 bg-slate-200'>
          <p className='col-span-2'>Item</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        <div className='grid grid-cols-4 justify-between py-1 border-b border-gray-100'>
          <p className='col-span-2'>{name || productId?.name}</p>
          <p>{quantity || soldQuantity}</p>
          <p className='text-right'>{price || productId?.price} TK</p>
        </div>
        <div className='flex flex-col items-end'>
          <p>Subtotal:{totalPrice || overallPrice} TK</p>
          <p>Discount :0 TK</p>
          <p>Total: {totalPrice || overallPrice} TK</p>
        </div>
      </div>
    </div>
  );
}
