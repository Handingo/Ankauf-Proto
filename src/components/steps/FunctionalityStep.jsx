import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';

class FunctionalityStep extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleClickNo(e) {
        this.props.dispatch(selectionActions.getSelectStepAction(-1));
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="step-functionality">
                <h2>Ankauf</h2>
                <br/>
                <p>Ist dein Gerät voll funktionsfähig?</p>
                <br/>
                <br/>
                <Col id="step-functionality-selection">
                    <Button id="button-functionality-yes" onClick={this.handleClick}>Ja</Button>
                    <Button variant="secondary" onClick={this.handleClickNo}>Nein</Button>
                </Col>
                <br/>
                <br/>
            </div>
        );
    }
}

export default connect(state => { return state; })(FunctionalityStep);