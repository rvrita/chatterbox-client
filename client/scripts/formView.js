var FormView = {

  $form: $('#send'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    var roomname = RoomsView.$select.val();
    var message = {
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: roomname

    };
    if (document.getElementById('message').value) {
      Parse.create(message);
      App.fetch();
      $('#send').children('#message').val('');
    }
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};