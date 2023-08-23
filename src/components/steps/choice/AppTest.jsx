import { Component } from "react";
import { Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as selectionActions from "../../../actions/SelectionActions";

class AppTest extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const name = e.currentTarget.getAttribute("name");
        this.props.dispatch(this.props.action(name));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + (name === "true" ? 2 : 1)));
        window.scrollTo(0, 0);
    }

    render() {
        let i = 0;

        return (
            <div id="step-functionality">
                <h2>Ankauf</h2>
                <br/>
                <p id="functionality-text">
                    {this.props.text}
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
            </div>
        );
    }
}

export default connect(state => { return state; })(AppTest);