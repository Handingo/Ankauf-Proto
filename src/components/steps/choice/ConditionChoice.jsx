import "./ConditionChoice.css";
import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Card } from "react-bootstrap";
import * as selectionActions from "../../../actions/SelectionActions";
import * as conditionActions from "../../../actions/ConditionActions";
import ModelViewer from "../../model/ModelViewer";

class ConditionChoice extends Component {

    state = {
        showModal: false,
        showResultModal: false,
        conditionStep: 0, // condition value of currently selected device part
        resultDetails: []
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleOpenResultModal = this.handleOpenResultModal.bind(this);
        this.handleCloseResultModal = this.handleCloseResultModal.bind(this);
        this.handleClickModalSelection = this.handleClickModalSelection.bind(this);
        this.handleClickModalConditionStep = this.handleClickModalConditionStep.bind(this);
        this.handleClickModalContinue = this.handleClickModalContinue.bind(this);
        this.handleClickModalBack = this.handleClickModalBack.bind(this);
        this.handleClickModalFinish = this.handleClickModalFinish.bind(this);
        this.handleClickModalFinishBack = this.handleClickModalFinishBack.bind(this);
    }

    // gets clicked/called when the user finished the condition process
    handleClick() {
        // go to next step
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleOpenResultModal() {
        const areas = ["Display", "Rahmen", "Rückseite", "Kamera"];
        const conditions = ["Keine Spuren", "Leichte Spuren", "Stärkere Spuren", "Kerben/Risse", "Stärkere Kerben/Risse"];
        const results = ["Wie neu", "Sehr gut", "Gut", "Akzeptabel", "Inakzeptabel"];
        let i = 0;
        let score = 0; // the higher the score, the worse the condition
        let rawDetails = [];

        for (const condition of this.props.condition.selectedConditions) {
            rawDetails.push([areas[i++], conditions[condition]]);
            score += condition * 1.7;
        }

        i = 0;

        score /= areas.length; // scale score to amount of areas to get the average score
        score = Math.round(Math.max(0.0, Math.min(results.length - 1, score - 0.51))); // map score to readable condition

        const details = [];

        // prepare HTML elements for the result modal
        for (const pair of rawDetails) {
            if (i !== 0) {
                details.push(<hr key={-i}/>);
            }

            details.push(<p key={i}><strong>{pair[0]}</strong><br/><i>{pair[1]}</i></p>);
            i++;
        }

        // push readable condition into Redux cache
        this.props.dispatch(conditionActions.getResultAction(results[score]));

        // push HTML part into local state and display the result modal
        this.setState({
            showResultModal: true,
            resultDetails: details
        });
    }

    handleCloseResultModal() {
        this.setState({
            showResultModal: false
        });
    }

    handleClickModalBack() {
        const step = this.state.conditionStep - 1;

        if (step < 0) {
            return; // reached first condition step
        }

        this.setState({
            conditionStep: step
        });
    }

    handleClickModalContinue() {
        const step = this.state.conditionStep + 1;

        if (step >= this.props.condition.selectedConditions.length) {
            return; // reached last condition step
        }

        this.setState({
            conditionStep: step
        });
    }

    handleClickModalConditionStep(e) {
        e.preventDefault();
        this.setState({
            conditionStep: Number(e.currentTarget.getAttribute("name"))
        });
    }

    handleClickModalSelection(e) {
        e.preventDefault();

        const part = this.state.conditionStep;
        const condition = Number(e.currentTarget.getAttribute("name"));
        // push selected condition of a specific device part into Redux cache
        this.props.dispatch(conditionActions.getSelectPartConditionAction(part, condition));
    }

    handleClickModalFinish(e) {
        this.handleModal();
        this.handleOpenResultModal();
    }

    handleClickModalFinishBack(e) {
        this.handleCloseResultModal();
        this.handleModal();
    }

    render() {
        const selectedCondition = this.props.condition.selectedConditions[this.state.conditionStep];
        const conditionAvailable = this.props.condition.result !== undefined;
        const areas = ["Display", "Rahmen", "Rückseite", "Kamera"];

        return (
            <div className="step" id={this.props.id}>
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <h3>{conditionAvailable ? "Zustand: " + this.props.condition.result : "Noch keinen Zustand ermittelt."}</h3>
                <br/>
                <br/>
                <div id="condition-buttons">
                    <Button hidden={!conditionAvailable} id="condition-continue-button" onClick={this.handleClick}>Bestätigen</Button>
                    <Button id="determine-condition-button" onClick={this.handleModal}>{conditionAvailable ? "Erneut ermitteln" : "Zustand ermitteln"}</Button>
                </div>
                <Modal id="condition-modal" show={this.state.showModal} onHide={this.handleModal}>
                    <div id="condition-modal-content">
                        <Modal.Header id="condition-modal-header" closeButton>
                            <p className={this.state.conditionStep === 0 ? "condition-modal-selected-step" : ""} name="0" onClick={this.handleClickModalConditionStep}>{areas[0]}</p>
                            <p className={this.state.conditionStep === 1 ? "condition-modal-selected-step" : ""} name="1" onClick={this.handleClickModalConditionStep}>{areas[1]}</p>
                            <p className={this.state.conditionStep === 2 ? "condition-modal-selected-step" : ""} name="2" onClick={this.handleClickModalConditionStep}>{areas[2]}</p>
                            <p className={this.state.conditionStep === 3 ? "condition-modal-selected-step" : ""} name="3" onClick={this.handleClickModalConditionStep}>{areas[3]}</p>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="condition-modal-selection">
                                <div id="condition-modal-selection-buttons">
                                    <h2>{areas[this.state.conditionStep]}</h2>
                                    <br/>
                                    <Button className={selectedCondition === 0 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="0" onClick={this.handleClickModalSelection}>Keine Spuren</Button>
                                    <Button className={selectedCondition === 1 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="1" onClick={this.handleClickModalSelection}>Leichte Spuren</Button>
                                    <Button className={selectedCondition === 2 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="2" onClick={this.handleClickModalSelection}>Stärkere Spuren</Button>
                                    <Button className={selectedCondition === 3 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="3" onClick={this.handleClickModalSelection}>Kerben/Risse</Button>
                                    <Button className={selectedCondition === 4 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="4" onClick={this.handleClickModalSelection}>Stärkere Kerben/Risse</Button>
                                </div>
                                <ModelViewer src={
                                    [ // should get connected to a database or a stable content webpage
                                        "models/00_Perfekt.glb",
                                        "models/01_WieNeu_Model.glb",
                                        "models/02_SehrGut_Model.glb",
                                        "models/03_Gut_Model.glb",
                                        "models/04_Akzeptabel_Model.glb"
                                    ][selectedCondition]
                                }/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" size="lg" hidden={this.state.conditionStep < 1} onClick={this.handleClickModalBack}>Zurück</Button>
                            <Button id="condition-modal-continue" size="lg" hidden={this.state.conditionStep >= this.props.condition.selectedConditions.length - 1} onClick={this.handleClickModalContinue}>Weiter</Button>
                            <Button id="condition-modal-finished" size="lg" hidden={this.state.conditionStep < this.props.condition.selectedConditions.length - 1} onClick={this.handleClickModalFinish}>Fertig</Button>
                        </Modal.Footer>
                    </div>
                </Modal>
                <Modal id="condition-modal" show={this.state.showResultModal} onHide={this.handleCloseResultModal}>
                    <div id="condition-modal-content">
                        <Modal.Header id="condition-modal-header" closeButton>
                            <h2>Zustandseinschätzung</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="condition-modal-result">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            Angaben
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body id="condition-modal-result-details">
                                        {this.state.resultDetails}
                                    </Card.Body>
                                </Card>
                                <Card id="condition-modal-result-info">
                                    <Card.Header>
                                        <Card.Title>
                                            Resultat
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body id="condition-modal-result-info-body">
                                        <img id="condition-modal-result-image" src="./smartphones/s20.png" alt=""></img>
                                        <br/>
                                        <br/>
                                        <h2>{this.props.condition.result}</h2>
                                        <br/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" size="lg" onClick={this.handleClickModalFinishBack}>Zurück</Button>
                            <Button id="condition-modal-continue" size="lg" onClick={this.handleClick}>Bestätigen</Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(state => { return state; })(ConditionChoice);