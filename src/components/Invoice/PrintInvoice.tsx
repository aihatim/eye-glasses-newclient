/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrinterOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';

export default function PrintInvoice({product,id}:any) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Invoice componentRef={componentRef} id={id} product={product}/>
      <button
        className='px-2 py-1 rounded-lg bg-gray-200 hover:bg-blue-300 duration-300 border'
        onClick={handlePrint}
      >
        <PrinterOutlined/>
      </button>
    </>
  );
}
