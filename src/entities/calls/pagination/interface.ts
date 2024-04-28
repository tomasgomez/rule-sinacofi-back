
/*
    This file contains the interfaces for pagination
*/

interface IRequest<IRequestData, IFilterFields> {
    data: IRequestData; // Request data
    count: number; // Number of items to return
    offset: number; // Number of items to skip
    filter?: IFilterFields; // Filter fields
}

interface IResponse<IDataResponse> {
    data: IDataResponse[]; // Data response
    totalCount: number; // Total number of items
    countPerPage: number; // Number of items per page
    currentPage: number; // Current page
    totalPages: number; // Total number of pages
    links: { prev?: string; next?: string }; // Links to previous and next pages

    setLinks(offset: number, count: number): { prev?: string; next?: string }; // Function to generate pagination links
}

export { IRequest, IResponse };