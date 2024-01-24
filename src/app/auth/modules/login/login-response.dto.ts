export interface LoginResponseDto {
    email: string;
    token: string;
    expireOnInSeconds: number;
}