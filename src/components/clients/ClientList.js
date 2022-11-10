
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ClientList = ({ searchTermState }) => {
    
    const [clients, setClients] = useState([])
    const [filteredClients, setFilteredClients] = useState([])
    
    useEffect (
        ()=> {
            fetch("http://localhost:8088/users?isTrainer=false")
            .then(response => response.json())
            .then((clientArray) => {
                setClients(clientArray)
            })
        }, []
    )

    useEffect(
        () => {
            const searchedClients = clients.filter((client) => {
                if (client.fullName.toLowerCase().includes(searchTermState.toLowerCase())|| client.email.toLowerCase().includes(searchTermState.toLowerCase())) {
                    return true
                }
                })
            setFilteredClients(searchedClients)
        },
        [ searchTermState ])

     useEffect (() => {
        setFilteredClients (clients)
     }, [clients]
     )   

    
    const sortButton = () => {
        
        const strAscending = [...clients].sort((a, b) =>
        a.fullName > b.fullName ? 1 : -1,)
        
        setClients(strAscending)
    }
    const sortButtonDescending = () => {
        
        const strAscending = [...clients].sort((a, b) =>
        a.fullName > b.fullName ? -1 : 1,)
        
        setClients(strAscending)
    }
    const sortButtonEmail = () => {
        const strAscending = [...clients].sort((a, b) =>
        a.email > b.email ? 1 : -1,)
        
        setClients(strAscending)
    }


    return (
        
        <div className= "ClientList">
            <h2 className="text-2xl pl-6 pt-6 mt-6"> List of Clients</h2>
            <div>&nbsp;</div>
            <div className="flex pl-6 gap-10 ">
                <button  className= " border-pink-brown rounded border-solid border-2 w-12"onClick={(clickEvent) => sortButton  (clickEvent)}>A-Z</button>
                <button className ="  border-pink-brown rounded border-solid border-2 w-12" onClick={(clickEvent) => sortButtonDescending  (clickEvent)}>Z-A</button>
                <button  className ="  border-pink-brown rounded border-solid border-2 w-12 " onClick={(clickEvent) => sortButtonEmail  (clickEvent)}>Email</button>
            </div>
            
                    <>
                        {filteredClients.map((client) => {
                          return (
                            <ul className="session flex flex-col space-y-4 w-2/5 m-6 border-2 rounded-md border-white pb-4 pt-3" key={client.id}>
                                <div className="text-pink-brown cursor-pointer pl-4 hover:underline">
                                    <Link to={`/clientList/${client.id}`}>{client.fullName}</Link>
                                </div>
                                <li className="pl-4">
                                    Email: {client.email}
                                </li>
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}