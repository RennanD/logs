import { useState, useContext, ReactNode, createContext } from 'react';

type SingInProps = {
  email: string;
  password: string;
};

type Role = {
  title: string;
  slug: string;
  permissions: string[];
};

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
};

interface AuthContextData {
  user: User;
  singIn: (singInData: SingInProps) => Promise<void>;
  // token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>({} as User);

  async function handleSingIn({ email, password }: SingInProps) {
    console.log({ email, password });
  }

  return (
    <AuthContext.Provider value={{ user, singIn: handleSingIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
