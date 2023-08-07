import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Steps from './components/steps/Steps';
import TopMenu from './components/navigation/TopMenu';
import BottomMenu from './components/navigation/BottomMenu';
import { connect } from 'react-redux';

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