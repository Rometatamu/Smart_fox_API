
const updateReaction = (reactionType, answer, userId) => {
    
    const liked = answer.likedBy.includes(userId);
    const disliked = answer.dislikedBy.includes(userId);
  
    if (reactionType === "like") {
      if (liked) {
        answer.gained_likes_number = Math.max(0, answer.gained_likes_number - 1);
        answer.likedBy = answer.likedBy.filter(user => user !== userId);
      } else {
        if (disliked) {
          answer.gained_dislikes_number = Math.max(0, answer.gained_dislikes_number - 1);
          answer.dislikedBy = answer.dislikedBy.filter(user => user !== userId);
        }
        answer.gained_likes_number += 1;
        answer.likedBy.push(userId);
      }
    } else if (reactionType === "dislike") {
      if (disliked) {
        answer.gained_dislikes_number = Math.max(0, answer.gained_dislikes_number - 1);
        answer.dislikedBy = answer.dislikedBy.filter(user => user !== userId);
      } else {
        if (liked) {
          answer.gained_likes_number = Math.max(0, answer.gained_likes_number - 1);
          answer.likedBy = answer.likedBy.filter(user => user !== userId);
        }
        answer.gained_dislikes_number += 1;
        answer.dislikedBy.push(userId);
      }
    }
  };
  
  export default updateReaction;
  