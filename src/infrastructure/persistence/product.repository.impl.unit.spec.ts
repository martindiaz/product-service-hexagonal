import { ProductRepositoryImpl } from './product.repository.impl';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

describe('ProductRepositoryImpl (unitario con mock realista)', () => {
  let productRepository: ProductRepositoryImpl;
  let productModelMock: any;
  const createMock = jest.fn();
  const findMock = jest.fn();

  beforeEach(() => {
    // Simulamos el constructor del modelo
    productModelMock = jest.fn().mockImplementation((data) => ({
      save: createMock.mockResolvedValue(data),
    }));

    productModelMock.find = findMock.mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        { _id: '123', name: 'Mock Product', price: 10, stock: 5, category: 'Mock' },
      ]),
    });

    productRepository = new ProductRepositoryImpl(productModelMock);
  });

  it('debería llamar a save cuando se guarda un producto', async () => {
    const product = new Product(uuidv4(), 'Camiseta', 29.99, 100, 'Ropa');

    await productRepository.save(product);

    expect(createMock).toHaveBeenCalled();
  });

  it('debería devolver productos simulados al llamar a findAll', async () => {
    const products = await productRepository.findAll();

    expect(findMock).toHaveBeenCalled();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('Mock Product');
  });
});
