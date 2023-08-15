import { Component } from "react";
import "./TicketConfirmation.css";

class TicketConfirmation extends Component {
    render() {
        return (
            <div id="ticket-confirmation">
                <p>Vielen Dank für die Einsendung!<br/>
                    <br/>
                    Du erhälst baldestmöglich eine Antwort per E-Mail.<br/>
                    Sofern die Antwort als Zusage eintrifft, schicken wir dir eine Sendungsmarke zu, mit deren Hilfe du uns dein Gerät schicken kannst.<br/>
                    <br/>
                    <br/>
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