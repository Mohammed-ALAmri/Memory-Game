
var numberOfMoves = 0 
var listOfCards = []
var stars = 3

$(document).ready(function(){
    var cards = getCards()
    addCards(cards)
    showCards(cards)
    hideCards(cards)
    addGameEvents(cards)
})

/*
 * Create a list that holds all of your cards
 * Shuffle the list of cards using the "shuffle" method below
 */

function getCards(){
    var cards = []
    document.querySelectorAll(".card").forEach(el => {
        cards.push(el)
    })
    cards = shuffle(cards)
    return cards
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 *   Add the cards on the page, loop through each card and create its HTML, add each card's HTML to the page
 */

 function addCards(cards){
    document.querySelector(".deck").innerHTML = ""
    cards.forEach(element => {
        document.querySelector(".deck").appendChild(element)
    });
}

/*   
 *    Display the card's symbol
 */ 

 function showCards(cards){
    cards.forEach(element => {
        $(element).toggleClass('open');
    })
 }

/*   
 *    Hide the card's symbol
 */ 

 function hideCards(cards){
    setTimeout(function(){
        cards.forEach(element => {
            $(element).removeClass('open');
        })}, 3000)
 }

 function addGameEvents(cards){
    setTimeout(function(){
        cards.forEach(element => {
            element.addEventListener("click", function(){
                $(element).addClass("open")
                $(element).addClass('noclicks');
                listOfCards.push(element)
                if(listOfCards.length % 2 == 0){
                
                    temp1 = listOfCards.pop()
                    temp2 = listOfCards.pop()

                    document.querySelector(".moves").innerHTML = ++numberOfMoves

                    if(temp1.childNodes[1].className == temp2.childNodes[1].className){
                        listOfCards.push(temp1)
                        listOfCards.push(temp2)
                        $(temp1).addClass('match')
                        $(temp2).addClass('match')                      
                    }

                    else{
                        $(temp1).addClass('notMatch')
                        $(temp2).addClass('notMatch')
                        setTimeout(function(){
                            $(temp1).removeClass('notMatch')
                            $(temp2).removeClass('notMatch') 
                            $(temp1).removeClass('open')
                            $(temp2).removeClass('open')
                            $(temp1).removeClass('noclicks')
                            $(temp2).removeClass('noclicks')                      
                         },500)
                    }
                }
                if(numberOfMoves == 10){
                    document.querySelector(".stars").innerHTML=""
                    stars = 2
                    $(".stars").append(`<li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>`)

                }

                if(numberOfMoves == 14){
                    document.querySelector(".stars").innerHTML=""
                    stars = 1
                    $(".stars").append(`<li><i class="fa fa-star"></i></li>`)
                }

                if(listOfCards.length == 16){
                    document.querySelector(".deck").innerHTML = ""
                    $(".deck").append(`<div class ="container1"><center>You win, Your Number Of Moves is <strong>${numberOfMoves}</strong> with a score of <strong>${stars} Star</strong>, If you want play again click refresh button !!!</div>`)

                }
            })
        })
    }, 3000)
 }