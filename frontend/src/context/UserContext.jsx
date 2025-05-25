import React from 'react'
import { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();

const UserProvider = ({ children }) => {
  const [currUser, setcurrUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setcurrUser(userData);
  }, []);

  const update = (data) => {
    setcurrUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;


