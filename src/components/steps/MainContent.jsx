import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import StepInit from './LandingPage';
import SelectionStep from './DeviceChoice';
import StepEnd from "./EndProposal";
import TicketForm from "./TicketForm";
import TicketConfirmation from "./TicketConfirmation";
import FunctionalityStep from "./FunctionalityChoice";
import ConditionStep from "./ConditionChoice";

class Steps extends Component {

    steps = [
        <StepInit/>, // LandingPage
        <SelectionStep
            id={1}
            text="Wähle den Typen des Geräts."
            entities={[ // Eventuelle Anbindung an Datenbank
                "Smartphone",
                "Smartwatch"
            ]}
            action={selectionActions.getSelectDeviceTypeAction}
        />,
        <SelectionStep
            id={2}
            text="Wähle den Hersteller des Geräts."
            entities={[ // Eventuelle Anbindung an Datenbank
                "Samsung",
                "Huawei"
            ]}
            action={selectionActions.getSelectBrandAction}
        />,
        <SelectionStep
            id={3}
            text="Wähle das Modell des Geräts."
            entities={[ // Eventuelle Anbindung an Datenbank
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
            entities={[ // Eventuelle Anbindung an Datenbank
                "Black",
                "White",
                "Purple"
            ]}
            action={selectionActions.getSelectColorAction}
        />,
        <SelectionStep
            id={5}
            text="Wie viel Speicherplatz bietet das Modell?"
            entities={[ // Eventuelle Anbindung an Datenbank
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB"
            ]}
            action={selectionActions.getSelectInternalMemoryAction}
        />,
        <ConditionStep
            id={6}
            text="In welchem Zustand befindet sich das Gerät?"
            action={selectionActions.getSelectConditionAction}
        />,
        // Wird in Zeile 50-53 in DeviceChoice.jsx implementiert
        <FunctionalityStep text="Ist dein Gerät voll funktionsfähig?" help="Lassen sich alle Funktionen des Geräts nutzen (wie bspw. die Kamera, das Mikrofon oder die Lautsprecher)?" images={["./s20.png", "./s21.png"]}/>,
        <FunctionalityStep text="Wurde SIM-/Net-Lock entfernt?" help="https://praxistipps.chip.de/simlock-entfernen-so-gehts-bei-allen-providern_100550" images={["./s20.png"]}/>,
        <FunctionalityStep text="Wurde GoogleID/AppleID entfernt?" help="Bevor du dein Gerät verkaufen kannst, muss die jeweilige Funktion deaktiviert/entfernt werden. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und iCloud & Google-Sperre entfernen oder unter https://handingo.de/pages/icloud-google-sperre-entfernen" images={["./s20.png", "./s21.png", "./s22.png"]}/>,
        // <IMEIStep/>, // Datenschutzrechtlich teilweise schwierig, daher optional in das Endformular eingefügt
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