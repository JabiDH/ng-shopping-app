import { BaseResponseDto } from "../base-response.dto";
import { OrderDto } from "./order.dto";

export interface OrderResponseDto extends BaseResponseDto {
    order: OrderDto;
}