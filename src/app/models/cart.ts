import { Customer } from "./customer";
import { CartDetails } from "./cart-details";

export interface Cart {
    id?:number,
    cartDetails?:Array<CartDetails>,
    customer?: Customer
}
