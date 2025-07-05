import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
  name!: string;

  @ApiProperty({ example: 29.99, description: 'Precio del producto' })
  price!: number;

  @ApiProperty({ example: 100, description: 'Cantidad de stock disponible' })
  stock!: number;

  @ApiProperty({ example: 'Ropa', description: 'Categoría del producto' })
  category!: string;
}

export class ProductDto {
  @ApiProperty({ example: '5f716bd6-c17f-483c-a4a2-9044c566a359', description: 'ID del producto' })
  id!: string;

  @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
  name!: string;

  @ApiProperty({ example: 29.99, description: 'Precio del producto' })
  price!: number;

  @ApiProperty({ example: 100, description: 'Cantidad de stock disponible' })
  stock!: number;

  @ApiProperty({ example: 'Ropa', description: 'Categoría del producto' })
  category!: string;
}
