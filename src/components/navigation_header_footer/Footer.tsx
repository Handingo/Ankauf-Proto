import "./Footer.css";
import { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {

    private pages: string = "https://handingo.de/pages/";
    private policies: string = "https://handingo.de/policies/";

    render() {
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

export default Footer;