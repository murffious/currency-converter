"use strict";
// jshint.com error notes 
// 292	Too many errors. (64% scanned).

// One unused variable
// line 188	parent  UNUSED variable


// Expected an assignment or function call and instead saw an expression.
const RED   = 'r';
const BLACK = 'b';

const identity  = i => i;
const RIGHT = 1;
const LEFT = 0;

const appDir = dir => dir === RIGHT ? LEFT : RIGHT;

class RBTree {
    constructor(value, identifier=identity, color=BLACK) {
        this.value = value;
        this.children = [];
        this.identifier = identifier;
        this.parent = undefined;
        this.color = color;
    }
    get right () {
        return this.children[RIGHT];
    }
    get left () {
        return this.children[LEFT];
    }
    set right (value) {
        this.children[RIGHT] = value;
    }
    set left (value) {
        this.children[LEFT] = value;
    }
    get isRightChild () {
        return this.parent ? this.parent.right === this : false;
    }
    get isLeftChild () {
        return this.parent ? this.parent.left === this : false;
    }
    get isRoot () {
        return this.parent === undefined;
    }
    get uncle () {
        return this.grandparent ? (this.parent.isRightChild ? this.grandparent.left : this.grandparent.right) : undefined;
    }
    get sibling () {
        return this.parent ? (this.isRightChild ? this.parent.left : this.parent.right) : undefined;
    }
    get grandparent () {
        return this.parent ? this.parent.parent : undefined;
    }
    get isLeaf () {
        return this.children.every(child => child === undefined);
    }
    get hasOneChild () {
        return (this.right !== undefined && this.left === undefined)
        || (this.right === undefined && this.left !== undefined);
    }
    get hasTwoChildren () {
        return (this.right !== undefined && this.left !== undefined);
    } 
    _swapWithParent () {
        // Need to create a new node to replace an old one;
        let replacement = new RBTree(this.value, this.indentifer, this.color);
        replacement.parent = this.parent;
        replacement.children = this.children;
        if (this.parent !== undefined) {
            if (this.isRightChild) {
                this.parent.right = replacement;
            } else {
                this.parent.left = replacement;
            }
        }
        this.value = replacement.parent.value;
        this.children = replacement.parent.children;
        this.parent = replacement.parent.parent;
        this.color = replacement.parent.color;
        // Update references to this
        this.children.forEach(child => {if(child) child.parent = this});
        // Update references to replacement 
        this.children.forEach(child => { if(child) child.children.forEach(kid => {if (kid) kid.parent = child})});
    }
    rotateToRight () {
        this._rotate(RIGHT);
        this._swapWithParent();
    }
    rotateToLeft () {
        this._rotate(LEFT);
        this._swapWithParent();
    }
    _rotate (dir) {
        let opposite = appDir(dir);
        let pivot = this.children[opposite];
        this.children[opposite] = pivot.children[dir];
        pivot.children[dir] = this;
        pivot.parent = this.parent;
        pivot.children.forEach(child => {if(child) child.parent = pivot});
        this.children.forEach(child => {if(child) child.parent = this});
    }
    labelBlack () {
        this.color = BLACK;
    }
    labelRed () {
        this.color = RED;
    }
    get isBlack () {
        return this.color === BLACK;
    }
    get isRed () {
        return this.color === RED;
    }
    //  add a new element to the tree : handle scenarios
    label () {
        return this._insert1();
    }
    _insert1 () {
        if (this.parent === undefined) {
            this.labelBlack();
            return;
        } else {
            this._insert2();
        }
    }
    _insert2 () {
        if (this.parent.isBlack) {
            return;
        } else {
            this._insert3();
        }
    }
    _insert3 () {
        let uncle = this.uncle;
        if (uncle ? uncle.isRed : false) {
            this.parent.labelBlack();
            uncle.labelBlack();
            this.grandparent.labelRed();
            this.grandparent.label();
            return;
        } else {
            this._insert4();
        }
    }
    _insert4 () {
        if (this.isRightChild && this.parent.isLeftChild) {
            this.parent.rotateToLeft();
            return;
        } else if (this.isLeftChild && this.parent.isRightChild) {
            this.parent.rotateToRight();
            return;
        }
        this._insert5();
    }
    _insert5 () {
        this.parent.labelBlack();
        this.grandparent.labelRed();
        if(this.isLeftChild) {
            this.grandparent.rotateToRight();
        } else {
            this.grandparent.rotateToLeft();
        }
        return;
    }
    insert (value) {
        console.log(value)
        if(this.value === undefined) {
            this.value = value;
            this.labelBlack();
            console.log("???")

            return;
        } 
        let dir;
        console.log("line 172", this.identifier(this.value))
        if (this.identifier(value) > this.identifier(this.value)) {
            dir = RIGHT;
        } else {
            dir = LEFT;
        } 
        if (this.children[dir] !== undefined) {
            console.log("THIS",this)
            return this.children[dir].insert(value);
        } else {
            let child = new RBTree(value, this.indentifier, RED);
            child.parent = this;
            console.log("***THIS***",this)
            let parent = child.parent;
            this.children[dir] = child;
            child.label();
            return child;
        }
        
    }
    // returns true of false if given value ins in the tree
    find (value) {
        let identifiedValue = this.identifier(value);
        let thisValue = this.identifier(this.value);
        if (thisValue === identifiedValue) {
            return true;
        } else {
            let dir;
            if (this.value < identifiedValue) {
                dir = RIGHT;
            } else {
                dir = LEFT;
            }
            if (this.children[dir] === undefined) {
                return false;
            } else {
                return this.children[dir].find(value);
            }
        }
    }
    // delete an element from the tree
    _minimumChild () {
        let current = this;
        while (current.left !== undefined) {
            current = current.left
        }
        console.log(current)
        return current;
    }
    minimum () {
        return this._minimumChild().value;
    }
    _maximumChild () {
        let current = this;
        while (current.right !== undefined) {
            current = current.right
        }
        console.log(current)
        return current;
    }
    maximum () {
        return this._maximumChild().value;
    }
    remove (value) {
        let identifiedValue = this.identifier(value);
        let thisValue = this.identifier(this.value);
        if (thisValue === identifiedValue) {
            this.rmLabel(value);
            return;
        } else {
            let dir;
            if (thisValue < identifiedValue) {
                dir = RIGHT;
            } else {
                dir = LEFT;
            }
            if (this.children[dir] === undefined) {
                return undefined;
            } else {
                return this.children[dir].remove(value);
            }
        }
    }
    standardRemove (value) {
        if (this.isLeaf) {
            if (this.isRoot) {
                this.value = undefined;
                this.labelBlack();
            } else if (this.isRightChild) {
                this.parent.right = undefined;
            } else if (this.isLeftChild) {
                this.parent.left = undefined;
            }
        } else if (this.hasOneChild) {
            // Expected an assignment or function call and instead saw an expression.
            let rmDir = this.right ? LEFT : RIGHT;
            this.right ? this.rotateToLeft() : this.rotateToRight();
            this.children[rmDir] = undefined;
        } else if (this.hasTwoChildren) {
            let replica = this.right._minimumChild();
            this.value = replica.value;
            this.right.remove(replica.value);
        }
    }
    rmLabel(value) {
        if(!this.hasTwoChildren) {
            this._remove0();
        }
        this.standardRemove(value);
    }
    _remove0 () {
        let childIsRed = this.hasOneChild ? (this.right ? this.right.isRed : this.left.isRed) : false;
        if (this.isBlack) {
            if (childIsRed) {
                // Expected an assignment or function call and instead saw an expression.
                this.right ? this.right.labelBlack() : this.left.labelBlack();
            } else {
                if (this.parent ? this.parent.isBlack : false) {
                    this._remove1();
                }
            }
        }

    }
    _remove1 () {
        if (this.parent !== undefined) this._remove2();
    }
    _remove2 () {
        let sib = this.sibling;
        if (sib && sib.isRed) {
            this.parent.labelRed();
            sib.labelBlack();
            if (this.isLeftChild) {
                this.parent.rotateToLeft();
            } else if (this.isRightChild) {
                this.parent.rotateToRight();
            }
        }
        this._remove3();
    }
    _remove3 () {
        let sib = this.sibling;
        let sibIsBlack = sib ? sib.isBlack : true;
        let sibLeftIsBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
        let sibRightIsBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
        if (this.parent.isBlack && sib && sibIsBlack && sibLeftIsBlack && sibRightIsBlack) {
            sib.labelRed();
            this.parent._remove1();
        } else {
            this._remove4();
        }
    }
    _remove4 () {
        let sib = this.sibling;
        let sibIsBlack = sib ? sib.isBlack : true;
        let sibLeftIsBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
        let sibRightIsBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
        if (this.parent.isRed && sib && sibIsBlack && sibLeftIsBlack && sibRightIsBlack) {
            sib.labelRed();
            this.parent.labelBlack();
        } else {
            this._remove5();
        }
    }
    _remove5 () {
        let sib = this.sibling;
        if (this.isLeftChild && (sib.right ? sib.right.isBlack : true) && (sib.left ? sib.left.isRed : false)) {
            sib.labelRed();
            sib.left.labelBlack();
            sib.rotateToRight();
        } else if (this.isRightChild && (sib.left ? sib.left.isBlack : true) && sib.right ? sib.right.isRed : false) {
            sib.labelRed();
            sib.right.labelBlack();
            sib.rotateToLeft();
        }
        this._remove6();
    }
    _remove6 () {
        let sib = this.sibling;
        // Expected an assignment or function call and instead saw an expression.
        if (sib) this.parent.isBlack ? sib.labelBlack() : sib.labelRed();
        this.parent.labelBlack();
        if (this.isLeftChild) {
            sib.right.labelBlack();
            this.parent.rotateToLeft();
        } else {
            sib.left.labelBlack();
            this.parent.rotateToRight();
        }
    }
    /* print the visual representation of what the tree looks like.
        Need to indicate if a node is Red or Black.
     */
    findHeight(node) {
        if (node === null) {
        return -1;
        }
        const leftLen = this.findHeight(node.left);
        const rightLen = this.findHeight(node.right);

        if (leftLen > rightLen) {
        return leftLen + 1;
        }
        return rightLen + 1;
    }

    print() {
        console.log("print")
  
        if (this.isLeaf) {
            if (this.isRoot) {
                console.log("here",this.isRoot)
            }
        }   
        let height = 0;
        // this.children.forEach(child => {if(child) console.log(child.value)});

        let climber = this.children;
        let climb = true;
        while (climb) {
            console.log("here2", climber)
                height++ 
                // climber[0].value
                // console.log(climber[0].value + " "  + climber[0].color )
                climb = false
        }
        console.log(height)
        console.log("yo",this.children[LEFT], this.children[RIGHT])
        // const height = this.findHeight(this.isRoot) + 1;
        this.printHelper(this.isRoot, '__', height);
    }

    printHelper(node, indent, height) {
        // tree height
        let treeHeight = height;

        if (node === null) {
        return;
        }
        if (node === this.parent) {
        console.log(`${node.value} color: ${node.color}`);
        }
        if (node.left !== null) {
        const parentInfo = `( parent node ${node.left.parent.value})`;
        console.log(`${indent}${node.left.value} color: ${node.left.color} ${parentInfo}`);
        }
        if (node.right !== null) {
        const parentInfo = `( parent node ${node.right.parent.value})`;
        console.log(`${indent}${node.right.value} color: ${node.right.color} ${parentInfo}`);
        }
        treeHeight -= 1;
        this.printHelper(node.left, indent + indent, treeHeight);
        this.printHelper(node.right, indent + indent, treeHeight);
    }

}

const test_tree_1 = new RBTree();
// test_tree_1.insert("foo");
test_tree_1.insert("bar1");
test_tree_1.insert("bar2");
test_tree_1.insert("bar3");
test_tree_1.insert("bar4");
test_tree_1.insert("bar5");
test_tree_1.insert("bar6");
const find_method_result = test_tree_1.find("foo");
console.log("Run find for foo. Is it to be found in the tree?", find_method_result);
test_tree_1.remove("foo")
const find_method_result2 = test_tree_1.find("foo");
console.log("Run find for foo. Is it to be found in the tree after calling remove on it?", find_method_result2);
test_tree_1.print();
console.log(test_tree_1.maximum());
console.log(test_tree_1.minimum());
