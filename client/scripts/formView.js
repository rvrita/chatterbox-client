var FormView = {

  $form: $('#send'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    var roomname = $('select option:selected').text();
    var message = {
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: roomname
    };
    if (message.text && message.username) {
      Parse.create(message);
    }
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};