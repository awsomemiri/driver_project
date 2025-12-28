import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './router/Router';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={Router} />
      </div>
    </Provider>
  );
}

export default App;
