$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-main__message-list__block" data-message-id=${message.id}>
           <div class="chat-main__message-list__block__member-block">
             <div class="chat-main__message-list__block__member-block__member-name">
               ${message.user_name}
             </div>
             <div class="chat-main__message-list__block__member-block__time">
               ${message.created_at}
             </div>
           </div>
           <div class="chat-main__message-list__block__message-block">
             <p class="chat-main__message-list__block__message-block__message">
               ${message.content}
             </p>
           </div>
           <img src=${message.image} >
         </div>`
         return html;
       } else {
         var html =
           `<div class="chat-main__message-list__block" data-message-id=${message.id}>
              <div class="chat-main__message-list__block__member-block">
                <div class="chat-main__message-list__block__member-block__member-name">
                  ${message.user_name} 
                </div>
                <div class="chat-main__message-list__block__member-block__time">
                  ${message.created_at}
                </div>
              </div>
              <div class="chat-main__message-list__block__message-block">
                <p class="chat-main__message-list__block__message-block__message">
                  ${message.content}
                </p>
              </div>
            </div>`
         return html;
       };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $('.chat-main__message-form__send').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__block:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
       }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});