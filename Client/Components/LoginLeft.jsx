import React from 'react'

const LoginLeft = () => {
  return (
    <div className=" hidden lg:flex bg-[url('/bg-img.png')] bg-cover lg:w-2/5 h-screen select-none bg-center bg-no-repeat flex-col justify-between p-12 shrink-0 ">
      <div className='flex items-center gap-3 '>
        <img src="/logo.svg" alt="logi" className=' size-9.5'/>
        <span className=' bg-linear-to-r from-blue-500 via-cyan-900 to-amber-800 bg-clip-text text-transparent text-2xl font-bold'>
          Builder AI
        </span>
      </div>
      <div>
        <h2 className='font-medium text-2xl mb-7 bg-linear-to-r from-red-300 via-cyan-700 to-amber-600 bg-clip-text text-transparent'>Build your presence on web</h2>
        <p className=' text-sm mb-14 text-white tracking-wide' >Describe what you need,preview instantly, and customize your site in real-time. React with clean JSX, verified layouts, and instant code exports.</p>
        <p className='text-sm text-zinc-400'> @Coyright {new Date().getFullYear()} BuilderAI </p>
      </div>
    </div>
  )
}

export default LoginLeft