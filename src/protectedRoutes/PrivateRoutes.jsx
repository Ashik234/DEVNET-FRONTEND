import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isUserAuth } from "../services/userApi";

function privateRoutes({ role, route }) {
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
    }
  }, []);
  if (verify == null) return;
  return verify ? <Outlet /> : <Navigate to={route} />;
}

export default privateRoutes;
