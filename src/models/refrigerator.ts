import {
  plainToClass,
  classToPlain,
  Exclude,
  Type,
  Transform,
  Expose
} from "class-transformer";
import dayjs from "dayjs";
import "reflect-metadata";

export const toRefrigerator = (obj): Refrigerator => {
  return plainToClass(Refrigerator, obj);
};

export const toRefrigeratorItem = (obj): RefrigeratorItem => {
  return plainToClass(RefrigeratorItem, obj);
};

export const toProduct = (obj): Product => {
  return plainToClass(Product, obj) as any;
};

export const toPlainProduct = (obj): object => {
  return classToPlain(toProduct(obj));
};

export const toProductsList = (list): Product[] => {
  return plainToClass(Product, list) as any;
};

export class Product {
  @Exclude({ toPlainOnly: true })
  id: string;
  name: string;
  @Expose()
  @Transform(v => (v ? v : dayjs().format('YYYY-MM-DD')))
  created: Date;
  shelfLife: Date;
  @Expose()
  @Transform(v => (v ? v : dayjs().format('YYYY-MM-DD')))
  movedToRef: Date;
}

export class Refrigerator {
  id: string;
  name: string;
  iconAssetUrl: string;
  photo: string;
}

export class RefrigeratorItem extends Refrigerator {
  @Type(() => Product)
  products: Array<Product>;

  @Type(() => Product)
  archivedProducts: Array<Product>;
}
