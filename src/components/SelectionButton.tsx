import { Component } from "react";
import { Button } from "react-bootstrap";


class SelectionButton extends Component<{image: string, text: string}> {
    render() {
        return (
            <Button className="selection-button">
                <img src={this.props.image}></img>
                {this.props.text}
                ::after
            </Button>
        );
    }
}

export default SelectionButton;