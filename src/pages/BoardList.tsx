import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Board {
    id: string;
    title: string;
    author: string;
}

const BoardList: React.FC = () => {
    const [boardList, setBoardList] = useState<Board[]>([]);

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
            <h1>게시판</h1>
            {boardList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                    {boardList.map(board => (
                        <tr key={board.id}>
                            <td>
                                <Link to={`/board/${board.id}`}>{board.title}</Link>
                            </td>
                            <td>{board.author}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default BoardList;