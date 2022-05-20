exports.getMyVotes = (voteList, userData) => {
  const filteredData = voteList.filter((data) => {
    if (data.voteCreator.email === userData.email) {
      return true;
    }
  });

  return filteredData;
}
