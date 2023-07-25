import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepSix extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectCondition(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const conditions = [
            "Wie neu",
            "Sehr gut",
            "Gut",
            "Akzeptabel"
        ];

        return (
            <div id="step-six">
                <h2>Ankauf</h2>
                <br/>
                <p>Bitte wählen Sie den passenden Zustand ihres Geräts.</p>
                <br/>
                <div className="selection">
                    {conditions.map(condition => 
                        <Col key={condition}>
                            <Button variant="light" name={condition} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{condition}</p>
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
    selectCondition: selectionActions.getSelectConditionAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepSix);