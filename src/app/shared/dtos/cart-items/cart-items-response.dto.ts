import { BaseResponseDto } from "../base-response.dto";
import { CartItemDto } from "./cart-item.dto";

export interface CartItemsResponseDto extends BaseResponseDto {
    cartItems: CartItemDto[];
    subtotal: number;
    salesTax: number;
    total: number;
}