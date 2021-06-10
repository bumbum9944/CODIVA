import React, { createContext, useState } from "react";

const UserContext = createContext({
  state: { user: null, token: null, header: null },
  actions: {
    setUser: () => {},
    setToken: () => {},
    setHeader: ()=> {}
  }
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [header, setHeader] = useState(null);

  const value = {
    state: { user, token, header },
    actions: { setUser, setToken, setHeader }
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
