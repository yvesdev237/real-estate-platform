import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../libs/database'


const ResetPassword = () => {
    const [email , setEmail] = useState('')
    const reset = async() => {
        try {
            const {data , error} = await db.auth.resetPasswordForEmail({email})
            if (error) {
                toast.error(error)
                return;
            }
            setEmail(data)
        } catch (err) {
            toast.error(err)
        }
    }
  return (
    <div>
        <button onClick={reset}>reset</button>
    </div>
  )
}

export default ResetPassword