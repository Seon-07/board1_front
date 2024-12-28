import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginBtn from './components/LoginBtn';
import BoardList from './pages/BoardList';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginBtn />} />
                <Route path="/boardList" element={<BoardList />} />
            </Routes>
        </Router>
    );
}

export default App;