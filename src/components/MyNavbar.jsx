import { Navbar, Nav } from 'react-bootstrap'

// js normally follows a syntax standard called camelCase
// thisIsAWordInCamelCase

// instead React Components follow PascalCase
// ThisIsAReactComponent


// props is always an object
// it will contain any prop I'm invoking the component with

const MyNavbar = (props) => {
    console.log(props)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Strivestaurant - {props.payoff}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {
                        props.links.map(link => (
                            <Nav.Link key={link} href={'#' + link}>{link.slice(0, 1).toUpperCase() + link.slice(1)}</Nav.Link>
                        ))
                    }
                    {/* <Nav.Link href="#features">Menu</Nav.Link>
                    <Nav.Link href="#pricing">Booking</Nav.Link>
                    <Nav.Link href="#contact">Contact us!</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

// this is a neater syntax, destructuring the payoff prop
// so you don't have to put props. props. etc.

// const MyNavbar = ({ payoff }) => (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Navbar.Brand href="#home">Strivestaurant - {payoff}</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="ml-auto">
//                 <Nav.Link href="#features">Menu</Nav.Link>
//                 <Nav.Link href="#pricing">Booking</Nav.Link>
//                 <Nav.Link href="#contact">Contact us!</Nav.Link>
//             </Nav>
//         </Navbar.Collapse>
//     </Navbar>
// )

export default MyNavbar