import { Component } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../actions/SelectionActions';

class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    state = {
        formOfAdress: "",
        firstName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        postalCode: "",
        demicile: "",
        street: "",
        houseNumber: "",
        checked: false
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleChangeCheckbox(e) {
        const {name, checked} = e.currentTarget;
        this.setState({ [name]: checked });
    }

    handleClick(e) {
        e.preventDefault();

        for (const entry in this.state) {
            if (this.state.hasOwnProperty(entry) && this.state[entry] && this.state[entry].length < 1) {
                return;
            }
        }

        if (!this.state.email.includes('@') || this.state.email.length < 3 || this.state.email !== this.state.emailConfirm) {
            return;
        }

        if (!this.state.checked) {
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    render() {
        // <FormControl type="file" name="photos" onChange={this.handleChange}/>
        return (
            <div id="ticket-form">
                <Container className="ticket-form">
                    <Form>
                        <br/>
                        <h3>Kundendaten</h3>
                        <br/>
                        <div id="customer-data">
                            <FormControl type="input" placeholder="Anrede" name="formOfAdress" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Vorname" name="firstName" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Nachname" name="lastName" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="E-Mail" name="email" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="E-Mail bestätigen" name="emailConfirm" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Postleitzahl" name="postalCode" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Wohnort" name="demicile" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Straße" name="street" onChange={this.handleChange}/>
                            <FormControl type="input" placeholder="Hausnummer" name="houseNumber" onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <br/>
                        <h3>Zusatzdaten</h3>
                        <div id="additional-data">
                            <div id="delivery-service">
                                <Form.Label>
                                    Lieferdienst
                                </Form.Label>
                                <Form.Select id="delivery-service-selection">
                                    <option className="form-option">DHL</option>
                                    <option className="form-option">DPD</option>
                                    <option className="form-option">UPS</option>
                                </Form.Select>
                            </div>
                            <div id="payment-method">
                                <Form.Label>
                                    Zahlungswunsch
                                </Form.Label>
                                <Form.Select id="payment-method-selection">
                                    <option className="form-option">Banküberweisung</option>
                                    <option className="form-option">Gutschein (mit Bonus)</option>
                                </Form.Select>
                            </div>
                            {/* Je nach Zahlungswunsch anders rendern*/}
                            <FormControl type="input" placeholder="IBAN"/>
                            <FormControl type="input" placeholder="BIC"/>
                        </div>
                        <br/>
                        <p>
                            Ich bestätige, dass die von mir getätigten Angaben der Wahrheit entsprechen und schicke das Gerät angemessen verpackt an die Firmenadresse
                            von Handingo.de. Das eingesendete Gerät verfügt über ein CE-Zeichen und befindet sich in einem Zustand, in welchem es möglichst einfach auf
                            Werkseinstellungen zurückgesetzt werden kann. Außerdem bin ich damit einverstanden, dass Schutzmaßnahmen, wie Displayfolien, ggf. restlos
                            entfernt werden, damit das Gerät ausreichend geprüft werden kann.
                            <br/><br/>
                            Zu guter Letzt habe ich die <a href="https://handingo.de/policies/terms-of-service">AGB</a> sowie <a href="https://handingo.de/policies/privacy-policy">Datenschutzerklärung</a> gelesen und akzeptiere sie.
                            <br/><br/>
                            <input type="checkbox" name="checked" onChange={this.handleChangeCheckbox}/>
                            <br/>
                        </p>
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