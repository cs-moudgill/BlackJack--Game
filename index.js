// #1
function agePromptBox(){
    const birth=prompt('Hey friend. In which year you were born?');// Prompt box.
    const currentYear=new Date().getFullYear();// Get the current year.
    const age=currentYear-birth; // Age difference.
    const ageInDays=age*365; // Age in Days.
    document.getElementById('age__result').innerHTML=`You are ${ageInDays} days old.`;//Result to HTML file.
}
function ageReset(){
    document.getElementById('age__result').innerHTML=null; //Reset the result.
}
// #2
function catGenerator(){
    var imgElement=document.createElement('img');//Create image element.
    var addTo=document.getElementById('catImages');
    imgElement.src='https://thecatapi.com/api/images/get?format=src&type=gif&size=small.html';// Added the src attribute with address in IMG element.
    addTo.appendChild(imgElement);// Append the complete IMG element to HTML file.
}
// #3
var randomInput='';
    var result='';
    window.onload=function randomSelection(){ //Why onload?,because we want to generate the random number at first/when someone opens the real time site.
    var random=Math.random()*3;
    var round=Math.floor(random)+1; //Returns the number 'downward' to its nearest integer.
    if(round==1){
      randomInput='rock';
        return randomInput;
    }if(round==2){
         randomInput='paper';
        return randomInput;
    }else{
         randomInput='scissor';
        return randomInput;
    }
}

function detect(userSelection){ // Argument equals to user selection.
    if(userSelection=='rock' && randomInput=='rock' || userSelection=='paper' && randomInput=='paper' || userSelection=='scissor' && randomInput=='scissor'){
        result='You Tied!';
       rpsGame(result,userSelection);
   }else if(userSelection=='paper' && randomInput=='rock' || userSelection=='rock' && randomInput=='scissor' || userSelection=='scissor' && randomInput=='paper'){
       result='You Won!';
       rpsGame(result,userSelection);
   }else{
        result='You Lose!';
        rpsGame(result,userSelection); 
   }
}
function rpsGame(data,userImage){ // Data equals to result in string form.
    var insert=`<img src="/static/images/${userImage}.png" alt="" id="rock" class="user__selection" onclick="detect(event.target.id)">
    <div id="rps__result">${data}</div> 
    <img src="/static/images/${randomInput}.png" alt="" id="scissor" class="random__selection" onclick="detect(event.target.id)">`;
    document.getElementsByClassName('rpsImages')[0].innerHTML=insert;
} //Line 51- Div for result.

//#4
function colorButtons(color){
if(color=='red' || color=='green'){
    colorRG(color);
}else if(color=='random'){
    colorRandom();
}else if(color=='reset'){
    colorReset();
}
}
const buttons=document.getElementsByClassName('color__dropdown')[0].getElementsByTagName('input');
let colorSet=[]; // Declare the array.
let defaultColor=[]; //Blue> Red> Yellow> Green.
for(i=0;i<buttons.length;i++){
    defaultColor.push(buttons[i].id);
}

function colorRG(value){
    for(i=0;i<buttons.length;i++){
        buttons[i].id=value;
    }
}

function colorRandom(){
    colorSet=[]; //it clears the items in an array.
    for(i=0;i<buttons.length;i++){
    var randomNumber=Math.floor(Math.random()*4);
    colorSet.push(defaultColor[randomNumber]);
    buttons[i].id=colorSet[i];
}
}
function colorReset(){
    for(i=0;i<buttons.length;i++){
        buttons[i].id=defaultColor[i];
    }
}

