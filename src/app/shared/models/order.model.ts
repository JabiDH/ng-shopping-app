import { OrderStatus } from "../enums/order-status.enum"
import { OrderItem } from "./order-item.model"

export interface Order {
    id: number
    email: string
    createdOn: Date
    closedOn: Date
    status: OrderStatus
    subTotal: number
    salesTax: number
    taxRate: number
    total: number
    orderItems: OrderItem[]
}