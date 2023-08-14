import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class DeviceChoice extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(this.props.action(e.currentTarget.getAttribute("name")));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
        window.scrollTo(0, 0);
    }

    handleBreadcrumbClick(e) {
        e.preventDefault();
        const step = Number(e.currentTarget.name) - 3;
        this.props.dispatch(selectionActions.getResetStatePartAction(step));
        this.props.dispatch(selectionActions.getSelectStepAction(step));
        window.scrollTo(0, 0);
    }

    render() {
        let i = 0;
        let breadcrumbs = [];

        for (const entry in this.props.selection) {
            if (i++ === 0 || !this.props.selection.hasOwnProperty(entry)) {
                continue;
            }

            const selection = this.props.selection[entry];

            if (!selection) {
                continue;
            }

            const step = i + 2;
            breadcrumbs.push(<a href="/" key={step} name={step} onClick={this.handleBreadcrumbClick}>{selection + " /"}</a>);
        }

        i = 0;

        return (
            <div className="step" id={this.props.id}>
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <div id="selection-breadcrumbs">{breadcrumbs}</div>
                <br/>
                <div className="selection">
                    {this.props.entities.map(entity => {
                        i++;
                        const entityPrice = 427.0 + i * 75;
                        return (
                            <Col key={entity}>
                                <Button variant="light" name={entity} onClick={this.handleClick}>
                                    <IconPreview image="./smartphone-test.jpg"/> {/* Verwendet IconPreview.tsx */}
                                    <p className="button-text">{entity}</p>
                                    <small className="button-text-small">{this.props.id === 3 ? "(Wir bieten bis zu " + entityPrice + " €)" : ""}</small>
                                    <IconContinue/>
                                </Button>
                            </Col>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(state => { return state; })(DeviceChoice);