//5
//# Card Value according to array index i.e. 1st with ace 11 and 2nd with ace 1.
var cardSet=[10,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,10,10,10,10,10,10,10,10,10,10,10];
var cardSet__ace__1=[10,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,1,1,1,1,10,10,10,10,10,10,10,10,10,10,10];
var sumYou=0;
var sumDealer=0;
//# Calculate results:Loss, wins, and draws.
var loss=0;
var draw=0;
var win=0;
var textYou=document.getElementById('you__selected');
var textDealer=document.getElementById('dealer__selected');
//# User Function.
function start(buttonClicked){
    if(buttonClicked=='hit' && sumDealer===0 && sumYou<=21){
         hit();
    }
    else if((buttonClicked=='dealer' && sumYou!=0)){
    dealer();
    }
    else if((buttonClicked=='deal' && sumYou<=21 && sumYou<sumDealer) || (buttonClicked=='deal' && sumYou>21 && sumDealer>21) || (buttonClicked=='deal' && sumYou==sumDealer) || (buttonClicked=='deal' && sumYou>21 && sumDealer<=21)){
    deal();
    }
    }
function hit(){
    var hitRandom=Math.floor(Math.random()*52);
    var imageElement=document.createElement('img');
    imageElement.src=`static/images/cards/card (${hitRandom}).png`;
    imageElement.style='height:200px';
    imageElement.id='image__id';
    //# Decide Ace card value 1 or 11 according to total value(you or dealer).
    if(sumYou<=10){
        sumYou=sumYou+cardSet[hitRandom];
    }else{
        sumYou=sumYou+cardSet__ace__1[hitRandom];
    }
    textYou.innerHTML=sumYou;
    document.getElementsByClassName(`you__image`)[0].appendChild(imageElement);
    if(sumYou>21){
    textYou.innerHTML='BUST!';
    }
}

async function dealer (){
    for(i=0;i<7;i++){
        var dealerRandom=Math.floor(Math.random()*52);
        var imageElement=document.createElement('img');
        imageElement.src=`static/images/cards/card (${dealerRandom}).png`;
        imageElement.style='height:200px';
        imageElement.id='image__id'; 
        if(sumDealer<=10){
            sumDealer=sumDealer+cardSet[dealerRandom];
        }else{
            sumDealer=sumDealer+cardSet__ace__1[dealerRandom];
        }
        textDealer.innerHTML=sumDealer;
        //#Delay with setTimeOut and Promise.
        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
        document.getElementsByClassName(`dealer__image`)[0].appendChild(imageElement);
        await wait(1000);
        //#Conditions related to 'bust' situations, let's play and results.
        if((sumDealer>sumYou && sumDealer<=21) || (sumYou>21 && sumDealer>=15 && sumDealer<=21)){
           textYou.innerHTML='BUST!';
            document.getElementById('playHeading').style.color='red';
            document.getElementById('playHeading').innerHTML='You Lost!';
            loss=loss+1;
            document.getElementsByClassName('blackjack__losses')[0].innerHTML=`<p>Losses</p><p>${loss}</p>`;
            break; //stops the loop.
        }if((sumDealer==sumYou) || (sumYou>21 && sumDealer>21)){
            textYou.innerHTML='BUST!';
            textDealer.innerHTML='BUST!';
            document.getElementById('playHeading').style.color='red';
            document.getElementById('playHeading').innerHTML='You Drew!';
            draw=draw+1;
            document.getElementsByClassName('blackjack__draws')[0].innerHTML=`<p>Draws</p><p>${draw}</p>`;
            break; //stops the loop.
        }
        if(sumDealer>21){
            textDealer.innerHTML='BUST!';
            document.getElementById('playHeading').style.color='#006400';
            document.getElementById('playHeading').innerHTML='You Won!';
            win=win+1;
            document.getElementsByClassName('blackjack__win')[0].innerHTML=`<p>Wins</p><p>${win}</p>`;
            break;// Stops the loop.
        }
        }
}
//# Reset the game.
function deal(){
document.getElementsByClassName('you__image')[0].textContent=''; // or we can use inner.HTML .
document.getElementsByClassName('dealer__image')[0].textContent=''; // or we can use inner.HTML .
sumYou=0;
sumDealer=0;
textYou.textContent=0;
textDealer.textContent=0;
textYou.removeAttribute('style');
textDealer.removeAttribute('style');
document.getElementById(`playHeading`).removeAttribute('style');
document.getElementById(`playHeading`).innerHTML="Let's Play";
}