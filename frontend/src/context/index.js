// import { createContext} from "react";
// const Context = createContext(null)

// export default Context
import { createContext } from "react";
import { useContext } from "react";


const Context = createContext({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(Context);




export default Context;
