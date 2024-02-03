import { CartItem } from "./cart-item.model";

export interface Cart {
    cartItems: CartItem[];
    subtotal: number;
    salesTax: number;
    total: number;
}