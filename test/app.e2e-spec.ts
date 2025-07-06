import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { MongoMemoryModule } from './mongo-memory.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MongoMemoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('debería crear un producto y luego listar productos', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Camiseta',
        price: 29.99,
        stock: 100,
        category: 'Ropa',
      })
      .expect(201);

    expect(createResponse.body).toHaveProperty('message', 'Producto creado');

    const listResponse = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
