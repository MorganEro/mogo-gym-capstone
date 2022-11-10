import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ClientDetails = () => {
    
    const { clientId } = useParams()
    const [client, updateClient] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch (`http://localhost:8088/users/?isTrainer=false&id=${clientId}`)
            .then(response => response.json())
            .then((data)=> {
                const singleClient=data[0]
                updateClient(singleClient)
            })
        },
        []
    )
    const BackButton = () => {
        navigate("/clientList")
    }
   return (
            <div className="pl-6 mt-32 text-3xl">
                
                    <header className="text-pink-brown text-4xl"> {client.fullName}</header>
                    <div>&nbsp;</div>
                    <div>{client.address}</div>
                    <div>{client.phoneNumber}</div>
                    <div>{client.email}</div>
                    <div className="mt-12">
                    <button 
                        onClick={(clickEvent) => BackButton  (clickEvent)} 
                        className="bg-pink-brown rounded-md border-2 w-[100px] font-medium text-black  mb-3 mr-3">
                        Back</button>                          
                    </div>
            </div>

        )

  
}