var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function() {
    // this.$chats.append();
  },

  renderMessage: function(html) {
    return MessagesView.$chats.append(MessageView.render(html));
  }

};