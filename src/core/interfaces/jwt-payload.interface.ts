export interface JwtPayload {
  id: number;
  role: string;
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}
