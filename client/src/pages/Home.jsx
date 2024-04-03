import { useCallback, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import WorkoutDetail from "../components/WorkoutDetail"
import WorkoutForm from "../components/WorkoutForm"

function Home() {
    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    const fetchWorkouts = useCallback(async function() {
        const response = await fetch("/api/workouts", {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: "SET_WORKOUTS", payload: json})
        }
    }, [dispatch, user])

    useEffect(function() {
        if(user) {
            fetchWorkouts()
        }
    }, [fetchWorkouts, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetail key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home