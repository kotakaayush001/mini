import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [formData, setFormData] = useState({
        title: "",
        load: "",
        reps: ""
    })

    const { title, load, reps } = formData

    function handleChange(e) {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()

        if(!user) {
            setError("You must be logged in")
            return
        }

        const workout = {title, load, reps}
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }

        if(response.ok) {
            setError(null)
            setEmptyField([])
            setFormData({
                title: "",
                load: "",
                reps: ""
            })
            console.log("New Workout added", json)
            dispatch({type: "CREATE_WORKOUTS", payload: json})
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add new Workout</h3>
            <label htmlFor="title">Exercise Title:</label>
            <input 
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                value={title}
                className={emptyField.includes("title") ? "error" : ''}
            />

            <label htmlFor="load">Load (in kg):</label>
            <input 
                type="number" 
                id="load"
                name="load"
                onChange={handleChange}
                value={load}
                className={emptyField.includes("load") ? "error" : ''}
            />

            <label htmlFor="reps">Reps:</label>
            <input 
                type="number" 
                id="reps"
                name="reps"
                onChange={handleChange}
                value={reps}
                className={emptyField.includes("reps") ? "error" : ''}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm