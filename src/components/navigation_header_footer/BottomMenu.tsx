import { Component } from "react";
import { Container } from "react-bootstrap";


class BottomMenu extends Component {

    private site: string = "https://handingo.de/";
    private collections: string = this.site + "collections/";
    private pages: string = this.site + "pages/";
    private policies: string = this.site + "policies/";

    render() {
        /*
        <Navbar className="bottommenu" expand="lg" bg="light">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="https://handingo.de/pages/Kontakt">Kategorien</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Handingo</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Service</Nav.Link>
                            <Nav.Link href="https://handingo.de/collections">Kontakt</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            */
        return (
            <div className="bottom-menu">
                <Container>
                    <div className="footer-row">
                        <div className="footer-column">
                            <p className="footer-header">Service</p>
                            <a href={this.policies + "shipping-policy"}>Zahlung & Versand</a>
                            <a href={this.policies + "refund-policy"}>Widerrufsrecht</a>
                            <a href={this.pages + "faq"}>Smartphones</a>
                            <a href={this.pages + "icloud-google-sperre-entfernen"}>iCloud & Google-Sperre entfernen</a>
                            <a href={this.pages + "kontakt"}>Kontakt</a>
                            <a href={this.pages + "hinweise-zur-baterrieentsorgung"}>Hinweise zur Batterieentsorgung</a>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default BottomMenu;