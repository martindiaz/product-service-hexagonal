import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto, ProductDto } from '../dto/product.dto';

@ApiTags('Products')
@Controller({ path: 'products' })
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  async create(@Body() body: CreateProductDto) {
    await this.createProductUseCase.execute(body.name, body.price, body.stock, body.category);
    return { message: 'Producto creado' };
  }

  @Get()
  @ApiOperation({ summary: 'Listar productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ProductDto] })
  async findAll(): Promise<ProductDto[]> {
    const products = await this.listProductsUseCase.execute();
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category,
    }));
  }
}
