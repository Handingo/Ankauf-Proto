import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepFive extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectInternalMemory(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const internalMemories = [
            "64 GB",
            "128 GB",
            "256 GB",
            "512 GB",
            "1 TB"
        ];

        return (
            <div id="step-five">
                <h2>Ankauf</h2>
                <br/>
                <p>Wie viel Speicherplatz bietet Ihr Modell?</p>
                <br/>
                <div className="selection">
                    {internalMemories.map(internalMemory => 
                        <Col key={internalMemory}>
                            <Button variant="light" name={internalMemory} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{internalMemory}</p>
                                <IconContinue/>
                            </Button>
                        </Col>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction,
    selectInternalMemory: selectionActions.getSelectInternalMemoryAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepFive);