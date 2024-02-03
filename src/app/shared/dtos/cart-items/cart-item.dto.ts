import { ItemDto } from "../items/item.dto";

export interface CartItemDto {
    itemId: number;
    email: string;
    item?: ItemDto;
    quantity: number;
}