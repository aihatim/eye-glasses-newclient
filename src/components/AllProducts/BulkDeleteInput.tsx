import { deletedId } from '../../redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function BulkDeleteInput({ id }: { id: string }) {
  const { product } = useAppSelector((state) => state);
  const findId = product.find((el) => el === id);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deletedId(id));
  };

  return (
    <input
      type='checkbox'
      checked={findId ? true : false}
      onChange={handleDelete}
    />
  );
}
