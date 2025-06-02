
import { useNavigate } from '@tanstack/react-router';
import imgCart from '../../assets/images/cart_trong.jpg';
const ErrorCart = () => {
    const navigate = useNavigate();
    return (
        <div className="m-auto max-w-6xl p-10 text-center">
            <div className='flex justify-center'>
                <img src={imgCart} alt="Giỏ hàng trống" />
            </div>
            <h2 className="mb-5 text-xl font-bold">Giỏ hàng của bạn trống!</h2>
            <div className='flex gap-5 justify-center items-center'>
                <button
                    onClick={() => navigate({ to: '/shop' })}
                    className="rounded-2xl border border-gray-400 bg-blue-500 text-white px-6 py-2 hover:bg-black"
                >
                    Mua sắm ngay
                </button>
            </div>
        </div>
    )
}

export default ErrorCart