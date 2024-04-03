import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { login, error, isLoading } = useLogin()

    const { email, password } = formData

    function handleChange(e) {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit} action="">
            <h3>Log in</h3>

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={handleChange}
            />

            <button type="submit" disabled={isLoading}>Log In</button>
            { error && <div className="error">{error}</div> }
        </form>
    )
}

export default Login