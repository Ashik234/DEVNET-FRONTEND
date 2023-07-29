import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getSingleUser } from '../../services/userApi';

function EditProfile() {
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const [data, setData] = useState([]);
  useEffect(() => {
    getSingleUser(id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div>EditProfile</div>
  )
}

export default EditProfile