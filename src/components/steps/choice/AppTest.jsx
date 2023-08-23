import { Component } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as selectionActions from "../../../actions/SelectionActions";
import IconInfo from "../../util/icon/IconInfo";

class AppTest extends Component {

    state = {
        showHelp: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickHelp = this.handleClickHelp.bind(this);
    }

    handleClick(e) {
        const name = e.currentTarget.getAttribute("name");
        this.props.dispatch(this.props.action(name));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + (name === "true" ? 2 : 1))); // skip FunctionalityTest if true
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
                        {this.props.text}
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.help}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default connect(state => { return state; })(AppTest);