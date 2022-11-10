
import { useEffect, useState } from "react"


export const ClientSession = () => {

    const [sessions, setSessions] = useState([])
    
    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
   
       
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/scheduledSessions?userId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
   

    const cancelButton = (event, session)=> {


            fetch(`http://localhost:8088/scheduledSessions/${session.id}`, {
                method: "DELETE",
    })     
            .then(() => {
                fetch(`http://localhost:8088/scheduledSessions?userId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
                .then(response => response.json())
                .then((newArray) => {
                    setSessions(newArray)
                })
            })
    }
   
   
 

    // todo write ternary 
    // todo button functionality

    return (
        
        <div className= "sessionsList">
            <h2 className="pl-6 text-3xl pt-7 mt-20"> You currently have {sessions.length} sessions</h2>
                    <>
                        {Array.isArray(sessions) && sessions.map((session) => {
                          return (
                            <ul className="session flex flex-col space-y-4 w-2/5 m-6 border-2 rounded-md border-white" key={session.id}>
                            
                                <header className="pl-4 underline">Session Details</header>
                                
                                
                                <li className="pl-4">
                                    Day of Week: {session.trainerSession?.day}
                                </li>
                                
                                <li className="pl-4">
                                    Time of Day: {session.trainerSession?.time}
                                </li>
                                
                                <li className="pl-4">
                                    Trainer: {session.trainer?.name}
                                </li>
                                <div>
                                <button 
                                   onClick={(clickEvent) => cancelButton  (clickEvent, session)} 
                                   className="bg-pink-brown rounded-md border-2 w-[100px] font-medium text-black float-right mb-3 mr-3">
                                Cancel</button>  
                                </div>
                                   
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}