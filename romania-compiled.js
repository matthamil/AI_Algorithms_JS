"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cities = [{ name: "Oradea",
    nearby: [{
        name: "Zerind",
        cost: 71
    }, {
        name: "Sibiu",
        cost: 151
    }]
}, { name: "Zerind",
    nearby: [{
        name: "Oradea",
        cost: 71
    }, {
        name: "Arad",
        cost: 75
    }]
}, { name: "Arad",
    nearby: [{
        name: "Zerind",
        cost: 75
    }, {
        name: "Sibiu",
        cost: 140
    }, {
        name: "Timisoara",
        cost: 118
    }]
}, { name: "Timisoara",
    nearby: [{
        name: "Arad",
        cost: 118
    }, {
        name: "Lugoj",
        cost: 111
    }]
}, { name: "Lugoj",
    nearby: [{
        name: "Timisoara",
        cost: 111
    }, {
        name: "Mehadia",
        cost: 70
    }]
}, { name: "Mehadia",
    nearby: [{
        name: "Lugoj",
        cost: 70
    }, {
        name: "Drobeta",
        cost: 75
    }]
}, { name: "Drobeta",
    nearby: [{
        name: "Mehadia",
        cost: 75
    }, {
        name: "Craiova",
        cost: 120
    }]
}, { name: "Craiova",
    nearby: [{
        name: "Drobeta",
        cost: 120
    }, {
        name: "Pitesti",
        cost: 138
    }, {
        name: "Rimnieu Vikea",
        cost: 146
    }]
}, { name: "Rimnieu Vikea",
    nearby: [{
        name: "Craiova",
        cost: 146
    }, {
        name: "Pitesti",
        cost: 97
    }, {
        name: "Sibiu",
        cost: 80
    }]
}, { name: "Pitesti",
    nearby: [{
        name: "Craiova",
        cost: 138
    }, {
        name: "Rimnieu Vikea",
        cost: 97
    }, {
        name: "Bucharest",
        cost: 101
    }]
}, { name: "Sibiu",
    nearby: [{
        name: "Oradea",
        cost: 151
    }, {
        name: "Arad",
        cost: 140
    }, {
        name: "Fagaras",
        cost: 99
    }, {
        name: "Rimnieu Vikea",
        cost: 80
    }]
}, { name: "Fagaras",
    nearby: [{
        name: "Sibiu",
        cost: 99
    }, {
        name: "Bucharest",
        cost: 211
    }]
}, { name: "Bucharest",
    nearby: [{
        name: "Pitesti",
        cost: 101
    }, {
        name: "Giurgiu",
        cost: 90
    }, {
        name: "Urziceni",
        cost: 85
    }, {
        name: "Fagaras",
        cost: 211
    }]
}, { name: "Giurgiu",
    nearby: [{
        name: "Bucharest",
        cost: 90
    }]
}, { name: "Urziceni",
    nearby: [{
        name: "Bucharest",
        cost: 85
    }, {
        name: "Hirsova",
        cost: 98
    }, {
        name: "Vaslui",
        cost: 142
    }]
}, { name: "Eforie",
    nearby: [{
        name: "Hirsova",
        cost: 86
    }]
}, { name: "Vaslui",
    nearby: [{
        name: "Urziceni",
        cost: 142
    }, {
        name: "Iasi",
        cost: 92
    }]
}, { name: "Hirsova",
    nearby: [{
        name: "Urziceni",
        cost: 98
    }, {
        name: "Eforie",
        cost: 86
    }]
}, { name: "Iasi",
    nearby: [{
        name: "Vaslui",
        cost: 92
    }, {
        name: "Neamt",
        cost: 87
    }]
}, { name: "Neamt",
    nearby: [{
        name: "Iasi",
        cost: 87
    }]
}];

var Romania = new Map();

for (var i = 0; i < cities.length; i++) {
    Romania.set(cities[i].name, cities[i].nearby);
}

var step = function step(action, state) {
    _classCallCheck(this, step);

    this.action = action;
    this.state = state;
};

var searchNode = (function () {
    function searchNode(action, state, parent) {
        _classCallCheck(this, searchNode);

        this.action = action;
        this.state = state;
        this.parent = parent;
    }

    // Returns a list of pairs corresponding to
    // the path starting at the top (root) of the tree.

    _createClass(searchNode, [{
        key: "path",
        value: function path() {
            if (this.parent === null) {
                return [this.state, this.action];
            } else {
                return this.parent.path() + [this.state, this.action.cost];
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
    // Actions other than push(n) and shift() are prohibited.
    var fringe = [];
    if (goalTest(initialState)) {
        return new step(null, initialState);
    }
    fringe.push(new searchNode(null, initialState, null));
    var expanded = [];

    var _loop = function () {
        console.log("Fringe: " + fringe.map(function (city) {
            return city.state;
        }));
        var parent = fringe.shift();
        console.log("Popped: ", parent.state);
        var newChildStates = [];
        var actionsList = actions(parent.state);
        console.log("Found " + actionsList.length + " successors of " + parent.state + " : " + actionsList.map(function (item) {
            return item.name;
        }));
        expanded.push(parent.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");
        actionsList.forEach(function (action) {
            var newS = successor(parent.state, action);
            var newN = new searchNode(action, newS, parent);
            console.log("CURRENT PATH: ", newN.path());

            // Testing

            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS);
                return newN.path();
            } else if (expanded.indexOf(newS) !== -1) {
                console.log("Successor " + newS + " of " + parent.state + " already expanded.");
                console.log("Not adding " + newS + " to the fringe.");
                console.log("\n");
            } else if (fringe.map(function (item) {
                return item.state;
            }).indexOf(newN.state) !== -1) {
                console.log(newS + " is already in the fringe.");
            } else {
                console.log("Discovered " + newN.state + " with step cost " + action.cost + " from " + parent.state);

                //expanded.push(newS);
                //console.log("Expanded: " + expanded);
                console.log("Pushing to fringe: " + newS);
                newChildStates.push(newS);
                fringe.push(newN);
                console.log("Current fringe: " + fringe.map(function (city) {
                    return city.state;
                }));
                console.log("\n");
            }
        });
    };

    while (fringe.length !== 0) {
        _loop();
    }
}

function goalTest(state) {
    return state === "Bucharest";
}

function actions(state) {
    // Returns an array of objects
    // [{ name: string, cost: integer }, ... ]
    return Romania.get(state);
}

function successor(state, action) {
    return action.name;
}

var BFSarray = breadthFirstSearch("Arad", goalTest, actions, successor);

//# sourceMappingURL=romania-compiled.js.map