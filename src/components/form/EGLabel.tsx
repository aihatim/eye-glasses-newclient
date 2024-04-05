export default function EGLabel({ title }: { title: string }) {
  return (
    <label className='block mb-2 text-sm font-medium text-gray-900'>
      {title}
    </label>
  );
}
