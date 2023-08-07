import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col, Modal } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";
import ModelViewer from "../model/ModelViewer";

class ConditionStep extends Component {

    state = {
        showModal: false,
        conditionStep: 0,
        selectedConditions: [0, 0, 0, 0]
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleClickModalSelection = this.handleClickModalSelection.bind(this);
        this.handleClickModalConditionStep = this.handleClickModalConditionStep.bind(this);
        this.handleClickModalContinue = this.handleClickModalContinue.bind(this);
        this.handleClickModalBack = this.handleClickModalBack.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(this.props.action(e.currentTarget.getAttribute("name")));
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
        e.preventDefault();
        this.setState({
            showModal: true
        });
    }

    handleCloseModal(e) {
        this.setState({
            showModal: false
        });
    }

    handleClickModalBack(e) {
        e.preventDefault();
        this.setState({
            conditionStep: this.state.conditionStep - 1
        });
    }

    handleClickModalContinue(e) {
        e.preventDefault();
        this.setState({
            conditionStep: this.state.conditionStep + 1
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

    render() {
        let i = 0;
        let breadcrumbs = [];

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
                            <Button variant="secondary" size="lg" onClick={this.handleClickModalBack}>Zurück</Button>
                            <Button id="condition-modal-continue" size="lg" onClick={this.handleClickModalContinue}>Weiter</Button>
                        </Modal.Footer>
                    </div>
                </Modal>
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <div id="selection-breadcrumbs">{breadcrumbs}</div>
                <p id="determine-condition-link" onClick={this.handleOpenModal}>Zustand ermitteln</p>
                <div className="selection">
                    <Col>
                        <Button variant="light" name="Wie neu" onClick={this.handleClick}>
                            <IconPreview image="./states/state_wie_neu.png"/>
                            <p className="button-text">Wie neu</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Sehr gut" onClick={this.handleClick}>
                            <IconPreview image="./states/state_sehr_gut.png"/>
                            <p className="button-text">Sehr gut</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Gut" onClick={this.handleClick}>
                            <IconPreview image="./states/state_gut.png"/>
                            <p className="button-text">Gut</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Akzeptabel" onClick={this.handleClick}>
                            <IconPreview image="./states/state_akzeptabel.png"/>
                            <p className="button-text">Akzeptabel</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                </div>
            </div>
        );
    }
}

export default connect(state => { return state; })(ConditionStep);