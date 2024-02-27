import { Item } from "../../items/models/item.model"

export interface OrderItem {
    id: number
    itemId: number
    orderId: number
    price: number
    salesTax: number
    taxRate: number
    quantity: number
    item: Item
}