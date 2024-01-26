import { BaseResponseDto } from "../base-response.dto";
import { CategoryDto } from "./category.dto";

export interface CategoriesResponseDto extends BaseResponseDto {
    categories: CategoryDto[];
}