// Exceeds Expectation Part 1 Code Here

function postGrocery(groceryItem) {

  let submittedItem = $('#grocery_name').val();
  let submittedQuantity = $('#grocery_quantity').val();
  let newSubmittedItem = new GroceryItem(submittedItem, submittedQuantity);
  let newGroceryList = new GroceryList('Market Basket', '5/12/2018');
  newGroceryList.addItem(newSubmittedItem);
  let mainDiv = document.getElementById('main');
  mainDiv.innerHTML = `${newGroceryList.toHTML()}`;

  $( "#groceries" ).submit(function( event ) {
    event.preventDefault();

    // Get some values from elements on the page:
    var $form = $( this ),
      newGroceryName = $form.find( "input[name='name']" ).val(),
      newGroceryQuantity = $form.find( "input[name='quantity']" ).val() || 1,
      url = $form.attr( "action" );

    // Send the data using post
    var posting = $.post( url, { name: newGroceryName, quantity: newGroceryQuantity} );

    // Put the results in a div
    posting.done(function( data ) {
      // var mainDiv = $( data ).find( "#main" );
      $( "#main" ).empty().append( mainDiv );
    });
  });
};


$(document).ready(() => {
  // Exceeds Expectation Part 2 Code Here
  let form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let submittedItem = $('#grocery_name').val();

    !submittedItem ? alert("fields can't be blanc") : postGrocery(submittedItem);

    // This part of my code allows to clear the form but it also deletes the item from the page. I did not come up with a solution
    // of how to keep the item on the page. It might require a database to store items, for example(?):
    // let form = document.getElementById("groceries");
    // form.reset();
  });
});
