import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";

const SignUp = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div 
      className='p-6 rounded-lg shadow-md bg-gray-100/20 backdrop-opacity-80 backdrop-blur-xl'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <fieldset className="border-1 px-2 rounded-md">
            <legend>Gender</legend>
            <GenderCheckbox />
          </fieldset>

          <Link
            to={"/login"}
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
          >
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;