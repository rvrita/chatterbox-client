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

    $('#refresh').on('click', App.fetch);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      $('#chats').empty();
      var html = '';
      for (var i = 0; i < data.results.length; i++) {
        const username = data.results[i].username;
        const text = data.results[i].text;
        const roomname = data.results[i].roomname;
        if (username !== undefined && text !== undefined && roomname !== undefined) {
          html += MessageView.render(data.results[i]);
        }
        $('#chats').append(html);
      }
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
