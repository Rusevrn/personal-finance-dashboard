import { useContext } from "react";
import { FiZap } from "react-icons/fi";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router';
import useForm from "../hooks/useForm";
import { useState } from "react";

const Login = () => {
    const { loginHandler } = useContext(UserContext);
    const navigate = useNavigate();
    const [action, setAction] = useState('login');

    const requiredFields = action === 'login' ? ['email', 'password'] : ['email', 'password', 'currentBalance'];

    const onLogin = async () => {
        try {
            await loginHandler(action, values);
            navigate('/app');
        } catch (error) {
            console.log(error.message)
        }
    };

    const { values, submitAction, getInputProps, touched, errors, submitted, } = useForm({ email: '', password: '', currentBalance: '' }, requiredFields, onLogin);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1f2028] px-4 py-10 pb-30">
            <div className="flex w-full max-w-97 flex-col items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-2xl border border-violet-400/20 bg-[#292735]">
                    <FiZap className="text-3xl text-violet-400" />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome</h1>
                    <p className="mt-1 text-sm text-[#a6a3b3]">Your finances, in focus.</p>
                </div>

                <form action={submitAction} className="w-full space-y-5 rounded-2xl border border-white/10 bg-[#25242f] p-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#d5d2df]">Email address</label>
                        <input
                            id="email"
                            type="email"
                            {...getInputProps('email')}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-[#484552] bg-[#1f2028] px-3 py-3 text-sm text-white outline-none transition placeholder:text-[#777483] focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30"
                        />
                    </div>
                    {(touched.email || submitted) && errors.email && (
                        <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-sm text-red-300">
                            {errors.email}
                        </p>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-[#d5d2df]">Password</label>
                        <div className="flex items-center rounded-lg border border-[#484552] bg-[#1f2028] pr-3 transition focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-400/30">
                            <input
                                id="password"
                                type="password"
                                {...getInputProps('password')}
                                placeholder="Enter your password"
                                className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#777483]"
                            />
                        </div>
                    </div>
                    {(touched.password || submitted) && errors.password && (
                        <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-sm text-red-300">
                            {errors.password}
                        </p>
                    )}

                    {action === 'register' &&
                        <>
                            <div className="space-y-2">
                                <label htmlFor="balance" className="block text-sm font-medium text-[#d5d2df]">Balance</label>
                                <div className="flex items-center rounded-lg border border-[#484552] bg-[#1f2028] pr-3 transition focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-400/30">
                                    <input
                                        id="balance"
                                        type="number"
                                        {...getInputProps('currentBalance')}
                                        placeholder="Enter your balance"
                                        className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#777483]"
                                    />
                                </div>
                            </div>
                            {(touched.currentBalance || submitted) && errors.currentBalance && (
                                <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-sm text-red-300">
                                    {errors.currentBalance}
                                </p>
                            )}
                        </>
                    }

                    <button className="w-full rounded-lg bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        type="submit">{action === 'login' ? 'Log in' : 'Register'}</button>

                    {action === 'login'
                        ? <p className="text-center text-sm text-[#a6a3b3]">
                            New to Zzap?{" "}
                            <button type="button" onClick={() => setAction(action => action === 'login' ? 'register' : 'login')} className="font-medium text-violet-300 transition hover:text-violet-200">
                                Create an account
                            </button>
                        </p>
                        : <p className="text-center text-sm text-[#a6a3b3]">
                            Already have an account?{" "}
                            <button type="button" onClick={() => setAction(action => action === 'login' ? 'register' : 'login')} className="font-medium text-violet-300 transition hover:text-violet-200">
                                Login
                            </button>
                        </p>
                    }

                </form>
            </div>
        </div>
    );
};

export default Login;