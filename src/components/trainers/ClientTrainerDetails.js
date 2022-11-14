import { useEffect, useState } from "react"

export const ClientTrainerDetails = () => {

    const [trainers, setTrainers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users/?isTrainer=true`)
            .then(response => response.json())
            .then((trainerArray) => {
                setTrainers(trainerArray)
            })
        }, []
    )

   return (
            <div className="pl-6 mt-32 text-3xl flex flex-col gap-5 just">

                {trainers.map((trainer) => {return (
                    <div key= {trainer.id} className="border-2 p-3 w-1/2 flex">
                        <div>
                        <img className="w-40 border-pink-brown border-2" src={trainer.imgUrl} alt="No Image"/>
                        </div>
                        <div className="pl-10 pt-12">
                            <header className="text-pink-brown 
                                text-4xl"> {trainer.fullName}</header>
                            <div>&nbsp;</div>
                            <div>Phone Number: {trainer.phoneNumber}</div>
                            <div>Email Address: {trainer.email}</div>
                        </div>
                    </div>

                )})}
                
            </div>

        )

  
}