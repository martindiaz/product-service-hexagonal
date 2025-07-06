import { TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProductUseCase } from './create-product.use-case';
import { ProductRepositoryImpl } from '../../infrastructure/persistence/product.repository.impl';
import { Model } from 'mongoose';
import { Product } from '../../domain/entities/product.entity';
import { createTestingApp } from '../../../test/mongo-memory-util';
import { INestApplicationContext } from '@nestjs/common';
import { ProductModule } from '../../infrastructure/product.module';


describe('CreateProductUseCase', () => {
    let createProductUseCase: CreateProductUseCase;
    let productModel: Model<Product>;
  
    beforeAll(async () => {
      const app = await createTestingApp();
      const moduleRef: INestApplicationContext = app.select(ProductModule);
  
      productModel = moduleRef.get(getModelToken('ProductModel'));
      const productRepository = new ProductRepositoryImpl(productModel as any);
      createProductUseCase = new CreateProductUseCase(productRepository);
    });
  
    beforeEach(async () => {
      await productModel.deleteMany({});
    });
  
    it('debería lanzar un error si el precio es negativo', async () => {
      await expect(
        createProductUseCase.execute('Camiseta', -10, 100, 'Ropa')
      ).rejects.toThrow('El precio no puede ser negativo');
  
      const products = await productModel.find().lean();
      expect(products.length).toBe(0);
    });
  
    it('debería crear un producto en la base de datos', async () => {
      await createProductUseCase.execute('Camiseta', 29.99, 100, 'Ropa');
      const products = await productModel.find().lean();
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Camiseta');
    });
  });
  