import { useEffect, useState } from "react"
import Header from "./components/Header"
import GameArea from "./components/GameArea"
import "./App.css"
import Confetti from "react-confetti"

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1
}
export default function App() {
    const [gameWinState, setGameWinState] = useState(false)
    const [squareData, setSquareData] = useState([])
    const totalItemsCount = 12

    useEffect(() => {
        let createdData = []
        for (let i = 1; i <= totalItemsCount; ++i) {
            createdData.push({
                id: i,
                num: getRandomInt(6),
                selected: false
            })
        }
        if (!gameWinState) setSquareData(createdData)
    }, [gameWinState])

    function selectItem(id) {
        // select the current item if and only 
        // if the number is not yet selected.
        let [selectedValue, selectedValueCount] = [0,0]
        squareData.forEach(square => {
            if (square.selected) {
                selectedValue = square.num
                selectedValueCount += 1
            }
        })
        if (selectedValue === 0 || squareData[id-1].num === selectedValue) {
            selectedValueCount += squareData[id-1].selected ? -1 : 1
            setSquareData(prevData => {
                return prevData.map(item => {
                    return item.id === id ? { ...item, selected:!item.selected } : item
                })
            })
        } else {
            alert(`Can only select squares with ${selectedValue} written on them!`)
        }

        console.log("SelectedValueCount=",selectedValueCount)
        if (selectedValueCount === 12) setGameWinState(true)
    }

    function handleShuffleNumbers() {
        // This function handles the click on roll button
        // It changes the value of all those boxes that are
        // not yet changed.
        if (gameWinState === true) {
            setGameWinState(false)
        } else {
            setSquareData(prevData => prevData.map(item => {
                return item.selected ? item : { ...item, num: getRandomInt(6) }
            }))
        }
    }

    return (
        <div className="container">
            { gameWinState && <Confetti /> }
            <Header />
            <div className="gameRules">
                <h1>Goal and Rules</h1>
                <ul>
                    <li>The goal of the game is to select all the squares shown in the Game Area.</li>
                    <li>In the first step, you can choose any of the numbers, but in the subsequent steps you can only choose the numbers that are already selected.</li>
                </ul>
            </div>
            <GameArea 
                data = { squareData }
                onItemClick = { selectItem }
            />
            <button 
                className="button" 
                onClick={ handleShuffleNumbers }
            >
                { !gameWinState ? "Change Numbers" : "Start Again" }
            </button>
        </div>
    )
}
