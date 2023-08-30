import "./LandingPage.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import SearchBar from "../util/SearchBar";
import Link from "../util/Link";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // go to next step
        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="step-init">
                <div id="banner-wrapped">
                    <h2>Ankauf</h2>
                    <br/>
                    <p>Wir kaufen Deine Geräte!</p>
                    <br/>
                    <p id="init-explanation">Um einen Preisvorschlag zu erhalten, versuche die Bezeichnung deines Geräts in das Suchfeld einzugeben</p>
                    <br/>
                    <SearchBar/>
                    <br/>
                    <br/>
                    <p>oder beschreibe es uns, indem du auf Start klickst.</p>
                    <br/>
                    <Button id="button-start" variant="primary" onClick={this.handleClick}>Start</Button>
                    <br/>
                    <br/>
                </div>
                <div id="init-text">
                    <br/>
                    <br/>
                    <h5>Wichtige Hinweise</h5>
                    <p>
                        Wir kaufen keine Geräte an, die nicht funktionsfähig sind, einen <Link newTab text="Simlock" href="https://de.wikipedia.org/wiki/SIM-Lock"/> aufweisen, 
                        noch einer <Link newTab text="Aktivierungssperre" href="https://handingo.de/pages/icloud-google-sperre-entfernen"/> unterliegen oder mit 
                        einer <Link newTab text="MDM Software" href="https://de.wikipedia.org/wiki/Mobile-Device-Management"/> arbeiten.
                        Bitte achte außerdem darauf, dass das von dir verschickte Gerät in einem möglichst sauberen Zustand und bestenfalls mithilfe 
                        der <Link newTab text="Verpackungshinweise von DHL" href="https://www.dhl.de/de/geschaeftskunden/paket/rund-um-den-versand/verpackung-versand.html"/> verschickt wird.
                    </p>
                    <br/>
                    <br/>
                    <h5>Du hast Fragen oder Probleme?</h5>
                    <p>
                        Kontaktiere uns unter <Link newTab text="https://handingo.de/pages/kontakt" href="https://handingo.de/pages/kontakt"/>.
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(LandingPage);