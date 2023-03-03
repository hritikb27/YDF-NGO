import { useReducer } from "react";
import Router from "next/router";

const initialTodos = {
    email: '',
    password: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case "email":
            return {
                ...state,
                email: action.payload
            }
        case "password":
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
};

const Login = () => {
    const [form, dispatch] = useReducer(reducer, initialTodos);

    const handleClick = async () => {
        const sendreq = await fetch('https://yogdhyaan-ngo.onrender.com/admin/login', {method:'post', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({ 'email': form.email, 'password': form.password })})
        const res = await sendreq.json()
        sessionStorage.setItem('token', res.token)
        console.log(res)
        Router.push('/')
    }

    return(
        <div className="h-full">
            <div class="h-full container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="flex flex-col items-center bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Login</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => dispatch({type: 'email', payload: e.target.value})} />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => dispatch({type: 'password', payload: e.target.value})} />

                    <button
                        type="submit"
                        onClick={handleClick}
                        class="w-[50%] text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>

                </div>

                <div class="text-grey-dark mt-6">
                    Don't have an account? 
                    <a class="pl-1 no-underline border-b border-blue text-blue" href="/signup">
                        Signup
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Login;