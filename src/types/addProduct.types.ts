import { color, shape } from '../constant/addProduct.constant';

export type addProduct = {
  name: string;
  price: number;
  quantity: number;
  image: string;
  shape: typeof shape;
  material: 'plastic' | 'metal';
  brand: string;
  gender: 'male' | 'female' | 'kids';
  color: typeof color;
};

export interface TSelectOptions {
  label?: string;
  item: string[];
  defaultValue: string;
  name: string;
}
