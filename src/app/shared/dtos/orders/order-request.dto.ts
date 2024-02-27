import { OrderStatus } from "../../enums/order-status.enum"
import { OrderItemDto } from "../order-items/order-item.dto"

export interface OrderRequestDto {
    email: string
    status: OrderStatus
    taxRate: number
    closedOn: Date
    orderItems: OrderItemDto[]
}