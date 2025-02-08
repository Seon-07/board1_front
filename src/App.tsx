import './index.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardList from './pages/BoardList';
import Board from './pages/Board';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/board/:id" element={<Board />} />
            </Routes>
        </Router>
    );
}

export default App;