import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepOne extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectDeviceType(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const deviceTypes = [
            "Smartphone",
            "Smartwatch"
        ];

        return (
            <div id="step-one">
                <h2>Ankauf</h2>
                <br/>
                <p>Wählen Sie Ihren Gerätetypen.</p>
                <br/>
                <div className="selection">
                    {deviceTypes.map(type => 
                        <Col key={type}>
                            <Button variant="light" name={type} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{type}</p>
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
    selectDeviceType: selectionActions.getSelectDeviceTypeAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepOne);