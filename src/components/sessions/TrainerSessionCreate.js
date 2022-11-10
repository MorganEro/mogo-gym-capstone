import { useState } from "react"

export const TrainerSessionCreate = ({getAllSessions}) => {

    const [session, setSession]=useState ({
        dayOfWeek: "",
        time: ""
    })

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)

    
    const handleAddSessionButtonClick = (event) => {
        event.preventDefault()

        const sessionToPutInApi ={
            
            day: session.dayOfWeek,
            time: session.time,
            trainerId: mogoUserObject.id
        }
   
            return fetch("http://localhost:8088/trainerSessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sessionToPutInApi)                  
            })
                .then(response => response.json())
                .then((data) => {
                    getAllSessions(data)
                })
                .then(
                    setSession({
                        dayOfWeek: "",
                        time: ""
                    })
                )
               
    }

    return (
            <div className="pl-10">
                <form className="flex-column form--login text-2xl mt-32">
                    <h2  className="underline text-3xl pt-7">Session Create Form</h2>
                    <div>&nbsp;</div>
                    <fieldset>
                        <div className= "form-group">
                            <label htmlFor="dayOfWeek">Day: </label>
                            <input
                                required autoFocus
                                type= "text"
                                className= "text-black pl-3 rounded-sm placeholder:text-slate-300"
                                placeholder="   Ex: Monday"
                                value = {session.dayOfWeek}
                                onChange = {
                                    (event) => {
                                        const copy ={...session}
                                        copy.dayOfWeek = event.target.value
                                        setSession(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
                    <div>&nbsp;</div>
                    <fieldset>
                        <div className= "form-group">
                            <label htmlFor="time">Time: </label>
                            <input
                                required autoFocus
                                type= "time"
                                className= "text-black pl-3 rounded-sm placeholder:text-slate-300"
                                placeholder="  Ex: 5:00PM"
                                value = {session.time}
                                onChange = {
                                    (event) => {
                                        const copy ={...session}
                                        copy.time = event.target.value
                                        setSession(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
                    <div>&nbsp;</div>
                    <button
                        onClick={(clickEvent) => handleAddSessionButtonClick(clickEvent)} 
                        className="bg-pink-brown rounded-md border-2 w-[150px] font-medium text-black">
                        Add Session
                    </button>
                </form>       
            </div>
    )
}