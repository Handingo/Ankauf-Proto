import "./ButtonBack.css";
import { Component } from "react";
import { Button } from "react-bootstrap";

class ButtonBack extends Component {
    
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
    }

    handleClickBack(e) {
        e.preventDefault();
        const step = this.props.selection.step - 1;
        this.props.selectStep(step);
        this.props.resetStatePart(step);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Button id="button-back" variant="secondary" onClick={this.handleClickBack}>
                Zurück
            </Button>
        );
    }
}

export default ButtonBack;