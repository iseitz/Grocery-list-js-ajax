$("document").ready(function () {

  $("#groceries").submit(function(e) {
    let item = $('#grocery_name').val();
     if(!item){
        alert("fields can't be blanc");
     }else{
        getData();
        postData();
     }
     e.preventDefault(); // avoid to execute the actual submit of the form.

  });

});


function getData() {

  var url = $(this).attr('action');
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();
  let newSubmittedItem = new GroceryItem(item, quantity);
  let newGroceryList = new GroceryList('Market Basket', '5/12/2018');
  newGroceryList.addItem()
  var data = `\n<li> (${quantity}) ${item} </li>`;

  $.getJSON("/groceries.json")
    .done(function(groceryData) {
      $("#main").html(`<h1>${newGroceryList.title}</h1> \n<h2>${newGroceryList.date}</h2> \n<ul>`);
      groceryData.groceries.forEach(function(elem) {
        $("#main").append(`\n<li>(${elem.quantity}) ${elem.name} </li>\n`);
      })
      $("#main").append(data);
      $("#main").append(`\n</ul>`);
    })
}

function postData() {
  let form = $( this );
  let url = "/groceries.json";
  // var data = $("#groceries").serialize();
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();

  var data = {
    "grocery": JSON.stringify({
     "name": `${item}`,
     "quantity": `${quantity}`
   })
  };

    $.post( url, data );
}


  // $.ajax({
  //   url: url,
  //   type: "POST",
  //   data: data,
  //   success: successFn,
  //   error: errorFn,
  //   complete: function(xhr, status){
  //     console.log("completed posting" + data);
  //
  //   }
  // })



   // $("form").trigger("reset");
   // $('#submit')[0].reset();
   // $("#groceries").get(0).reset();
