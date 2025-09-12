"use client";

import { useDispatch, useSelector } from "react-redux"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from "react"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import Tab from '@mui/material/Tab';
import { Box } from "@mui/material";

const graph: React.FC = () => {
    const yes = useSelector((state: any) => state.yes)
    const no = useSelector((state: any) => state.no)
    const seen = useSelector((state: any) => state.seen)
    const [tabValue, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const columns: GridColDef[] = [
        {field: 'name', headerName: "Name"},
        {field: 'director', headerName: "Director"},
        {field: 'cast', headerName: "Cast"},
        {field: 'year', headerName: "Year"},
        {field: 'desc', headerName: "Description"}
    ]
    return(
        <>
        <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'white', backgroundColor: 'white'}}>
                <TabList onChange={handleChange} aria-label="Tabs" sx={{backgroundColor: 'white'}}>
                    <Tab label="Me Likey" value="1" color='white'/>
                    <Tab label="Me No Likey" value="2" color='white'/>
                    <Tab label="Seen it" value="3" color='white'/>
                </TabList>
            </Box>
            <TabPanel value="1" sx={{backgroundColor: 'white'}}>
                <Box sx={{height: 400, width: '100%', backgroundColor: 'white'}}>
                    <DataGrid
                    rows={yes}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    checkboxSelection
                    disableRowSelectionOnClick
                    />
                </Box>
            </TabPanel>
            <TabPanel value="2" sx={{backgroundColor: 'white'}}>
                <Box sx={{height: 400, width: '100%', backgroundColor: 'white'}}>
                    <DataGrid
                    rows={no}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    checkboxSelection
                    disableRowSelectionOnClick
                    />
                </Box>
            </TabPanel>
            <TabPanel value="3" sx={{backgroundColor: 'white'}}>
                <Box sx={{height: 400, width: '100%', backgroundColor: 'white'}}>
                    <DataGrid
                    rows={seen}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    checkboxSelection
                    disableRowSelectionOnClick
                    />
                </Box>
            </TabPanel>
        </TabContext>
        </>
    )
    
    
}

export default graph;