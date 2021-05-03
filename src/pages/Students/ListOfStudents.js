import {useEffect,useState} from "react"
import {Table} from "react-bootstrap"
import SETTING from "../../settings"
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

export default function ListOfStudents(){
    let [studentsList, setStudentsList]=useState([])
    useEffect(()=>{
        getAllStudentList();
    },[])

    const getAllStudentList = () =>{
        fetch(`${SETTING.server_base_url}/students/list-all`)
        .then(res =>res.json())
        .then(studentsList => {
            setStudentsList(studentsList.data)
        })
    }

    const requestSenToDeleteUser = (id) =>{
        fetch(`${SETTING.server_base_url}/students/delete/${id}`,{method: "delete"})
        .then(res =>res.json())
        
        getAllStudentList();

    }
    return<>
    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th>class</th>
      <th>Subjects</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
  {studentsList.map(student=><tr>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.gender}</td>
      <td>{student.class}</td>
      <td>{student.subjects.join(",")}</td>
      <td>
      <Link to={`/student/${student._id}`}>
      <Button variant="contained" color="primary" >Edit
      </Button>
      </Link>
      </td>
      <td>
          <Button variant="contained" color="primary" onClick={()=>{requestSenToDeleteUser(student._id)} }>Delete
      </Button>
      </td>
    </tr>)}
    
    
  </tbody>
</Table>
    

    </>
}