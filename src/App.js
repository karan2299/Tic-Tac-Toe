import './App.css';
import React, {useEffect, useState} from "react";

const sample = require('lodash.sample');

function App() {
    const [tableVal, setTableVal] = useState(Array(9).fill(''))
   const [playStep, setPLayStep] = useState('O')
    const [winMessage, setWinMessage] = useState('')
    const [gameMode, setGameMode] = useState('onevone')
    const [disableGameMode, setDisableGameMode] =useState(false)
    const [player, setPlayer] = useState('player1')
  const audio = new Audio('mixkit-message-pop-alert-2354.mp3')
    const handleClick =(e) => {
         setDisableGameMode(true)
        if(tableVal[e] === '' && winMessage === ''){
            audio.play().then(r =>{} );
            setPlayer(player === "player1"? "player2":"player1")
        let boardArray =[...tableVal]
        boardArray[e] =playStep

        setTableVal(boardArray)
        if(playStep === 'O' && gameMode === 'onevone'){
            setPLayStep('X')
        }
        else if(playStep === 'X' && gameMode === 'onevone'){
            setPLayStep('O')
        }

        }
    }
    useEffect(()=>{
        checkWinner()
    },[tableVal])
    const checkWinner = () =>{
        const winningConditions =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        winningConditions.forEach((boardNumber) =>{
            if(tableVal[boardNumber[0]] !== '' &&  tableVal[boardNumber[1]] !== ''  && tableVal[boardNumber[2]] !== ''  ) {
                if (tableVal[boardNumber[0]] === tableVal[boardNumber[1]] && tableVal[boardNumber[1]] === tableVal[boardNumber[2]]) {
                 setWinMessage(`congrats player(${tableVal[boardNumber[0]]}) is Winner... 🎉 `)
                }
            }
        })
    }
    const ResetGame = () =>{
        setTableVal(Array(9).fill(''))
        setWinMessage('')
        setPLayStep('O')
        setPlayer('player1')
        setDisableGameMode(false)
    }
    useEffect(()=>{
        if(gameMode !== 'onevone') {
            if (player === 'player2') {
                let boardArray = [...tableVal]
                let emptySpaces = []
                boardArray.map((el, index) => {
                    if (el !== 'O' && el !== 'X') {
                        emptySpaces.push(index)
                    }
                })
                const ans = sample(emptySpaces)
                boardArray[ans] = 'X'
                setTableVal(boardArray)
                setPlayer(player === "player1" ? "player2" : "player1")

            }
        }
    },[player])
  return (
    <div className="App">
      <header className="App-header">
          {winMessage !== '' ? <>
          </>:''}
    <h2 className="mb-5">Tic Tac Toe</h2>
        <div className="" style={{display:"flex", flexDirection:'column'}}>
            <div className="d-flex justify-content-between mb-5">
                <button className={`btn btn-outline-light mt-2 ${disableGameMode ? 'disabled':''} ${gameMode === 'onevone' ? 'highlightButton' : ''}`} style={{width:"48%"}} onClick={()=>setGameMode('onevone')}>1 V 1</button>
                <button className={` btn btn-outline-light mt-2 ${disableGameMode ? 'disabled':''} ${gameMode === 'onevcpu' ? 'highlightButton' : ''}`} style={{width:"48%"}} onClick={()=>setGameMode('onevcpu')}>1 V CPU</button>
            </div>
        <table>
            <tbody>
            <tr>
                <th className="table-block " onClick={()=> handleClick(0)}
                    style={{borderBottom:"2px solid white", borderRight:"2px solid white"}}>{tableVal[0]}</th>
                <th className="table-block" onClick={()=> handleClick(1)}
                    style={{borderBottom:"2px solid white", borderRight:"2px solid white"}}>{tableVal[1]}</th>
                <th className="table-block" onClick={()=> handleClick(2)}
                    style={{borderBottom:"2px solid white",}}>{tableVal[2]}</th>
            </tr>
            <tr>
                <th className="table-block" onClick={()=> handleClick(3)}
                    style={{borderBottom:"2px solid white", borderRight:"2px solid white"}}>{tableVal[3]}</th>
                <th className="table-block" onClick={()=> handleClick(4)}
                    style={{borderBottom:"2px solid white", borderRight:"2px solid white"}}>{tableVal[4]}</th>
                <th className="table-block" onClick={()=> handleClick(5)}
                    style={{borderBottom:"2px solid white"}}>{tableVal[5]}</th>
            </tr>
            <tr>
                <th className="table-block" onClick={()=> handleClick(6)}
                    style={{ borderRight:"2px solid white"}}>{tableVal[6]}</th>
                <th className="table-block" onClick={()=> handleClick(7)}
                    style={{ borderRight:"2px solid white"}}>{tableVal[7]}</th>
                <th className="table-block" onClick={()=> handleClick(8)}>{tableVal[8]}</th>
            </tr>
            </tbody>
        </table>
            <span className="mt-3 mb-4">{winMessage}</span>
            <button className="btn btn-outline-light mt-2" onClick={()=>ResetGame()}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
