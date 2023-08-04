import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isUserAuth } from "../services/userApi";
import { isAdminAuth } from "../services/adminApi";

function PrivateRoutes({ role, route }) {
  const [verify, setVerify] = useState(null);
  useEffect(() => {
    if (role === "user") {
      isUserAuth()
        .then((res) => {
          setVerify(res.data.success);
        })
        .catch((err) => {
          setVerify(false);
          localStorage.removeItem("userJWT");
          console.log(err);
        });
    }else if(role==="admin"){
      isAdminAuth()
      .then((res)=>{
        setVerify(res.data.success)
      })
      .catch((err) => {
        setVerify(false);
        localStorage.removeItem("adminJWT");
        console.log(err);
      });
    }
  }, []);
  if (verify == null) return;
  return verify ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoutes;
