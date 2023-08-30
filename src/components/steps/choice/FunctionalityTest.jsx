import "./FunctionalityTest.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as functionalityActions from "../../../actions/FunctionalityActions";
import * as selectionActions from "../../../actions/SelectionActions";
import { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class FunctionalityTest extends Component {

    state = {
        showModal: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    handleClick() {
        // go to next step
        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    handleModal() {
        this.setState({
            showModal: !this.state.showModal
        }, () => { // register callback
            if (this.state.showModal) {
                this.props.checkDetails(); // mark that the user already visited the modal
            }
        }); 
    }

    handleChangeCheckbox(e) {
        this.props.setFunctionality(e.currentTarget.getAttribute("name"), e.currentTarget.checked);
        console.log(this.props.functionality.details);
    }

    render() {
        const firstTime = !this.props.functionality.checkedDetails;

        return (
            <div id="functionality-test">
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <h3>{!firstTime ? "Du hast die Überprüfung durchgeführt." : "Bitte beschreibe die Funktionsfähigkeit deines Geräts."}</h3>
                <br/>
                <br/>
                <div id="functionality-buttons">
                    <Button hidden={firstTime} id="functionality-test-continue-button" onClick={this.handleClick}>Bestätigen</Button>
                    <Button id="determine-functionality-button" onClick={this.handleModal}>{!firstTime ? "Erneut prüfen" : "Funktionen prüfen"}</Button>
                </div>
                <Modal id="functionality-modal" show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <h4>Funktionsüberprüfung</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bitte setze bei <u>zutreffenden</u> Punkten einen Haken.</p>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="display" defaultChecked={this.props.functionality.details.display} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Display</strong> Funktioniert das Display einwandfrei?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="call" defaultChecked={this.props.functionality.details.call} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Telefon</strong> Kann man klar & deutlich telefonieren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="battery" defaultChecked={this.props.functionality.details.battery} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Akku</strong> Hält der Akku in Betrieb länger als 4 Std.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="camera" defaultChecked={this.props.functionality.details.camera} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Kamera</strong> Funktionieren alle Kameras tadellos?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="connectivity" defaultChecked={this.props.functionality.details.connectivity} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Verbindung</strong> Funktionieren WLAN, Bluetooth, etc.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="performance" defaultChecked={this.props.functionality.details.performance} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Leistung</strong> Lässt sich das Gerät flüssig bedienen?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="biometry" defaultChecked={this.props.functionality.details.biometry} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Biometrie</strong> Funktioniert das Entsperren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="sensors" defaultChecked={this.props.functionality.details.sensors} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Sensoren</strong> Funktionieren alle Lagesensoren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="buttons" defaultChecked={this.props.functionality.details.buttons} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Knöpfe</strong> Funktionieren sämtliche Knöpfe?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="storage" defaultChecked={this.props.functionality.details.storage} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Speicher</strong> Lassen sich der vorhandene Speicher und ggf. die SD-Karte komplett nutzen? </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="functionality-modal-finished" size="lg" onClick={this.handleClick}>Fertig</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction,
    setFunctionality: functionalityActions.getFunctionalityDetailAction,
    checkDetails: functionalityActions.getCheckDetailsAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(FunctionalityTest);