var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
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