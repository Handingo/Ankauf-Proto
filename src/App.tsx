import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Steps from './components/steps/Steps';
import TopMenu from './components/navigation/TopMenu';
import BottomMenu from './components/navigation/BottomMenu';

class App extends Component {
    render() {
        // <UnsecureAuth/>
        return (
            <div className="App">
                <TopMenu/>
                <Steps />
                <BottomMenu/>
            </div>
        );
    }
}

export default App;