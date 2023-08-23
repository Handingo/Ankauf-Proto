import "./FunctionalityTest.css";
import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import * as selectionActions from "../../../actions/SelectionActions";

class FunctionalityTest extends Component {

    state = {
        showModal: true,
        result: undefined
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
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

    render() {
        const functionalityAvailable = this.state.result !== undefined;

        return (
            <div id="functionality-test">
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <h3>{functionalityAvailable ? this.state.result : "Bitte überprüfe die Funktionsfähigkeit deines Geräts."}</h3>
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
                            <input type="checkbox" name="display" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Display</strong> Funktioniert das Display einwandfrei?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="call" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Telefon</strong> Kann man klar & deutlich telefonieren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="battery" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Akku</strong> Hält der Akku in Betrieb länger als 4 Std.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="camera" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Kamera</strong> Funktionieren alle Kameras tadellos?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="connectivity" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Verbindung</strong> Funktionieren WLAN, Bluetooth, etc.?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="performance" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Leistung</strong> Lässt sich das Gerät flüssig bedienen?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="authentication" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Biometrie</strong> Funktioniert das Entsperren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="sensors" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Sensoren</strong> Funktionieren alle Lagesensoren?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="buttons" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Knöpfe</strong> Funktionieren sämtliche Knöpfe?</p>
                        </div>
                        <div className="functionality-test-row">
                            <input type="checkbox" name="storage" onChange={this.handleChangeCheckbox}/>
                            <p><strong>Speicher</strong> Lassen sich der vorhandene Speicher und ggf. die SD-Karte komplett nutzen? </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="functionality-modal-finished" size="lg" onClick={this.handleClickModalFinish}>Fertig</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default FunctionalityTest;