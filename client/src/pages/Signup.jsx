import { useState } from "react"
import { useSignup }from "../hooks/useSignup"

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { signup, error, isLoading } = useSignup()

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

        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit} action="">
            <h3>Sign Up</h3>

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

            <button type="submit" disabled={isLoading} >Sign Up</button>
            { error && <div className="error">{error}</div> }
        </form>
    )
}

export default Signup