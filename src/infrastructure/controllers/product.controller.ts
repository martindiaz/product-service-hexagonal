import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';

@Controller({ path: 'products' })
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase
  ) {}

  @Post()
  async create(@Body() body: { name: string; price: number; stock: number; category: string }) {
    await this.createProductUseCase.execute(body.name, body.price, body.stock, body.category);
    return { message: 'Producto creado' };
  }

  @Get()
  async findAll() {
    console.log('Listando productos.aasdasdf...');
    return this.listProductsUseCase.execute();
  }
}
