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
                            <p className="footer-header">Kategorien</p>
                            <a href={this.site}>Home</a>
                            <a href={this.collections}>Kollektionen</a>
                            <a href={this.collections + "smartphones"}>Smartphones</a>
                            <a href={this.collections + "tablets"}>Tablets</a>
                            <a href={this.collections + "smartwatches"}>Smartwatches</a>
                            <a href={this.collections + "sale"}>Sale</a>
                        </div>
                        <div className="footer-column">
                            <p className="footer-header">Handingo</p>
                            <a href={this.site}>Wieso Handingo?</a>
                            <a href={this.pages}>Nachhaltigkeit</a>
                            <a href={this.policies + "privacy-policy"}>Datenschutzerklärung</a>
                            <a href={this.site + "?id=GDPR_769769dd5c4da8efb4d18bf16ca2c677"}>Cookie-Richtlinien</a>
                            <a href={this.policies + "terms-of-service"}>AGB</a>
                            <a href={this.policies + "legal-notice"}>Impressum</a>
                            <a href={this.pages + "handingo-sucht-dich"}>Karriere</a>
                        </div>
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