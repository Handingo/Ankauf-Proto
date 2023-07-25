import { Component } from "react";

class Icon extends Component<{d: string}> {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 16 16">
                <path d={this.props.d}/>
            </svg>
        );
    }
}

export default Icon;