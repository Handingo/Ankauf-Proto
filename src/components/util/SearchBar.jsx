import "./SearchBar.css";
import { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../actions/SelectionActions';
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
        this.handleClickInput = this.handleClickInput.bind(this);
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

        // TODO - These are hardcoded values... should get connected to a database
        this.props.selectDeviceType("Smartphone");
        this.props.selectBrand("Samsung");
        this.props.selectModel("Samsung Galaxy S23");
        this.props.selectInternalMemory("512 GB");
        this.props.selectColor("Black");
        this.props.selectStep(6);
        window.scrollTo(0, 0);
    }

    handleClickInput() {
        window.scrollTo(0, window.scrollY + 1); // workaround for async position of recommendations
    }

    render() {
        // TODO - options should get determined via database
        return (
            <Container className="searchbar">
                <Typeahead
                    id="searchbar"
                    options={[
                        "Samsung Galaxy S23, 256 GB, White",
                        "Samsung Galaxy S23 Plus, 512 GB, White",
                        "Samsung Galaxy S23 Plus, 512 GB, Black",
                        "Samsung Galaxy S23 Ultra, 256 GB, Spacegray",
                        "Samsung Galaxy S23 Ultra, 512 GB, Black"
                    ]}
                    placeholder="z. B. Samsung Galaxy S23 Ultra"
                    emptyLabel="Keine Vorschläge gefunden."
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    onFocus={this.handleClickInput}
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