export interface ErrorHttp {
  appError: string;
  httpCode: number;
  shortDescription: string;
  largeDescription: string;
  isTrusted: boolean;
}