import { BaseResponseDto } from "../base-response.dto";
import { ItemDto } from "./item.dto";

export interface ItemsResponseDto extends BaseResponseDto {
    items: ItemDto[];
}