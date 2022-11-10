
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const TrainerList = () => {
    const [trainers, setTrainers] = useState([])
 
    
    useEffect (
        ()=> {
            fetch("http://localhost:8088/users?isTrainer=true")
            .then(response => response.json())
            .then((trainerArray) => {
                setTrainers(trainerArray)
            })
        }, []
    )

    return (
        
        <div className= "trainerList mt-32">
            <h2 className="pl-6 text-3xl pt-7"> List of trainers</h2>
                    <>
                        {trainers.map((trainer) => {
                          return (
                            <ul className="session flex flex-col space-y-4 w-2/5 m-6 border-2 rounded-md border-white mt-3 pt-2 pb-3" key={trainer.id}>
                                <div className="text-pink-brown cursor-pointer pl-4 hover:underline">
                                    <Link to={`/trainerList/${trainer.id}`}>{trainer.fullName}</Link>
                                </div>
                                {/* <header className="pl-4 text-pink-brown">{trainer.fullName}</header> */}
                                {/* <li className="pl-4">
                                    Address : {trainer.address}
                                </li> */}
                                {/* <li className="pl-4">
                                    Phone Number : {trainer.phoneNumber}
                                </li> */}
                                <li className="pl-4">
                                    Email : {trainer.email}
                                </li>
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}