class GroceryItem {
  constructor(name, quantity){
    this.name = name;
    this.quantity = quantity || 1;
  }

  toString(){
    return `(${this.quantity}) ${this.name}`;
  }
}
