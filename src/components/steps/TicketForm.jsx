import { Component } from "react";
import { Button, Container, Form, Col } from "react-bootstrap";
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
        validated: false,
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
        if (!e.currentTarget.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, 0);
        }

        this.setState({
            validated: true
        });

        for (const entry in this.state) {
            if (this.state.hasOwnProperty(entry) && this.state[entry] !== undefined && this.state[entry].length < 1) {
                window.scrollTo(0, 0);
                return;
            }
        }

        if (!this.state.email.includes('@') || this.state.email.length < 3 || this.state.email !== this.state.emailConfirm) {
            window.scrollTo(0, 0);
            return;
        }

        if (!this.state.checked) {
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="ticket-form">
                <Container className="ticket-form">
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleClick}>
                        <br/>
                        <h3>Kundendaten</h3>
                        <br/>
                        <div id="customer-data">
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="8"
                                    name="formOfAdress"
                                    placeholder="Anrede"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine Anrede mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="32"
                                    placeholder="Vorname"
                                    name="firstName"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deinen Vornamen mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="32"
                                    placeholder="Nachname"
                                    name="lastName"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deinen Nachnamen mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="email"
                                    maxLength="254"
                                    placeholder="E-Mail"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine E-Mail-Adresse mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="email"
                                    maxLength="254"
                                    placeholder="E-Mail bestätigen"
                                    name="emailConfirm"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte gebe deine E-Mail-Adresse erneut ein.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="number"
                                    min={0}
                                    max={999999}
                                    placeholder="Postleitzahl"
                                    name="postalCode"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine Postleitzahl mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="64"
                                    placeholder="Wohnort"
                                    name="demicile"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deinen Wohnort mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="64"
                                    placeholder="Straße"
                                    name="street"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine Straße mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="4"
                                    placeholder="Hausnummer"
                                    name="houseNumber"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine Hausnummer mit.</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <br/>
                        <br/>
                        <h3>Zusatzdaten</h3>
                        <br/>
                        <div id="additional-data">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    IMEI-Nummer
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    minLength="15"
                                    maxLength="15"
                                    placeholder="IMEI-Nummer des Geräts"
                                    name="imei"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Eine IMEI hat 15 Stellen.</Form.Control.Feedback>
                            </Form.Group>
                            <div id="delivery-service">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        Lieferdienst
                                    </Form.Label>
                                    <Form.Select id="delivery-service-selection">
                                        <option className="form-option">DHL</option>
                                        <option className="form-option">DPD</option>
                                        <option className="form-option">UPS</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div id="payment-method">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        Zahlungswunsch
                                    </Form.Label>
                                    <Form.Select id="payment-method-selection">
                                        <option className="form-option">Banküberweisung</option>
                                        <option className="form-option">Gutschein (mit Bonus)</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            {/* Je nach Zahlungswunsch anders rendern*/}
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    minLength="27"
                                    maxLength="27"
                                    placeholder="IBAN"
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns deine IBAN mit.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    required
                                    type="text"
                                    maxLength="16"
                                    placeholder="BIC"
                                />
                                <Form.Control.Feedback type="invalid">Bitte teile uns den BIC deiner Bank mit.</Form.Control.Feedback>
                            </Form.Group>
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
                        <Button disabled={!this.state.checked} id="button-send-ticket" onClick={this.handleClick}>Senden</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(TicketForm);