import React, { createContext, useState } from "react";

const UserContext = createContext({
  state: { user: null, token: null },
  actions: {
    setUser: () => {},
    setToken: () => {}
  }
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    state: { user, token },
    actions: { setUser, setToken }
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
