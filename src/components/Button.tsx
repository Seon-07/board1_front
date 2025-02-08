

interface ButtonProps {
    text: string;
    color?: 'blue' | 'green' | 'red';
}

const Button: React.FC<ButtonProps> = ({ text, color = 'blue' }) => {
    let buttonClass = 'px-4 py-2 text-white rounded-lg';
    
    if (color === 'blue') {
        buttonClass += ' bg-blue-500 hover:bg-blue-600';
    } else if (color === 'green') {
        buttonClass += ' bg-green-500 hover:bg-green-600';
    } else if (color === 'red') {
        buttonClass += ' bg-red-500 hover:bg-red-600';
    }

    return (
        <button className={buttonClass}>
            {text}
        </button>
    );
};

export default Button;