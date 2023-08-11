import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Modal, Card } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import ModelViewer from "../model/ModelViewer";

class ConditionStep extends Component {

    state = {
        showModal: false,
        showResultModal: false,
        conditionStep: 0,
        selectedConditions: [0, 0, 0, 0],
        resultDetails: [],
        result: undefined
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenResultModal = this.handleOpenResultModal.bind(this);
        this.handleCloseResultModal = this.handleCloseResultModal.bind(this);
        this.handleClickModalSelection = this.handleClickModalSelection.bind(this);
        this.handleClickModalConditionStep = this.handleClickModalConditionStep.bind(this);
        this.handleClickModalContinue = this.handleClickModalContinue.bind(this);
        this.handleClickModalBack = this.handleClickModalBack.bind(this);
        this.handleClickModalFinish = this.handleClickModalFinish.bind(this);
        this.handleClickModalFinishBack = this.handleClickModalFinishBack.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(this.props.action(this.state.result));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleBreadcrumbClick(e) {
        e.preventDefault();
        const step = Number(e.currentTarget.name) - 3;
        this.props.dispatch(selectionActions.getResetStatePartAction(step));
        this.props.dispatch(selectionActions.getSelectStepAction(step));
        window.scrollTo(0, 0);
    }

    handleOpenModal(e) {
        this.setState({
            showModal: true
        });
    }

    handleOpenResultModal() {
        const areas = ["Display", "Rahmen", "Rückseite", "Kamera"];
        const conditions = ["Keine Spuren", "Leichte Spuren", "Stärkere Spuren", "Leichte Kerben/Risse", "Kerben/Risse"];
        const results = ["Wie neu", "Sehr gut", "Gut", "Akzeptabel", "Inakzeptabel"];
        let i = 0;
        let score = 0;
        let rawDetails = [];

        for (const condition of this.state.selectedConditions) {
            rawDetails.push([areas[i++], conditions[condition]]);
            score += condition * 1.7;
        }

        i = 0;

        score /= areas.length;
        score = Math.round(Math.max(0.0, Math.min(results.length - 1, score - 0.51)));

        const details = [];

        for (const pair of rawDetails) {
            if (i !== 0) {
                details.push(<hr key={-i}/>);
            }

            details.push(<p key={i}><strong>{pair[0]}</strong><br/><i>{pair[1]}</i></p>);
            i++;
        }

        // console.log(results[score]);
        // console.log(score);

        this.setState({
            showResultModal: true,
            resultDetails: details,
            result: results[score]
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        });
    }

    handleCloseResultModal() {
        this.setState({
            showResultModal: false
        });
    }

    handleClickModalBack(e) {

        const step = this.state.conditionStep - 1;

        if (step < 0) {
            return;
        }

        this.setState({
            conditionStep: step
        });
    }

    handleClickModalContinue(e) {
        const step = this.state.conditionStep + 1;

        if (step >= this.state.selectedConditions.length) {
            return;
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

        const conditions = [...this.state.selectedConditions];
        conditions[this.state.conditionStep] = Number(e.currentTarget.getAttribute("name"));

        this.setState({
            selectedConditions: conditions
        });
    }

    handleClickModalFinish(e) {
        this.handleCloseModal();
        this.handleOpenResultModal();
    }

    handleClickModalFinishBack(e) {
        this.handleCloseResultModal();
        this.handleOpenModal();
    }

    render() {
        let i = 0;
        const breadcrumbs = [];

        for (const entry in this.props.selection) {
            if (i++ === 0 || !this.props.selection.hasOwnProperty(entry)) {
                continue;
            }

            const selection = this.props.selection[entry];

            if (!selection) {
                continue;
            }

            const step = i + 2;
            breadcrumbs.push(<a href="/" key={step} name={step} onClick={this.handleBreadcrumbClick}>{selection + " /"}</a>);
        }

        i = 0;

        const selectedCondition = this.state.selectedConditions[this.state.conditionStep];
        const conditionAvailable = this.state.result !== undefined;

        return (
            <div className="step" id={this.props.id}>
                <Modal id="condition-modal" show={this.state.showModal} onHide={this.handleCloseModal}>
                    <div id="condition-modal-content">
                        <Modal.Header id="condition-modal-header" closeButton>
                            <p className={this.state.conditionStep === 0 ? "condition-modal-selected-step" : ""} name={0} onClick={this.handleClickModalConditionStep}>Display</p>
                            <p className={this.state.conditionStep === 1 ? "condition-modal-selected-step" : ""} name={1} onClick={this.handleClickModalConditionStep}>Rahmen</p>
                            <p className={this.state.conditionStep === 2 ? "condition-modal-selected-step" : ""} name={2} onClick={this.handleClickModalConditionStep}>Rückseite</p>
                            <p className={this.state.conditionStep === 3 ? "condition-modal-selected-step" : ""} name={3} onClick={this.handleClickModalConditionStep}>Kamera</p>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="condition-modal-selection">
                                <div id="condition-modal-selection-buttons">
                                    <h2>{["Display", "Rahmen", "Rückseite", "Kamera"][this.state.conditionStep] /* dynamisch über den Titel erhalten? */}</h2>
                                    <br/>
                                    <Button className={selectedCondition === 0 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="0" onClick={this.handleClickModalSelection}>Keine Spuren</Button>
                                    <Button className={selectedCondition === 1 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="1" onClick={this.handleClickModalSelection}>Leichte Spuren</Button>
                                    <Button className={selectedCondition === 2 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="2" onClick={this.handleClickModalSelection}>Stärkere Spuren</Button>
                                    <Button className={selectedCondition === 3 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="3" onClick={this.handleClickModalSelection}>Leichte Kerben/Risse</Button>
                                    <Button className={selectedCondition === 4 ? "condition-modal-selected-condition" : ""} size="lg" variant="light" name="4" onClick={this.handleClickModalSelection}>Kerben/Risse</Button>
                                </div>
                                <ModelViewer src={
                                    [
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
                            <Button id="condition-modal-continue" size="lg" hidden={this.state.conditionStep >= this.state.selectedConditions.length - 1} onClick={this.handleClickModalContinue}>Weiter</Button>
                            <Button id="condition-modal-finished" size="lg" hidden={this.state.conditionStep < this.state.selectedConditions.length - 1} onClick={this.handleClickModalFinish}>Fertig</Button>
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
                                        <img id="condition-modal-result-image" src="./s20.png" alt=""></img>
                                        <br/>
                                        <br/>
                                        <h2>{this.state.result}</h2>
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
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <h2>{conditionAvailable ? "Zustand: " + this.state.result : "Noch keinen Zustand ermittelt."}</h2>
                <br/>
                <br/>
                <div id="condition-buttons">
                    <Button hidden={!conditionAvailable} id="condition-continue-button" onClick={this.handleClick}>Bestätigen</Button>
                    <Button id="determine-condition-button" onClick={this.handleOpenModal}>{conditionAvailable ? "Erneut ermitteln" : "Zustand ermitteln"}</Button>
                </div>
            </div>
        );
    }
}

export default connect(state => { return state; })(ConditionStep);