import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export const TrainerDetails = () => {

    const { trainerId } = useParams()
    const [trainer, updateTrainer] = useState({})
    const navigate= useNavigate()

    useEffect(
        () => {
            fetch (`http://localhost:8088/users/?isTrainer=true&id=${trainerId}`)
            .then(response => response.json())
            .then((data)=> {
                const singleTrainer=data[0]
                updateTrainer(singleTrainer)
            })
        },
        []
    )

    const BackButton = () => {
        navigate("/trainerList")
    }

   return (
            <div className="pl-6 mt-32 text-3xl">
                <div>
                <img className="w-40 border-pink-brown border-2" src={trainer.imgUrl} alt="No Image"/>
            </div>
                    <header className="text-pink-brown
                    text-4xl"> {trainer.fullName}</header>
                    <div>&nbsp;</div>
                    <div>Address: {trainer.address}</div>
                    <div>Phone Number: {trainer.phoneNumber}</div>
                    <div>Email: {trainer.email}</div>
                    <div className="mt-12">
                    <button 
                        onClick={(clickEvent) => BackButton  (clickEvent)} 
                        className="bg-pink-brown rounded-md border-2 w-[100px] font-medium text-black  mb-3 mr-3">
                        Back</button>                          
                    </div>
            </div>

        )

  
}