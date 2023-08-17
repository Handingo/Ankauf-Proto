import "./DeviceChoice.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../actions/SelectionActions';
import DeviceChoiceButton from "../util/DeviceChoiceButton";

class DeviceChoice extends Component {

    constructor(props) {
        super(props);
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
    }

    handleBreadcrumbClick(e) {
        e.preventDefault();
        const step = Number(e.currentTarget.getAttribute("name"));
        this.props.resetStatePart(step);
        this.props.selectStep(step);
        window.scrollTo(0, 0);
    }

    render() {
        let i = 0;
        let breadcrumbs = [];

        for (const entry in this.props.selection) {
            // skip "step" entry - we only want actual selection entries
            if (i++ === 0 || !this.props.selection.hasOwnProperty(entry)) {
                continue;
            }

            const selection = this.props.selection[entry];

            if (!selection) {
                continue;
            }

            const step = i - 1; // leads to the right step when clicking on the breadcrumb (see line 17)
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
                    {this.props.entities.map(entity => // TODO - maximum price should get determined via database
                        <DeviceChoiceButton id={this.props.id} entity={entity} entityPrice={427.0 + (++i) * 75} action={this.props.action}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    resetStatePart: selectionActions.getResetStatePartAction,
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(DeviceChoice);