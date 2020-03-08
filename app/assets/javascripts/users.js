$(function() {
  function appendUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`;

    $("#user-search-result").append(html);
  }

  function  appendErrMsgToHTML(){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`;

    $("#user-search-result").append(html);
  
}
  function addUser(userId, userName){
    var html = `
               <div class='chat-group-user'>
                 <input name='group[user_ids][]' type='hidden' value='${userId}'>  
                 <p class='chat-group-user__name'>${userName}</p>
                 <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>
               `
               $("#chat-group-users").append(html);
  }
  
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
           
        } else if (input.length == 0) {
          return false;
        } else {
          appendErrMsgToHTML ();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  });
  $(document).on('click', ".user-search-add", function(){
   var userId =  $(this).attr('data-user-id');
   var userName = $(this).attr('data-user-name');
   $(this).parent().remove();
    addUser(userId, userName);
  });
  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});
