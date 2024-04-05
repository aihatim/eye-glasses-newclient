export interface TProductColumn {
  key: string;
  id: string;
  name: string;
  price: number;
  brand: string;
  color: string;
  gender: string;
  material: string;
  status: string;
  action: string;
  _id: string;
  sellDate?: Date;
  totalPrice?: number;
}

interface Brand {
  _id: string;
  brand: string;
}

export interface TProduct {
  _id: string;
  name: string;
  price: number;
  shape: string;
  brand: Brand;
  color: string;
  gender: string;
  quantity: number;
  material: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
