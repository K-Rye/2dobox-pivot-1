
// ================
// Global Variables
// ================

// var title = $('.title-input').val();
// var body = $('.body-input').val();
// var numCards = 0;
// var qualityVariable = "swill";

$('.save-btn').on('click', createIdea)

// function createIdea(e) {
//   e.preventDefault();
//   var titleInput = titleInput.val();
//   var bodyInput = bodyInput.val();
//   var newIdea = new Idea(newTitle, newBody)
//   arrayOfObject.push(newIdea);
//   stringAndStore(Idea);
//   newCard();
// };


function createIdea(e) {
  e.preventDefault();
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var quality = $('.qualityVariable');
  var id = Date.now();
  var newIdea = new Idea(titleInput, bodyInput, id, quality)
  setIdea(newIdea);
  newCard(newIdea.id, newIdea.titleInput, newIdea.bodyInput, newIdea.quality);
};


// function cardObject() {
//         title: $('.title-input').val(),
//         body: $('.body-input').val(),
//         quality: qualityVariable
//     };

// $('.save-btn').on('click', function(event) {
//     event.preventDefault();
//     if ($('.title-input').val() === "" || $('.body-input').val() === "") {
//        return false;
//     };  

//     numCards++;
//     $( ".bottom-box" ).prepend(newCard('card' + numCards, $('.title-input').val(), $('.body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// });


// =================
// New Card Function
// =================

// var newCard = function(id , title , body , quality) {
    // return '<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
    //         + title +  '</h2>'
    //         + '<button class="delete-button"></button>'
    //         +'<p class="body-of-card">'
    //         + body + '</p>'
    //         + '<button class="upvote"></button>' 
    //         + '<button class="downvote"></button>' 
    //         + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
    //         + '<hr>' 
    //         + '</div>';
// };

function newCard(IdeaId, title, body, quality) {
  var titleInput = $('.title-input');
  var bodyInput = $('.body-input');
  var quality = ['swill', 'probable', 'genius'];
    var bottomBox = $('.bottom-box'); {
        bottomBox.prepend (`<div class="card-container" data-unid=${IdeaId}>
            <h2 class="title-of-card" contenteditable="true">${title}</h2>
            <button class="delete-button" onclick="deleteIdea(event)"></button>
            <p class="body-of-card" contenteditable="true">${body}</p>
            <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
            <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
            <p class='quality'>Quality:</p>
            <p class='qualityVariable'>${quality[0]}</p>
            <hr> 
            </div>`);
    titleInput.val('');
    bodyInput.val('');
  }
};

    
// function newCard(e) {
//     e.preventDefault();
//     var titleInput = $('.title-input').val();
//     var bodyInput = $('.body-input').val();
//     var qualityVariable = $('.qualityVariable').val();
//     var bottomBox = $('.bottom-box')
//     bottomBox.prepend (`<div class="card-container">
//             <h2 class="title-of-card" contenteditable="true">${titleInput}</h2>
//             <button class="delete-button" onclick="deleteIdea(event)"></button>
//             <p class="body-of-card" contenteditable="true">${bodyInput}</p>
//             <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
//             <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
//             <p class='quality'>quality:</p>
//             <p class='qualityVariable'>swill</p>
//             <hr> 
//             </div>`);

//     titleInput.val('');
//     bodyInput.val('');
// };

$(window).on('load', retrieveIdea);


function retrieveIdea() {
  for (var i = 0; i < localStorage.length; i++) {
   var retrievedIdea = localStorage.getItem(localStorage.key(i));
   var parsedIdea = JSON.parse(retrievedIdea);
   console.log(parsedIdea);
   newCard(parsedIdea.id, parsedIdea.titleInput, parsedIdea.bodyInput, parsedIdea.quality);
  };
};


// ============================= // Setting to local Storage //

function setIdea(newIdea) {
  var stringIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.id, stringIdea);
}; 

function getIdea(newIdea) {
    var getIdea = localStorage.getItem(newIdea.id);
    var parseGetIdea = JSON.parse(getIdea);
    newCard();
}

function editTitle(event) {
  console.log('hi')
    var thisArticleId = $(event.target).parent().data('unid');
    console.log(thisArticleId);
    var newTitle = JSON.parse(localStorage.getItem(thisArticleId));
    var newTitleInput = $(event.target).text();
    newTitle.titleInput = newTitleInput;
    setIdea(newTitle);
}

function editBody(event) {
    var thisArticleId = $(event.target).parent().data('unid');
    var newBody = JSON.parse(localStorage.getItem(thisArticleId));
    var newBodyInput = $(event.target).text();
    newBody.bodyInput = newBodyInput;
    setIdea(newBody);
}


$('.bottom-box').on('keyup','.body-of-card', editBody)
$('.bottom-box').on('keyup','.title-of-card', editTitle)

function Idea(titleInput, bodyInput, quality) {
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = quality[0];
  this.id = Date.now();
};

// var localStoreCard = function() {     var
// cardString = JSON.stringify(cardObject());     localStorage.setItem('card' +
// numCards  , cardString); }

// ===============================
// Retrieving from local Storage
// ===============================


// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });
// =============================================
// Quality Rating - Event Delegation
// =============================================

// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     // ======================================
//     // Update Quality in  Local Storage 
//     // ======================================

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });




function upvote(event) {
  var qualityArray = ['swill', 'probable', 'genius'];
  var qualityOutput = $(event.target.parentNode).find('.qualityVariable').get(0)
 if ($(qualityOutput).html() == qualityArray[0]) {
   $(qualityOutput).html(qualityArray[1]);
 } else if ($(qualityOutput).html() == qualityArray[1]) {
   $(qualityOutput).html(qualityArray[2]);
 }
};


function downvote(event) {
  var qualityArray = ['swill', 'probable', 'genius'];
  var qualityOutput = $(event.target.parentNode).find('.qualityVariable').get(0)
 if ($(qualityOutput).html() == qualityArray[2]) {
  $(qualityOutput).html(qualityArray[1]);
 } else if ($(qualityOutput).html() == qualityArray[1]) {
  $(qualityOutput).html(qualityArray[0]); 
 }
};


function deleteIdea(event) {
  var ideaTarget = event.target.parentNode;
  ideaTarget.parentNode.removeChild(ideaTarget);
};





