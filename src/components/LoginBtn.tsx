import { Link } from 'react-router-dom';

const LoginBtn: React.FC = () => {
    return (
        <button className="loginBtn">
            <Link to="/boardList" className="loginLink">접속</Link>
        </button>
    );
}

export default LoginBtn;