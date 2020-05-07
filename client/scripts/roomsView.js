var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),
  $submit: $('#form room-submit'),

  initialize: function() {
    RoomsView.$button.on('click', RoomsView.addRoom);
    RoomsView.$submit.on('click', RoomsView.roomSubmit);
  },


  addRoom: function() {
    $('.room-submit').toggle();
    $('#room').toggle();

  },
  roomSubmit: function(event) {
    event.preventDefault();
    alert('hi');
  },



  render: _.template(
    `<option value="<%= roomname %>">
      <%= roomname %>
    </option>
    `
  )

// <option value="room1">ROOM1</option>
};


// var filterRooms = function(rooms) {
//   var roomArray = [];
//   for (var i = 0; i < rooms.length; i++) {
//     var currentRoom = rooms[i];
//     if (!roomArray.includes(currentRoom)) {
//       roomArray.push(currentRoom);
//     }
//   }
//   return roomArray;
// };