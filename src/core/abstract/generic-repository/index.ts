import { EntityManager } from "typeorm";

export abstract class IGenericRepository<T> {


  abstract findAllWithPagination(
    query?: any,
    options?: {
      useDefault?: boolean;
      selectFields?: string[] | string;
      relationFields?: string[] | string;
    }
  ): Promise<{
    data: any;
    pagination: {
      hasPrevious: boolean;
      prevPage: number;
      hasNext: boolean;
      next: number;
      currentPage: number;
      pageSize: number;
      lastPage: number;
      total: any;
    };
  }>;
  
  abstract findOne(
    key: Partial<T> | Partial<T>[],
    options?: {
      useDefault?: boolean;
      selectFields?: string[] | string;
      relationFields?: string[] | string;
      relationIds?: boolean;
    }
  ): Promise<T>;

  abstract create(
    payload: T,
    options?: { transaction?: EntityManager; useQueryBuilder?: boolean }
  ): Promise<T>;

  abstract runQuery(query: string): Promise<any>;
  abstract length(filter: Partial<T>): Promise<any>;
}
