import React from 'react'
import { Navigate } from 'react-router-dom'
function AdminPublicRoutes() {
    if(localStorage.getItem('adminJWT')){
        return <Navigate to="/admin"/>
    }
    <Navigate to="/admin"/>
    return props.children
}

export default AdminPublicRoutes