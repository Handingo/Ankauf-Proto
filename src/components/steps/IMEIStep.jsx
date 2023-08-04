import { Component } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
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
        imei: undefined
    };

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleClick(e) {
        e.preventDefault();

        if (!this.state.imei || this.state.imei < 1E14 || this.state.imei > 1E15 - 1) { // Eine IMEI-Nummer hat 15 Stellen
            return;
        }

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
                    <Form>
                        <FormControl type="number" min={100_000_000_000_000} max={999_999_999_999_999} placeholder="XXXXXX/XX/XXXXXX/X" name="imei" onChange={this.handleChange}/>
                    </Form>
                </Container>
                <Button id="button-continue" onClick={this.handleClick}>Bestätigen</Button>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(IMEIStep);