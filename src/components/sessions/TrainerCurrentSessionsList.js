import { useEffect, useState } from "react"



export const TrainerCurrentSessionsList = ({ getAllSessions }) => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)


    const [sessions, setSessions]= useState([])

    useEffect (
        ()=> {
            fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
            .then(response => response.json())
            .then((data) => {
                const mySessions = data[0]
                setSessions(mySessions)
            })
        }, [getAllSessions]
    )

    const cancelButton = (event, trainerSession)=> {


            fetch(`http://localhost:8088/trainerSessions/${trainerSession.id}`, {
                method: "DELETE",
    })     
            .then(() => {
                fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
                .then(response => response.json())
                .then((data) => {
                    getAllSessions(data)
                })
            })
    }
   
   return (
    <div>
        <div>
            <h1 className="mt-20 text-3xl pl-6 underline">Current Sessions</h1>
        </div>
        <article className="flex flex-wrap mt-8 pl-3">
            {
                sessions?.trainerSessions?.map((trainerSession) => {
                    return(
                        <div key={trainerSession?.id}>

                            <ul className="border-2 w-[100px] justify-evenly ml-5" >
                                <li className="text-pink-brown">Day: {trainerSession?.day}</li>
                                <li>Time: {trainerSession?.time}</li>
                                <div className="pr-4">
                                <button 
                                    onClick={(clickEvent) => cancelButton (clickEvent, trainerSession)} 
                                    className="bg-pink-brown rounded-md border-2 w-[60px] font-medium text-black float-right mt-2 mb-5">
                                    Cancel</button>  
                                </div>
                        </ul>

                        </div>
                        
                    )
                })}
        </article> 
    </div>
   )
    
}