/* 
Trees are data structures that consist of nodes which are linked together in a certain way.
Nodes in a tree have a parent-child relationship.
Each node is linked to 0 or more child nodes and at most 1 parent.
There is a special node at the top of the tree called the root node, from which all other nodes descend.
Binary Tree is a tree with an additional limitation: each node can only have 0, 1, or 2 children (at most 2 children).
A branch in a tree signifies a decision path, a choice that connects 1 node to another.
A binary tree, whose root can be any node and all of its descendants rooted at that node.
*/

/* 
Binary search trees take the concept of binary trees 1 step further.
All of the nodes in the left-hand branch of a node are guaranteed to have lower values than the node itself, 
and all of the nodes in the right-hand branch of a node are guaranteed to have a higher value than the node itself. 
*/

class BinarySearchTree {
    // constructor represents a single node in the tree.
    // if the key property is null then the object represents an empty tree.
    // if the parent pointer is null then you are dealing with a root node. 
    // the node starts with the left and right pointers to their child nodes being null.
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert (key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, and compare it to the key you want to insert.
        If the key is less than the node's key then the new node needs to live in the left-hand branch*/
        else if (key < this.key) {
            /* If the existing node does not have a left child, meaning that if the 'left' pointer is empty,
            then we can just instantiate and insert the new node as the left child of that node, passing 'this' as the parent*/
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
            then we recursively call the 'insert' method
            so the node is added further down the tree*/
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key
        // then you do the same thing, but on the right-hand side
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value;)
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root
        then follow the left child.
        If there is an existing left child, 
        then recursively check its left and/or right child
        until you find the item*/
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root
        then follow the right child.
        If there is an existing right child, 
        then recursively check its left and/or right child
        until you find the item*/
        else if (key > this.key && this.right) { 
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    // the following are helper methods that we can use to remove 
    _replaceWith(node) {
        // _replaceWith is used to find the node you want to use to replace a node that has children.
        // if the node you are replacing has a parent then you need to wire up the references from the parent to the replacement node, 
        // and the replacement node back to the parent. Otherwise, if the node is a root node then yu simply copy over the properties of the replacement node.
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }
    // this is used to find the minimum value from the right subtree. 
    // When you are removing a node from the tree that has 2 children, you want to replace the node with the smallest node from the right subtree. 
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

}

/* 
Insertation works by iterating to the height of the tree. 
In average case, nodes are inserted equally on the left and right branches
This produces what is known as balanced tree. 
Because each row in a balanced tree contains 2 times as many nodes as the row before,
the width grows exponentially with the number of nodes. This means that conversely, the height must grow logarithmically 
with the number of nodes. So the average case is O(log(n)).
The wrost case in a binary search tree occurs when the tree takes its worst possible shape: the tree skews either left or right.
Thefefore, you will need to iterate through each of those nodes in order to get to the bottom of the tree to insert something.
This makes the time complexity O(n).
The best case would be inserting the root only, which would be O(1).
*/

/* 
The average time complexity of finding something in a BST would require traversing the hight of a balanced tree and would be O(log(n))
The worst case for finding something in the BST will occur when the tree is skewed left or right 
and you are searching for the node at the bottom where eveything is inserted to 1 side, so it is O(n).
The best case is that the node you are trying to find is the root node, which would be O(1).
*/