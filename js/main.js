import {GameView, clickToTail, canvas} from "./gameview.js"
import {move,successor,goalTest,actions} from "./game.js"
import search from "./search.js"
/*
const initialState = [
    [4, 1, 3],
    [7, 2, 5],
    [8, 0, 6]]
//*/
let steps = 0
const score = document.querySelector('#score');

const initialState = []
let iter = 0
for(let x = 0; x < 3; x++)
{
    initialState[x] = []
    for(let y = 0; y < 3; y++)
    {
        initialState[x][y] = iter
        iter++
    }
}

for(let x = 0; x < 3; x++)
{
    for(let y = 0; y < 3; y++)
    {
        let i = Math.floor(Math.random() * 2)
        let j = Math.floor(Math.random() * 2)
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
const btn = document.querySelector('#btn_ai')
btn.addEventListener('click', start_ai)

function moveView(event)
{
    const [i, j] = clickToTail(event.offsetX, event.offsetY)
    s1 = move(s1, i, j)
    new GameView(s1)

}


function start_ai()
{
    const solution = search(s1,goalTest,actions,successor,false)
    for(let i = 0; i < solution.length; i++)
    {
        setTimeout(()=>{new GameView(solution[i].state)},i * 300)
        if ( i === solution.length - 1 )
        {
            s1 = solution.state
            steps++
            score.innerHTML = steps
        }
    }
}