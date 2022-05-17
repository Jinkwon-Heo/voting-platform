const itemBox = document.querySelector('.itemBox');

const addItem = () => {
  const newVoteInput = document.createElement('p');
  newVoteInput.innerHTML = "<input type='text' name='voteItems' required minlength=2> <input type='button' value='delete' onclick='remove(this)'>";
  itemBox.appendChild(newVoteInput);
}

const remove = (obj) => {
  itemBox.removeChild(obj.parentNode);
}
