

getNewPuzzle();

window.addEventListener('keypress',function(e){
  try {
    if(game.left > 0)
    {
    game.acceptGuess(e.key);
    game.getPuzzle();}

    else {getNewPuzzle()}//new puzzle
  }

  catch(err) {
    console.log(err.message);
    console.log(`games have exhausted`);
  }
})