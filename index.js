
$(window).on('load', retrieveIdea);
$('.save-btn').on('click', createIdea)
$('.search-input').on('keyup', searchCard);
$('.bottom-box').on('keyup','.body-of-card', editBody)
$('.bottom-box').on('keyup','.title-of-card', editTitle)
$('.bottom-box').on('click','.upvote', storeVoteUp)
$('.bottom-box').on('click','.downvote', storeVoteDown)

function createIdea(e) {
  e.preventDefault();
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var quality = $('.qualityVariable').text;
  var id = Date.now();
  var newIdea = new Idea(titleInput, bodyInput, id, quality)
  var savebtn = $('.savebtn')
    if(titleInput.length < 1 || bodyInput.length < 1) {
      savebtn.disabled = true;
    } else {
      savebtn.disabled = false;
  setIdea(newIdea);
  newCard(newIdea.id, newIdea.titleInput, newIdea.bodyInput, newIdea.quality);
}
};

function newCard(IdeaId, title, body, quality) {
  var titleInput = $('.title-input');
  var bodyInput = $('.body-input');
  var bottomBox = $('.bottom-box'); {
        bottomBox.prepend (`<div class="card-container" data-unid=${IdeaId}>
            <h2 role='title' class="title-of-card" contenteditable="true">${title}</h2>
            <button class="delete-button" onclick="deleteIdea(event)"></button>
            <p class="body-of-card" contenteditable="true">${body}</p>
            <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
            <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
            <p class='quality'>Quality:</p>
            <p class='qualityVariable'>${quality}</p>
            <hr> 
            </div>`);
    titleInput.val('');
    bodyInput.val('');
  }
};

function Idea(titleInput, bodyInput, quality) {
  var qualityA = ['swill', 'probable', 'genius'];
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = 'swill';
  this.id = Date.now();
};

function retrieveIdea() {
  for (var i = 0; i < localStorage.length; i++) {
   var retrievedIdea = localStorage.getItem(localStorage.key(i));
   var parsedIdea = JSON.parse(retrievedIdea);
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
};

function searchCard() {
  var searchText = $(this).val();
  $('.card-container').each(function() {
    var title = $(this).children('.title-of-card').text()
    var body = $(this).children('.body-of-card').text()
    if (title.search(new RegExp(searchText, "i")) !== -1 || body.search(new RegExp(searchText, "i")) !== -1) {
     $(this).show();
    } else {
      $(this).hide();
    }
  })
};

function editTitle(event) {
  var thisArticleId = $(event.target).parent().data('unid');
  var newTitle = JSON.parse(localStorage.getItem(thisArticleId));
  var newTitleInput = $(event.target).text();
  newTitle.titleInput = newTitleInput;
  setIdea(newTitle);
};

function editBody(event) {
  var thisArticleId = $(event.target).parent().data('unid');
  var newBody = JSON.parse(localStorage.getItem(thisArticleId));
  var newBodyInput = $(event.target).text();
  newBody.bodyInput = newBodyInput;
  setIdea(newBody);
};

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

function storeVoteUp(event) {
  var thisArticleId = $(event.target).parent().data('unid');
  var article = JSON.parse(localStorage.getItem(thisArticleId));
  var currentVote = $(event.target).parent().find('.qualityVariable').text();
  article.quality = currentVote;
  setIdea(article);
}

function storeVoteDown(event) {
  var thisArticleId = $(event.target).parent().data('unid');
  var article = JSON.parse(localStorage.getItem(thisArticleId));
  var currentVote = $(event.target).parent().find('.qualityVariable').text();
  article.quality = currentVote;
  setIdea(article);
}


function deleteIdea(event) {
  var ideaTarget = event.target.parentNode;
  var thisArticleId = $(event.target).parent().data('unid');
  ideaTarget.parentNode.removeChild(ideaTarget);
  localStorage.removeItem(thisArticleId);

};





