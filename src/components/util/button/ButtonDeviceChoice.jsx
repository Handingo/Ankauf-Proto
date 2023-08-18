import "./ButtonDeviceChoice.css";
import { Component } from "react";
import { Button, Col } from "react-bootstrap";
import IconContinue from "../icon/IconContinue";
import IconPreview from "../icon/IconPreview";
import * as selectionActions from '../../../actions/SelectionActions';
import { connect } from 'react-redux';

class ButtonDeviceChoice extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(this.props.action(e.currentTarget.getAttribute("name")));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Col>
                <Button variant="light" name={this.props.entity} onClick={this.handleClick}>
                    <IconPreview image="./smartphones/s23.jpg"/> {/* TODO - should get connected to a database */}
                    <p className="button-text">{this.props.entity}</p>
                    <small className="button-text-small">{this.props.id === 3 ? "(Wir bieten bis zu " + this.props.entityPrice + " €)" : ""}</small>
                    <IconContinue/>
                </Button>
            </Col>
        );
    }
}

export default connect(state => { return state; })(ButtonDeviceChoice);