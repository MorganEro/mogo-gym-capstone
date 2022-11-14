
import { useEffect, useState } from "react";

export const LoginSessions =() => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)


    const [sessions, setSessions] = useState([])


    useEffect (
        ()=> {
            fetch(`http://localhost:8088/scheduledSessions?userId=${mogoUserObject.id}&_expand=trainerSession`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
    
        const dayOfWeekName = new Date().toLocaleString(
            'default', {weekday: 'long'})
       
         
      
    return (
          
        <div className= "pt-5 pl-10 text-2xl">
            {Array.isArray(sessions) && sessions.map((session) => {
                if(session?.trainerSession?.day === dayOfWeekName){
                    return (
                        <div key={session.id}>
                            You have a session scheduled today at {session?.trainerSession?.time}
                        </div>)
                }
            
        })}

        </div>
          )    

}