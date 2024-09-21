'use client'
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter()

    return(<>
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <a href="javascript:void(0)"><img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-40 inline-block' />
          </a>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input name="email" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter email" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Username</label>
              <input name="Username" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter username" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter password" />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter confirm password" />
            </div>
          </div>

          <div className="!mt-12">
            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:text-gray-500 hover:underline ml-1" onClick={() => router.push('/login')}>Login here</a></p>
        </form>
      </div>
    </div>
    </>)
}