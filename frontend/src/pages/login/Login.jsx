/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext , useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { UserContext} from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import api from '../../services/authUserAPI'
import Swal from 'sweetalert2'

const Login = () => {

    document.title = 'Login'

    let history = useHistory()

    // เรียกใช้งาน Context
    const {user, setUser} = useContext(UserContext)
    console.log("user", user)

    // เรียกใช้งาน React Hook From
    const { register, handleSubmit, errors } = useForm()

    // ฟังก์ชันหลังจาก Submit form
    const onSubmit = (data) => {
        // console.log(data)

        const authData = {
            "identifier": data.email,
            "password": data.password
        }

        // เรียก API Login
        api.authLogin(authData).then(res => {
            console.log(res)

            // Set Context
            setUser(res)

            // เก็บ Token ลง LocalStorage
            localStorage.setItem("token", res.data.jwt)

            // Redirect ไปหน้า dashboad
            history.push('/dashboard')

        }).catch(error => {
            // console.log(error)
            if(error.response.status === 400){
                Swal.fire({
                    icon: 'error',
                    text: 'ข้อมูลเข้าระบบไม่ถูกต้อง ลองใหม่',
                    confirmButtonText: 'ปิดหน้าต่าง'
                })
            }
        })
    }

    return (
        
        <div className="flex h-screen bg-indigo-700">

           <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">   

            {/* header */}
            <header className="mb-6">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-12 h-12 text-white p-2 bg-indigo-500 rounded-full mx-auto"
                viewBox="0 0 24 24"
                >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </header>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="email">Email</label>
                    <input className="w-full p-2 mb-3 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" 
                    type="email"
                    id="email"
                    name="email" 
                    ref={register({required: true})}
                    />
                    {errors.email && <p className="text-red-500 mb-6">กรุณาป้อนอีเมล์ก่อน</p>}
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
                    <input className="w-full p-2 mb-3 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" 
                    type="password"
                    id="password" 
                    name="password"
                    ref={register({required: true})}
                    />
                    {errors.password && <p className="text-red-500 mb-6">กรุณาป้อนรหัสผ่านก่อน</p>}
                </div>
                <div>          
                    <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Login" />
                </div>       
            </form>

            {/* footer */}
            <footer>
                <NavLink className="text-indigo-700 hover:text-pink-700 text-sm float-left" to="/forgotpassword">Forgot Password?</NavLink>
                <NavLink className="text-indigo-700 hover:text-pink-700 text-sm float-right" to="/register">Create Account</NavLink>
            </footer> 
            </div>

        </div>

    )
}

export default Login
