import React from 'react';
import Appleimg from './assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Apple icon.svg';
import Googleimg from './assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Googleicon.svg';
import Coinbaseimge from './assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/download.svg';



const SignUp = ({setEmail,setPassword,handleSignupsubmit,error,email,password,loading,success}) => {
 



  return (
    <div className='max-h-screen w-full bg-black p-4 font-bold '>
      {/* Logo at top */}
      <div className='pt-4 pl-4'>
        <img src={Coinbaseimge} alt="Coinbase" className='w-8 h-8' />
      </div>

      {/* Form centered on page */}
      <div className='flex items-center justify-center  mt-8 min-h-[calc(100vh-80px)]'>
        <form onSubmit={handleSignupsubmit} className='flex flex-col w-full max-w-md'>
          {/* Heading */}
          <div className='mb-6 '>
            <h1 className='text-3xl font-bold text-white mb-2'>Create your account</h1>
            <h2 className='text-gray-400'>Access all that Coinbase has to offer with a single account.</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm'>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className='mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm'>
              Account created successfully!
            </div>
          )}

          {/* Email Input */}
          <div className='w-full mb-4'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-1'>
              Email 
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Frimpong22235616@gmail.com'
              className='w-full h-15 px-4  border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
              required
            />
          </div>

          {/* Password Input */}
          <div className='w-full mb-4'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-300 mb-1'>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Create a password'
              className='w-full h-15 px-4  border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className='w-full h-16 mt-4 bg-[#283e6c] hover:opacity-50 black rounded-[25px] font-semibold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating Account...' : 'Continue'}
          </button>

          {/* Divider */}
          <div className='flex items-center w-full my-6'>
            <div className='flex-1 border-t border-gray-600'></div>
            <span className='px-4 text-gray-400 text-sm'>OR</span>
            <div className='flex-1 border-t border-gray-600'></div>
          </div>

          {/* Google Sign Up */}
          <button type="button" className='w-full h-15 border bg-[#282b31] border-gray-600 rounded-[35px] font-bold  hover:bg-gray-800 text-white flex items-center justify-center gap-2'>
            <img src={Googleimg} alt=""className='w-6 h6' />
          Sign Up with Google
          </button>
          <button type="button" className='w-full h-15 border bg-[#282b31] border-gray-600 rounded-[25px] font-bold  hover:bg-gray-800 text-white flex items-center justify-center gap-2 mt-3'>
            <img src={Appleimg} alt="" className='w-6 h-6' />
            Sign Up with Apple
          </button>

        

          {/* Login Link */}
          <p className='text-center mt-6 text-white'>
            Already have an account?{' '}
            <a href="signin" className='text-blue-400 hover:underline font-medium'>
              Sign in
            </a>
          </p>
            {/* Terms */}
            <p className='text-xs text-gray-500 text-center mt-6'>
            By creating an account you certify that you are over the age of 18 and agree to our Privacy Policy and Cookie Policy.
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
