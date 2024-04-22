export interface TokenResponse {
  bearer: string;
}

export interface TokenRequest {
  username: string;
  password: string;
}