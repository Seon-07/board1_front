

interface ButtonProps {
    text: string;
    color?: 'blue' | 'green' | 'red' | 'gray';
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, color = 'blue', onClick, className}) => {
    let buttonClass = 'px-4 py-2 text-white rounded-lg';
    
    if (color === 'blue') {
        buttonClass += ' bg-blue-500 hover:bg-blue-700';
    } else if (color === 'green') {
        buttonClass += ' bg-green-500 hover:bg-green-700';
    } else if (color === 'red') {
        buttonClass += ' bg-red-500 hover:bg-red-700';
    } else if (color === 'gray') {
        buttonClass += ' bg-gray-500 hover:bg-gray-700';
    }
    if(className) buttonClass += ' ' + className;
    
    return (
        <button className={buttonClass} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;