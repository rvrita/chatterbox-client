var MessageView = {

  render: _.template(`
      <div class="chat">
        <div class="username">
          <%= htmlEncode(username) %>
        </div>
        <div class="message">
        <%= htmlEncode(text) %>
        </div>
        <div class="timestamp">
          <%= createdAt %>
        </div>
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

/*
BEFORE SANITIZE:
'<script> $("body").on("click", () => { console.log("Hello from the NSA."); }) </script>'))

AFTER SANITIZE
'&#60;script&#62; &#36;&#40;&#34;body&#34;&#41;.on&#40;&#34;click&#34;&#44; &#40;&#41; &#61;&#62; &#123; console.log&#40;&#34;Hello from the NSA.&#34;&#41;&#59; &#125;&#41; &#60;&#47;script&#62'
*/