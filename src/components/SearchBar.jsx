import { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../actions/SelectionActions';
import { Typeahead } from "react-bootstrap-typeahead";

class SearchBar extends Component {

    state = {
        text: ""
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = text => {
        this.setState({
            text: text[0]
        });
    }

    handleInputChange = text => {
        this.setState({
            text: text
        });
    }

    handleClick(e) {
        e.preventDefault();

        if (this.state.text.length < 1) {
            return;
        }

        this.props.selectDeviceType("Smartphone");
        this.props.selectBrand("Samsung");
        this.props.selectModel("Samsung Galaxy S20");
        this.props.selectInternalMemory("256 GB");
        this.props.selectColor("Purple");
        this.props.selectStep(6);
        window.scrollTo(0, 0);
    }

    render() {
        /*
        <Form className="d-flex">
                    <FormControl type="search" maxLength={64} value={this.state.text} placeholder="z. B. Samsung Galaxy S23 Ultra" onChange={this.handleChange}/>
                    <Button id="button-search" variant="primary" onClick={this.handleClick}>Suchen</Button>
                </Form>
        */
        return (
            <Container className="searchbar">
                <Typeahead
                    id="searchbar"
                    options={[
                        "Samsung Galaxy S23, 256 GB, White",
                        "Samsung Galaxy S23 Plus, 512 GB, White",
                        "Samsung Galaxy S23 Plus, 512 GB, Black",
                        "Samsung Galaxy S23 Ultra, 256 GB, Spacegray",
                        "Samsung Galaxy S23 Ultra, 512 GB, Spacegray"
                    ]}
                    placeholder="z. B. Samsung Galaxy S23 Ultra"
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                />
                <Button id="button-search" variant="primary" onClick={this.handleClick}>Suchen</Button>
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