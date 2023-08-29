import { Component } from "react";

class Link extends Component<{newTab?: boolean, text: string, href: string}> {
    render() {
        /* 
         * newTab determines whether to open the link in a new tab.
         * This prevents the user from possibly loosing his progress
         * and gives him the ability to switch between both sites.
         */ 
        return this.props.newTab
            ? <a target="_blank" rel="noopener noreferrer" href={this.props.href}>{this.props.text}</a>
            : <a href={this.props.href}>{this.props.text}</a>;
    }
}

export default Link;