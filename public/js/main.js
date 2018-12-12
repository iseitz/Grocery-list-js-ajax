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

  let url = $("#groceries").attr('action');
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();
  let newSubmittedItem = new GroceryItem(item, quantity);
  let newGroceryList = new GroceryList('Market Basket', '5/12/2018');
  newGroceryList.addItem()
  var data = `\n<li> (${quantity}) ${item} </li>`;

  $.getJSON(url)
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
  let url = $("#groceries").attr('action');
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();
  let data = {
    "grocery": JSON.stringify({
     "name": `${item}`,
     "quantity": `${quantity}`
   })
  };
  // this alternative way to set the data variable did not work:
  // let form = $( this );
  // let data = form.serialize();

  $.post( url, data );
}

  // ajax post methid that did not work
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


  // attempt to find the way to reset the form to empty fields - did not work look for better alternative
 // $("form").trigger("reset");
 // $('#submit')[0].reset();
 // $("#groceries").get(0).reset();
