import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { FormEvent, useState } from "react";
import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const handleCheckboxChange = (gender: 'male' | 'female' | '') => {
    setInputs({ ...inputs, gender })
  }

  const { loading, signup } = useSignup();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const key of Object.keys(inputs) as (keyof typeof inputs)[]) {
      if (inputs[key].trim() === '') {
        return toast.info(key + " cannot be empty!");
      }
    }
    if(inputs.username.trim().length<4){
      return toast.info('username should atleast have 4 characters')
    }
    if(inputs.password.trim().length<4){
      return toast.info('Password should atleast have 4 characters')
    }
    if (inputs.password !== inputs.confirmPassword) {
      return toast.info('Passwords do not match!');
    }
    await signup(inputs);
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div
        className='p-6 rounded-lg shadow-md bg-gray-100/20 backdrop-opacity-80 backdrop-blur-xl'>
        <h1 className='text-3xl font-semibold text-center text-gray-100'>
          Sign Up <span className='text-blue-500 bg-slate-200 rounded-xl p-1 mx-2
          '> Chatify</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input value={inputs.fullname} onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }}
              type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input value={inputs.username} onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }}
              type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }}
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
              value={inputs.confirmPassword} onChange={(e) => { setInputs({ ...inputs, confirmPassword: e.target.value }) }}
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <fieldset className="border-1 px-2 rounded-md">
            <legend>Gender</legend>
            <GenderCheckbox handleCheckboxChange={handleCheckboxChange} gender={inputs.gender} />
          </fieldset>

          <Link
            to={"/login"}
            className='text-sm hover:underline hover:text-sky-300 mt-2 inline-block text-white'
          >
            Already have an account?
          </Link>

          <div>
            <button disabled={loading}
              type="submit"
              className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;