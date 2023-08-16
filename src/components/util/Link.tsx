import { Component } from "react";

class Link extends Component<{newTab?: boolean, text: string, href: string}> {
    render() {
        return this.props.newTab
            ? <a target="_blank" rel="noopener noreferrer" href={this.props.href}>{this.props.text}</a>
            : <a href={this.props.href}>{this.props.text}</a>;
    }
}

export default Link;