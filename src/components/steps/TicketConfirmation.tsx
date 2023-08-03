import { Component } from "react";

class TicketConfirmation extends Component {

    render() {
        return (
            <div id="ticket-confirmation">
                <p>Vielen Dank für die Einsendung!<br/>
                    Bitte schicke uns nun dein Gerät zu.<br/>
                    Du erhälst baldestmöglich eine Antwort per E-Mail.<br/>
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