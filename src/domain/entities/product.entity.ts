export class Product {
    constructor(
      public readonly id: string,
      public name: string,
      public price: number,
      public stock: number,
      public category: string
    ) {}
  
    updateStock(newStock: number) {
      if (newStock < 0) {
        throw new Error('El stock no puede ser negativo');
      }
      this.stock = newStock;
    }
  }
  