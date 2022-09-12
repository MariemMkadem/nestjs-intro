import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(
        title: string,
        description: string,
        price: number
    ) {
        const productId = Math.random().toString()
        const newProduct = new Product(productId, title, description, price)
        this.products.push(newProduct)
        return productId;
    }

    fetchAllProducts() {
        return [...this.products]
    }

    fetchSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0]
        return { ...product };
    }

    updateProduct(
        productId: string,
        title: string,
        description: string,
        price: number) {
        const [product, index] = this.findProduct(productId)
        const updatedProduct = { ...product }
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct

    }
    deleteProduct(productId: string){
        const index= this.findProduct(productId)[1]
        this.products.splice(index, 1);


    }
    


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((product) => product.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }



} 