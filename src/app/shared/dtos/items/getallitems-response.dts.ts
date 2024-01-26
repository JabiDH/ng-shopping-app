import { BaseResponseDto } from "../base-response.dto";
import { ItemDto } from "./item.dto";

export interface GetAllItemsResponseDto extends BaseResponseDto {
    items: ItemDto[];
}