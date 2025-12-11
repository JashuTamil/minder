"use client";

import { useSelector } from "react-redux"
import { useState } from "react"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import Tab from '@mui/material/Tab';
import { Box } from "@mui/material";
import { MovieType } from "./types";

const graph: React.FC = () => {
    const yes = useSelector((state: any) => state.yes)
    const no = useSelector((state: any) => state.no)
    const seen = useSelector((state: any) => state.seen)
    const [tabValue, setValue] = useState("1");


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

        return(
            <>
        <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'white', backgroundColor: 'white', p: 0, m: 0}}>
                <TabList onChange={handleChange} aria-label="Tabs" sx={{backgroundColor: 'white', p: 0, m: 0, minHeight: 'auto'}}>
                    <Tab label="Me Likey" value="1" color='white'/>
                    <Tab label="Me No Likey" value="2" color='white'/>
                    <Tab label="Seen it" value="3" color='white'/>
                </TabList>
            </Box>
            <TabPanel value="1">
                    <div className="movieDisplay">
                    {yes.map((movie: MovieType) => (
                    <div key={movie.id} className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"> 
                                <img
                                key = {movie.id}
                                src = {movie.poster_path}
                                style={{ width: '300px', margin: '10px' }}
                                />
                            </div>
                            <div className="flip-card-back"> 
                                <p>{movie.title}</p>
                                <p>{movie.release_date}</p>
                                <p>{"Director: " + movie.director}</p>
                                <p>{"Cast:" + movie.cast}</p>
                                <p>{"Description: " + movie.overview}</p>
                                <p>{"Runtime: " + movie.runtime}</p>
                                <p> {"Rating: " + movie.vote_average}</p>
                            </div>
                        </div>  
                    </div> 
                    ))}   
                </div>
            </TabPanel>
            <TabPanel value="2">
                <div className="movieDisplay">
                    {no.map((movie: MovieType) => (
                    <div key={movie.id} className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"> 
                                <img
                                key = {movie.id}
                                src = {movie.poster_path}
                                style={{ width: '300px', margin: '10px' }}
                                />
                            </div>
                            <div className="flip-card-back"> 
                                <p>{movie.title}</p>
                                <p>{movie.release_date}</p>
                                <p>{"Director: " + movie.director}</p>
                                <p>{"Cast:" + movie.cast}</p>
                                <p>{"Description: " + movie.overview}</p>
                                <p>{"Runtime: " + movie.runtime}</p>
                                <p> {"Rating: " + movie.vote_average}</p>
                            </div>
                        </div>  
                    </div> 
                    ))}   
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div className="movieDisplay">
                    {seen.map((movie: MovieType) => (
                    <div key={movie.id} className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"> 
                                <img
                                key = {movie.id}
                                src = {movie.poster_path}
                                style={{ width: '300px', margin: '10px' }}
                                />
                            </div>
                            <div className="flip-card-back"> 
                                <p>{movie.title}</p>
                                <p>{movie.release_date}</p>
                                <p>{"Director: " + movie.director}</p>
                                <p>{"Cast:" + movie.cast}</p>
                                <p>{"Description: " + movie.overview}</p>
                                <p>{"Runtime: " + movie.runtime + " minutes"}</p>
                                <p> {"Rating: " + movie.vote_average + "/10"}</p>
                            </div>
                        </div>  
                    </div> 
                    ))}   
                </div>
            </TabPanel>
        </TabContext>
        </>
    )
    
    
}

export default graph;