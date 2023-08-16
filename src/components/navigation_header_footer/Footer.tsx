import "./Footer.css";
import { Component } from "react";
import { Container } from "react-bootstrap";
import Link from "../util/Link";

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
                            <Link newTab text="Zahlung & Versand" href={this.policies + "shipping-policy"}/>
                            <Link newTab text="Widerrufsrecht" href={this.policies + "refund-policy"}/>
                            <Link newTab text="FAQ" href={this.pages + "faq"}/>
                            <Link newTab text="iCloud & Google-Sperre entfernen" href={this.pages + "icloud-google-sperre-entfernen"}/>
                            <Link newTab text="Kontakt" href={this.pages + "kontakt"}/>
                            <Link newTab text="Hinweise zur Batterieentsorgung" href={this.pages + "hinweise-zur-baterrieentsorgung"}/>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Footer;