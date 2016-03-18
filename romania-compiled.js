"use strict";

// Map URL:
// https://i.imgur.com/rAe8QIy.jpg

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cities = [{ name: "Oradea",
    nearby: [{
        name: "Zerind",
        cost: 71,
        h: 374
    }, {
        name: "Sibiu",
        cost: 151,
        h: 253
    }]
}, { name: "Zerind",
    nearby: [{
        name: "Oradea",
        cost: 71,
        h: 380
    }, {
        name: "Arad",
        cost: 75,
        h: 366
    }]
}, { name: "Arad",
    nearby: [{
        name: "Zerind",
        cost: 75,
        h: 374
    }, {
        name: "Sibiu",
        cost: 140,
        h: 253
    }, {
        name: "Timisoara",
        cost: 118,
        h: 329
    }]
}, { name: "Timisoara",
    nearby: [{
        name: "Arad",
        cost: 118,
        h: 366
    }, {
        name: "Lugoj",
        cost: 111,
        h: 244
    }]
}, { name: "Lugoj",
    nearby: [{
        name: "Timisoara",
        cost: 111,
        h: 329
    }, {
        name: "Mehadia",
        cost: 70,
        h: 241
    }]
}, { name: "Mehadia",
    nearby: [{
        name: "Lugoj",
        cost: 70,
        h: 244
    }, {
        name: "Drobeta",
        cost: 75,
        h: 242
    }]
}, { name: "Drobeta",
    nearby: [{
        name: "Mehadia",
        cost: 75,
        h: 241
    }, {
        name: "Craiova",
        cost: 120,
        h: 160
    }]
}, { name: "Craiova",
    nearby: [{
        name: "Drobeta",
        cost: 120,
        h: 242
    }, {
        name: "Pitesti",
        cost: 138,
        h: 100
    }, {
        name: "Rimnicu Vilcea",
        cost: 146,
        h: 193
    }]
}, { name: "Rimnicu Vilcea",
    nearby: [{
        name: "Craiova",
        cost: 146,
        h: 160
    }, {
        name: "Pitesti",
        cost: 97,
        h: 100
    }, {
        name: "Sibiu",
        cost: 80,
        h: 253
    }]
}, { name: "Pitesti",
    nearby: [{
        name: "Craiova",
        cost: 138,
        h: 160
    }, {
        name: "Rimnicu Vilcea",
        cost: 97,
        h: 193
    }, {
        name: "Bucharest",
        cost: 101,
        h: 0
    }]
}, { name: "Sibiu",
    nearby: [{
        name: "Oradea",
        cost: 151,
        h: 380
    }, {
        name: "Arad",
        cost: 140,
        h: 366
    }, {
        name: "Fagaras",
        cost: 99,
        h: 176
    }, {
        name: "Rimnicu Vilcea",
        cost: 80,
        h: 193
    }]
}, { name: "Fagaras",
    nearby: [{
        name: "Sibiu",
        cost: 99,
        h: 253
    }, {
        name: "Bucharest",
        cost: 211,
        h: 0
    }]
}, { name: "Bucharest",
    nearby: [{
        name: "Pitesti",
        cost: 101,
        h: 100
    }, {
        name: "Giurgiu",
        cost: 90,
        h: 77
    }, {
        name: "Urziceni",
        cost: 85,
        h: 80
    }, {
        name: "Fagaras",
        cost: 211,
        h: 176
    }]
}, { name: "Giurgiu",
    nearby: [{
        name: "Bucharest",
        cost: 90,
        h: 0
    }]
}, { name: "Urziceni",
    nearby: [{
        name: "Bucharest",
        cost: 85,
        h: 0
    }, {
        name: "Hirsova",
        cost: 98,
        h: 151
    }, {
        name: "Vaslui",
        cost: 142,
        h: 199
    }]
}, { name: "Eforie",
    nearby: [{
        name: "Hirsova",
        cost: 86,
        h: 151
    }]
}, { name: "Vaslui",
    nearby: [{
        name: "Urziceni",
        cost: 142,
        h: 80
    }, {
        name: "Iasi",
        cost: 92,
        h: 226
    }]
}, { name: "Hirsova",
    nearby: [{
        name: "Urziceni",
        cost: 98,
        h: 80
    }, {
        name: "Eforie",
        cost: 86,
        h: 161
    }]
}, { name: "Iasi",
    nearby: [{
        name: "Vaslui",
        cost: 92,
        h: 199
    }, {
        name: "Neamt",
        cost: 87,
        h: 234
    }]
}, { name: "Neamt",
    nearby: [{
        name: "Iasi",
        cost: 87,
        h: 226
    }]
}];

// Implementing Romania as a Map()

