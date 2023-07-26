import { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";


class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        demicile: "",
        street: "",
        houseNumber: ""
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="ticket-form">
                <label>Vorname</label>
                <input placeholder="Vorname" name="firstName" onChange={this.handleChange}/>
                <label>Nachname</label>
                <input placeholder="Nachname" name="lastName" onChange={this.handleChange}/>
                <label>E-Mail</label>
                <input placeholder="E-Mail" name="email" onChange={this.handleChange}/>
                <label>Wohnort</label>
                <input placeholder="Wohnort" name="demicile" onChange={this.handleChange}/>
                <label>Straße</label>
                <input placeholder="Straße" name="street" onChange={this.handleChange}/>
                <label>Hausnummer</label>
                <input placeholder="Hausnummer" name="houseNumber" onChange={this.handleChange}/>
                <Button id="button-send-ticket">Senden</Button>
            </div>
        );
    }
}

export default connect(state => { return state; })(TicketForm);