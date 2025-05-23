import { ProductSpecs } from "./product-specs";

export interface Product {
    id?: string;
    name?: string;
    brand?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    specs?: ProductSpecs;
    images?: string[];
}