var Romania = new Map();

for (var i = 0; i < cities.length; i++) {
    Romania.set(cities[i].name, cities[i].nearby);
}

// searchNodes are created during the algorithm's search.
// this.action = the action taken to reach this city from the previous
//     search node
// this.state = city name
// this.parent = the previous city in the search

var searchNode = (function () {
    function searchNode(action, state, parent) {
        _classCallCheck(this, searchNode);

        this.action = action;
        this.state = state;
        this.parent = parent;
    }

    // Uninformed Search Algorithms
    // * Breadth-first Search
    // * Depth-first Search
    // * Uniform Cost Search

    // Returns a list of pairs corresponding to
    // the path starting at the top (root) of the tree.

    _createClass(searchNode, [{
        key: "path",
        value: function path() {
            if (this.parent === null) {
                return [this.state, this.action];
            } else {
                return this.parent.path() + " -> " + [this.state, this.action.cost];
            }
        }
    }, {
        key: "pathCost",
        value: function pathCost() {
            if (this.parent === null) {
                return 0;
            } else {
                return this.parent.pathCost() + this.action.cost;
            }
        }

        // Returns true if the state occurs anywhere in the path
        // from the root to the node.
    }, {
        key: "inPath",
        value: function inPath(findState) {
            if (findState == this.state) {
                return true;
            } else if (this.parent == null) {
                return false;
            } else {
                return this.parent.inPath(findState);
            }
        }
    }]);

    return searchNode;
})();

function breadthFirstSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Queue
    // Actions other than push() and shift() are prohibited.
    var fringe = [];
    if (goalTest(initialState)) {
        console.log("Initial state is the goal state.");
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.push(new searchNode(null, initialState, null));
    var expanded = [];
    while (fringe.length !== 0) {
        console.log("Fringe: " + fringe.map(function (city) {
            return city.state;
        }));

        // Pop an element out of the queue to expand.
        var _parent = fringe.shift();
        console.log("Popped: ", _parent.state);
        var newChildStates = [];

        // Child states of the current node
        var actionsList = actions(_parent.state);
        console.log("Found " + actionsList.length + " successors of " + _parent.state + " : " + actionsList.map(function (item) {
            return item.name;
        }));

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(_parent.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");

        // Create successors of each node and push them onto the fringe.
        for (var i = 0; i < actionsList.length; i++) {
            var newS = successor(_parent.state, actionsList[i]);
            var newN = new searchNode(actionsList[i], newS, _parent);

            // If the goal is found,
            // returns the path to the goal.
            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS);
                return newN.path() + " with path cost " + newN.pathCost();
            }

            // If the successor is already expanded,
            // don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1) {
                    console.log("Successor " + newS + " of " + _parent.state + " already expanded.");
                    console.log("Not adding " + newS + " to the fringe.");
                    console.log("\n");
                }

                // If the successor is already in the fringe,
                // don't add it to the fringe again.
                else if (fringe.map(function (item) {
                        return item.state;
                    }).indexOf(newN.state) !== -1) {
                        console.log(newS + " is already in the fringe.");
                    }

                    // Push new successors to the fringe.
                    else {
                            console.log("Discovered " + newN.state + " with step cost " + actionsList[i].cost + " from " + _parent.state);
                            console.log("Pushing to fringe: " + newS);
                            newChildStates.push(newS);
                            fringe.push(newN);
                            console.log("Path: ", newN.path());
                            console.log("Current fringe: " + fringe.map(function (city) {
                                return city.state;
                            }));
                            console.log("\n");
                        }
        }
    }
}

function depthFirstSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Stack
    // Actions other than unshift() and shift() are prohibited.
    var fringe = [];
    if (goalTest(initialState)) {
        console.log("Initial state is the goal state.");
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.push(new searchNode(null, initialState, null));
    var expanded = [];
    while (fringe.length !== 0) {
        console.log("Fringe: " + fringe.map(function (city) {
            return city.state;
        }));

        // Pop an element out of the queue to expand.
        var _parent2 = fringe.shift();
        console.log("Popped: ", _parent2.state);
        var newChildStates = [];

        // Child states of the current node
        var actionsList = actions(_parent2.state);
        console.log("Found " + actionsList.length + " successors of " + _parent2.state + " : " + actionsList.map(function (item) {
            return item.name;
        }));

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(_parent2.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");

        // Create successors of each node and push them onto the fringe.
        for (var i = 0; i < actionsList.length; i++) {
            var newS = successor(_parent2.state, actionsList[i]);
            var newN = new searchNode(actionsList[i], newS, _parent2);

            // If the goal is found,
            // returns the path to the goal.
            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS);
                return newN.path() + " with path cost " + newN.pathCost();
            }

            // If the successor is already expanded,
            // don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1) {
                    console.log("Successor " + newS + " of " + _parent2.state + " already expanded.");
                    console.log("Not adding " + newS + " to the fringe.");
                    console.log("\n");
                }

                // If the successor is already in the fringe,
                // don't add it to the fringe again.
                else if (fringe.map(function (item) {
                        return item.state;
                    }).indexOf(newN.state) !== -1) {
                        console.log(newS + " is already in the fringe.");
                    }

                    // Push new successors to the fringe.
                    else {
                            console.log("Discovered " + newN.state + " with step cost " + actionsList[i].cost + " from " + _parent2.state);
                            console.log("Pushing to fringe: " + newS);
                            newChildStates.push(newS);
                            fringe.unshift(newN);
                            console.log("Path: ", newN.path());
                            console.log("Current fringe: " + fringe.map(function (city) {
                                return city.state;
                            }));
                            console.log("\n");
                        }
        }
    }
}

