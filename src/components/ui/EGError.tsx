export default function EGError({ message }: { message?: string }) {
  return (
    <div className='text-red-500 text-2xl font-extrabold'>
      {message || 'Something went wrong'}
    </div>
  );
}
