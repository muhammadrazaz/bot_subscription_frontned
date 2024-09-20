import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userDetail, setUserDetail_] = useState(JSON.parse(localStorage.getItem('user')))
  const [loader, setLoader] = useState(false)

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUserDetail = (newData) => {
    setUserDetail_(newData);
  };




  useEffect(() => {
    axios.defaults.baseURL = 'http://143.244.180.220:8001/api';
    // axios.defaults.baseURL = 'http://127.0.0.1:8001/api';
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    if (token) {
      setTimeout(() => {
        setLoader(true)
        localStorage.setItem('token', token);

        axios.get("user/")
          .then(response => {

            // setUserDetail(response.data)
            setLoader(false)
            console.log(response)
            setUserDetail(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
          }).catch(error => {
            console.log(error)
            if (error.response.status === 401) {
              setUserDetail({})
              delete axios.defaults.headers.common["Authorization"];
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              setToken('')

            }
            setLoader(false)
          })
      }, 2000)


    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token]);










  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userDetail,
      setUserDetail,
      loader,
      setLoader,
    }),
    [token, userDetail, loader]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;