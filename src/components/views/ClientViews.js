import { Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

import { AvailableSessionsList } from "../sessions/AvailableSessions"
import { ClientSession } from "../sessions/ClientSession"
import { LoginSessions } from "../sessions/LoginSessions"
import { TrainerDetails } from "../trainers/TrainerDetails"
import { Profile } from "../profile/Profile"


export const ClientViews= () => {

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
			<div className="mt-36">
				<div className="text-4xl ml-10">Hello, {`${client.fullName}`}!</div>
				<div>&nbsp;</div>
				<div className="h-[450px] w-4/5 border-2 border-white ml-36 overflow-y-hidden">
							<img src="/images/ropes.jpg" className="object-bottom"/>
						</div>
				<div className="text-3xl mt-8 mr-10 float-right">If it doesn't challenge you, it doesn't change you. </div>			
			</div>
		} />
		<Route path="available" element={ <AvailableSessionsList/> } />
		<Route path="loginSessions" element={ <LoginSessions/> } />
		<Route path="sessions" element={ <ClientSession /> } />
		<Route path="profile" element={ <Profile /> } />
		<Route path="sessions/:trainerId" element={ <TrainerDetails /> } />

		
	</Routes>
	)
}
