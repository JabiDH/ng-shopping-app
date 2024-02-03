import { CartItemDto } from "./cart-item.dto";

export interface CartItemsRequestDto {
    email: string;
    cartItems: CartItemDto[];
}