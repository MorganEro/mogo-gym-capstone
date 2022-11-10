// Todo Create logic to stop clients from creating trainer accounts 

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Register = (props) => {
    const [client, setClient] = useState({
        email: "",
        isTrainer: false,
        fullName: "",
        address: "",
        phoneNumber: ""

    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("mogo_user", JSON.stringify({
                        id: createdUser.id,
                        trainer: createdUser.isTrainer
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${client.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateClient = (evt) => {
        const copy = {...client}
        copy[evt.target.id] = evt.target.value
        setClient(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="flex-column form--login text-2xl mt-10" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 text-3xl font-weight-normal text-pink-brown">Please Register with Mogo Gym</h1>
                <div>&nbsp;</div>

                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateClient}
                        type="email" id="email" className="pl-3 border-2 rounded-md text-black"
                        placeholder="Email address" required />
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateClient}
                           type="text" id="fullName" className="pl-3 border-2 rounded-md text-black"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <div>&nbsp;</div>

                <fieldset>
                    <label htmlFor="address"> Home Address </label>
                    <input onChange={updateClient}
                        type="text" id="address" className="pl-3 border-2 rounded-md text-black"
                        placeholder="Enter your Address" required />
                </fieldset>
                <div>&nbsp;</div>

                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateClient}
                        type="tel" id="phoneNumber" className="pl-3 border-2 rounded-md text-black"
                        placeholder="000-000-0000" required />
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...client}
                        copy.isTrainer = evt.target.checked
                        setClient(copy)
                    }}
                        type="checkbox" id="isTrainer" />

                    <label htmlFor="email"> I am a Trainer </label>
                </fieldset>
                <div>&nbsp;</div>
                <div className="justify-center flex flex-row space-x-10" >
                       <div>
                        <button type="submit" className="hover:text-pink-brown underline underline-offset-4"> Register </button>
                       </div>
                       <div>
                        <Link  className="navbar__link  hover:text-pink-brown" to="/" >Return to Home-Page </Link>
                       </div>
                </div>
            </form>
        </main>
    )
}

