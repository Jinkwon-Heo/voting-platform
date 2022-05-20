const getExpiredVotes = (voteData, presentTime) => {
  const expiredVotes = [];
  for (let i = 0; i < voteData.length; i++) {
    if (voteData[i].expireTime < presentTime) {
      expiredVotes.push(voteData[i]);
    }
  }

  return expiredVotes;
}

exports.sortVoteList = (voteData, presentTime) => {
  const expiredVotes = getExpiredVotes(voteData, presentTime);

  const proceedingVotes = voteData.filter(item => !expiredVotes.includes(item));
  proceedingVotes.sort((prev, next) => {
    if (prev.expireTime > next.expireTime) {
      return 1;
    }

    if (prev.expireTime < next.expireTime) {
      return -1;
    }

    return 0;
  });

  const sortedVotes = proceedingVotes.concat(expiredVotes);

  return sortedVotes;
}
