var MessagesView = {

  $chats: $('#chats'),
  $chat: $('#chat'),

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

  render: function(message) {
    MessagesView.$chats.empty();
    if (message) {
      for (var i = 0; i < message.length; i++) {
        const username = message[i].username;
        const text = message[i].text;
        var roomname = message[i].roomname;
        if (username !== undefined && text !== undefined && roomname !== undefined) {
          MessagesView.renderMessage(message[i]);
        }
      }
      RoomsView.handleChangeRoom();
    }
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