import { CategoryDto } from "./category.dto";

export interface ItemDto {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: CategoryDto;
    price: number;
    imagePath: string;
}