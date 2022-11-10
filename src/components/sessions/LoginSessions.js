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
       
      
            //  const results =() => {
                const foundSession = sessions.filter((session) => {
                    if (session.day === dayOfWeekName) {
                        return (session)}
                        // setSessions(session)}
                    }
                )
      
    return (
            <div>
                {foundSession.day === dayOfWeekName?
                 <div className="mt-32"> Your Session this {dayOfWeekName} is at {foundSession.time}.
                </div>
                :  
                 <div className="mt-32"> You currently do not have any sessions scheduled this {dayOfWeekName}.
                </div>
                }



            </div>  
          )    

}