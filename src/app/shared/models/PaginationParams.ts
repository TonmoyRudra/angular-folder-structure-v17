export class EmployeePaginationParams {
  pageIndex = 1;
  pageSize = 10;
  HR_EmployeeID?: number;
  HR_EmployeeName?: string;
  SF_ID?: string;
  HR_DeptIDs?: string;
  ShowInactive?: boolean = false;
  Email?: string;
  ShowProcessForLPR?: boolean = false;
  PlaceOfPostingBM_ItemIDUsers?: string;
  search?: string;
  BM_BranchID?: number;
  GrandeBM_ItemIDUsers?: number;
  EmployeeFileLocationBM_ItemIDUsers?: number;
  GroupId?: number;
}

export class EmailOnlineAppruverPaginationParams {
  pageIndex = 1;
  pageSize = 10;
  HR_EmployeeID?: number; 
  HR_DeptID?: number; 
  PlaceOfPostingBM_ItemIDUser?: number; 
  search?: string;   
}
