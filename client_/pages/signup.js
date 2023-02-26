import { useReducer } from "react";
import Router from "next/router";

const initialTodos = {
    name: '',
    email: '',
    password: '',
    confirm_pass: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case "name":
            return {
                ...state,
                name: action.payload
            }
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
        case "confirm_pass":
            return {
                ...state,
                confirm_pass: action.payload
            }
        default:
            return state;
    }
};

const Signup = () => {
    const [form, dispatch] = useReducer(reducer, initialTodos);

    const handleClick = async () => {
        const sendreq = await fetch('http://localhost:8080/admin/add', {method:'post', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({ 'name': form.name, 'email': form.email, 'password': form.password })})
        console.log(sendreq)
        Router.push('/login')
    }

    return (
        <div className="h-full">
            <div class="h-full container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="flex flex-col items-center justify-center bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => dispatch({type: 'name', payload: e.target.value})} />

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
                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={form.confirm_pass}
                        onChange={(e) => dispatch({type: 'confirm_pass', payload: e.target.value})} />

                    <button
                        type="submit"
                        onClick={handleClick}
                        class="w-[50%] text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?
                    <a class="pl-1 no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Signup;