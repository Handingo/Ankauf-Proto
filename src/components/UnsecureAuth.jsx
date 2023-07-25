import { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UnsecureAuth extends Component {

    state = {
        user: "",
        password: "",
        key: "hhd10hnda0h21ndh01d1jd1jwj"
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        const {name, value} = e.currentTarget;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const str = this.state.key.replaceAll(/[^0-9]/g, "hdg");
        let str2 = "";
        let even = true;
    
        for (let c of str) {
            even = !even;

            if (even) {
                str2 = str2.concat(c);
            }
        }

        console.log(str2);

        if (this.state.password === str2) {
            console.log("login"); // dhgd1hgdhgd0d2hgdhg1d1dhghgdhg
        } else {
            console.log("X");
        }
    }

    render() {
        return (
            <div id="auth">
                <Modal show>
                    <Modal.Header closeButton>
                        <h4>Authentication</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="authenticationUser">User</label>
                        <input id="authenticationUser" name="user" onChange={this.handleChange}/>
                        <label htmlFor="authenticationPassword">Password</label>
                        <input id="authenticationPassword" name="password" onChange={this.handleChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">Leave</Button>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(UnsecureAuth);