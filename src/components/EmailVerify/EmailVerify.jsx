import React, { useState, useEffect } from 'react'
import success from "../../assets/success.png"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams()

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8000/${params.id}/verify/${params.token}`
                const { data } = await axios.get(url)
                console.log(data);
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                setValidUrl(false)
            }
        }
        verifyEmailUrl()
    },[params])
    return (
        <>
            {validUrl ? (
                <div className="flex justify-center items-center flex-col">
                    <img src={success} alt="success_img" className=""/>
                    <h1>Email Verified Successfully</h1>
                    <Link to="/">
                        <button className="">HOME</button>
                    </Link>
                </div>
            ): (
                    <h1>404 Not Found</h1>
            )}
        </>
    )
}