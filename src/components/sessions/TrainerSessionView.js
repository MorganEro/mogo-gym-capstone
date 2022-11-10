import { useState } from "react"
import { TrainerCurrentSessionsList } from "./TrainerCurrentSessionsList"
import { TrainerSessionCreate } from "./TrainerSessionCreate"


export const TrainerSessionView = () => {
    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const [sessions, setSessions] = useState([])
    
    const [emptySession, setEmptySession]=useState ({
        dayOfWeek: "",
        time: ""
    })

    const getAllSessions =() => {
        fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
        .then(response => response.json())
        .then((data) => {
            setSessions(data)
        })

    }

    return <>
        <TrainerSessionCreate getAllSessions={getAllSessions}/> 
        <TrainerCurrentSessionsList getAllSessions={getAllSessions} setEmptySession={setEmptySession}/>
    </>
        
}