import { Link, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"


export const TrainerNav = () => {
    const navigate = useNavigate()

    const activeLink = 'bg-pink-brown border-white rounded-md border-2 p-1 hover:text-black'
    const normalLink = ''

   

    return (
        <ul className="text-white uppercase border-b border-b-gray-500 flex items-center justify-between px-8 bg-black fixed w-full top-0" >
            <li className=" hover:text-white font-lucky p-4 text-4xl  h-24 text-pink-brown" >
                <NavLink className="navbar__link" to="/" 
            >Mogo Gym </NavLink>
            </li>
            <li className="text white p-4 hover:text-pink-brown" >  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/clientList" >Clients</NavLink>
               
            </li>
            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/trainerList" >Trainers</NavLink>
               
            </li>
            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/availability" >Availability</NavLink>
               
            </li>
            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/profile" >Profile</NavLink>
            </li>
            
            
            {
                localStorage.getItem("mogo_user")
                ? <li className="text white p-4 hover:text-pink-brown">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("mogo_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            : ""
            }
        </ul>
    )
}