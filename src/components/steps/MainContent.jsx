import "./MainContent.css";
import { Component } from "react";
import { connect } from "react-redux";
import * as selectionActions from "../../actions/SelectionActions";
import * as functionalityActions from "../../actions/FunctionalityActions";
import LandingPage from "./LandingPage";
import DeviceChoice from "./choice/DeviceChoice";
import EndProposal from "./EndProposal";
import TicketForm from "./ticket/TicketForm";
import TicketConfirmation from "./ticket/TicketConfirmation";
import FunctionalityChoice from "./choice/FunctionalityChoice";
import ConditionChoice from "./choice/ConditionChoice";
import ButtonBack from "../util/button/ButtonBack";

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
                "Huawei",
                "Apple"
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
        />,
        <FunctionalityChoice
            text="War das Gerät länger als 2 Jahre in Gebrauch?"
            help="Befand sich das Gerät insgesamt bereits länger als 2 Jahre in Gebrauch?"
            images={["./smartphones/s23.png", "./smartphones/s21.png"]}
            action={functionalityActions.getKindaOldAction}
        />,
        // "text" und "help" werden in Zeile 54-57 in FunctionalityChoice.jsx implementiert
        // TODO - Wurde SIM-/Net-Lock entfernt? - help-Link prüfen
        <FunctionalityChoice
            text="Ist dein Gerät voll funktionsfähig?"
            help="Lassen sich alle Funktionen des Geräts nutzen (wie bspw. die Kamera, das Mikrofon oder die Lautsprecher)?"
            images={["./smartphones/s20.png", "./smartphones/s21.png"]}
            action={functionalityActions.getFullyFunctionalAction}
        />,
        <FunctionalityChoice
            text="Hat das Gerät SIM-/Net-Lock?"
            help="Bevor du dein Gerät verkaufen kannst, muss SIM-/Net-Lock entfernt werden, da sonst ggf. keine SIM-Karten von anderen Anbietern in das Gerät eingesetzt werden können. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und Simlock-/Net-Lock entfernen oder unter https://handingo.de/pages/simlock-netlock-entfernen."
            images={["./smartphones/s20.png"]}
            action={functionalityActions.getSimLockAction}
        />,
        // reversed indicates that the selection should get handled in a positive way - it's good when the customer removed Sim-Lock
        <FunctionalityChoice
            text="Wurde GoogleID/AppleID entfernt?" reversed
            help="Bevor du dein Gerät verkaufen kannst, muss die jeweilige Funktion deaktiviert/entfernt werden. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und iCloud & Google-Sperre entfernen oder unter https://handingo.de/pages/icloud-google-sperre-entfernen."
            images={["./smartphones/s20.png", "./smartphones/s21.png", "./smartphones/s22.png"]}
            action={functionalityActions.getActivationLockAction}
        />,
        /*
        <FunctionalityChoice
            text="Ist eine MDM-Software o. ä. aktiv?"
            help="Dies kann besonders dann zutreffen, wenn das Gerät als Firmengerät diente. Hinweis: Wir kaufen keine Apple Geräte an, welche diesem Status unterliegen."
            images={["./smartphones/s23.png", "./smartphones/s21.png"]}
            action={functionalityActions.getMDMActiveAction}
        />,*/
        <EndProposal/>,
        <TicketForm/>,
        <TicketConfirmation/>
    ];

    render() {
        const step = this.props.selection.step;

        return (
            <div className="Steps">
                {step >= 0 && step < this.steps.length &&
                    this.steps[step]
                }
                {step !== 0 && step < this.steps.length - 1 &&
                    <ButtonBack/>
                }
            </div>
        );
    }
}

export default connect(state => { return state; })(MainContent);