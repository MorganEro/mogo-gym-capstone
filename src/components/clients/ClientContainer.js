import { useState } from "react"
import { ClientList } from "./ClientList"
import { ClientSearch } from "./ClientSearch"


export const ClientContainer =() => {

    const [searchTerms, setSearchTerms] = useState("")

    return  <>
        <ClientSearch setterFunction={setSearchTerms} />
        <ClientList searchTermState={searchTerms} />
    </>

}