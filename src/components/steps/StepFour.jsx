import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepFour extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectColor(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const colors = [
            "Black",
            "White",
            "Purple"
        ];

        return (
            <div id="step-four">
                <h2>Ankauf</h2>
                <br/>
                <p>Wählen Sie die Farbe Ihres Modells.</p>
                <br/>
                <div className="selection">
                    {colors.map(color => 
                        <Col key={color}>
                            <Button variant="light" name={color} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{color}</p>
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
    selectColor: selectionActions.getSelectColorAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepFour);