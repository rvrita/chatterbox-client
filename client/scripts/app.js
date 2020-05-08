var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    $('#refresh').on('click', App.handleRefresh);
  },

  handleRefresh: function() {
    var currentRoom = RoomsView.$select.val();
    console.log('current room from app.js: ', currentRoom);
    App.fetch();
    RoomsView.handleChangeRoom(currentRoom);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log(data);
      $('#chats').empty();
      $('#rooms select').empty();
      var roomObj = {};
      var roomArray = [];
      var roomArrayTwo = [];
      for (var i = 0; i < data.results.length; i++) {
        const username = data.results[i].username;
        const text = data.results[i].text;
        var roomname = data.results[i].roomname;
        roomname = roomname !== undefined ? roomname.trim() : roomname;
        if (!roomArray.includes(roomname) && roomname !== '' && roomname !== undefined) {
          roomArray.push(roomname);
        }
        if (username !== undefined && text !== undefined && roomname !== undefined) {
          MessagesView.renderMessage(data.results[i]);
        }
      }
      for (var r = 0; r < roomArray.length; r++) {
        var roomObj = {
          roomname: roomArray[r]
        };
        roomArrayTwo.push(roomObj);
        RoomsView.renderRoom(roomArrayTwo[r]);
      }
      Messages.messages = data.results;
      callback();
    });
  },




  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
