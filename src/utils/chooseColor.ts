
export const chooseColor = (el: string) => {
    return el === 'black'
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
  };