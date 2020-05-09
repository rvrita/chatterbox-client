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
    App.fetchRoom();
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log('my data: ', data);
      $('#chats').empty();
      for (var i = 0; i < data.results.length; i++) {
        const username = data.results[i].username;
        const text = data.results[i].text;
        var roomname = data.results[i].roomname;
        if (username !== undefined && text !== undefined && roomname !== undefined) {
          MessagesView.renderMessage(data.results[i]);

        }
      }
      Messages.messages = data.results;
      RoomsView.handleChangeRoom();
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
      for (var r = 0; r < roomArray.length; r++) {
        var roomObj = {
          roomname: roomArray[r]
        };
        roomArrayTwo.push(roomObj);
        RoomsView.renderRoom(roomArrayTwo[r]);
      }
      Messages.messages = data.results;
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
