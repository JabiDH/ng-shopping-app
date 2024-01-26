import { BaseResponseDto } from "../base-response.dto";
import { ItemDto } from "./item.dto";

export interface UpsertItemResponseDto extends BaseResponseDto {
    item: ItemDto;
}