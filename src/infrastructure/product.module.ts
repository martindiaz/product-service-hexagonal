import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './persistence/product.schema';
import { ProductRepositoryImpl } from './persistence/product.repository.impl';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { ListProductsUseCase } from '../application/use-cases/list-products.use-case';
import { ProductController } from '../infrastructure/controllers/product.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (productRepo: ProductRepositoryImpl) => new CreateProductUseCase(productRepo),
      inject: ['ProductRepository'],
    },
    {
      provide: ListProductsUseCase,
      useFactory: (productRepo: ProductRepositoryImpl) => new ListProductsUseCase(productRepo),
      inject: ['ProductRepository'],
    },
  ],
})
export class ProductModule {}


//Paso 4: Módulo para Producto