import { useEffect, useState } from "react";

const Home = () => {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch("http://localhost:4000");
      const json = await response.json();
      if (response.ok) {
        setLinks(json);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div className="home">
      <h1>Download links from</h1>
      <div className="links">
        {links &&
          links.links.map((link) => (
            <a key={link.id} href={link.url}>
              {link.url} 
            </a>
          ))}
      </div>
    </div>
  );
};

export default Home;
