import { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";


class TicketForm extends Component {
    render() {
        return (
            <div id="ticket-form">
                <label>Vorname</label>
                <input placeholder="Vorname"/>
                <label>Nachname</label>
                <input placeholder="Nachname"/>
                <label>E-Mail</label>
                <input placeholder="E-Mail"/>
                <label>Wohnort</label>
                <input placeholder="Wohnort"/>
                <label>Straße</label>
                <input placeholder="Straße"/>
                <label>Hausnummer</label>
                <input placeholder="Hausnummer"/>
                <Button id="button-send-ticket">Senden</Button>
            </div>
        );
    }
}

export default connect()(TicketForm);