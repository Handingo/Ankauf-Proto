import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/ReduxStore";

// Render all our content in the div element with the id "root"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <App/>
    </Provider>
);