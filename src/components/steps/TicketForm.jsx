import { Component } from "react";
import { Button } from "react-bootstrap";
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
        houseNumber: ""
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleClick(e) {
        e.preventDefault();

        for (const entry in this.state) {
            if (this.state.hasOwnProperty(entry) && this.state[entry].length < 1) {
                return;
            }
        }

        if (!this.state.email.includes('@') || this.state.email.length < 3 || this.state.email !== this.state.emailConfirm) {
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
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
                <label>E-Mail bestätigen</label>
                <input placeholder="E-Mail bestätigen" name="emailConfirm" onChange={this.handleChange}/>
                <label>Wohnort</label>
                <input placeholder="Wohnort" name="demicile" onChange={this.handleChange}/>
                <label>Straße</label>
                <input placeholder="Straße" name="street" onChange={this.handleChange}/>
                <label>Hausnummer</label>
                <input placeholder="Hausnummer" name="houseNumber" onChange={this.handleChange}/>
                <label htmlFor="file-input">Fotos des Geräts</label>
                <input name="photos" type="file"/>
                <Button id="button-send-ticket" onClick={this.handleClick}>Senden</Button>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(TicketForm);