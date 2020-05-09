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
    App.fetchRoom();

    setInterval(App.fetch, 30000);

    $('#refresh').on('click', App.handleRefresh);
  },

  handleRefresh: function() {
    App.fetch();
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log('my data: ', data);
      $('#chats').empty();
      currentRoom = RoomsView.$select.val();
      Messages.messages = data.results;
      MessagesView.render(Messages.messages);
      callback();
    });
  },

  fetchRoom: function() {
    Parse.readAll((data) => {
      $('#rooms select').empty();
      var roomObj = {};
      var roomArray = [];
      var roomArrayTwo = [];
      for (var i = 0; i < data.results.length; i++) {
        var roomname = data.results[i].roomname;
        roomname = roomname !== undefined ? roomname.trim() : roomname;
        if (!roomArray.includes(roomname) && roomname !== '' && roomname !== undefined) {
          roomArray.push(roomname);
        }
      }
      roomArray.sort();
      for (var r = 0; r < roomArray.length; r++) {
        var roomObj = {
          roomname: roomArray[r]
        };
        roomArrayTwo.push(roomObj);
        RoomsView.renderRoom(roomArrayTwo[r]);
      }
      var currentRoom = RoomsView.$select.val();
      Messages.messages = data.results;
      RoomsView.handleChangeRoom(currentRoom);
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
