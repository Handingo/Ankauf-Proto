import "./MainContent.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import LandingPage from './LandingPage';
import DeviceChoice from './DeviceChoice';
import EndProposal from "./EndProposal";
import TicketForm from "./ticket/TicketForm";
import TicketConfirmation from "./ticket/TicketConfirmation";
import FunctionalityChoice from "./FunctionalityChoice";
import ConditionChoice from "./ConditionChoice";

class MainContent extends Component {

    steps = [
        <LandingPage/>,
        <DeviceChoice
            id={1}
            text="Wähle den Typen des Geräts."
            entities={[ // TODO - should get connected to a database
                "Smartphone",
                "Smartwatch"
            ]}
            action={selectionActions.getSelectDeviceTypeAction}
        />,
        <DeviceChoice
            id={2}
            text="Wähle den Hersteller des Geräts."
            entities={[ // TODO - should get connected to a database
                "Samsung",
                "Huawei"
            ]}
            action={selectionActions.getSelectBrandAction}
        />,
        <DeviceChoice
            id={3}
            text="Wähle das Modell des Geräts."
            entities={[ // TODO - should get connected to a database
                "Samsung Galaxy S20",
                "Samsung Galaxy S21",
                "Samsung Galaxy S22",
                "Samsung Galaxy S23"
            ]}
            action={selectionActions.getSelectModelAction}
        />,
        <DeviceChoice
            id={4}
            text="Wähle die Farbe des Modells."
            entities={[ // TODO - should get connected to a database
                "Black",
                "White",
                "Purple"
            ]}
            action={selectionActions.getSelectColorAction}
        />,
        <DeviceChoice
            id={5}
            text="Wie viel Speicherplatz bietet das Modell?"
            entities={[ // TODO - should get connected to a database
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB"
            ]}
            action={selectionActions.getSelectInternalMemoryAction}
        />,
        <ConditionChoice
            id={6}
            text="In welchem Zustand befindet sich das Gerät?"
            action={selectionActions.getSelectConditionAction}
        />,
        // Wird in Zeile 50-53 in FunctionalityChoice.jsx implementiert
        // TODO - den Link von praxistipps mit eigenem Text ersetzen
        <FunctionalityChoice text="Ist dein Gerät voll funktionsfähig?" help="Lassen sich alle Funktionen des Geräts nutzen (wie bspw. die Kamera, das Mikrofon oder die Lautsprecher)?" images={["./smartphones/s20.png", "./smartphones/s21.png"]}/>,
        <FunctionalityChoice text="Wurde SIM-/Net-Lock entfernt?" help="https://praxistipps.chip.de/simlock-entfernen-so-gehts-bei-allen-providern_100550" images={["./smartphones/s20.png"]}/>,
        <FunctionalityChoice text="Wurde GoogleID/AppleID entfernt?" help="Bevor du dein Gerät verkaufen kannst, muss die jeweilige Funktion deaktiviert/entfernt werden. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und iCloud & Google-Sperre entfernen oder unter https://handingo.de/pages/icloud-google-sperre-entfernen" images={["./smartphones/s20.png", "./smartphones/s21.png", "./smartphones/s22.png"]}/>,
        <EndProposal/>,
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
                {step >= 0 && step < this.steps.length &&
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

export default connect(state => { return state; }, mapStateToProps)(MainContent);