import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card } from "react-bootstrap";
import * as selectionActions from "../../actions/SelectionActions";

class StepEnd extends Component {

    state = {
        documents: undefined
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickUpload = this.handleClickUpload.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        if (!this.state.documents) {
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="step-cancelled">
                
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepEnd);