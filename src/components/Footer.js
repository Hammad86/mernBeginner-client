import {Navbar} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () =>{
    return <>
    <Navbar fixed="bottom" bg="dark">
    <Navbar.Brand href="#home">
      <img
        src="/logo192.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  </Navbar>
    </>
}

export default Footer;