import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { IUser } from '../types/auth.types';
import type { ITask } from '../types/task.types';

interface UserContextType {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  users: [],
  setUsers: () => {},
  tasks: [],
  setTasks: () => {},
});