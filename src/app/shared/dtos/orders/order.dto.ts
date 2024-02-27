import { OrderStatus } from "../../enums/order-status.enum"
import { OrderItemDto } from "../order-items/order-item.dto"

export interface OrderDto {
    id: number
    email: string
    createdOn: Date
    closedOn: Date
    status: OrderStatus
    subTotal: number
    salesTax: number
    taxRate: number
    total: number
    orderItems: OrderItemDto[]
}