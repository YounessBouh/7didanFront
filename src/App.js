
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/header/Header'
import Pages from './components/Pages'
import { Provider } from 'react-redux';
import {store} from './store'
import axios from 'axios';
import { AuthContextProvider } from "./components/context/AuthContext";
axios.defaults.withCredentials = true;

function App() {
  return (

  <Provider store={store}>
    <AuthContextProvider>
       <Router>
         <div className="app">
            <Header />
             <Pages />
        </div>
       </Router>
    </AuthContextProvider>
   </Provider>
    
  );
}

export default App;
