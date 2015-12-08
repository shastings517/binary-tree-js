// http://visualgo.net/bst.html

function BinTree(){
  this.root = null;
}

function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;
}

// NOTE - Duplicates are excluded in our tree!
BinTree.prototype.insertIteratively = function(value){

  // only accept numbers....watch out since NaN is typeof number!
  if(typeof value === 'number' && !isNaN(value)){
    // if there is nothing in the tree, start it off with a new node!
    if(this.root === null){
      this.root = new Node(value);
      return this;
    }
    else {
      // current variable used for traversal, just like linked lists!
      var current  = this.root;
      // keep looping till we get to the correct spot;
      while(true){
        if(value < current.value){
          // if there is nothing on the left
          if(current.left === null){
            // make a new node and get out
            current.left = new Node(value);
            return this;
          }
          // otherwise, keep moving on!
          else {
            current = current.left;
          }
        }
        else if(value > current.value){
          // if there is nothing on the right
          if (current.right === null){
              // make a new node and get out
              current.right = new Node(value);
              return this;
          } else {
              current = current.right;
          }
        }
        // otherwise it must be a duplicate so let's get out of here
        else {
          return "duplicate!";
        }
      }
    }
  }
  else return "Please insert a number";
};

BinTree.prototype.insertRecursively = function(value,current){
  // another way to filter out messy input
  if(typeof value !== 'number') return "Please insert a number";
  if(isNaN(value)) return "Please insert a number";

  var startNode = current || this.root;

  if(startNode && value === startNode.value){
    return "duplicate!";
  }
  if(startNode === null){
    this.root = new Node(value);
  }
  else {
    if(value < startNode.value){
      if(startNode.left === null){
        startNode.left = new Node(value);
        return this;
      }
      else{
        return this.insertRecursively(value,startNode.left);
      }
    }
    else if(value > startNode.value){
       if(startNode.right === null){
          startNode.right = new Node(value);
          return this;
        }
        else {
          return this.insertRecursively(value,startNode.right);
        }
      }
    }
};

BinTree.prototype.containsIteratively = function(value){
  var current = this.root;
  var isFound = false;

  while(current && !isFound){
    if(value < current.value) current = current.left;
    else if(value > current.value) current = current.right;
    else isFound = true;
  }
  return isFound;
};

BinTree.prototype.containsRecursively = function(value,current){
  var node = current || this.root;

  if (value < node.value) {
    if(node.left === null) return false;
    return this.containsRecursively(value,node.left);
  }
  else if(value > node.value){
    if(node.right === null) return false;
    return this.containsRecursively(value,node.right);
  }
  return true;
};

// this is done left to right, to swap, change the 2nd to last and last lines of the while loop
BinTree.prototype.breadthFirstSearch = function() {
    // start at the root
    var node = this.root;
    // add it to the queue to be dequeued/shifted first
    var queue = [node];
    // create an array to store our results (this could be done with a callback for more functionality other than pushing to an array)
    var data = [];
    // keep looking
    while (node = queue.shift()) {
        data.push(node.value);
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
    return data;
};

// DEPTH FIRST SEARCH (Pre / In / Post Order)

// http://datastructuresnotes.blogspot.com/2009/02/binary-tree-traversal-preorder-inorder.html

// these functions can be implemented with a callback for additional functionality
// right now we store

// HINT - you can evaluate a JS expression conditionally by adding a truthy / falsey statement and // then attaching a && along with the expression

// take a look at this code for an example


// function sayHi(){
//   return "hey!"
// }

// what does true && sayHi() return?
// what about false && sayHi() return?

// we can use this to only call the function again if there is a node to the left or right

// visualizing the call stack using the chrome dev tools or just drawing it will help a lot with this!

BinTree.prototype.DFSPreOrder = function() {
    var data = [];
    var current = this.root;
    function search(node) {
      // root - left - right
      data.push(node.value);
      node.left && search(node.left);
      node.right && search(node.right);
    }
    search(current);
    return data;
};

BinTree.prototype.DFSInOrder = function() {
    var data = [];
    var current = this.root;
    function search(node) {
      // left - root - right with multi line if statements
      if(node.left){
       search(node.left);
      }
      data.push(node.value);

      if(node.right){
       search(node.right);
      }
    }
    search(current);
    return data;
};

BinTree.prototype.DFSPostOrder = function() {
    var data = [];
    var current = this.root;
    function search(node) {
      // left - right - root without using && or {}
      if(node.left)
        search(node.left);
      if(node.right)
        search(node.right);
      data.push(node.value);
    }
    search(current);
    return data;
};

BinTree.prototype.size = function() {
    return this.breadthFirstSearch().length;
};

BinTree.prototype.findLowest = function() {
    var current = this.root;
    // this can be done with an IIFE + Ternary
    return (function search(node) {
        return current.left ? search(node.left) : current.value;
    })(current);
};

BinTree.prototype.findHighest = function() {
    var current = this.root;
    // or just an IIFE (you don't even NEED one)
    return (function search(node) {
        if(current.right) {
          return search(node.right);
        }
        return current.value;
    })(current);
};

// eventual helper method for remove
BinTree.prototype._countChildren = function(node){
  var count = 0;
  if(node.left !== null) count++;
  if(node.right !== null) count++;
  return count;
};

// TODO!
BinTree.prototype.remove = function(value){

};

module.exports = {
  BinTree: BinTree,
  Node: Node
};
