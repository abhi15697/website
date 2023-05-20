import ReactDOM from 'react-dom/client';
import Show from './show';
import Create from './create';
import Dashboard from './dashboard';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<Show></Show>)
//root.render(<Create></Create>)
//root.render(<Dashboard></Dashboard>)
root.render(
    <BrowserRouter>
    <Dashboard></Dashboard>
    </BrowserRouter>
)