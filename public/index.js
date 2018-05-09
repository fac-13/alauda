/* eslint-disable */
var main = document.querySelector('main'); 
var buttonTryMe = document.getElementById('button__tryme');

var clearContents = function(){
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }
}

var generateGiftPage = function(){
    var hello = document.createElement('p'); 
    var helloText = document.createTextNode('I am the gift page'); 
    hello.appendChild(helloText); 
    main.appendChild(hello); 
}

buttonTryMe.addEventListener('click', function(){
    clearContents(); 
    generateGiftPage(); 
}); 

