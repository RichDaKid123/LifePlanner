import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('main.tsx is executing');

const root = ReactDOM.createRoot(document.getElementById('root')!);
console.log('Root element found:', document.getElementById('root'));

root.render(
  <Router>  
    <App />
  </Router>
);
