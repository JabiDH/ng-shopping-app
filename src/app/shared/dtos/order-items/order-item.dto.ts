import { ItemDto } from "../items/item.dto"

export interface OrderItemDto {
    id: number
    itemId: number
    orderId: number
    price: number
    salesTax: number
    taxRate: number
    quantity: number
    item: ItemDto
}