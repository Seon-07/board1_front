import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface Board {
    id: string;
    title: string;
    content: string;
    author: string;
}

const Board: React.FC = () => {
    const { id } = useParams();
    const [board, setBoard] = useState<Board | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/board?id=${id}`)
                .then(response => {
                    setBoard(response.data.data);
                })
                .catch(error => {
                    console.error("게시글을 가져오는 데 실패했습니다.", error);
                });
        }
    }, [id]);

    const handleDelete = () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) return;
        axios.post(`http://localhost:8080/board/delete`,{id})
            .then(response => {
                if (response.status === 200) {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/Boardlist"); // 삭제 후 목록 페이지로 이동
                } else {
                    alert("삭제 실패");
                }
            })
            .catch(error => {
                console.error("게시글 삭제 실패:", error);
                alert("서버 오류로 인해 삭제할 수 없습니다.");
            });
    };

    if (!board) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="w-screen flex justify-center items-center py-8">
                <div className="w-3/4 flex justify-between">
                    <Button text="목록" color="gray" onClick={() => navigate(`/boardlist`)}/>
                        <div className="text-4xl">상세보기</div>
                    <div>
                        <Button text="수정" color="green" onClick={() => navigate(`/board/update/${id}`)}/>
                        <Button text="삭제" color="red" className="ml-4" onClick={handleDelete}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-[70%]">
                <table className="w-3/4 border border-gray-300">
                    <tbody>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">제목</td>
                            <td className="py-8 w-4/5 px-4">{board.title}</td>
                        </tr>
                        <tr className="h-1/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">작성자</td>
                            <td className="py-8 w-4/5 px-4">{board.author}</td>
                        </tr>
                        <tr className="h-3/5">
                            <td className="py-8 w-1/5 text-center font-bold text-2xl">내용</td>
                            <td className="py-8 w-4/5 px-4 align-top">{board.content}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Board;