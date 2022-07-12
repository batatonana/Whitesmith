import { useEffect, useState } from "react"

const Home = () => {
    
    const [links, setLinks] = useState();
    
    useEffect(() => {
        const fetchLinks = async () =>{
            const response = await fetch('http://localhost:4000')
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setLinks(json)       
            }
        }
        fetchLinks()
    }, []);
    
    
    return(
        <div className="home">
            <h1>HOME</h1>
            <div className="links">
            {links && links.map((link) => (
                    <p key={link.id}>{link}</p>
                ))}
            </div>
        </div>
    )
}

export default Home