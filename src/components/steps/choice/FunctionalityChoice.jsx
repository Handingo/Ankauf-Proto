import "./FunctionalityChoice.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Modal } from "react-bootstrap";
import * as selectionActions from '../../../actions/SelectionActions';
import IconInfo from "../../util/icon/IconInfo";

class FunctionalityChoice extends Component {

    state = {
        showHelp: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickHelp = this.handleClickHelp.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(this.props.action(Boolean(e.currentTarget.getAttribute("name"))));
        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    handleClickHelp() {
        this.setState({
            showHelp: !this.state.showHelp
        })
    }

    render() {
        let i = 0;

        return (
            <div id="step-functionality">
                <h2>Ankauf</h2>
                <br/>
                <p id="functionality-text">
                    {this.props.text}
                    <span onClick={this.handleClickHelp}><IconInfo/></span>
                </p>
                <br/>
                <div id="functionality-image-container">
                    {this.props.images && this.props.images.map(image => <img key={i++} src={image} alt=""/>)}
                </div>
                <br/>
                <Col id="step-functionality-selection">
                    <Button name="true" onClick={this.handleClick}>Ja</Button>
                    <Button name="false" onClick={this.handleClick}>Nein</Button>
                </Col>
                <Modal id="functionality-help-modal" show={this.state.showHelp} onHide={this.handleClickHelp}>
                    <Modal.Header closeButton>
                        {this.props.text} {/* Line 77-79 in MainContent.jsx */}
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.help} {/* Line 77-79 in MainContent.jsx */}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(FunctionalityChoice);