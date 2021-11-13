import { useState, useContext, ReactNode, createContext } from 'react';
import { AxiosError } from 'axios';
import { api } from '../services/api';

type AxiosErrorResponse = {
  error: string;
};

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
  signIn: (singInData: SingInProps) => Promise<void>;
  singOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AxiosResponse {
  user: User;
  token: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>(() => {
    const storagedUser = localStorage.getItem('@log-monitor:user');

    if (!storagedUser) {
      return {} as User;
    }

    const token = localStorage.getItem('@log-monitor:token');

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    return JSON.parse(storagedUser);
  });

  async function handleSingIn({ email, password }: SingInProps) {
    try {
      const response = await api.post<AxiosResponse>('/sessions', {
        email,
        password,
      });

      const { user: dataUser, token } = response.data;

      localStorage.setItem('@log-monitor:user', JSON.stringify(dataUser));
      localStorage.setItem('@log-monitor:token', token);

      setUser(dataUser);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
    } catch (error) {
      const { response } = error as AxiosError<AxiosErrorResponse>;

      throw new Error(response?.data.error);
    }
  }

  function handleSignOut() {
    localStorage.removeItem('@log-monitor:user');
    localStorage.removeItem('@log-monitor:token');

    setUser({} as User);
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn: handleSingIn, singOut: handleSignOut }}
    >
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
