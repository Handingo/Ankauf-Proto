import "./ButtonBack.css";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as selectionActions from "../../../actions/SelectionActions";
import { Button } from "react-bootstrap";

// gets implemented in MainContent.jsx
class ButtonBack extends Component {
    
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
    }

    handleClickBack(e) {
        e.preventDefault();
        const step = this.props.selection.step - 1;
        this.props.selectStep(step);
        this.props.resetStatePart(step); // deletes all selections that follow after the current step which has been made so far
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Button id="button-back" variant="secondary" onClick={this.handleClickBack}>
                Zurück
            </Button>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction,
    resetStatePart: selectionActions.getResetStatePartAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(ButtonBack);