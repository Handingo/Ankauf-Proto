import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepThree extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectModel(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const models = this.props.selection.brand === "Samsung" ? [
                "Samsung Galaxy S20",
                "Samsung Galaxy S21",
                "Samsung Galaxy S22",
                "Samsung Galaxy S23"
            ] : [
                "Huawei P30",
                "Huawei P30 Pro",
                "Huawei P40"
            ];

        return (
            <div id="step-three">
                <h2>Ankauf</h2>
                <br/>
                <p>Wählen Sie Ihr Modell.</p>
                <br/>
                <div className="selection">
                    {models.map(model => 
                        <Col key={model}>
                            <Button variant="light" name={model} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{model}</p>
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
    selectModel: selectionActions.getSelectModelAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepThree);