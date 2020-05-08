var RoomsView = {

  $button: $('#rooms #add-room'),
  $select: $('#rooms select'),
  $selected: $('#rooms select option:selected'),
  $form: $('#room-send'),

  initialize: function() {
    RoomsView.$button.on('click', RoomsView.addRoom);
    RoomsView.$form.on('submit', RoomsView.roomSubmit);
    RoomsView.$select.on('change', RoomsView.handleChangeRoom);
  },


  addRoom: function() {
    $('.room-submit').toggle();
    $('#room-text').toggle();

  },
  roomSubmit: function(event) {
    event.preventDefault();
    var data = Messages.messages;
    var roomName = {
      roomname: document.getElementById('room-text').value.trim()
    };
    for (var i = 0; i < data.length; i++) {
      const currentRoom = data[i].roomname.toLowerCase();
      if (currentRoom !== undefined && currentRoom !== '') {
        if (roomName.roomname.toLowerCase() === currentRoom.trim()) {
          alert('Room Exists!');
          return;
        }
      }
    }

    Parse.createRoom(roomName);
  },

  renderRoom: function(data) {
    var strObj = {};
    if (typeof(data) === 'string') {
      strObj['roomname'] = data;
      return RoomsView.$select.append(RoomsView.render(strObj));
    } else {
      return RoomsView.$select.append(RoomsView.render(data));
    }
  },

  render: _.template(
    `<option id="<%= roomname %>" value="<%= roomname %>">
      <%= roomname %>
    </option>
    `
  ),

  handleChangeRoom: function(currentRoom) {
    var currentRoom = RoomsView.$select.val();
    console.log('current room from roomsView: ', currentRoom);
    var filtered = Messages.messages.filter(message => message.roomname === currentRoom);
    $('#chats').empty();
    for (var i = 0; i < filtered.length; i++) {
      const message = filtered[i];
      if (message.username && message.text && message.roomname) {
        MessagesView.renderMessage(filtered[i]);
      }
    }
  }



};