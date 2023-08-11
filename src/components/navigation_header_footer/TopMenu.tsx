import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

class TopMenu extends Component {
    render() {
        return (
            <Navbar className="top-menu" expand="lg" bg="light" sticky="top">
                <Container>
                    <Navbar.Brand href="https://handingo.de" className="site-header__logo-link">
                        <img src="//handingo.de/cdn/shop/files/handingo_990f0cf9-0fc6-490a-9791-7383397a7c1c.png" alt="" width="200" height="55" loading="eager" className="small--hide" sizes="200px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="https://handingo.de">Home</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Kollektionen</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Smartphones</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Tablets</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections/smartwatches">Smartwatches</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections/sale" className="nav-highlighted">Sale</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default TopMenu;