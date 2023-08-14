import { Component } from "react";

// Wird in DeviceChoice.jsx verwendet
class IconPreview extends Component<{image: string}> {
    render() {
        return (
            <img className="preview-icon" src={this.props.image} width="75%" height="auto" alt=""/>
        );
    }
}

export default IconPreview;