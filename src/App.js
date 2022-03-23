import React, {useState , useEffect} from 'react';
import axios from 'axios';

const App = () =>{
   
   const [hits ,setHits] = useState([]);
   const [query, setQuery] = useState("React");
   
   useEffect(() => {
     const fetchData = async () =>{
        const {data} = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
        setHits(data.hits);
     }
     fetchData();
   }, [query]);

   return(

      <div className='flex flex-col bg-gray-200'>

        <img className="mx-auto mt-7 mb-0" src="./img/logo.png" alt="logo" />

        <input className="searcher xl:mb-8"type="text" 
        onChange={(e) => setQuery(e.target.value)}/>

        <small className="mx-auto px-3 py-1 text-center text-gray-700">This site is an artificial intelligence based search 
        engine coded with axios api calls and ReactJS.</small>
        <small className="mx-auto px-3 py-1 text-center text-gray-700">The search engine generally searches for articles and 
        will evolve itself with deep learning technology.</small>

        <div className="container px-1 md:px-6 xl:px-8 mx-auto pt-2">
          <img className="hidden back lg:block lg:absolute bottom-0 right-0" src="./img/back.svg" alt="back" />
         {
           hits.map( (hit) => ( 
               <a className="link" 
                  key={hit.ObjectID} href={hit.url} target="_blank">
                  <div className="author">Author : {hit.author.toUpperCase()}</div>
                  <div className="title">{hit.title}</div>
                  <div className="url">{hit.url}</div>
                  <div className="comments">points: {hit.points} | comments: {hit.num_comments}</div>
               </a>
           ))
         }
       </div>
      </div>
   )
}
export default App;