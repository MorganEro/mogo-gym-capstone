import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { ClientContainer } from "../clients/ClientContainer"
import { ClientDetails } from "../clients/ClientDetails"
import { Profile } from "../profile/Profile"
import { TrainerSessionView } from "../sessions/TrainerSessionView"
import { TrainerDetails } from "../trainers/TrainerDetails"
import { TrainerList } from "../trainers/TrainerList"

export const TrainerViews = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const [client, setClient] = useState({})
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/users?id=${mogoUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const user=data[0]
                setClient(user)
            }) 
        }, [mogoUserObject.id]
    ) 


    return (
        <Routes>    
            <Route path="/" element= {
                <div className=" flex flex-col ">
                    <div className="text-4xl mt-32 ml-10 "> Hello, {`${client.fullName}`}!</div>
                    <div>&nbsp;</div>
                    <div className="h-[500px] w-4/5 border-2 border-white ml-10 overflow-y-hidden">
                        <img src="/images/image1.jpg" className="object-bottom"/>
                    </div>    
                </div>
            } />
            <Route path="clientList" element={ <ClientContainer />
            }/>
            <Route path="clientList/:clientId" element={ <ClientDetails />
            }/>
            <Route path="moSessions" element={ <TrainerSessionView /> } />
            <Route path="profile" element={ <Profile /> } />
            <Route path="trainerList" element={ <TrainerList /> } />
            <Route path="trainerList/:trainerId" element={ <TrainerDetails /> } />
            
            
        </Routes>
        )
    
}