import { Component } from "react";
import { connect } from 'react-redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class ConditionStep extends Component {

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
                <p id="determine-condition-link" onClick={this.handleOpenModal}>Zustand ermitteln</p>
                <div className="selection">
                    <Col>
                        <Button variant="light" name="Wie neu" onClick={this.handleClick}>
                            <IconPreview image="./states/state_wie_neu.png"/>
                            <p className="button-text">Wie neu</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Sehr gut" onClick={this.handleClick}>
                            <IconPreview image="./states/state_sehr_gut.png"/>
                            <p className="button-text">Sehr gut</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Gut" onClick={this.handleClick}>
                            <IconPreview image="./states/state_gut.png"/>
                            <p className="button-text">Gut</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" name="Akzeptabel" onClick={this.handleClick}>
                            <IconPreview image="./states/state_akzeptabel.png"/>
                            <p className="button-text">Akzeptabel</p>
                            <small className="button-text-small"/>
                            <IconContinue/>
                        </Button>
                    </Col>
                </div>
            </div>
        );
    }
}

export default connect(state => { return state; })(ConditionStep);