import { BaseResponseDto } from "../base-response.dto";
import { OrderDto } from "./order.dto";

export interface OrdersResponseDto extends BaseResponseDto {
    orders: OrderDto[];
}