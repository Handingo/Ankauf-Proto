import "./ModelViewer.css";
import { Component } from "react";

// gets implemented in ConditionChoice.jsx
class ModelViewer extends Component {
    render() {
        return (
            <model-viewer id="model-viewer"
                src={this.props.src}
                shadow-intensity="1"
                ar
                camera-controls
                touch-action="pan-y"
                alt="Model"
            />
        );
    }
}

export default ModelViewer;