import { createContext } from "react";
import { User } from "../model/User";

export const UserContext = createContext<User>({
    id: 0,
    nome: ''
});