import { useEffect, useState } from "react"

export const ClientForm = () => {
    const [profile, updateProfile] = useState ({
        email: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        imgUrl: "",
    })
    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${mogoUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const trainerObject = data[0]
                updateProfile(trainerObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users/${profile.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
        })

    }

    return (
        
        <div className="pl-10 mt-32">
            <div>
                <img className="w-40 border-pink-brown border-2" src={profile.imgUrl} alt="No Image"/>
            </div>
            <div>&nbsp;</div>
            <form className="">
                <h2 className="text-pink-brown text-2xl">Profile</h2>
                <div>&nbsp;</div>
                <fieldset>
                    <div className="">
                        <label htmlFor="email">Email: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="text-black pl-3 rounded-sm w-64"
                            value={profile.email}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.email = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <div className="">
                        <label htmlFor="fullName">fullName: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="text-black pl-3 rounded-sm "
                            value={profile.fullName}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.fullName = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <div className="">
                        <label htmlFor="address">Address: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="text-black pl-3 rounded-sm w-64 "
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <div className="">
                        <label htmlFor="phoneNumber">PhoneNumber: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="text-black pl-3 rounded-sm "
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.phoneNumber = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div>&nbsp;</div>
                <fieldset>
                    <div className="">
                        <label htmlFor="imgUrl">Profile Image Url: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="text-black pl-3 rounded-sm w-80 "
                            value={profile.imgUrl}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.imgUrl = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div>&nbsp;</div>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="bg-pink-brown rounded-md border-2 w-[100px] font-medium text-black">
                    Save Profile
                </button>
            </form>
        </div>
    )
}