import { Component } from "react";

class IconPreview extends Component<{image: string}> {
    render() {
        return (
            <img className="preview-icon" src={this.props.image} width="75%" height="auto" alt=""/>
        );
    }
}

export default IconPreview;