import React from 'react';
import ReactDOM from 'react-dom';
import store from '../src/store';
import {Provider} from 'react-redux';
import App from '../src/components/App';

function Root() {
    return (
        <Provider store = {store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))