import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductModule } from '../src/infrastructure/product.module';
import { INestApplication } from '@nestjs/common';

export async function createTestingApp(): Promise<INestApplication> {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(uri),
      ProductModule,
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}
