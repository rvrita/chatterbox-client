var RoomsView = {

  $button: $('#rooms #add-room'),
  $select: $('#rooms select'),
  $form: $('#room-send'),

  initialize: function() {
    RoomsView.$button.on('click', RoomsView.addRoom);
    RoomsView.$form.on('submit', RoomsView.roomSubmit);
  },


  addRoom: function() {
    $('.room-submit').toggle();
    $('#room').toggle();

  },
  roomSubmit: function(event) {
    event.preventDefault();
    var roomName = {
      roomname: document.getElementById('room').value
    };
    Parse.createRoom(roomName);
  },



  render: _.template(
    `<option id="<%= roomname %>" value="<%= roomname %>">
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