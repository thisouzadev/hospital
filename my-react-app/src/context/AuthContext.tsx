import { createContext, useContext, ReactNode, useState } from "react";

type Hospital = {
  hospitalId: string;
  nome: string;
  endereco: string;
  deletedAt: string | null;
};

type Employee = {
  employeeId: string;
  name: string;
  cpf: string;
  rg: string;
  active: boolean;
  hospitalId: string;
  createdAt: string;
  updatedAt: string;
  leftAt: string | null;
  hospital: Hospital;
};

type User = {
  userId: string;
  role: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  employee: Employee;
  stayLoggedIn: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: User | null) => {}, // Placeholder function
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const value: AuthContextType = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
