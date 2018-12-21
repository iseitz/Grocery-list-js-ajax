$("document").ready(function () {

  $("#groceries").submit(function(e) {
    let item = $('#grocery_name').val();
    let quantity = $('#grocery_quantity').val();
     if(!item || quantity.length === 0){
        alert("fields can't be blanc");
     }else{
        postData();
        window.location.href = '/groceries';
        getData();
     }
     e.preventDefault(); // avoid to execute the actual submit of the form.
  });

});




function postData() {
  let url = $("#groceries").attr('action');
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();
  let newGroceryObject = new GroceryItem(item, quantity);

  var sendData = $.ajax({
    method: "POST",
    url: '/groceries',
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data: {"grocery": JSON.parse(newGroceryObject)},
    timeout: "7000",
    success: successFn(),
    error: errorFn()
  });

    function successFn(){

    };
    function errorFn(){

    };
};

function getData(){
  let url = $("#groceries").attr('action');
  let item = $('#grocery_name').val();
  let quantity = $('#grocery_quantity').val();
  let newGroceryObject = new GroceryItem(item, quantity);
  let newGroceryList = new GroceryList('Market Basket', '5/12/2018');
  newGroceryList.addItem(newGroceryObject);
  var groceryDetails = `\n<li> (${quantity}) ${item} </li>`;

  $.getJSON(url).done(function(groceryData) {
      $("#main").html(`<h1>${newGroceryList.title}</h1> \n<h2>${newGroceryList.date}</h2>\n<ul>\n`);
      groceryData.groceries.forEach(function(elem) {
        $("#main").append(`<li>(${elem.quantity}) ${elem.name} </li>\n`);
      });
      $("#main").append(groceryDetails + '\n</ul>\n');

    });

// setting values to empty strings and clearing the data in the form
  // $('#grocery_name').val('');
  // $('#grocery_quantity').val('');

}

$("#deleteOnClick").on("click", function(e){
   $("#main li:last").remove();
});
