import { useEffect, useState } from "react"



export const TrainerLoginSessions = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const dayOfWeekName = new Date().toLocaleString(
        'default', {weekday: 'long'})


    const [sessions, setSessions]= useState([])
    const todaySessionsArray = []
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
            .then(response => response.json())
            .then((data) => {
                const mySessions = data[0]
                setSessions(mySessions)
            })
        }, []
    )
const findSessions = () => {
    sessions?.trainerSessions?.map((session) => {
        if (session.day === dayOfWeekName ){
        todaySessionsArray.push(session)
        return( 
            true                        
        )
    }}
    )}
    {findSessions()}

   return (
    <>
                <div>
                    You have {todaySessionsArray.length} session(s) scheduled today.
                </div>
    </>
   )
    
}