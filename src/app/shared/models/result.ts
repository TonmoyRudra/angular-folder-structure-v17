import { IPagination } from './pagination';

export interface IResult {
  isSuccess: boolean;
  isInvalid: boolean;
  value: any;
  values: any[];
  statusCode: number;
  errors: [];
  error: string;
  details: string;
  pagination: IPagination;
}

// export interface IResult{
//     isSuccess: boolean;
//     isInvalid: boolean;
//     values: [];
//     statusCode: number;
//     errors: [],
//     details: string,
//     pagination: IPagination
// }
