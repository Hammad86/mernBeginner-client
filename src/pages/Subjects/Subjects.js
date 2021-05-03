import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useState} from "react"
import SETTING from "../../settings"
import "./subject.css"

export default function Subjects(){
    const [subjectName,setSubjectName] = useState('')
    const [subjectClass,setSubjectClass] = useState('')
    const saveSubject = (sName,sClass) =>{
        fetch(`${SETTING.server_base_url}/subjects/add-new-subject` ,{
            method: "post",
            headers:{
                'content-type':"application/json"
            },
            body: JSON.stringify({sName,sClass})
        })  
        .then(res=>res.json())
        .then(data=>{
            console.log(`Response from server ${data}`)
        })
    }
    return <>
        <Card className="subject-card">
            <CardContent>
            <form>
            <TextField id="outlined-basic" label="Subject Name" onChange={(event)=>setSubjectName(event.target.value)} />
            </form>
            <br/>
            <br/>
            <FormControl  className="select" >
        <InputLabel id="demo-simple-select-outlined-label">Select Class</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event)=>setSubjectClass(event.target.value)}  
          label="Age"
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          <MenuItem value={6}>VI</MenuItem>
          <MenuItem value={7}>VII</MenuItem>
          <MenuItem value={8}>VIII</MenuItem>
          <MenuItem value={9}>IX</MenuItem>
          <MenuItem value={10}>X</MenuItem>
        </Select>
      </FormControl>
            </CardContent>
            <br/> 
            <CardActions>
            <Button variant="contained" color="primary" onClick={()=>{saveSubject(subjectName,subjectClass)}}>Save Subject</Button>
            </CardActions>
        </Card>
    </>
}