// TODO
// Implement a priority queue for Uniform Cost Search

function uniformCostSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Priority Queue
    // Actions other than shift() and enqueue() are prohibited.
    var fringe = [];
    if (goalTest(initialState)) {
        console.log("Initial state is the goal state.");
        return [initialState];
    }

    fringe.enqueue = function (item) {
        var added = false;
        for (var i = 0; i < fringe.length; i++) {
            console.log("ITEM: ", fringe[i].state);
            console.log("COST: ", fringe[i].pathCost());
            if (item.pathCost() < fringe[i].pathCost()) {
                fringe.splice(i, 0, item);
                added = true;
                return;
            }
        }

        if (!added) {
            fringe.push(item);
        }
    };

    // Add the initialState to the fringe.
    fringe.enqueue(new searchNode(null, initialState, null));
    var expanded = [];
    var shortestPath = { state: null, pathCost: null, path: null };

    while (fringe.length !== 0) {
        console.log("Fringe: " + fringe.map(function (city) {
            return city.state;
        }));

        // Pop an element out of the queue to expand.
        var _parent3 = fringe.shift();
        console.log("Popped: ", _parent3.state);
        var newChildStates = [];

        // Child states of the current node
        var actionsList = actions(_parent3.state);
        console.log("Found " + actionsList.length + " successors of " + _parent3.state + " : " + actionsList.map(function (item) {
            return item.name;
        }));

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(_parent3.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");

        // Create successors of each node and push them onto the fringe.
        for (var i = 0; i < actionsList.length; i++) {
            var newS = successor(_parent3.state, actionsList[i]);
            var newN = new searchNode(actionsList[i], newS, _parent3);

            // If the goal is found,
            // returns the path to the goal.
            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS, " with path cost ", newN.pathCost());
                console.log("Continuing search to find optimal path.");
                if (newN.pathCost() < shortestPath.pathCost || shortestPath.pathCost === null) {
                    shortestPath.pathCost = newN.pathCost();
                    shortestPath.path = newN.path();
                    shortestPath.state = newS;
                }
            }

            // If the successor is already expanded,
            // don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1) {
                    console.log("Successor " + newS + " of " + _parent3.state + " already expanded.");
                    console.log("Not adding " + newS + " to the fringe.");
                    console.log("\n");
                }

                // If the successor is already in the fringe,
                // don't add it to the fringe again.
                else if (fringe.map(function (item) {
                        return item.state;
                    }).indexOf(newN.state) !== -1) {
                        console.log(newS + " is already in the fringe.");
                    }

                    // Push new successors to the fringe.
                    else {
                            console.log("Discovered " + newN.state + " with step cost " + actionsList[i].cost + " from " + _parent3.state);
                            console.log("Pushing to fringe: " + newS);
                            newChildStates.push(newS);
                            fringe.enqueue(newN);
                            console.log("Path: ", newN.path());
                            console.log("Current fringe: " + fringe.map(function (city) {
                                return city.state;
                            }));
                            console.log("\n");
                        }
        }
    }

    if (shortestPath.pathCost === null) {
        return "Couldn't find path.";
    } else {
        return shortestPath.path + " with path cost " + shortestPath.pathCost;
    }
}

function aStarSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Priority Queue
    // Actions other than shift() and enqueue() are prohibited.
    var fringe = [];
    if (goalTest(initialState)) {
        console.log("Initial state is the goal state.");
        return [initialState];
    }

    fringe.enqueue = function (item) {
        var added = false;
        for (var i = 0; i < fringe.length; i++) {
            console.log("ITEM: ", fringe[i].state);
            console.log("COST: ", fringe[i].pathCost(), "HEURISTIC COST: ", fringe[i].h, "TOTAL COST: ", fringe[i].pathCost() + fringe[i].h);
            if (item.pathCost() + item.h < fringe[i].pathCost()) {
                fringe.splice(i, 0, item);
                added = true;
                return;
            }
        }

        if (!added) {
            fringe.push(item);
        }
    };

    // Add the initialState to the fringe.
    fringe.enqueue(new searchNode(null, initialState, null));
    var expanded = [];
    var shortestPath = { state: null, pathCost: null, path: null };

    while (fringe.length !== 0) {
        console.log("Fringe: " + fringe.map(function (city) {
            return city.state;
        }));

        // Pop an element out of the queue to expand.
        var _parent4 = fringe.shift();
        console.log("Popped: ", _parent4.state);
        var newChildStates = [];

        // Child states of the current node
        var actionsList = actions(_parent4.state);
        console.log("Found " + actionsList.length + " successors of " + _parent4.state + " : " + actionsList.map(function (item) {
            return item.name;
        }));

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(_parent4.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");

        // Create successors of each node and push them onto the fringe.
        for (var i = 0; i < actionsList.length; i++) {
            var newS = successor(_parent4.state, actionsList[i]);
            var newN = new searchNode(actionsList[i], newS, _parent4);

            // If the goal is found,
            // returns the path to the goal.
            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS, " with path cost ", newN.pathCost());
                console.log("Continuing search to find optimal path.");
                if (newN.pathCost() < shortestPath.pathCost || shortestPath.pathCost === null) {
                    shortestPath.pathCost = newN.pathCost();
                    shortestPath.path = newN.path();
                    shortestPath.state = newS;
                }
            }

            // If the successor is already expanded,
            // don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1) {
                    console.log("Successor " + newS + " of " + _parent4.state + " already expanded.");
                    console.log("Not adding " + newS + " to the fringe.");
                    console.log("\n");
                }

                // If the successor is already in the fringe,
                // don't add it to the fringe again.
                else if (fringe.map(function (item) {
                        return item.state;
                    }).indexOf(newN.state) !== -1) {
                        console.log(newS + " is already in the fringe.");
                    }

                    // Push new successors to the fringe.
                    else {
                            console.log("Discovered " + newN.state + " with step cost " + actionsList[i].cost + " from " + _parent4.state);
                            console.log("Pushing to fringe: " + newS);
                            newChildStates.push(newS);
                            fringe.enqueue(newN);
                            console.log("Path: ", newN.path());
                            console.log("Current fringe: " + fringe.map(function (city) {
                                return city.state;
                            }));
                            console.log("\n");
                        }
        }
    }

    if (shortestPath.pathCost === null) {
        return "Couldn't find path.";
    } else {
        return shortestPath.path + " with path cost " + shortestPath.pathCost;
    }
}

function goalTest(state) {
    return state === goalCity;
}

function actions(state) {
    // Returns an array of objects
    // [{ name: string, cost: integer }, ... ]
    return Romania.get(state);
}

function successor(state, action) {
    return action.name;
}

var goalCity = null;
var startCity = null;
var setResult = function setResult(result) {
    var element = document.getElementById("search-result");
    while (element.firstChild !== null) {
        // remove all existing content
        element.removeChild(element.firstChild);
    }
    element.appendChild(document.createTextNode(result));
};

function setSearchInput() {
    startCity = null;
    goalCity = null;
    var start = document.getElementById("start");
    var goal = document.getElementById("goal");
    if (start.value.length > 0 && goal.value.length > 0) {
        startCity = start.value;
        goalCity = goal.value;
        return true;
    } else {
        setResult("Error: Please enter a valid city.");
        return false;
    }
}

function bfs() {
    document.getElementById("path").innerHTML = "Path:";
    if (setSearchInput()) {
        setResult(breadthFirstSearch(startCity, goalTest, actions, successor));
    }
}

function dfs() {
    document.getElementById("path").innerHTML = "Path:";
    if (setSearchInput()) {
        setResult(depthFirstSearch(startCity, goalTest, actions, successor));
    }
}

function ucs() {
    document.getElementById("path").innerHTML = "Optimal path:";
    if (setSearchInput()) {
        setResult(uniformCostSearch(startCity, goalTest, actions, successor));
    }
}

function astar() {
    document.getElementById("path").innerHTML = "Optimal path with straight-line distance heuristic:";
    if (setSearchInput()) {
        if (goalCity !== "Bucharest") {
            setResult("Error: Heuristic values are only calculated for any start city to Bucharest. Please change the goal city to Bucharest and try again.");
        } else {
            setResult(aStarSearch(startCity, goalTest, actions, successor));
        }
    }
}

//# sourceMappingURL=romania-compiled.js.map