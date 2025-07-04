import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number, category: string): Promise<void> {
    const product = new Product(uuidv4(), name, price, stock, category);
    await this.productRepository.save(product);
  }
}