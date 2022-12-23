import {GameView, clickToTail, canvas, d, won} from "./gameview.js"
import {move,checkWon} from "./game.js"

/*
const initialState = [
    [4, 1, 3],
    [7, 2, 5],
    [8, 0, 6]]
//*/
const initialState = []
let iter = 0
for(let x = 0; x < d; x++)
{
    initialState[x] = []
    for(let y = 0; y < d; y++)
    {
        initialState[x][y] = iter
        iter++
    }
}

for(let x = 0; x < d; x++)
{
    for(let y = 0; y < d; y++)
    {
        let i = Math.floor(Math.random() * (d-1))
        let j = Math.floor(Math.random() * (d-1))
        if( i === x & j === y ){ continue }
        let tmp = initialState[x][y]
        initialState[x][y] = initialState[i][j]
        initialState[i][j] = tmp
    }
}
//*/
let s1 = initialState
new GameView(s1)

canvas.addEventListener('click', moveView)


function moveView(event)
{
    const [i, j] = clickToTail(event.offsetX, event.offsetY)
    s1 = move(s1, i, j,d)
    new GameView(s1)
    if( checkWon(s1) )
        won();
}