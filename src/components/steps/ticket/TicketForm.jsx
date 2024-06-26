import "./TicketForm.css";
import { Component } from "react";
import { Button, Container, Form, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../../actions/SelectionActions';
import IconInfo from "../../util/icon/IconInfo";
import Link from "../../util/Link";
// import { isValidIBAN, isValidBIC } from "../../util/BankUtil"

class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleClickImeiHelp = this.handleClickImeiHelp.bind(this);
        this.handleClickFirmwareHelp = this.handleClickFirmwareHelp.bind(this);
        this.handleClickPaymentBank = this.handleClickPaymentBank.bind(this);
        this.handleClickPaymentPaypal = this.handleClickPaymentPaypal.bind(this);
        this.handleClickPaymentBonus = this.handleClickPaymentBonus.bind(this);
        this.handleClickPaymentBonusInfo = this.handleClickPaymentBonusInfo.bind(this);
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
        imei: "",
        paypalName: "",
        iban: "",
        bic: "",
        showImeiHelp: false,
        showFirmwareHelp: false,
        showPaymentBankInput: false,
        showPaymentPaypalInput: false,
        showPaymentBonusInfoModal: false,
        chosePayment: false,
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

        // checks whether some fields aren't filled yet
        for (const entry in this.state) {
            // ignore Paypal name field when this method is not selected
            if (entry === "paypalName" && !this.state.showPaymentPaypalInput) {
                continue;
            }

            // ignore bank fields when this method is not selected
            if ((entry === "iban" || entry === "bic") && !this.state.showPaymentBankInput) {
                continue;
            }

            // check if the input length of the currently iterated element is greater than 0
            if (!(this.state.hasOwnProperty(entry) && this.state[entry] !== undefined && this.state[entry].length < 1)) {
                continue;
            }

            // search for the element which got detected for no input
            const elements = document.getElementsByName(entry);

            if (elements.length < 1) {
                window.scrollTo(0, 0); // couldn't find the element, just scroll to the top
                return;
            }

            // scroll to the element which got no input
            const elementY = elements[0].getBoundingClientRect().top;
            window.scrollTo(0, window.scrollY + elementY - 150); // 150px as a buffer, otherwise the header would overlap the form field
            return;
        }

        // validate email
        if (!this.state.email.includes('@') || this.state.email.length < 3 || this.state.email !== this.state.emailConfirm) {
            window.scrollTo(0, 225);
            return;
        }

        // did the user chose a payment?
        if (!this.state.chosePayment) {
            window.scrollTo(0, 700); // no? Send him back to the required field
            return;
        }

        // did the user agree to the ToS etc.?
        if (!this.state.checked) {
            return;
        }

        /*if (!isValidBIC(this.state.bic) || !isValidIBAN(this.state.iban)) {
            window.scrollTo(0, 0);
            return;
        }*/

        ////////////////////////////////////////
        // Temporary - printing important data given by the user
        const data = {};
        let i = 0;

        for (const entry in this.props.selection) {
            if (++i === 1) {
                continue;
            }

            data[entry] = this.props.selection[entry];
        }

        i = 0;

        for (const entry in this.props.functionality) {
            data[entry] = this.props.functionality[entry];

            if (++i === 5) {
                break;
            }
        }

        data.conditionResult = this.props.condition.result;
        data.resultValue = this.props.result.resultValue;

        i = 0;

        for (const entry in this.state) {
            data[entry] = this.state[entry];

            if (++i === 13) {
                break;
            }
        }

        const tab = window.open("about:blank", "_blank");
        const content = JSON.stringify(data)
                        .replaceAll("\",\"", "\",<br>&emsp;\"")
                        .replace("{", "{<br>&emsp;")
                        .replaceAll(":{", ":{<br>&emsp;&emsp;")
                        .replaceAll("}", "<br>}")
                        .replace("},\"", "&emsp;},<br>&emsp;\"")
                        .replaceAll("\":", "\": ")
                        .replaceAll(",\"", ", \"");
        tab.document.write("<!DOCTYPE html><html lang=\"de\"><code>" + content + "</code></html>");
        tab.document.close();

        ////////////////////////////////////////

        // go to next step
        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    // user clicked on imei input info icon
    handleClickImeiHelp() {
        this.setState({
            showImeiHelp: !this.state.showImeiHelp
        });
    }

    // user clicked on firmware input info icon
    handleClickFirmwareHelp() {
        this.setState({
            showFirmwareHelp: !this.state.showFirmwareHelp
        });
    }

    // user clicked on the bonus payment selection
    handleClickPaymentBonus() {
        this.setState({
            showPaymentPaypalInput: false,
            showPaymentBankInput: false,
            chosePayment: true
        });
    }

    // user clicked on the bonus payment info icon
    handleClickPaymentBonusInfo() {
        this.setState({
            showPaymentBonusInfoModal: !this.state.showPaymentBonusInfoModal
        });
    }

    // Unfortunately there seems to be no "uncheck" event, so there has to be a handler for each element
    // user clicked on the bank payment selection
    handleClickPaymentBank() {
        this.setState({
            showPaymentPaypalInput: false,
            showPaymentBankInput: true,
            chosePayment: true
        });
    }

    // user clicked on the paypal payment selection
    handleClickPaymentPaypal() {
        this.setState({
            showPaymentPaypalInput: true,
            showPaymentBankInput: false,
            chosePayment: true
        });
    }

    render() {
        return (
            <div id="ticket-form">
                <Container className="ticket-form-container">
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleClick}>
                        <br/>
                        <h3>Kundendaten</h3>
                        <br/>
                        <div id="customer-data">
                            <Form.Group as={Col}>
                                <Form.Control
                                    id="ticket-input-formOfAdress"
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
                                    id="ticket-input-firstName"
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
                                    id="ticket-input-lastName"
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
                                    id="ticket-input-email"
                                    required
                                    autoComplete="true"
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
                                    id="ticket-input-emailConfirm"
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
                                    id="ticket-input-postalCode"
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
                                    id="ticket-input-demicile"
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
                                    id="ticket-input-street"
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
                                    id="ticket-input-houseNumber"
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
                                <Form.Label htmlFor="ticket-input-imei">
                                    <p>IMEI-Nummer <span onClick={this.handleClickImeiHelp}><IconInfo/></span></p>
                                </Form.Label>
                                <Form.Control
                                    id="ticket-input-imei"
                                    required
                                    type="number"
                                    min={100_000_000_000_000}
                                    max={999_999_999_999_999}
                                    placeholder="IMEI-Nummer des Geräts"
                                    name="imei"
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Eine IMEI hat 15 Stellen.</Form.Control.Feedback>
                            </Form.Group>
                            {/*<Form.Group as={Col}>
                                <Form.Label htmlFor="ticket-input-firmware-version">
                                    <p>Firmware-Version <span onClick={this.handleClickFirmwareHelp}><IconInfo/></span></p>
                                </Form.Label>
                                <Form.Control
                                    id="ticket-input-firmware-version"
                                    type="text"
                                    maxLength={48}
                                    placeholder="Firmware-Version des Geräts"
                                />
                            </Form.Group>*/}
                            <div id="delivery-service">
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="delivery-service-selection">
                                        <p>Lieferdienst</p>
                                    </Form.Label>
                                    <Form.Select id="delivery-service-selection">
                                        <option className="form-option">DHL</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <Form.Group id="form-radio-button-selections" as={Col}>
                                <Form.Label>
                                    <p>Auszahlungswunsch</p>
                                </Form.Label>
                                <Col id="payment-method-container">
                                    <div className="payment-method-container-block">
                                        <div className="payment-method-container-row">
                                            <div>
                                                <input type="radio" id="payment-method-bonus" name="payment-method" onClick={this.handleClickPaymentBonus}/>
                                                <p>Gutschein (+10%) &nbsp;<span onClick={this.handleClickPaymentBonusInfo}><IconInfo/></span></p>
                                            </div>
                                            <span><strong>{(1.1 * this.props.result.resultValue).toLocaleString(undefined, { minimumFractionDigits: 2 })} €</strong></span>
                                        </div>
                                    </div>
                                    <div className="payment-method-container-block">
                                        <div className="payment-method-container-row">
                                            <div>
                                                <input type="radio" id="payment-method-paypal" name="payment-method" onClick={this.handleClickPaymentPaypal}/>
                                                <p>PayPal</p>
                                            </div>
                                            <span><strong>{(this.props.result.resultValue).toLocaleString(undefined, { minimumFractionDigits: 2 })} €</strong></span>
                                        </div>
                                        {this.state.showPaymentPaypalInput && 
                                            <div id="payment-method-container-paypal-input">
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        autoComplete="nope"
                                                        required
                                                        type="text"
                                                        minLength="2"
                                                        maxLength="64"
                                                        placeholder="Paypal Name"
                                                        name="paypalName"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Dieser Name ist ungültig. (2-64 Zeichen)</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
                                    <div className="payment-method-container-block">
                                        <div className="payment-method-container-row">
                                            <div>
                                                <input type="radio" id="payment-method-bank" name="payment-method" onClick={this.handleClickPaymentBank}/>
                                                <p>Banküberweisung</p>
                                            </div>
                                            <span><strong>{(this.props.result.resultValue).toLocaleString(undefined, { minimumFractionDigits: 2 })} €</strong></span>
                                        </div>
                                        {this.state.showPaymentBankInput && 
                                            <div id="payment-method-container-bank-input">
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        autoComplete="nope"
                                                        required
                                                        type="text"
                                                        minLength="15"
                                                        maxLength="34"
                                                        placeholder="IBAN"
                                                        name="iban"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Diese IBAN ist ungültig. (15-34 Zeichen)</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        autoComplete="nope"
                                                        required
                                                        type="text"
                                                        minLength="9"
                                                        maxLength="11"
                                                        placeholder="BIC"
                                                        name="bic"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Dieser BIC ist ungültig. (9-11 Zeichen)</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
                                </Col>
                            </Form.Group>
                        </div>
                        <br/>
                        <p id="legal-text">
                            Ich bestätige, dass die von mir getätigten Angaben der Wahrheit entsprechen und schicke das Gerät, sobald meine
                            Anfrage bestätigt wurde, angemessen verpackt und im angegebenen Zustand, an die Firmenadresse von Handingo.de.<br/>
                            Das eingesendete Gerät verfügt über ein CE-Zeichen und befindet sich in einem Zustand, in welchem es möglichst
                            einfach auf Werkseinstellungen zurückgesetzt werden kann.<br/>
                            Außerdem bin ich damit einverstanden, dass Schutzmaßnahmen, wie Displayfolien, ggf. restlos entfernt werden,
                            damit das Gerät ausreichend geprüft werden kann.<br/>
                            <br/>
                            Zu guter Letzt habe ich die <Link newTab text="AGB" href="https://handingo.de/policies/terms-of-service"/> sowie <Link newTab text="Datenschutzerklärung" href="https://handingo.de/policies/privacy-policy"/> gelesen und akzeptiere sie.<br/>
                            <br/><br/>
                            <input type="checkbox" name="checked" onChange={this.handleChangeCheckbox}/>
                            <br/>
                        </p>
                        <Button disabled={!this.state.checked} id="button-send-ticket" onClick={this.handleClick}>Senden</Button>
                    </Form>
                </Container>
                <Modal id="form-help-modal" show={this.state.showImeiHelp} onHide={this.handleClickImeiHelp}>
                    <Modal.Header closeButton>
                        <h5>IMEI-Nummer</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Die IMEI-Nummer (Kurzform für "International Mobile Equipment Identity"-Seriennummer) besteht aus 15 Ziffern und wird dazu verwendet, jedes Smartphone weltweit eindeutig identifizieren zu können.
                        </p>
                        <br/>
                        <h5>Unter Android auslesen:</h5>
                        <p>
                            Solltest du noch die Originalverpackung des Geräts besitzen, dann dürfte die IMEI-Nummer auf dieser hinterlegt sein.<br/>
                            Ansonsten gehe einfach in die Einstellungen des Geräts, klicke (oft ganz unten) auf "Über das Telefon" und "Status".
                            In der darauffolgenden Auflistung sollte sich auch die IMEI-Nummer befinden.
                        </p>
                        <br/>
                        <h5>Unter iOS (Apple) auslesen:</h5>
                        <p>
                            Solltest du noch die Originalverpackung des Geräts besitzen, dann dürfte die IMEI-Nummer auf dieser hinterlegt sein.<br/>
                            Ansonsten gehe einfach in die Einstellungen des Geräts, klicke auf "Allgemein" und "Info".
                            In der darauffolgenden Auflistung sollte sich auch die IMEI-Nummer befinden.
                        </p>
                    </Modal.Body>
                </Modal>
                <Modal id="form-help-firmware-version" show={this.state.showFirmwareHelp} onHide={this.handleClickFirmwareHelp}>
                    <Modal.Header closeButton>
                        <h5>Firmware-Version</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Unter Android auslesen:</h5>
                        <p>
                            Gehe in die Einstellungen deines Geräts und tippe auf "Telefoninfo" oder auch "Info". Anschließend wähle "Softwareinformationen".
                            Unter dem Punkt "Android-Version" sollte sich nun die für uns nützliche Angabe befinden.
                        </p>
                        <br/>
                        <h5>Unter iOS (Apple) auslesen:</h5>
                        <p>
                            Gehe in die Einstellungen deines Geräts und tippe auf "Allgemein". Anschließend wähle "Info".
                            Unter dem Punkt "iOS-Version" sollte sich nun die für uns nützliche Angabe befinden.
                        </p>
                    </Modal.Body>
                </Modal>
                <Modal id="form-help-payment-bonus" show={this.state.showPaymentBonusInfoModal} onHide={this.handleClickPaymentBonusInfo}>
                    <Modal.Header closeButton>
                        <h5>Gutschein mit Bonus</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Erhalte einen Bonus von 10% auf den ausgezahlten Wert, indem du ihn dir gleich für unseren Shop gutschreiben lässt!<br/>
                            Bitte beachte, dass deine oben angegebene E-Mail-Adresse dafür der deines Handingo-Accounts entsprechen muss.
                        </p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(TicketForm);