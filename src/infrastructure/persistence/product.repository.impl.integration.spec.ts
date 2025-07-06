import { TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductRepositoryImpl } from './product.repository.impl';
import { Product } from '../../domain/entities/product.entity';
import { Model } from 'mongoose';
import { createTestingApp } from '../../../test/mongo-memory-util';
import { INestApplicationContext } from '@nestjs/common';
import { ProductModule } from '../product.module';
import { v4 as uuidv4 } from 'uuid';

describe('ProductRepositoryImpl', () => {
  let productRepository: ProductRepositoryImpl;
  let productModel: Model<Product>;

  beforeAll(async () => {
    const app = await createTestingApp();
    const moduleRef: INestApplicationContext = app.select(ProductModule);

    productModel = moduleRef.get(getModelToken('ProductModel'));
    productRepository = new ProductRepositoryImpl(productModel as any);
  });

  beforeEach(async () => {
    await productModel.deleteMany({});
  });

  it('debería guardar un producto en la base de datos', async () => {
    const product = new Product(uuidv4(), 'Pantalón', 49.99, 50, 'Ropa');
    await productRepository.save(product);

    const products = await productModel.find().lean();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('Pantalón');
  });

  it('debería devolver una lista vacía si no hay productos', async () => {
    const products = await productRepository.findAll();
    expect(products.length).toBe(0);
  });

  it('debería devolver todos los productos', async () => {
    const product1 = new Product(uuidv4(), 'Camiseta', 19.99, 100, 'Ropa');
    const product2 = new Product(uuidv4(), 'Zapatos', 89.99, 20, 'Calzado');

    await productRepository.save(product1);
    await productRepository.save(product2);

    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products.map(p => p.name)).toEqual(expect.arrayContaining(['Camiseta', 'Zapatos']));
  });
});
