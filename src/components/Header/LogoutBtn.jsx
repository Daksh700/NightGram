import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth' // appwrite
import { logout } from '../../store/authSlice' // redux

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }

    return (
        <button 
            className='bg-transparent border border-[#30363d] text-[#e6edf3] px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer text-xs sm:text-sm font-medium hover:bg-[#21262d] transition-colors' 
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
