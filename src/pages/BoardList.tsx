import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Board {
    id: string;
    title: string;
    content: string;
    author: string;
}

const App: React.FC = () => {
    const [boardList, setBoardList] = useState<Board[]>([]);


    useEffect(() => {
        // API 요청을 보내서 데이터 가져오기
        axios.get('http://localhost:8080/board/list')
            .then(response => {
                const data = response.data.data.data;
                setBoardList(data);  // 상태에 데이터 저장
            })
            .catch(error => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []);

    return (
        <div className="App">
            <h1>게시판</h1>
            {/* 데이터가 존재하는 경우 출력 */}
            {boardList.length > 0 ? (
                <ul>
                    {boardList.map(board => (
                        <li key={board.id}>
                            <h2>{board.title}</h2>
                            <p>{board.content}</p>
                            <small>작성자: {board.author}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default App;