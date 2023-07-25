import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import SearchBar from "../SearchBar";

class StepInit extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        return (
            <div id="step-init">
                <h2>Ankauf</h2>
                <br/>
                <h5>Wir kaufen Ihre Geräte!</h5>
                <br/>
                <p>Um einen Preisvorschlag zu erhalten, versuchen Sie entweder den Barcode Ihres Geräts in das Suchfeld einzugeben</p>
                <br/>
                <SearchBar/>
                <br/>
                <br/>
                <p>oder beschreiben Sie es uns, indem Sie auf Start klicken.</p>
                <br/>
                <Button id="button-start" variant="primary" onClick={this.handleClick}>Start</Button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h5>Sie haben Fragen oder Probleme?</h5>
                <p>
                    <br/>
                    Kontaktieren Sie uns unter <a href="https://handingo.de/pages/kontakt">https://handingo.de/pages/kontakt</a>.
                    <br/>
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl rhoncus mattis rhoncus urna neque viverra. Massa placerat duis ultricies lacus sed. Enim nec dui nunc mattis enim ut tellus elementum sagittis. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Nulla facilisi cras fermentum odio eu. Mattis enim ut tellus elementum sagittis vitae et. Tellus orci ac auctor augue mauris augue neque gravida in. Vel facilisis volutpat est velit egestas dui id ornare arcu. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Volutpat blandit aliquam etiam erat. Posuere ac ut consequat semper. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Aliquet bibendum enim facilisis gravida neque convallis. Quis imperdiet massa tincidunt nunc pulvinar sapien et.<br/>
                    Enim praesent elementum facilisis leo vel. Ultricies mi quis hendrerit dolor magna eget est. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Sit amet dictum sit amet justo donec enim. Sit amet cursus sit amet dictum. Condimentum vitae sapien pellentesque habitant morbi. Senectus et netus et malesuada fames ac. Lorem ipsum dolor sit amet consectetur. Suspendisse potenti nullam ac tortor. Bibendum ut tristique et egestas quis ipsum suspendisse. Quis blandit turpis cursus in. Neque sodales ut etiam sit amet. Enim sit amet venenatis urna cursus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Et ligula ullamcorper malesuada proin libero.
                </p>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepInit);