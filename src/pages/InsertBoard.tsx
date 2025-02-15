import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

const Board: React.FC = () => {
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        const title = titleRef.current?.value;
        const author = authorRef.current?.value;
        const content = contentRef.current?.value;

        if (!title || !author || !content) {
            alert("모든 항목을 입력하세요.");
            return;
        }
        const data = { title, author, content };
        try {
            const response = await axios.post("http://localhost:8080/board", data, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                alert("게시글이 등록되었습니다.");
                navigate("/Boardlist");
            } else {
                alert("등록 실패");
            }
        } catch (error) {
            alert("서버 오류");
        }
    };
    return (
        <div className="h-screen flex flex-col">
            <div className="w-screen flex justify-center items-center py-8">
                <div className="w-3/4 flex justify-between">
                    <Button text="이전" color="gray" onClick={() => navigate(`/Boardlist`)}/>
                    <div className="text-4xl">게시글 등록</div>
                    <Button text="등록" color="blue" onClick={handleSubmit}/>
                </div>
            </div>
            <div className="flex justify-center h-[70%]">
                <table className="w-3/4 border border-gray-300">
                    <tbody>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">제목</td>
                            <td className="py-8 w-4/5 px-4"><input ref={titleRef} className="border border-gray-300 rounded-md p-2 w-full"/></td>
                        </tr>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">작성자</td>
                            <td className="py-8 w-4/5 px-4"><input ref={authorRef} className="border border-gray-300 rounded-md p-2 w-1/4"/></td>
                        </tr>
                        <tr className="h-3/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">내용</td>
                            <td className="py-8 w-4/5 px-4 align-top"><textarea ref={contentRef} className="border border-gray-300 rounded-lg w-full h-48 p-2"></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Board;