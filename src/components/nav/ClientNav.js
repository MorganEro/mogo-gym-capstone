import { Link, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"



export const ClientNav = () => {
    const navigate = useNavigate()

    const activeLink = 'bg-pink-brown border-white rounded-md border-2 p-1 text-black'
    const normalLink = ''

    



    return (
        <ul className="text-white uppercase border-b border-b-gray-500 flex items-center justify-between px-8 fixed bg-black w-full top-0" >
            <li className="p-4 text-4xl hover:text-white font-lucky h-24 text-pink-brown">
                <Link className="navbar__link" to="/" 
            >Mogo Gym</Link>
            </li>
            <li className="text white p-4 hover:text-pink-brown">
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/sessions" 
                >Your Current Sessions</NavLink>
            </li>

            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/available" >Available Sessions</NavLink>    
            </li>
            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/trainers" >Trainers</NavLink>    
            </li>
            <li className="text white p-4 hover:text-pink-brown">  
                 <NavLink 
                 className={({isActive}) => (isActive ? activeLink: normalLink)} to="/profile" >Profile</NavLink>
            </li>

            {
                localStorage.getItem("mogo_user")
                ? <li className="navbar__item navbar__logout hover:text-pink-brown">
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

