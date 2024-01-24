import { CategoryDto } from "./category.dto";

export interface ItemDto {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    category: CategoryDto;
    price: number;
    imagePath: string;
}