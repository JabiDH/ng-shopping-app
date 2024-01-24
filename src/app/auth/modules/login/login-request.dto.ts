export interface LoginRequestDto {
  email: string;
  password: string;
  ExpireOnInSeconds?: number;
}
