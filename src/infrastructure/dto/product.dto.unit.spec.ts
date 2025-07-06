import { validate } from 'class-validator';
import { CreateProductDto } from './product.dto';

describe('CreateProductDto', () => {
  it('debería fallar si faltan campos obligatorios', async () => {
    const dto = new CreateProductDto();

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('debería pasar con datos válidos', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Camiseta';
    dto.price = 29.99;
    dto.stock = 100;
    dto.category = 'Ropa';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('debería fallar si price es negativo', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Camiseta';
    dto.price = -5;
    dto.stock = 100;
    dto.category = 'Ropa';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});
