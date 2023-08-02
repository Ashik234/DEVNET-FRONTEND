import React from 'react'
import { Navigate } from 'react-router-dom'
function AdminPublicRoutes(props) {
    if(localStorage.getItem('adminJWT')){
        return <Navigate to="/admin"/>
    }
    <Navigate to="/admin/login"/>
    return props.children
}

export default AdminPublicRoutes