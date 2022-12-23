const right = 1, left = 2, up = 3, down = 4
let tmp = 0
function findZero(state, d)
{
    for(let l = 0; l < d; l++)
    {
        for(let k = 0; k < d; k++)
            if(state[l][k] === 0)
                return [l, k]
    }
}
export function actions(state, d)
{
    const [i, j] = findZero(state, d)
    if(i === 0 && j === 0)
        return [up, left]
    else if(i === 0 && j === (d-1))
        return [up, right]
    else if(i === (d-1) && j === 0)
        return [down, left]
    else if(i === (d-1) && j === (d-1))
        return [down, right]
    else if(i === 0)
        return [up, left, right]
    else if(i === (d-1))
        return [down, left, right]
    else if(j === 0)
        return [up, down, left]
    else if(j === (d-1))
        return [up, down, right]
    else
        return [up, down, left, right]
}

function successor(state, action, d)
{
    const newS =[state[0].slice(), state[1].slice(), state[2].slice()]
    const [i, j] = findZero(state, d)
    if(action === left)
    {
        newS[i][j] = state[i][j+1]
        newS[i][j + 1] = 0
    }
    else if(action === right)
    {
        newS[i][j] = state[i][j - 1]
        newS[i][j - 1] = 0
    }
    else if(action === down)
    {
        newS[i][j] = state[i - 1][j]
        newS[i - 1][j] = 0
    }
    else if(action === up)
    {
        newS[i][j] = state[i + 1][j]
        newS[i + 1][j] = state[i][j]
    }
    return newS
}

export function move(state, i, j, d)
{
    const zero = findZero(state, d)
    const _actions = actions(state, d)
    if(_actions.includes(right) && i === zero[0] && j === zero[1] - 1)
        return successor(state, right, d)
    else if(_actions.includes(left) && i === zero[0] && j === zero[1] + 1)
        return successor(state, left, d)
    else if(_actions.includes(up) && i === zero[0] + 1 && j === zero[1])
        return successor(state, up, d)
    else if(_actions.includes(down) && i === zero[0] - 1 && j === zero[1])
        return successor(state, down, d)
    else
        return state
}

export function checkWon(state)
{
    let counter = 0
    for (let x = 0; x < state.length; x++ )
    {
        for (let y = 0; y < state.length; y++ )
        {
            counter++
            if ( (counter%9) != state[x][y])
                return false
        }
    }
    return true
}