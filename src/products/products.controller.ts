import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchAllProducts();

    }
    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productsService.fetchSingleProduct(productId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number) {
        this.productsService.updateProduct(productId, prodTitle, prodDescription, prodPrice)
        return null;

    }
    @Delete(':id')
    removeProduct(@Param('id') productId: string) {
         this.productsService.deleteProduct(productId);
         return null;

    }

}


