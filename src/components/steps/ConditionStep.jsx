import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col, Modal } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";
import ModelViewer from "../model/ModelViewer";

class ConditionStep extends Component {

    state = {
        showModal: true
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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

        return (
            <div className="step" id={this.props.id}>
                <Modal id="condition-modal" show={this.state.showModal} onHide={this.handleCloseModal}>
                    <div id="condition-modal-content">
                        <Modal.Header>
                            <Button>Display</Button>
                            <Button>Rahmen</Button>
                            <Button>Rückseite</Button>
                            <Button>Kamera</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="condition-modal-selection">
                                <div id="condition-modal-selection-buttons">
                                    <h2>Display</h2>
                                    <br/>
                                    <Button size="lg" variant="light">Keine Spuren</Button>
                                    <Button size="lg" variant="light">Leichte Spuren</Button>
                                    <Button size="lg" variant="light">Stärkere Spuren</Button>
                                    <Button size="lg" variant="light">Leichte Kerben oder Risse</Button>
                                    <Button size="lg" variant="light">Kerben oder Risse</Button>
                                </div>
                                <ModelViewer src="https://cdn.shopify.com/s/files/1/0566/7228/8943/files/01_WieNeu_Model_Hinweis.glb"/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button>Weiter</Button>
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