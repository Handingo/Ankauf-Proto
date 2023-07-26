import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import StepInit from './StepInit';
import Step from './Step';
import StepEnd from "./StepEnd";
import TicketForm from "./TicketForm";
import TicketConfirmation from "./TicketConfirmation";

class Steps extends Component {

    steps = [
        <StepInit/>,
        <Step
            id={1}
            text="Wählen Sie Ihren Gerätetypen."
            entities={[
                "Smartphone",
                "Smartwatch"
            ]}
            action={selectionActions.getSelectDeviceTypeAction}
        />,
        <Step
            id={2}
            text="Wählen Sie den Hersteller Ihres Geräts."
            entities={[
                "Samsung",
                "Huawei"
            ]}
            action={selectionActions.getSelectBrandAction}
        />,
        <Step
            id={3}
            text="Wählen Sie Ihr Modell."
            entities={[
                "Samsung Galaxy S20",
                "Samsung Galaxy S21",
                "Samsung Galaxy S22",
                "Samsung Galaxy S23"
            ]}
            action={selectionActions.getSelectModelAction}
        />,
        <Step
            id={4}
            text="Wählen Sie die Farbe Ihres Modells."
            entities={[
                "Black",
                "White",
                "Purple"
            ]}
            action={selectionActions.getSelectColorAction}
        />,
        <Step
            id={5}
            text="Wie viel Speicherplatz bietet Ihr Modell?"
            entities={[
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB"
            ]}
            action={selectionActions.getSelectInternalMemoryAction}
        />,
        <Step
            id={6}
            text="Bitte wählen Sie den passenden Zustand ihres Geräts."
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
        this.props.selectStep(this.props.selection.step - 1);
    }

    render() {
        const step = this.props.selection.step;

        return (
            <div className="Steps">
                {step < this.steps.length &&
                    this.steps[step]
                }
                {step !== 0 && step < this.steps.length - 1 &&
                    <Button id="button-back" variant="secondary" onClick={this.handleClickBack}>
                        Zurück
                    </Button>
                }
                {step >= this.steps.length &&
                    <h2>Ankauf</h2>
                }
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(Steps);