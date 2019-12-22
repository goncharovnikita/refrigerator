import FirebaseService, { Database } from "./firebase";
import { HttpService } from "./http-service";
import {
  Refrigerator,
  Product,
  RefrigeratorItem,
  toRefrigerator,
  toRefrigeratorItem,
  toProductsList,
    toProduct,
} from "../models";

import { Observable, Subject, of } from "rxjs";

interface RefrigeratorsListChunk {
  iconAssetUrl: string;
  key: string;
  name: string;
  photo: string;
}

interface ProductsListChunk {
  created: Date;
  movedToRef: Date;
  name: string;
  shelfLife: Date;
}

type RefrigeratorsListResult = { [key: string]: RefrigeratorsListChunk };
type ProductsListResult = { [key: string]: ProductsListChunk };

const mapRefrigerators = (v: RefrigeratorsListResult): Refrigerator[] => {
  return Object.keys(v).map(key => toRefrigerator({ ...v[key], id: key }));
};

const mapProducts = (v: ProductsListResult): Product[] => {
  return Object.keys(v || {}).map(key => toProduct({ ...v[key], id: key }));
};

export default class RefrigeratorsService {
  private db: Database;

  constructor(
    private http: HttpService,
    private firebaseService: FirebaseService
  ) {
    this.db = firebaseService.getDatabase();
  }

  getRefrigeratorsList(userId: string): Observable<Refrigerator[]> {
    return Observable.create(lis => {
      const ref = this.getRefrigeratorsRef(userId);

      ref.on("value", v => {
        const val: RefrigeratorsListResult = v.val();
        lis.next(mapRefrigerators(val));
      });

      return () => {
        ref.off();
        lis.next([]);
        lis.complete();
      };
    });
  }

  getRefrigerator(userId: string, id: string): Observable<RefrigeratorItem> {
    return Observable.create(lis => {
      const ref = this.getRefrigeratorRef(userId, id);

      ref.on("value", v => {
        const val = toRefrigeratorItem(v.val());
        lis.next(val);
      });

      return () => {
        ref.off();
        lis.complete();
      };
    });
  }

  getRefrigeratorProducts(
    userId: string,
    refId: string
  ): Observable<Product[]> {
    return Observable.create(lis => {
      const ref = this.getRefrigeratorProductsRef(userId, refId);

      ref.on("value", v => {
        const val: ProductsListResult = v.val();
        lis.next(mapProducts(val));
      });

      return () => {
        ref.off();
        lis.complete();
      };
    });
  }

  createProduct(userId: string, refId: string, product: object) {
    this.getRefrigeratorProductsRef(userId, refId).push(product);
  }

  createRefrigerator(userId: string, ref: object): void {
    this.getRefrigeratorsRef(userId)
      .push()
      .set(ref);
  }

  createRefrigeratorByName(userId: string, name: string): void {
    this.createRefrigerator(userId, { name });
  }

  private getRefrigeratorsRef(userId: string): any {
    return this.firebaseService.getDbRef(`/refrigerators/${userId}`, this.db);
  }

  private getRefrigeratorRef(userId: string, id: string): any {
    return this.firebaseService.getDbRef(
      `/refrigerators/${userId}/${id}`,
      this.db
    );
  }

  private getRefrigeratorProductsRef(userId: string, id: string): any {
    return this.firebaseService.getDbRef(
      `/refrigerators/${userId}/${id}/products`,
      this.db
    );
  }
}
