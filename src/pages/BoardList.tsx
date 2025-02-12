import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface Board {
    id: string;
    title: string;
    author: string;
}

const BoardList: React.FC = () => {
    const [boardList, setBoardList] = useState<Board[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/board/list')
            .then(response => {
                const data = response.data.data;
                setBoardList(data);  // 상태에 데이터 저장
            })
            .catch(error => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-center items-center py-8">
                <Button text="이전" color="gray" onClick={() => navigate(`/`)} className="absolute top-4 left-4"/>
                <div className="text-4xl">게시판</div>
            </div>
            <div className="flex justify-center">
            {boardList.length > 0 ? (
                <table className="w-3/4 border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-4 w-4/5">제목</th>
                            <th className="py-4 w-1/5">작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                    {boardList.map(board => (
                        <tr key={board.id} className="border border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/board/${board.id}`)}>
                            <td className="py-2 px-4">{board.title}</td>
                            <td className="py-2 px-4 text-center">{board.author}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
            </div>
        </div>
    );
}

export default BoardList;