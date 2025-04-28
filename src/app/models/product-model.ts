import { ProductSpecs } from "./product-specs";

export interface Product {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    imageUrl: string | undefined;
    specs: ProductSpecs | undefined;
    images?: string[];
}
