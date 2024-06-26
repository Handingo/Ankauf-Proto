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
import FunctionalityTest from "./choice/FunctionalityTest";
// import AppTestChoice from "./choice/AppTestChoice";

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
            images={["./image-support/new.jpg"]}
            action={functionalityActions.getKindaOldAction}
        />,
        // TODO - Hat das Gerät SIM-/Net-Lock? - check whether the link at the end of the help text isn't a dead site
        <FunctionalityChoice
            text="Hat das Gerät SIM-/Net-Lock?"
            help="Bevor du dein Gerät verkaufen kannst, muss SIM-/Net-Lock entfernt werden, da sonst ggf. keine SIM-Karten von anderen Anbietern in das Gerät eingesetzt werden können. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und Simlock-/Net-Lock entfernen oder unter https://handingo.de/pages/simlock-netlock-entfernen."
            images={["./image-support/lock.jpg"]}
            action={functionalityActions.getSimLockAction}
        />,
        // reversed indicates that the selection should get handled reversed.
        // Got GoogleID removed? Yes. Is GoogleID active? No. - Important for the proposal page
        <FunctionalityChoice
            text="Wurde GoogleID/AppleID entfernt?" reversed
            help="Bevor du dein Gerät verkaufen kannst, muss die jeweilige Funktion deaktiviert/entfernt werden. Erfahre mehr am Ende dieser Seite, unter dem Kapitel Service und iCloud & Google-Sperre entfernen oder unter https://handingo.de/pages/icloud-google-sperre-entfernen."
            images={["./image-support/appleid.jpg"]}
            action={functionalityActions.getActivationLockAction}
        />,
        /*
        <AppTestChoice
            text="Funktionsfähigkeit des Geräts per App testen?"
            help="Diese App testet das Smartphone ganz ausführlich und mit wenig Aufwand. Wenn wir an deinem Gerät interessiert sind, dann würden wir dir einen Code senden, welcher es dir ermöglicht, den Test durchführen zu können."
            images={["./image-support/working.jpg"]}
            action={functionalityActions.getAppTestAction}
        />,
        */
        <FunctionalityTest
            text="Wie funktionsfähig ist dein Gerät?"
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
                {step !== 0 && step < this.steps.length - 1 && // don't render on LandingPage or TicketConfirmation (ticket already got sent there)
                    <ButtonBack/>
                }
            </div>
        );
    }
}

export default connect(state => { return state; })(MainContent);