import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import StepInit from './StepInit';
import SelectionStep from './SelectionStep';
import StepEnd from "./StepEnd";
import TicketForm from "./TicketForm";
import TicketConfirmation from "./TicketConfirmation";
import FunctionalityStep from "./FunctionalityStep";

class Steps extends Component {

    steps = [
        <StepInit/>,
        <FunctionalityStep/>,
        <SelectionStep
            id={1}
            text="Wähle den Typen des Geräts."
            entities={[
                "Smartphone",
                "Smartwatch"
            ]}
            action={selectionActions.getSelectDeviceTypeAction}
        />,
        <SelectionStep
            id={2}
            text="Wähle den Hersteller des Geräts."
            entities={[
                "Samsung",
                "Huawei"
            ]}
            action={selectionActions.getSelectBrandAction}
        />,
        <SelectionStep
            id={3}
            text="Wähle das Modell des Geräts."
            entities={[
                "Samsung Galaxy S20",
                "Samsung Galaxy S21",
                "Samsung Galaxy S22",
                "Samsung Galaxy S23"
            ]}
            action={selectionActions.getSelectModelAction}
        />,
        <SelectionStep
            id={4}
            text="Wähle die Farbe des Modells."
            entities={[
                "Black",
                "White",
                "Purple"
            ]}
            action={selectionActions.getSelectColorAction}
        />,
        <SelectionStep
            id={5}
            text="Wie viel Speicherplatz bietet das Modell?"
            entities={[
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB"
            ]}
            action={selectionActions.getSelectInternalMemoryAction}
        />,
        <SelectionStep
            id={6}
            text="In welchem Zustand befindet sich das Gerät?"
            entities={[
                "Wie neu",
                "Sehr gut",
                "Gut",
                "Akzeptabel"
            ]}
            action={selectionActions.getSelectConditionAction}
        />,
        <StepEnd/>,
        <TicketForm/>,
        <TicketConfirmation/>
    ];
    
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
    }

    handleClickBack(e) {
        e.preventDefault();
        const step = this.props.selection.step - 1;
        this.props.selectStep(step);
        this.props.resetStatePart(step);
        window.scrollTo(0, 0);
    }

    render() {
        const step = this.props.selection.step;

        return (
            <div className="Steps">
                {step >= this.steps.length &&
                    <div className="step-header">
                        <h2>Ankauf</h2>
                    </div>
                }
                {step < this.steps.length &&
                    this.steps[step]
                }
                {step !== 0 && step < this.steps.length - 1 &&
                    <Button id="button-back" variant="secondary" onClick={this.handleClickBack}>
                        Zurück
                    </Button>
                }
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction,
    resetStatePart: selectionActions.getResetStatePartAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(Steps);