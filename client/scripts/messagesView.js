var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.$chats.on('click', function(event) {
      var $el = $(event.target);
      if ($el.hasClass('username')) {
        var username = $el.text();
        Friends.toggleStatus(username);
        MessagesView.render(Messages.messages);
      }
    });
  },

  render: function() {
    MessagesView.$chats.empty();
    var messages = Messages.messages;
    for (var i = 0; i < messages.length; i++) {
      const username = messages[i].username;
      const text = messages[i].text;
      var roomname = messages[i].roomname;
      if (username !== undefined && text !== undefined && roomname !== undefined) {
        MessagesView.renderMessage(messages[i]);
      }
    }
    RoomsView.handleChangeRoom(currentRoom);
  },

  renderMessage: function(message) {
    var isFriend = Friends.isFriend(message.username);
    message.classNames = isFriend ? 'chat friend' : 'chat';
    return MessagesView.$chats.append(MessageView.render(message));
  },

  renderEmpty: function() {
    return MessagesView.$chats.append(MessageView.renderEmpty());
  }

};