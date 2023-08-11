import { Component } from "react";
import { Button, Container, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as selectionActions from '../../actions/SelectionActions';

class IMEIStep extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        imei: undefined,
        validated: false
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;

        if (!e.currentTarget.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, 0);
        }

        this.setState({
            validated: true,
            [name]: value
        });
    }

    handleClick(e) {
        e.preventDefault();

        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="imei-step">
                <h2>Ankauf</h2>
                <br/>
                <p>Bitte gebe nun eine IMEI-Nummer des Geräts ein.</p>
                <br/>
                <Container className="ticket-form">
                    <Form noValidate validated={this.state.validated}>
                        <Form.Group as={Col}>
                            <Form.Control
                                isValid={this.state.imei && this.state.imei.length === 15}
                                type="number"
                                min={100_000_000_000_000}
                                max={999_999_999_999_999}
                                placeholder="XXXXXX/XX/XXXXXX/X"
                                name="imei"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Container>
                <Button disabled={!this.state.imei || this.state.imei.length !== 15} id="button-continue" onClick={this.handleClick}>Bestätigen</Button>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(IMEIStep);