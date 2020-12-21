import React, {useState} from 'react';
import Square from "./Square";
import './styles.css';

const GameLayout = () => {
    const [values, setValues] = useState(Array(9).fill(null));
    const [isONext, setIsONext] = useState(null);

    const printSquare = (i) => {
        return (
            <Square
                value={values[i]}
                onClick={() => handleClick(i)}
            />
        );
    }

    const handleClick = (i) => {
        if (checkGameStatus() || values[i])
            return;

        let valuesCopy = values.slice();
        valuesCopy[i] = isONext  ? 'O' : 'X';
        setValues(valuesCopy);
        setIsONext(!isONext );
    }

    const handleReset = () => {
        setValues(Array(9).fill(null));
        setIsONext(null);
    }

    const checkGameStatus = () => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [x, y, z] = winningLines[i];
            if (values[x] && values[x] === values[y] && values[x] === values[z]) {
                return values[x];
            }
        }

        let isMatchDraw = true;
        values.forEach(x => {
            if(!x)
                isMatchDraw = false;
        })
        return isMatchDraw ? "Tie" : null;
    }

    const getStatusMessage = () => {
        const returnVal = checkGameStatus(values);
        if (returnVal === "Tie")
            return "It's a tie!";

        if (returnVal)
            return `Player '${returnVal}' won the match!`;

        else if(isONext  === null)
            return `Player 'X'- Start the game!`;

        else
            return `Player ${isONext  ? 'O' : 'X'} 's chance`;
    }

    return (
        <div className='game'>
            <span className="welcome-msg">Let's play Tic-Tac-Toe...</span>
            <p className="status">
                {getStatusMessage()}
            </p>
            <div className="field">
                <div className="row-layout row__first">
                    <div className="border-right">{printSquare(0)}</div>
                    <div className="border-right">{printSquare(1)}</div>
                    <div>{printSquare(2)}</div>
                </div>
                <div className="row-layout row__second">
                    <div className="border-right">{printSquare(3)}</div>
                    <div className="border-right">{printSquare(4)}</div>
                    <div>{printSquare(5)}</div>
                </div>
                <div className="row-layout row__third">
                    <div className="border-right">{printSquare(6)}</div>
                    <div className="border-right">{printSquare(7)}</div>
                    <div>{printSquare(8)}</div>
                </div>
            </div>
            <button className='button' onClick={handleReset}>Reset</button>
        </div>
    );
}

export default GameLayout;