import { CategoryDto } from "../categories/category.dto";
import { ItemImageDto } from "./itemimage-dto";

export interface ItemDto {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: CategoryDto;
    price: number;
    imagePath: string;
    images: ItemImageDto[];
}