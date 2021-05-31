import {
  Navbar, Nav, NavDropdown
} from "react-bootstrap"
import { Filter } from "react-bootstrap-icons"
import logo from "../logo.png"
import {Link,useHistory} from "react-router-dom"

export default function Header() {
  const types = [
    "Fire",
    "Grass",
    "Bug",
    "Dark",
    "Water",
    "Electric",
    "Flying",
    "Poison",
    "Ground",
    "Normal",
  ]
  const history = useHistory()
  return(
  <Navbar bg="light" expand="lg" className="d-flex justify-content-between" style={{ boxShadow: "0 4px 6px -6px #222" }}>
    <Navbar.Brand><Link to="/"><img src={logo} height={50} /></Link></Navbar.Brand>
    <Navbar id="basic-navbar-nav" style={{ flexGrow: "0" }}>
      <Nav className="d-flex justify-content-end navbar">
        <NavDropdown title={<Filter fontSize={30} />} id="basic-nav-dropdown" align={{ lg: "start" }}>
          {types.map((type, i) => <NavDropdown.Item onClick={() => history.push(`/?filter=${type}`)} key={i} className="navbar-word">{type}</NavDropdown.Item>)}
        </NavDropdown>
      </Nav>
    </Navbar>
  </Navbar>
  )
}

