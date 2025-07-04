import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ _id: false })
export class ProductModel {
  @Prop({ required: true })
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  stock!: number;

  @Prop({ required: true })
  category!: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
ProductSchema.set('id', true); // Para que Mongoose exponga el 'id' como string

