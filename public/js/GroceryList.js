class GroceryList {
  constructor(title, date) {
    this.title = title;
    this.date = date;
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
  toHTML() {
    let html  = `<h1>${this.title}</h1>\n`;
    html += `<ul>\n`;
    let list = this.items;
    list.forEach((item) =>{
      html += `<li>${item.toString()}</li>\n`;
    })
    html += `</ul>`;
    return `${html}`;
  }
}

// This code would be a more appropriate JS alternative for the #toHTML real life method but it creates an HTMLNode
// that the test does not accept as it cleraly asks for the string:

// let html = document.createElement('h1');
// html.innerHTML = `${this.title}`;
// let ul = document.createElement('ul');
// let list = this.items;
// list.forEach((item) =>{
//   let li = document.createElement('li');
//   li.innerHTML = `${item.toString()}`;
//   ul.appendChild(li);
// });
// html.appendChild(ul);
// return html;
