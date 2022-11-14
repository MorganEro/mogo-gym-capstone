import { useState } from "react"

export const TrainerSessionCreate = ({getAllSessions}) => {

    const [session, setSession]=useState ({
        dayOfWeek: "--Choose a day--",
        time: ""
    })

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    
    const handleAddSessionButtonClick = (event) => {
        event.preventDefault()
        let correctTime = ""
        const actualTime= session.time.split(/[.:]/)
        if (actualTime[0] <= 12) {
            correctTime = actualTime[0] + ":" + actualTime[1] + "AM"
            } else 
            {
            const hour = actualTime[0]- 12
            const minute = actualTime[1]
            correctTime = hour + ":" + minute + "PM"
                                        }

        const sessionToPutInApi ={

            day: session.dayOfWeek,
            time: correctTime,
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
                            <label htmlFor="dayOfWeek"> Day: </label>
                            <select
                                required autoFocus
                                className= "text-black pl-3 rounded-sm"
                                id="day-select"
                                value= {session.dayOfWeek}
                                onChange = {
                                    (event) => {
                                        setSession({dayOfWeek: event.target.value})
                                    }} >
                                <option id="0" value= "--Choose a day--">--Choose a day--</option>
                                <option id="1" value= "Monday"> Monday</option>
                                <option id="2" value= "Tuesday"> Tuesday</option>
                                <option id="3" value= "Wednesday"> Wednesday</option>
                                <option id="4" value= "Thursday"> Thursday</option>
                                <option id="5" value= "Friday"> Friday</option>
                                <option id="6" value= "Saturday"> Saturday</option>
                                <option id="7" value= "Sunday"> Sunday</option>                            
                            </select>
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