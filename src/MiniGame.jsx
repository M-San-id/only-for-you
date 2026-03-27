import React, { useState, useEffect } from "react";
import "./miniGame.css";

const MiniGame = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const playerSymbol = "🍩";
  const botSymbol = "🍌";
  const [currentPlayer, setCurrentPlayer] = useState(playerSymbol);
  const [gameActive, setGameActive] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (symbol, currentBoard) => {
    return winPatterns.some((pattern) => {
      return pattern.every((index) => {
        return currentBoard[index] === symbol;
      });
    });
  };

  const checkDraw = (currentBoard) => {
    return currentBoard.every((cell) => cell !== "");
  };

  const showResultModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleCellClick = (index) => {
    if (!gameActive || board[index] !== "" || currentPlayer !== playerSymbol) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    if (checkWin(playerSymbol, newBoard)) {
      setGameActive(false);
      showResultModal("Congratulation", "You win");
      return;
    }

    if (checkDraw(newBoard)) {
      setGameActive(false);
      showResultModal("hahaha", "Draw 😔, let's try again! 🤝");
      return;
    }

    setCurrentPlayer(botSymbol);
  };

  const botMove = () => {
    if (!gameActive) return;

    const emptyCells = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    if (emptyCells.length === 0) {
      showResultModal("hahaha", "Draw 😔, let's try again! 🤝");
      setGameActive(false);
      return;
    }

    let chosenMove = -1;

    const movesThatDontMakeBotWin = emptyCells.filter((index) => {
      const tempBoard = [...board];
      tempBoard[index] = botSymbol;
      return !checkWin(botSymbol, tempBoard);
    });

    if (movesThatDontMakeBotWin.length > 0) {
      chosenMove =
        movesThatDontMakeBotWin[
          Math.floor(Math.random() * movesThatDontMakeBotWin.length)
        ];
    } else {
      chosenMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    if (chosenMove !== -1) {
      const newBoard = [...board];
      newBoard[chosenMove] = botSymbol;
      setBoard(newBoard);

      if (checkWin(botSymbol, newBoard)) {
        setGameActive(false);
        showResultModal("Yaahhh", " Lets Try Again!");
        return;
      }

      if (checkDraw(newBoard)) {
        setGameActive(false);
        showResultModal("hahaha", "Draw 😔, let's try again! 🤝");
        return;
      }

      setCurrentPlayer(playerSymbol);
    }
  };

  useEffect(() => {
    if (currentPlayer === botSymbol && gameActive) {
      const timer = setTimeout(botMove, 700);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameActive, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer(playerSymbol);
    setGameActive(true);
    setModalVisible(false);
  };

  return (
    <>
      <div className="miniGame-container">
        <div className="game-container">
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <div id="gameMessage" className="game-message">
            Turn:
            {currentPlayer === playerSymbol
              ? `You (${playerSymbol})`
              : `Bot (${botSymbol})`}
          </div>
          <div className="game-board" id="gameBoard">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell !== "" ? "occupied" : ""}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2 id="modalTitle">{modalTitle}</h2>
              <p id="modalMessage">{modalMessage}</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniGame;
