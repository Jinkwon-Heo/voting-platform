const getCheckedItem = (event) => {
  voteItemList.forEach((item) => {
    if(item.checked) {
      document.getElementById('result').innerText = item.value;
    }
  });
};
