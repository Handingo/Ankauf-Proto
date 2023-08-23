import "./FunctionalityTest.css";
import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import * as functionalityActions from "../../../actions/FunctionalityActions";
import * as selectionActions from "../../../actions/SelectionActions";
import { connect } from "react-redux";

class FunctionalityTest extends Component {

    state = {
        showModal: false,
        data: {
            display: false,
            call: false,
            battery: false,
            camera: false,
            connectivity: false,
            performance: false,
            biometry: false,
            sensors: false,
            buttons: false,
            storage: false
        }
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

        // TODO - defaultChecked wird noch falsch gesetzt
        /*if (this.props.functionality.functionalityDetails) {
            for (const entry in this.props.functionality.functionalityDetails) {
                this.state[entry] = this.props.functionality.functionalityDetails[entry];
                console.log(this.state[entry])
            }
        }*/
    }

    handleClick() {
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleChangeCheckbox(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.currentTarget.getAttribute("name")]: e.currentTarget.checked
            }
        }, () => {
            this.props.dispatch(functionalityActions.getFunctionalityDetailsAction(this.state.data));
        });
        // console.log(this.props.functionality.functionalityDetails);
    }

    render() {
        const functionalityAvailable = this.props.functionality.functionalityDetails !== undefined;

        return (
            <div id="functionality-test">
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <h3>{functionalityAvailable ? "Du hast die Überprüfung durchgeführt." : "Bitte überprüfe die Funktionsfähigkeit deines Geräts."}</h3>
                <br/>
                <br/>
                <div id="functionality-buttons">
                    <Button hidden={!functionalityAvailable} id="functionality-test-continue-button" onClick={this.handleClick}>Bestätigen</Button>
                    <Button id="determine-functionality-button" onClick={this.handleModal}>{functionalityAvailable ? "Erneut prüfen" : "Funktionen prüfen"}</Button>
                </div>
                <Modal id="functionality-modal" show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <h4>Funktionsüberprüfung</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bitte setze bei <u>zutreffenden</u> Punkten einen Haken.</p>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="display" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.display} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Display</strong> Funktioniert das Display einwandfrei?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="call" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.call} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Telefon</strong> Kann man klar & deutlich telefonieren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="battery" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.battery} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Akku</strong> Hält der Akku in Betrieb länger als 4 Std.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="camera" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.camera} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Kamera</strong> Funktionieren alle Kameras tadellos?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="connectivity" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.connectivity} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Verbindung</strong> Funktionieren WLAN, Bluetooth, etc.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="performance" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.performance} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Leistung</strong> Lässt sich das Gerät flüssig bedienen?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="biometry" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.biometry} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Biometrie</strong> Funktioniert das Entsperren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="sensors" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.sensors} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Sensoren</strong> Funktionieren alle Lagesensoren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="buttons" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.buttons} onChange={this.handleChangeCheckbox}/>
                            <p><strong>Knöpfe</strong> Funktionieren sämtliche Knöpfe?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="storage" defaultChecked={functionalityAvailable && this.props.functionality.functionalityDetails.storage} onChange={this.handleChangeCheckbox}/>
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

export default connect(state => { return state; })(FunctionalityTest);