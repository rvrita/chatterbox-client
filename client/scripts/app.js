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
    // $('select option:selected').on('click', function() {
    //   alert('hi');
    // });
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      $('#chats').empty();
      $('#rooms select').empty();
      var html = '';
      var roomHtml = '';
      var roomObj = {};
      var roomArray = [];
      var roomArrayTwo = [];
      for (var i = 0; i < data.results.length; i++) {
        const username = data.results[i].username;
        const text = data.results[i].text;
        const roomname = data.results[i].roomname;
        if (!roomArray.includes(roomname) && roomname !== '' && roomname !== undefined) {
          roomArray.push(roomname.trim());
        }
        if (username !== undefined && text !== undefined && roomname !== undefined) {
          html += MessageView.render(data.results[i]);
        }
      }
      $('#chats').append(html);
      for (var r = 0; r < roomArray.length; r++) {
        var roomObj = {
          roomname: roomArray[r]
        };
        roomArrayTwo.push(roomObj);
        roomHtml += RoomsView.render(roomArrayTwo[r]);
      }
      $('#rooms select').append(roomHtml);
      console.log(roomArrayTwo);
      callback();
    });
  },


  // filterByRoom: function() {
  //   Parse.readAll((data) => {
  //     $('#chats').empty();
  //     $('#rooms select').empty();
  //     var html = '';
  //     for (var i = 0; i < data.results.length; i++) {
  //       const username = data.results[i].username;
  //       const text = data.results[i].text;
  //       const roomname = data.results[i].roomname.trim();
  //       if (!roomArray.includes(roomname) && roomname !== '' && roomname !== undefined) {
  //         roomArray.push(roomname);
  //       }
  //       if (username !== undefined && text !== undefined && roomname !== undefined) {
  //         html += MessageView.render(data.results[i]);
  //       }
  //     }
  //     $('#chats').append(html);
  //     for (var r = 0; r < roomArray.length; r++) {
  //       var roomObj = {
  //         roomname: roomArray[r]
  //       };
  //       roomArrayTwo.push(roomObj);
  //       roomHtml += RoomsView.render(roomArrayTwo[r]);
  //     }
  //     $('#rooms select').append(roomHtml);
  //     console.log(roomArrayTwo);
  //     callback();
  //   });
  // },


  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
