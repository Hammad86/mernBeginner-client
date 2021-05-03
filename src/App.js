import Students from "./pages/Students/Students"
import Subjects from "./pages/Subjects/Subjects"
import ListOfStudents from "./pages/Students/ListOfStudents"
import './App.css';

import NavBar from "./components/Navbar"
import Footer from "./components/Footer"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




function App() {
  return <>
<Router>

<NavBar/>
  <Switch>
    <Route exact path="/student/:id?">
      <Students/>
    </Route>
    <Route exact path="/subject">
      <Subjects/>
    </Route>
    <Route exact path="/student-list">
      <ListOfStudents/>
    </Route>
  </Switch>
  <Footer/>
</Router>
  </>
}

export default App;
