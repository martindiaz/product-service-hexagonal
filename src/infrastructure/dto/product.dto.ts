import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, IsUUID, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 29.99, description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 100, description: 'Cantidad de stock disponible' })
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: 'Ropa', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category!: string;
}

export class ProductDto {
  @ApiProperty({ example: '5f716bd6-c17f-483c-a4a2-9044c566a359', description: 'ID del producto' })
  @IsUUID()
  id!: string;

  @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 29.99, description: 'Precio del producto' })
  @IsNumber()
  price!: number;

  @ApiProperty({ example: 100, description: 'Cantidad de stock disponible' })
  @IsInt()
  stock!: number;

  @ApiProperty({ example: 'Ropa', description: 'Categoría del producto' })
  @IsString()
  category!: string;
}
