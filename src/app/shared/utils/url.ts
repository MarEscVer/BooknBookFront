import { HttpParams } from "@angular/common/http";

export const getQueryParams = (url: string): HttpParams => {
  if (url.includes('?')) {
    const [params] = url.split('?').slice(-1);
    return new HttpParams({ fromString: params });
  }
  return new HttpParams();
}

export const getQueryParamValue = (url: string, paramName: string): string => {
  return getQueryParams(url).get(paramName) || '';
}

