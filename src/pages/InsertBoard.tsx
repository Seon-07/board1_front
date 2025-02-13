import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface Board {
    id: string;
    title: string;
    content: string;
    author: string;
}

const Board: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col">
            <div className="w-screen flex justify-center items-center py-8">
                <div className="w-3/4 flex justify-between">
                    <Button text="이전" color="gray" onClick={() => navigate(`/Boardlist`)}/>
                    <div className="text-4xl">상세보기</div>
                    <Button text="수정" color="green" onClick={() => navigate(`/InsertBoard`)}/>
                </div>
            </div>
            <div className="flex justify-center h-[70%]">
                <table className="w-3/4 border border-gray-300">
                    <tbody>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">제목</td>
                            <td className="py-8 w-4/5 px-4"><input id="title" className="border border-gray-300 rounded-md p-2 w-full"/></td>
                        </tr>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">작성자</td>
                            <td className="py-8 w-4/5 px-4"><input id="author" className="border border-gray-300 rounded-md p-2 w-1/4"/></td>
                        </tr>
                        <tr className="h-3/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">내용</td>
                            <td className="py-8 w-4/5 px-4 align-top"><textarea id="content" className="border border-gray-300 rounded-lg w-full h-48 p-2"></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Board;