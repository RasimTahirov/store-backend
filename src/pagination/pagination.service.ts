import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate<T>(data: T[], totalCount: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedData = data.slice(skip, skip + limit);

    return {
      data: paginatedData,
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        totalCurrentItem: paginatedData.length,
      },
    };
  }
}
