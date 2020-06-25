const readline = require('linebyline')

// read all lines
rl = readline('text.txt')

let enterIndex = 0
let exitIndex = 0
let mapSize = []
let size
let grille = new Array()

// listen for `line` event
function readFile(){
    rl.on('line', (line, lineCount, byteCount) => {
        // get maze size
        const regex = /^\d+.*x\d+$/gm
        if (line.match(regex)){
            const sizes = line.split('x')
            mapSize.push(sizes[0])
            mapSize.push(sizes[1])    
            size=[sizes[0],sizes[1]]  
        } 

        initMaze()

        // if line is not a maze size
        if (!line.match(regex)) {  
            // get all items in the line          
            let tab = line.split('')            
            for (const elt in tab){ 
                // set each item to a maze case
                grille[lineCount-2][elt] = tab[elt]
                // get the entry position for the start of the game
                if (tab[elt] === '1'){
                    enterIndex = 'line ' + lineCount + ', Position : ' + elt 
                }
                // get the exit position for the end of the game
                if (tab[elt] === '2'){
                    exitIndex = 'line ' + lineCount + ', Position : ' + elt 
                } else {
                    draw(lineCount, elt, tab)
                }
            }
        }
        console.log('NEW MAZE');
        displayMap()
    }).on('error', (err) => {
        console.error(err)
    }).on('end', (err) => {
    })
}

function initMaze(){
    // init maze
    for(let i=0; i<size[1]; i++){
        grille[i] = new Array()
        for(let j=0; j<size[0]; j++){
            grille[i][j] = '+'
        }
    }
}

function draw(line, elt, tab){
    mapSize[line, elt] = tab[elt]
}

function displayMap(){
    arrText=''

    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            arrText+=grille[i][j]+' '
        }
        console.log(arrText)
        arrText=''
    }
}

/* test(13,12) */
readFile()