var Friends = {
  friendList: new Set(),
  toggleStatus: function(username) {
    if (Friends.friendList.has(username)) {
      Friends.friendList.delete(username);
    } else {
      Friends.friendList.add(username);
    }
  },
  isFriend: function(username) {
    return Friends.friendList.has(username);
  }
};