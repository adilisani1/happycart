import React, { useState } from 'react'
import './loginPopup.css';
import { GrClose } from 'react-icons/gr';

const LoginPopup = ({ setShowLogin }) => {



    const [currentState, setCurrentState] = useState('Sign up');
    return (
        <div className='login-popup'>
            <form className='login-popup-container'>

                <div className=' flex items-center justify-between mb-2 mt-2'>
                    <h2 className='login-popup-title'>
                        {currentState}
                    </h2>

                    <GrClose className='cursor-pointer' onClick={() => setShowLogin(false)} />
                </div>

                <div className='login-popup-inputs'>
                    {currentState === 'Sign up' && <input className=" border mb-2 mt-2 border-gray-300 py-2.5 px-3 rounded-md w-full" type='text' placeholder='Username' />}
                    <input className=" border mb-2 mt-2 border-gray-300 py-2.5 px-3 rounded-md w-full" type='email' placeholder='Email' />
                    <input className=" border mb-2 mt-2 border-gray-300 py-2.5 px-3 rounded-md w-full" type='password' placeholder='Password' />
                </div>
                <button className='w-full mb-4 mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2.5 rounded-md' type='submit'>
                    {currentState === 'Sign up' ? 'Create account' : 'Login'}
                </button>
                {currentState === "Login"
                    ? <p className='text-gray-500 font-normal'>Create a new account? <span className='cursor-pointer font-semibold text-blue-500' onClick={() => setCurrentState('Sign up')}>Sign up</span></p>
                    : <p className='text-gray-500 font-normal'>Already have an account? <span className='cursor-pointer font-semibold text-blue-500' onClick={() => setCurrentState('Login')}>Login</span></p>
                }
            </form >
        </div >

    )
}

export default LoginPopup;