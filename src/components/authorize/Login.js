import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, set] = useState("Fierofinger@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("mogo_user", JSON.stringify({
                        id: user.id,
                        trainer: user.isTrainer
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login pt-20 text-2xl">
            <section  className="flex justify-center text-center">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="p-4 text-6xl font-lucky font-bold h-24 text-pink-brown">MOGO GYM</h1>
                    <h2 className=" text-4xl pb-4 font-oswald ">Please sign in</h2>
                    <fieldset className="pl-3">
                        <label htmlFor="inputEmail" className="font-oswald text-3xl text-bold"> Email: </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className=" text-black border-2 pl-3 rounded-md  placeholder:text-slate-400 w-96"
                            placeholder="BobBob@Bob.com"
                            required autoFocus />
                    </fieldset>
                    <div>&nbsp;</div>
                    <fieldset className="pl-3">
                        <button className="bg-pink-brown rounded-md border-2 w-[150px] font-medium text-black" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="absolute inset-x-0 bottom-10 h-16 flex justify-center link--register pt-10 hover:text-pink-brown">
                <Link to="/register">Not a member of Mogo Gym yet? Please follow this link to get started!</Link>
            </section>
        </main>
    )
}

