
export const ClientSearch = ({ setterFunction }) => {

 


    return (
        <div className="mt-32 ml-6 flex">
            <div className="pr-3 text-xl ">
                Search Clients
            </div>
            <input 
            onChange={ 
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                } 
            }
            type="search" className="text-black pl-3 w-48 rounded-md border-pink-brown border" placeholder=" name or email" />
        </div>
    )
}