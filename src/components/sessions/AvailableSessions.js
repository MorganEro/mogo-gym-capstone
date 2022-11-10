import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AvailableSessionsList = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const navigate = useNavigate()

    const [sessions, setSessions] = useState([])
    const [userSelectedSession, setUserSelectedSession] = useState({
        trainerSessionId:  0,
        trainerId: 0,
        day: "",
        time: "",
        userId: 0
    })
    /*
    "id": 1,
    "name": "Coach Morgan",
    "userId": 1,
    "trainerSessions": [
      {
        "id": 1,
        "day": "Monday",
        "time": "3:00PM",
        "trainerId": 1
     
      } */

   
    
      const addButton = (event)=> {

            return fetch(`http://localhost:8088/scheduledSessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSelectedSession)
            })
            .then(() => {
                navigate('/sessions')
            }) 
    }
    
    useEffect (
        ()=> {
            fetch('http://localhost:8088/trainers?_embed=trainerSessions')
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )


    return (
        <div className= "availableSessions flex flex-wrap mt-28">

        <h2 className="pl-6 text-2xl pt-7 "> Available Sessions</h2>
        
        <>
            {Array.isArray(sessions) && sessions.map((session) =>{
                return(
                    <fieldset className="session flex flex-col content-start pl-6 pb-3 space-y-4 w-40 m-6 border-2 rounded-md border-white" key={session.id}> 
                        <header className="text-pink-brown">{session.name}</header>
                        {session.trainerSessions?.map((trainerSession) => {
                                return(
                                    <div className="trainer-Session" key={`key---${trainerSession.id}`}>
                                        <label className=" flex flex-row space-x-2">
                                            <input type="radio" 
                                            required autoFocus
                                            key = {`trainerSession-${trainerSession.id}`}
                                            value={trainerSession.id} 
                                            onChange={(event) => {
                                                const copy = {...userSelectedSession}
                                                copy.trainerSessionId =trainerSession.id
                                                copy.trainerId =trainerSession.trainerId
                                                copy.day =trainerSession.day
                                                copy.time =trainerSession.time
                                                copy.userId = mogoUserObject.id
                                                setUserSelectedSession(copy)
                                            }}
                                            checked = {userSelectedSession.trainerSessionId === trainerSession.id}
                                            className="radio"/>
                                            <div>
                                                {trainerSession.day}     
                                            </div>
                                            <div className="pr-5">
                                                {trainerSession.time} 
                                            </div>
                                            
                                        </label> 
                                    </div> 
                                )
                            }
                            )}
                        
                    </fieldset>
                    
                )
            })
            }
            
            <div>
                        <button 
                            onClick={(clickEvent) => addButton(clickEvent)} 
                            className="bg-pink-brown rounded-md border-2 w-[100px] font-medium text-black ml-10 mb-5">
                            Add Session</button> 
                        </div>
        </>
    </div>  
     
    )
}
