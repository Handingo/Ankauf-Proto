import { Component } from "react";
import { Button, Container, Form, FormControl, FormLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../actions/SelectionActions';

class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        demicile: "",
        street: "",
        houseNumber: "",
        photos: undefined
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleClick(e) {
        e.preventDefault();

        console.log("hi")
        for (const entry in this.state) {
            if (this.state.hasOwnProperty(entry) && this.state[entry] && this.state[entry].length < 1) {
                return;
            }
        }
        console.log("hi2")
        if (!this.state.email.includes('@') || this.state.email.length < 3 || this.state.email !== this.state.emailConfirm) {
            return;
        }
        console.log("hi3")
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        return (
            <div id="ticket-form">
                <Container className="ticket-form">
                    <Form>
                        <FormLabel>Vorname</FormLabel>
                        <FormControl type="input" placeholder="Vorname" name="firstName" onChange={this.handleChange}/>
                        <FormLabel>Nachname</FormLabel>
                        <FormControl type="input" placeholder="Nachname" name="lastName" onChange={this.handleChange}/>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl type="input" placeholder="E-Mail" name="email" onChange={this.handleChange}/>
                        <FormLabel>E-Mail bestätigen</FormLabel>
                        <FormControl type="input" placeholder="E-Mail bestätigen" name="emailConfirm" onChange={this.handleChange}/>
                        <FormLabel>Wohnort</FormLabel>
                        <FormControl type="input" placeholder="Wohnort" name="demicile" onChange={this.handleChange}/>
                        <FormLabel>Straße</FormLabel>
                        <FormControl type="input" placeholder="Straße" name="street" onChange={this.handleChange}/>
                        <FormLabel>Hausnummer</FormLabel>
                        <FormControl type="input" placeholder="Hausnummer" name="houseNumber" onChange={this.handleChange}/>
                        <FormLabel>Fotos des Geräts</FormLabel>
                        <FormControl type="file" name="photos" onChange={this.handleChange}/>
                    </Form>
                </Container>
                <Button id="button-send-ticket" onClick={this.handleClick}>Senden</Button>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(TicketForm);