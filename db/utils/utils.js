exports.formatDates = list => {
  const changeDateObjects = list.map(obj => {
    const newObj = { ...obj };
    let reconfigDate = new Date(obj.created_at);
    newObj.created_at = reconfigDate;

    return newObj;
  });
  return changeDateObjects;
};

exports.makeRefObj = list => {
  let referenceObject = {};

  list.forEach(obj => {
    let value = obj.article_id;
    let key = obj.title;
    referenceObject[key] = value;
  });

  return referenceObject;
};

exports.formatComments = (comments, articleRef) => {
  const refactoredComments = comments.map(
    ({ created_at, created_by, belongs_to, votes, body }) => {
      return {
        author: created_by,
        article_id: articleRef[belongs_to],
        created_at: new Date(created_at),
        body: body,
        votes: votes
      };
    }
  );
  return refactoredComments;
};
