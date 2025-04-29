// import { createContext} from "react";
// const Context = createContext(null)

// export default Context
import { createContext } from "react";

const Context = createContext({
  user: null,
  setUser: () => {},
});

export default Context;
