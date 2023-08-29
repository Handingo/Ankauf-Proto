import { Component } from "react";
import "./TicketConfirmation.css";
import Link from "../../util/Link";

class TicketConfirmation extends Component {
    render() {
        return (
            <div id="ticket-confirmation">
                <p>Vielen Dank für die Einsendung!<br/>
                    <br/>
                    Du erhältst baldestmöglich eine Antwort per E-Mail.<br/>
                    Sofern die Antwort als Zusage eintrifft, schicken wir dir eine Sendungsmarke zu, mit deren Hilfe du uns dein Gerät schicken kannst.<br/>
                    <br/>
                    Um dein Gerät noch einmal funktional zu testen, nutze bitte folgende App:
                    <br/><br/>
                    <Link newTab text="NSYS Test für Android" href="https://play.google.com/store/apps/details?id=com.nsysgroup.nsystest"/>
                    <br/><br/>
                    <Link newTab text="NSYS Test für Apple" href="https://apps.apple.com/de/app/nsys-test/id1448501054"/>
                    <br/><br/>
                    - Dein Handingo-Team -<br/>
                    Am Schlangengraben 20<br/>
                    13597 Berlin<br/>
                    Deutschland
                </p>
            </div>
        );
    }
}

export default TicketConfirmation;