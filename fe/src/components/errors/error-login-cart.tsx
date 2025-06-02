import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import imgCart from '../../assets/images/cart_trong.jpg';
const LoginCart = () => {
    const navigate = useNavigate();
    return (
        <div className="m-auto max-w-6xl p-10 text-center">
            <div className='flex justify-center'>
                <img src={imgCart} alt="" />
            </div>
            <h2 className="mb-5 text-xl font-bold">Giỏ hàng của bạn trống!</h2>
            <div className='flex gap-5 justify-center items-center'>
                Bạn cần phải đăng nhập!
                <button
                    onClick={() => navigate({ to: '/login' })}
                    className="rounded-2xl text-white border border-gray-300 bg-blue-500 px-6 py-2 hover:bg-black"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    )
}

export default LoginCart