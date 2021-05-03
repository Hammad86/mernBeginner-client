import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useState,useEffect} from "react"
import SETTING from "../../settings"
import {useParams} from "react-router-dom"
import "./student.css"

export default function Student(){
 let requestParam = useParams()
 console.log(requestParam)
const [editingStudent,setEditingStudent] = useState('')
const [name,setName] = useState('');
const [age,setAge] = useState('');
const [gender,setGender] = useState('');
const [studentClass,setStudentClass] = useState('');
const [subjects,setSubjects] = useState('');
const [allSeubect,setAllSubjects] = useState([])

useEffect(()=>{
    fetch(`${SETTING.server_base_url}/subjects/list-all`)
        .then(res =>res.json())
        .then(subjectsList => {
            setAllSubjects(subjectsList.data)
        })
        if(requestParam.id){
          setEditingStudent(requestParam.id)
          fetch(`${SETTING.server_base_url}/students/list/${requestParam.id}`)
          .then(res =>res.json())
          .then(student => {
            console.log("student" ,student.data.name)
            setName(student.data.name);
            setAge(student.data.age);
            setGender(student.data.gender);
            setStudentClass(student.data.class)
            setSubjects(student.data.subjects)
            updateFormWithStudentDetails(student.data)
        })
        }
},[])

function updateFormWithStudentDetails(data){
  setName(data.name);
            setAge(data.age);
            setGender(data.gender);
            setStudentClass(data.class)
            setSubjects(data.subjects)
}

function sendRequestToSaveStudent (){
    fetch(`${SETTING.server_base_url}/students/add-new-student` ,{
        method: "post",
        headers:{
            'content-type':"application/json"
        },
        body: JSON.stringify({name,age,gender,studentClass,subjects})
    })  
    .then(res=>res.json())
    .then(data=>{
        console.log(`Response from server ${data}`)
        if(data.status){
          alert('Student Successfully saved!!!')
          setName('')
          setAge('')
          setGender('')
          setSubjects([])
          setStudentClass('')
        }
    })
}

function sendRequestToEditStudent(){
  fetch(`${SETTING.server_base_url}/students/update`,{
    method: "put",
    headers:{
        'content-type':"application/json"
    },
    body: JSON.stringify({
      data:{name,age,gender,studentClass,subjects},
      _id: editingStudent
    })
})  
.then(res=>res.json())
.then(data=>{
    console.log(`Response from server ${data}`)
    if(data.status){
      setName('')
          setAge('')
          setGender('')
          setSubjects([])
          setStudentClass('')
    }
})
}

    return <>
        <Card className = "student-card" >
            <CardContent>
            <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Name" value = {name} onChange={(event)=>setName(event.target.value)} />
            </form>
            <form>
            <TextField id="outlined-basic" label="Age" value={age} onChange={(event)=>setAge(event.target.value)} />
            </form>
            <FormControl  className="select" >
        <InputLabel id="demo-simple-select-outlined-label">Select Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value ={gender}
          onChange={(event)=>setGender(event.target.value)}  
          label="Gender"
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>

        </Select>
      </FormControl>
            
            <br/>
            <FormControl  className="select" >
        <InputLabel id="demo-simple-select-outlined-label">Select Class</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event)=>setStudentClass(event.target.value)}  
          label="Class"
          value ={studentClass}
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          <MenuItem value="6">VI</MenuItem>
          <MenuItem value="7">VII</MenuItem>
          <MenuItem value="8">VIII</MenuItem>
          <MenuItem value="9">IX</MenuItem>
          <MenuItem value="10">X</MenuItem>
        </Select>
      </FormControl>
            </CardContent>
            
            {studentClass && allSeubect.filter(subject=> subject.class === studentClass).map(subject =>
                   <FormControlLabel
                   key={subjects._id}
                   control={
                     <Checkbox
                       checked={subjects.includes(subject.name)}
                       name="checkedB"
                       color="primary"
                       onChange={(eve)=>{
                           let previousState = [...subjects]
                           if(eve.target.checked){
                               previousState.push(subject.name)
                           }
                           else{
                               let index = previousState.indexOf(subject.name)
                               previousState.splice(index,1)
                           }
                           console.log(previousState)
                           
                           setSubjects(previousState)
                       }}
                     />
                   }
                   label={subject.name + "--" + subject.class }
                 />)}
         
            <CardActions>
              {editingStudent ?
              <Button variant="contained" color="primary" onClick={sendRequestToEditStudent}>Edit Student</Button>:
              <Button variant="contained" color="primary" onClick={sendRequestToSaveStudent}>Save Student</Button>
              }
            
            </CardActions>
        </Card>
        

    </>
}