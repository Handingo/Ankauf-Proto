import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Steps from './components/steps/MainContent';
import TopMenu from './components/navigation_header_footer/TopMenu';
import BottomMenu from './components/navigation_header_footer/BottomMenu';
import { connect } from 'react-redux';

// Wurzel der Website

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