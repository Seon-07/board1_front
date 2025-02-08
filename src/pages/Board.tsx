import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Board {
    id: string;
    title: string;
    content: string;
    author: string;
}

const Board: React.FC = () => {
    const { id } = useParams();
    const [board, setBoard] = useState<Board | null>(null);

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

    if (!board) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p><strong>작성자:</strong> {board.author}</p>
            <p>{board.content}</p>
        </div>
    );
}

export default Board;