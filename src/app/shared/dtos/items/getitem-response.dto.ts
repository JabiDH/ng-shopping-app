import { BaseResponseDto } from "../base-response.dto";
import { ItemDto } from "./item.dto";

export interface GetItemResponseDto extends BaseResponseDto {
    item: ItemDto;
}