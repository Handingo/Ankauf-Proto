import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Steps from "./components/steps/MainContent";
import TopMenu from "./components/navigation_header_footer/Header";
import BottomMenu from "./components/navigation_header_footer/Footer";
import { connect } from "react-redux";

// Root of content for the website

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopMenu/>
                <Steps />
                <BottomMenu/>
            </div>
        );
    }
}

export default connect(state => { return state; })(App);