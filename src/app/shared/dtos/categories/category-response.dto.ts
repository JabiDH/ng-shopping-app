import { BaseResponseDto } from "../base-response.dto";
import { CategoryDto } from "./category.dto";

export interface CategoryResponseDto extends BaseResponseDto {
    category: CategoryDto;
}