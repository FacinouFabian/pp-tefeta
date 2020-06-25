const readline = require('linebyline')

let enterIndex: string = ''
let exitIndex: string = ''
let mapSize = []
let size = []
let grille = new Array()

// check .map file extension
function checkFile() {
    const file = process.argv[2];
    const regex = /\.map$/gm
    if (regex.test(file)){
       readFile(file)
    } else {
        console.log('The argument provided is not a .map file.');
        console.log('   Try `npm run help` to see list of commands.');
    }
}

// listen for `line` event
function readFile(file:string){
    // read all lines
    const rl = readline(file)

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
            let tab: Array<string> = line.split('')
            // get all items in the line  
            for (const elt in tab){ 
                // set each item to a maze case
                grille[lineCount-2][elt] = tab[elt];
                // get the entry position for the start of the game
                if (tab[elt] === '1'){
                    draw(lineCount, elt, tab)
                    enterIndex = 'line ' + lineCount + ', Position : ' + elt + ', Value: ' + tab[elt]
                }
                // get the exit position for the end of the game
                if (tab[elt] === '2'){
                    draw(lineCount, elt, tab)
                    exitIndex = 'line ' + lineCount + ', Position : ' + elt + ', Value: ' + tab[elt]
                } else {
                    draw(lineCount, elt, tab)
                }
            }
        }
      
    }).on('error', (err) => {
        console.error(err)
    
    }).on('end', (err) => {
        console.log('Maze size: ' + size[0] + 'x' + size[1]);
        console.log('Entry: ' + enterIndex)
        console.log('Exit: ' + exitIndex)
        displayMap(grille)
    })
}

function initMaze(){
    // init maze
    for(let i=0; i<size[1]; i++){
        grille[i] = new Array()
        for(let j=0; j<size[0]; j++){
            grille[i][j] = 'x'
        }
    } 
}

function draw(line, elt, tab){
    mapSize[elt] = tab[elt]
}

function displayMap(grille){
    let arrText: string = ''

    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            arrText += grille[i][j] + ' '
        }
        console.log(arrText)
        arrText = ''
    }
}

checkFile()