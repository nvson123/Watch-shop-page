export type Coupon = {
  code: string;
  discount: number;
  minOrder: number;
  expirationDate: string;
  startDate: string;
  maxDiscountAmount: number; 
  isActive: boolean;
  isFreeShipping: boolean;
  }
  
  type CouponParams = {
    page?: number;
    limit?: number; 
    isActive?: boolean; 
    search?: string; 
  }
  
  type MetaData = {
    totalItems: number;
    totalPages: number;
    currentPage: number; 
    pageSize: number; 
  }
  