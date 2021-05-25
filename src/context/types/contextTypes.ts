export type AuthContextState = {
  token: string;
  setToken: (token: string) => void;
  user: { firstName: string; lastName: string };
  setUser: (token: any) => void;
};
