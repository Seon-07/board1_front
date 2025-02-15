import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Button from "../components/Button";
import axios from "axios";

const UpdateBoard: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/board?id=${id}`)
                .then(response => {
                    const boardData = response.data.data;
                    setTitle(boardData.title);
                    setAuthor(boardData.author);
                    setContent(boardData.content);
                })
                .catch(error => {
                    console.error("게시글을 가져오는 데 실패했습니다.", error);
                });
        }
    }, [id]);
    const handleSubmit = async () => {
        if (!title || !author || !content) {
            alert("모든 항목을 입력하세요.");
            return;
        }
        const data = { id, title, author, content };
        try {
            const response = await axios.post("http://localhost:8080/board/update", data, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                alert("게시글이 수정되었습니다.");
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
                    <Button text="이전" color="gray" onClick={() => navigate(`/board/${id}`)}/>
                    <div className="text-4xl">게시글 수정</div>
                    <Button text="저장" color="blue" onClick={handleSubmit}/>
                </div>
            </div>
            <div className="flex justify-center h-[70%]">
                <table className="w-3/4 border border-gray-300">
                    <tbody>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">제목</td>
                            <td className="py-8 w-4/5 px-4">
                                <input
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">작성자</td>
                            <td className="py-8 w-4/5 px-4">
                                <input
                                    className="border border-gray-300 rounded-md p-2 w-1/4"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr className="h-3/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">내용</td>
                            <td className="py-8 w-4/5 px-4 align-top">
                                <textarea
                                className="border border-gray-300 rounded-lg w-full h-48 p-2"
                                value={content} onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UpdateBoard;