import { Cart } from "./cart";
import { Product } from "./product";

export interface CartDetails {
  cartDetailsIdentity: {
    product: Product;
  };
  quantity: number;
}
