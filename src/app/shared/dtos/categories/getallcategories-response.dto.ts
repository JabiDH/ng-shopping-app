import { BaseResponseDto } from "../base-response.dto";
import { CategoryDto } from "../items/category.dto";

export interface GetAllCategoriesResponseDto extends BaseResponseDto {
    categories: CategoryDto[];
}