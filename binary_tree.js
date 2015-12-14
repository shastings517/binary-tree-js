

function BinTree(){
  this.root = null;
}

function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;

}

// BinTree.prototype.insertIteratively = function(value){

//   // only accept numbers....watch out since NaN is typeof number!
//   if(typeof value === 'number' && !isNaN(value)){
//     // if there is nothing in the tree, start it off with a new node!
//     if(this.root === null){
//       this.root = new Node(value);
//       return this;
//     }
//     else {
//       // current variable used for traversal, just like linked lists!
//       var current  = this.root;
//       // keep looping till we get to the correct spot;
//       while(true){
//         if(value < current.value){
//           // if there is nothing on the left
//           if(current.left === null){
//             // make a new node and get out
//             current.left = new Node(value);
//             return this;
//           }
//           // otherwise, keep moving on!
//           else {
//             current = current.left;
//           }
//         }
//         else if(value > current.value){
//           // if there is nothing on the right
//           if (current.right === null){
//               // make a new node and get out
//               current.right = new Node(value);
//               return this;
//           } else {
//               current = current.right;
//           }
//         }
//         // otherwise it must be a duplicate so let's get out of here
//         else {
//           return "duplicate!";
//         }
//       }
//     }
//   }
//   else return "Please insert a number";
// };


BinTree.prototype.insertIteratively = function(value){

  if(isNaN(value) || typeof value != "number"){
    return "Please insert a number";
  }
   //if the binary tree is empty, set the root = value
  if(!this.root){
    this.root = new Node(value);
    return this;
  }
  var parent;
  var curNode = this.root;
  while(curNode){
    parent = curNode;
    if(curNode.value === value){
      return "Error: No Dupes!";
    }

    if(curNode.value > value){
      //go left
      curNode = curNode.left; //if null -> will break out of loop
      if (!curNode) parent.left = new Node(value);
    }else{
      curNode = curNode.right;
      if (!curNode) parent.right = new Node(value);
    }
  } //end while
  return;
};

BinTree.prototype.insertRecursively = function(value, current){
  if(isNaN(value) || typeof value != "number"){
    return "Please insert a number";
  }
  var startNode = current || this.root;

  if(startNode && value == startNode.value){
    return "duplicate!";
  }
  if(startNode === null){
    this.root = new Node(value);
  } 
  else{
    if(value < startNode.value){
      if(startNode.left === null){
        startNode.left = new Node(value);
        return this;
      }
      else{
        return this.insertRecursively(value, startNode.left);
      }
    }
    else if(value > startNode.value){
      if(startNode.right === null){
        startNode.right = new Node(value);
        return this;
      }
      else{
        return this.insertRecursively(value, startNode.right);
      }
    }
  }
};

BinTree.prototype.containsIteratively = function(value){
  var current = this.root;
  var isFound = false;

  while(current && !isFound){
    if(value < current.value){
      current = current.left;
    }
    else if(value > current.value){
      current = current.right;
    }
    else{
      isFound = true;
    }
  }
  return isFound;
};

BinTree.prototype.containsRecursively = function(value, current){
  var node = current || this.root;

  if(value < node.value){
    if(node.left === null){
      return false;
    }
    return this.containsRecursively(value, node.left); 
  }
  else if(value > node.value){
    if(node.right === null){
      return false;
    }
    return this.containsRecursively(value, node.right);
  }
  return true;
};

BinTree.prototype.breadthFirstSearch = function(){
  var node = this.root;
  var queue = [node];
  var data = [];

  while(node = queue.shift()){
    data.push(node.value);
    if(node.left){
      queue.push(node.left);
    }
    if(node.right){
      queue.push(node.right);
    }
  }
  return data;
};

BinTree.prototype.DFSPreOrder = function(){
  var data = [];
  var current = this.root;
  function search(node){
    data.push(node.value);
    node.left && search(node.left);
    node.right && search(node.right);
  }
  search(current);
  return data;
};

BinTree.prototype.DFSInOrder = function(){
  var data = [];
  var current = this.root;
  function search(node){
    if(!node){
      return;
    } 
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

BinTree.prototype.DFSPostOrder = function(){
  var data = [];
  var current = this.root;
  function search(node){
    if(node.left){
      search(node.left);
    }
    if(node.right){
      search(node.right);
    }
    data.push(node.value);
  }
  search(current);
  return data;
};

BinTree.prototype.size = function(){
  return this.breadthFirstSearch().length;
};

BinTree.prototype.findLowest = function(){
  var current = this.root;
  return(function search(node){
    if(node.right){
      return search(node.right);
    }
    return node.value;
  })(current);
};

BinTree.prototype.findHighest = function(){
  var current = this.root;
  return(function search(node){
    if(node.right){
      return search(node.right);
    }
    return node.value;
  })(current);
};

BinTree.prototype._countChildren = function(node){
  var count = 0;
  if(node.left !== null){
    count++;
  }
  if(node.right !== null){
    count++;
  }
  return count;
};

BinTree.prototype.remove = function(value){
  
  var isFound = false;
  var current = this.root;
  var child;
  var parent;
  var temp;
  var tempParent;

  while(current && !isFound){
    if(value < current.value){
      parent = current;
      current = current.left;
    }
    else if(value > current.value){
      parent = current;
      current = current.right;
    }
    else{
      isFound = true;
    }
  }

  if(!isFound){
    return "Value not in the tree!";
  }

  var childCount = this._countChildren(current);


  if(childCount === 0){
    if(parent && current.value > parent.value){
      parent.right = null;
    }
    else if(parent && current.value < parent.value){
      parent.left = null;
    }
    else{
      this.root = null;
    }
  }

  else if(childCount === 1){
    child = current.right || current.left;
    if(parent && current.value > parent.value){
      parent.right = child;
    }
    else if(parent && current.value < parent.value){
      parent.left = child;
    }
    else{
      this.root = child;
    }
  }

  else{
    temp = current.right;
    while(temp.left !== null){
      temp = temp.left;
    }
    temp.left = current.left;

    if(parent && current.value > parent.value){
      parent.right = current.right;
    }
    else if(parent && current.value < parent.value){
      parent.left = current.right;
    }
    else{
      this.root = current.right;
    }
  }
};

// BinTree.prototype.removeLeaf = function(value){
//   var parent,
//       cur = this.root,
//       found = false;
//   while (cur && !found){
//     if (cur.val > val){
//       parent = cur;
//       cur = cur.left;
//     }
//     else if(cur.val < val){
//       parent = cur;
//       cur = cur.right;
//     }
//     else{
//       found = true;
//     }
//   }

// }



module.exports = {
  BinTree: BinTree,
  Node: Node
};
