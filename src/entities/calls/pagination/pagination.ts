import { IRequest, IResponse  } from "./interface";

class PaginationRequest<IRequestData, IFilterFields> implements IRequest<IRequestData, IFilterFields> {
    data: IRequestData;
    count: number;
    offset: number;
    filters?: IFilterFields;
    constructor(entity: IRequestData, count: number, offset: number) {
        this.data = entity;
        this.count = count;
        this.offset = offset;
    }
}

class PaginationResponse<IDataResponse> implements IResponse<IDataResponse>{
    data: IDataResponse[];
    totalCount: number;
    countPerPage: number;
    currentPage: number;
    totalPages: number;
    links: { prev?: string; next?: string };
    constructor(data: IDataResponse[], totalCount: number, countPerPage: number, offset: number) {
        this.data = data;
        this.totalCount = totalCount;
        this.countPerPage = countPerPage;
        this.currentPage = this.setCurrentPage(offset, this.countPerPage);
        this.totalPages = this.setTotalPages(this.countPerPage);
        this.links = this.setLinks(offset, countPerPage);
    }

    // calculate total pages
    setTotalPages = (countPerPage: number): number => {
        this.totalPages = Math.ceil(this.totalCount / countPerPage);
        return this.totalPages;
    };

    // calculate current page
    setCurrentPage = (offset: number, countPerPage: number): number => {
        this.currentPage = Math.floor(offset / countPerPage) + 1;
        return this.currentPage;
    };

    // generate pagination links
    setLinks = (offset: number, count: number): { prev?: string; next?: string } => {
    const links: { prev?: string; next?: string } = {};

    // Calculate next and previous page offsets based on current offset and count per page
    const nextPageOffset = offset + count;
    const prevPageOffset = offset - count;

    if (prevPageOffset >= 0) {
        links.prev = `?count=${count}&offset=${prevPageOffset}`;
    }

    if (nextPageOffset < this.totalCount) {
        links.next = `?count=${count}&offset=${nextPageOffset}`;
    }

    this.links = links;

    return this.links;
    };


}

export { PaginationRequest, PaginationResponse };