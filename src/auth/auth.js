// import Cookies from "js-cookie";

// export const isBrowser = () => typeof window !== "undefined";
export const isAuthenticated = () => {
  return window.sessionStorage.getItem("token");
};
export const getUser = () => {
  let user = {
    email: window.sessionStorage.getItem("email"),
    token: window.sessionStorage.getItem("token"),
  };
  return user;
};

export const setUser = (email, access, token) => {
  //   Cookies.set("email", email, { expires: 365 });
  //   Cookies.set("token", token, { expires: 365 });
};
export const handleLogin = ({ username, password, Token }) => {
  if (Token) {
    return setUser(Token);
  }
  return false;
};

export const setSession = (email, token) => {
  window.sessionStorage.setItem("email", email);
  window.sessionStorage.setItem("token", token);
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user;
};

export const logout = () => {
  window.sessionStorage.removeItem("email");
  window.sessionStorage.removeItem("token");
};
