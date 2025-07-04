import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModel, ProductDocument } from '../persistence/product.schema';


@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel(ProductModel.name) private productModel: Model<ProductDocument>) {}

  async save(product: Product): Promise<void> {
    const productDoc = new this.productModel({
      _id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
    await productDoc.save();
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this.productModel.findById(id).exec();
    if (!doc) return null;
    return new Product(doc.id, doc.name, doc.price, doc.stock, doc.category);
  }

  async findAll(): Promise<Product[]> {
    const docs = await this.productModel.find().exec();
    return docs.map(doc => new Product(doc.id, doc.name, doc.price, doc.stock, doc.category));
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
