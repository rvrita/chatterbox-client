var MessageView = {

  render: _.template(`
    <div class="<%= classNames %>">
      <div class="username"><%= htmlEncode(username) %></div>
      <div class="message">
      <%= htmlEncode(text) %>
      </div>
      <div class="roomname">
      <%= roomname %>
      </div>
    </div>
  `),


  renderEmpty: _.template(`
      <div class="chat">
        <p>Be the first to say something!</p>
      </div>
    `)
};



var htmlEncode = function (str) {
  // slice string and limit 280 characters from displaying
  str = str.slice(0, 280);
  return String(str).replace(/[^\w. ]/gi, function(c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};

var formattedDate = function(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${month}-${day}-${year} ${hours}:${minutes} ${amPm}`;
};


/*
BEFORE SANITIZE:
'<script> $("body").on("click", () => { console.log("Hello from the NSA."); }) </script>'))

AFTER SANITIZE
'&#60;script&#62; &#36;&#40;&#34;body&#34;&#41;.on&#40;&#34;click&#34;&#44; &#40;&#41; &#61;&#62; &#123; console.log&#40;&#34;Hello from the NSA.&#34;&#41;&#59; &#125;&#41; &#60;&#47;script&#62'
*/