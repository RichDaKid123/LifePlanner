import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Ensure BrowserRouter is imported
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>  
    <App />
  </Router>
);
