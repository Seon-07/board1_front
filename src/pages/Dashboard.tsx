import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Link to="/boardList">
                <Button text="접속" />
            </Link>
        </div>
    );
}

export default Dashboard;