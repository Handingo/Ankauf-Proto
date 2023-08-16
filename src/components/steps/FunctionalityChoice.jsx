import "./FunctionalityChoice.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col, Modal } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconInfo from "../util/icons/IconInfo";

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
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleClickHelp() {
        this.setState({
            showHelp: !this.state.showHelp
        })
    }

    render() {
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
                    {this.props.images && this.props.images.map(image => <img key={Math.random()} src={image} alt=""/>)}
                </div>
                <br/>
                <Col id="step-functionality-selection">
                    <Button onClick={this.handleClick}>Ja</Button>
                    <Button onClick={this.handleClick}>Nein</Button>
                </Col>
                <Modal id="functionality-help-modal" show={this.state.showHelp} onHide={this.handleClickHelp}>
                    <Modal.Header closeButton>
                        {this.props.text} {/* Zeile 74-76 in MainContent.jsx */}
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.help} {/* Zeile 74-76 in MainContent.jsx */}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default connect(state => { return state; })(FunctionalityChoice);