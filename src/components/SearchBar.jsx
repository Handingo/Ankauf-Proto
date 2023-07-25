import { Component } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../actions/SelectionActions';

class SearchBar extends Component {

    state = {
        barcode: ""
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        const value = e.currentTarget.value;

        if (value.length > 24) { // ist das die maximale Länge der Barcodes?
            return;
        }

        const cleanValue = value.replace(/\D/, "");

        this.setState({
            barcode: cleanValue
        });
    }

    handleClick(e) {
        e.preventDefault();

        if (this.state.barcode.length < 11) {
            return;
        }

        this.props.selectDeviceType("Smartphone");
        this.props.selectBrand("Samsung");
        this.props.selectModel("Samsung Galaxy S20");
        this.props.selectInternalMemory("256 GB");
        this.props.selectColor("Purple");
        this.props.selectCondition("Wie neu");
        this.props.selectStep(6);
    }

    render() {
        return (
            <Container className="searchbar">
                <Form className="d-flex">
                    <FormControl type="search" value={this.state.barcode} placeholder="Barcode" onChange={this.handleChange}/>
                    <Button id="button-search" variant="primary" onClick={this.handleClick}>Suchen</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectDeviceType: selectionActions.getSelectDeviceTypeAction,
    selectBrand: selectionActions.getSelectBrandAction,
    selectModel: selectionActions.getSelectModelAction,
    selectInternalMemory: selectionActions.getSelectInternalMemoryAction,
    selectColor: selectionActions.getSelectColorAction,
    selectCondition: selectionActions.getSelectConditionAction,
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(SearchBar);