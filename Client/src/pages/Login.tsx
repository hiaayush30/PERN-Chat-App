import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FormEvent, useState } from "react";

const Login = () => {
	const { loading, login } = useLogin();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e:FormEvent) => {
		e.preventDefault();
		login({ username, password });
	}
	return (
		<div className='flex min-h-screen flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='p-6 rounded-lg shadow-md bg-gray-100/20 backdrop-opacity-90 backdrop-blur-xl'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input value={username} onChange={e => setUsername(e.target.value)}
							type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							value={password} onChange={e => setPassword(e.target.value)}
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button disabled={loading}
							className='btn btn-block btn-sm mt-2'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;