import { createContext } from "react";
import { User } from "../App";

type DefaultValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const defaultValue: DefaultValue = {
  user: { token: "" },
  setUser: (user: User | null) => {
    console.log(user);
  },
};

export const AuthContext = createContext(defaultValue);
