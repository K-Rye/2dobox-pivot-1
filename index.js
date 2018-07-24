
$('.save-btn').on('click', createIdea)
$(window).on('load', retrieveIdea);
$('.bottom-box').on('keyup','.body-of-card', editBody)
$('.bottom-box').on('keyup','.title-of-card', editTitle)

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

function Idea(titleInput, bodyInput, quality) {
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = quality[0];
  this.id = Date.now();
};

function retrieveIdea() {
  for (var i = 0; i < localStorage.length; i++) {
   var retrievedIdea = localStorage.getItem(localStorage.key(i));
   var parsedIdea = JSON.parse(retrievedIdea);
   console.log(parsedIdea);
   newCard(parsedIdea.id, parsedIdea.titleInput, parsedIdea.bodyInput, parsedIdea.quality);
  };
};

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





