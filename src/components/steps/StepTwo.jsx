import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions'
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class StepTwo extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.selectBrand(event.currentTarget.getAttribute("name"));
        this.props.selectStep(this.props.selection.step + 1);
    }

    render() {
        const brands = [
            "Samsung",
            "Huawei"
        ];

        return (
            <div id="step-two">
                <h2>Ankauf</h2>
                <br/>
                <p>Wählen Sie den Hersteller Ihres Geräts.</p>
                <br/>
                <div className="selection">
                    {brands.map(brand => 
                        <Col key={brand}>
                            <Button variant="light" name={brand} onClick={this.handleClick}>
                                <IconPreview image="./smartphone-test.jpg"/>
                                <p className="button-text">{brand}</p>
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
    selectBrand: selectionActions.getSelectBrandAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepTwo);