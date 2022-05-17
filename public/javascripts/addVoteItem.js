const itemBox = document.querySelector('.itemBox');
const voteItemList = document.getElementsByName('voteItem');

const addItem = () => {
  const newVoteInput = document.createElement('p');
  newVoteInput.innerHTML = "<input type='text' name='voteItems' required minlength=2> <input type='button' value='delete' onclick='remove(this)'>";
  itemBox.appendChild(newVoteInput);
}

const remove = (obj) => {
  itemBox.removeChild(obj.parentNode);
}

const getCheckedItem = (event) => {
  console.log(voteItemList);

  voteItemList.forEach((item) => {
    if(item.checked)  {
      document.getElementById('result').innerText
        = item.value;
    }
  });
}
