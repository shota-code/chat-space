$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="chat-main__message-list__block">
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
         `<div class="chat-main__message-list__block">
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
})