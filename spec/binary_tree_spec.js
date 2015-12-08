var data = require("../binary_tree.js");

describe("Node", function(){
  var node;
  beforeEach(function() {
    node = new data.Node(5);
  });
  describe("Initialization", function(){
    it("has a value property set to whatever is passed in", function(){
      expect(node.value).toEqual(5);
    });
    it("has a left property that starts with null", function(){
      expect(node.left).toEqual(null);
    });
    it("has a right property that starts with null", function(){
      expect(node.right).toEqual(null);
    });
  });
});

describe("BinTree", function(){
  var binTree, node;

  describe("hasOwnProperty", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
    });
    it("starts with a root", function(){
      expect(binTree.hasOwnProperty("root")).toEqual(true);
    });
    it("starts with a root of null", function(){
      expect(binTree.root).toEqual(null);
    });
  });

  describe("#insert iteratively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertIteratively(5);
       binTree.insertIteratively(10);
       binTree.insertIteratively(3);
    });
    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertIteratively(option)).toEqual("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).toEqual(5);
      expect(binTree.root.right.value).toEqual(10);
      expect(binTree.root.left.value).toEqual(3);
    });
    it("does not add duplicates", function(){
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      expect(binTree.root.left.value).toEqual(3);
      expect(binTree.root.left.left).toEqual(null);
      expect(binTree.root.left.right).toEqual(null);
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertIteratively(4);
      binTree.insertIteratively(7);
      binTree.insertIteratively(6);
      expect(binTree.root.left.right.value).toEqual(4);
      expect(binTree.root.right.left.value).toEqual(7);
      expect(binTree.root.right.left.left.value).toEqual(6);
    });
  });

  describe("#insert recursively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertRecursively(5);
       binTree.insertRecursively(10);
       binTree.insertRecursively(3);
    });

    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertIteratively(option)).toEqual("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).toEqual(5);
      expect(binTree.root.right.value).toEqual(10);
      expect(binTree.root.left.value).toEqual(3);
    });
    it("does not add duplicates", function(){
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      expect(binTree.root.left.value).toEqual(3);
      expect(binTree.root.left.left).toEqual(null);
      expect(binTree.root.left.right).toEqual(null);
      expect(binTree.insertRecursively(3)).toEqual("duplicate!");
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertRecursively(4);
      binTree.insertRecursively(7);
      binTree.insertRecursively(6);
      expect(binTree.root.left.right.value).toEqual(4);
      expect(binTree.root.right.left.value).toEqual(7);
      expect(binTree.root.right.left.left.value).toEqual(6);
    });
  });

  describe("#contains", function(){
    var binTree;
    beforeEach(function() {
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
    });
    describe("#iteratively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsIteratively(v)).toEqual(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsIteratively(66)).toEqual(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsIteratively(-20)).toEqual(false);
        expect(binTree.containsIteratively(20)).toEqual(false);
      });
    });
    describe("#recursively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsIteratively(v)).toEqual(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsIteratively(66)).toEqual(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsIteratively(-20)).toEqual(false);
        expect(binTree.containsIteratively(20)).toEqual(false);
      });
    });
  });
    describe("breadth first search", function(){
      var binTree;
      beforeEach(function() {
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
      });
      it("should search left to right", function(){
        expect(binTree.breadthFirstSearch()).toEqual([7,3,9,1,99,44,66]);
      });
    });
    describe("depth first search", function(){
      beforeEach(function() {
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
      });
      describe("preorder", function(){
        it("searches from root - left - right", function(){
          expect(binTree.DFSPreOrder()).toEqual([7, 3, 1, 9, 99, 44, 66]);
        });
      });
      describe("inorder", function(){
        it("searches from left - root - right", function(){
          expect(binTree.DFSInOrder()).toEqual([1, 3, 7, 9, 44, 66, 99]);
        });
      });
      describe("postorder", function(){
        it("searches from left - right - root", function(){
          expect(binTree.DFSInOrder()).toEqual([1, 3, 7, 9, 44, 66, 99]);
        });
      });
    });
    describe("#findLowest", function(){
      it("It should", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
      });
    });
    describe("#findHighest", function(){
      it("It should", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
      });
    });
    describe("#size", function(){
      it("It should return the size of the binary tree", function(){
        binTree = new data.BinTree();
        [7,3,9,1,99,44,66].forEach(function(v) {
          binTree.insertRecursively(v);
        });
        expect(binTree.size()).toEqual(7);
      });
    });
    xdescribe("#remove", function(){
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
      it("does not remove values not in the tree", function(){
        expect(binTree.remove(100)).toEqual("value not in tree!");
      });
      it("removes leaf nodes correctly", function(){

      });
      it("removes nodes with one child correctly", function(){

      });
      it("removes nodes with two children correctly", function(){

      });
      it("removes the root node correctly when the root is a leaf", function(){

      });
      it("removes the root node correctly when the root has a child", function(){

      });
      it("removes the root node correctly when the root has two children", function(){

      });
    });
});