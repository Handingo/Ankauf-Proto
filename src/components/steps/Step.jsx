import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col } from "react-bootstrap";
import * as selectionActions from '../../actions/SelectionActions';
import IconContinue from "../../icons/IconContinue";
import IconPreview from "../../icons/IconPreview";

class Step extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.dispatch(this.props.action(event.currentTarget.getAttribute("name")));
        this.props.dispatch(selectionActions.getSelectStepAction(this.props.selection.step + 1));
    }

    render() {
        return (
            <div className="step" id={this.props.id}>
                <h2>Ankauf</h2>
                <br/>
                <p>{this.props.text}</p>
                <br/>
                <div className="selection">
                    {this.props.entities.map(entity => {
                        const entityPrice = 1436.0;
                        return (
                            <Col key={entity}>
                                <Button variant="light" name={entity} onClick={this.handleClick}>
                                    <IconPreview image="./smartphone-test.jpg"/>
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

export default connect(state => { return state; })(Step);