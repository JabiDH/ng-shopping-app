import { BaseResponseDto } from "../base-response.dto";
import { ItemDto } from "./item.dto";

export interface ItemResponseDto extends BaseResponseDto {
    item: ItemDto;
}