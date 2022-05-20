const itemBox = document.querySelector('.itemBox');
const voteItemList = document.getElementsByName('voteItem');
const expireTimeInput = document.getElementById('expireTime');
const expireMessageSpan = document.getElementById('expireMessageSpan');

const addItem = () => {
  const newVoteInput = document.createElement('p');
  newVoteInput.innerHTML = "<div class='input-wrapper'><input class='createvote-item-input fancy-item' type='text' name='voteItems' placeholder='Vote item' required autofocus></div> <input type='button' value='delete' onclick='remove(this)'>";
  itemBox.appendChild(newVoteInput);
};

const remove = (obj) => {
  itemBox.removeChild(obj.parentNode);
};
