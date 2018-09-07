let game




// Hangman Ctor
const Hangman = function (word,remainingTries,hint) {
    this.word = word.toLowerCase().split(''),
    this.guessedLetters = [],
    this.hint = hint
    this.left = remainingTries
}


// getting a new puzzle

getNewPuzzle= () => {
    let request = new XMLHttpRequest();
    request.open('GET','http://puzzle.mead.io/puzzle');
    request.send();

    request.addEventListener('readystatechange',(e)=> {
        if(e.target.readyState === 4 && e.target.status === 200){
            console.log(JSON.parse(e.target.responseText))
            let data = JSON.parse(e.target.responseText).puzzle;
            console.log(data);

            game = new Hangman(data,4,'NA');

            console.log(game);

            game.getPuzzle();
        }
    })
}



//accept guess
Hangman.prototype.acceptGuess = function(ch) {
   
    if(this.word.includes(ch)){

    if(!this.guessedLetters.includes(ch))
    {
        this.guessedLetters.push(ch);
    }

}

    else this.left = this.left - 1;
}



//generate puzzle

Hangman.prototype.getPuzzle = function() {
    let puzzle = '';

    let toShow = ''

    if(this.left <= 0)
    {
       
        this.word.forEach( function(l) {
            toShow = toShow + l;
        } )
        document.querySelector('#puzzle').textContent = `word was "${toShow}"`;
        document.querySelector('#left').textContent = `Although it was a nice try!`
        return;
    }

    this.word.forEach(alpha => {
        if(this.guessedLetters.includes(alpha))
        {
            puzzle += alpha;
        }

        else puzzle += '*'

    });
    
    document.querySelector('#hint').textContent = `Hint : ${this.hint}`;
    document.querySelector('#puzzle').textContent = puzzle;
    document.querySelector('#left').textContent = `Remaining Chances : ${this.left}`;
 
}
