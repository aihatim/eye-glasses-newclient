/* eslint-disable @typescript-eslint/no-explicit-any */
import { color } from '../../constant/addProduct.constant';

export default function SelectColor({
  setColor,
  color: selectColor,
}: {
  setColor: any;
  color: any;
}) {
  return (
    <div className='flex gap-3'>
      <>
        {color.map((el, i) => {
          const elColor =
            el === 'black'
              ? `bg-black`
              : el === 'golden'
              ? 'bg-[#FFD700]'
              : el === 'green'
              ? `bg-green-500`
              : el === 'yellow'
              ? `bg-yellow-500`
              : el === 'red'
              ? `bg-red-500`
              : el === 'blue'
              ? 'bg-blue-500'
              : el === 'pink'
              ? 'bg-pink-500'
              : 'bg-purple-500';
          return (
            <div
              key={i}
              className={`size-7 ${elColor} rounded-full flex items-center justify-center my-3`}
            >
              <input name='answer' type='radio' className='hidden' />
              <label
                onClick={() => setColor(el)}
                className='px-2 py-1 rounded-lg flex justify-center items-center text-3xl lg:text-5xl font-bold w-10 h-10 lg:w-14 lg:h-14'
              >
                {selectColor === el && (
                  <span className='size-2 rounded-full bg-white'></span>
                )}
              </label>
            </div>
          );
        })}
      </>
    </div>
  );
}
