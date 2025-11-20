// UI Model - используется в компонентах
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  inStock: boolean;
}

// DTO - приходит с backend
export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
  stock_quantity: number;
}

// Mapper для преобразования DTO в UI Model
export class ProductMapper {
  static fromDto(dto: ProductDto): Product {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      price: dto.price_cents / 100,
      formattedPrice: `$${(dto.price_cents / 100).toFixed(2)}`,
      imageUrl: dto.image_url,
      inStock: dto.stock_quantity > 0,
    };
  }

  static fromDtoList(dtos: ProductDto[]): Product[] {
    return dtos.map((dto) => ProductMapper.fromDto(dto));
  }
}

