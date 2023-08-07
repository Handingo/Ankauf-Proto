import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';

import rootReducer from './reducer/RootReducer';

const store: Store = createStore(rootReducer, applyMiddleware(...[thunk]));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App/>
    </Provider>
);