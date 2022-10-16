import { useState, useEffect, useCallback } from 'react'

export default function useInfiniteScroll(query, page, isInitialized) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let [movies, setMovies] = useState([]);


  const sendQuery = useCallback(async () => {
    if(query === "") {
        console.log("fetching data on now playing, page: "+page)
        try {
          await setLoading(true);
          await setError(false);
          fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page="+page)
          .then(response => response.json())
          .then(data => {
            console.log("loaded now playing page: "+page)
            setMovies((prev) => [...new Set([...prev,  ...data.results])])
          })
          setLoading(false);
    
    
        } catch (err) {
          setError(err);
        }
      } 
      else {
        console.log("fetching data with query: "+query+", page: "+page)
        try{
          await setLoading(true);
          await setError(false);
          fetch("https://api.themoviedb.org/3/search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&query="+query+"&page="+page+"&include_adult=false")
          .then(response => response.json())
          .then(data => {
            console.log("loaded query: "+query+" page: "+page)
            setMovies((prev) => [...new Set([...prev, ...data.results])] )
          })
          setLoading(false);
        }
        catch(err){
          setError(err);
        }
      }
  }, [query,page]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);
  
  useEffect(() => {
    console.log("clearing movies")
    setMovies([])
    isInitialized.current = false;
    
  }, [query, isInitialized]);

 

  


  return { loading, error, movies: movies };

}
