"use strict";

// Map URL:
// https://i.imgur.com/rAe8QIy.jpg

let cities = [
    { name: "Oradea",
      nearby: [
          {
              name: "Zerind",
              cost: 71
          },
          {
              name: "Sibiu",
              cost: 151
          }
      ]
    },
    { name: "Zerind",
      nearby: [
          {
              name: "Oradea",
              cost: 71
          },
          {
              name: "Arad",
              cost: 75
          }
      ]
    },
    { name: "Arad",
      nearby: [
          {
              name: "Zerind",
              cost: 75
          },
          {
              name: "Sibiu",
              cost: 140
          },
          {
              name: "Timisoara",
              cost: 118
          }
      ]
    },
    { name: "Timisoara",
      nearby: [
          {
              name: "Arad",
              cost: 118
          },
          {
              name: "Lugoj",
              cost: 111
          }
      ]
    },
    { name: "Lugoj",
      nearby: [
          {
              name: "Timisoara",
              cost: 111
          },
          {
              name: "Mehadia",
              cost: 70
          }
      ]
    },
    { name: "Mehadia",
      nearby: [
          {
              name: "Lugoj",
              cost: 70
          },
          {
              name: "Drobeta",
              cost: 75
          }
      ]
    },
    { name: "Drobeta",
      nearby: [
          {
              name: "Mehadia",
              cost: 75
          },
          {
              name: "Craiova",
              cost: 120
          }
      ]
    },
    { name: "Craiova",
      nearby: [
          {
              name: "Drobeta",
              cost: 120
          },
          {
              name: "Pitesti",
              cost: 138
          },
          {
              name: "Rimnieu Vikea",
              cost: 146
          }
      ]
    },
    { name: "Rimnieu Vikea",
      nearby: [
          {
              name: "Craiova",
              cost: 146
          },
          {
              name: "Pitesti",
              cost: 97
          },
          {
              name: "Sibiu",
              cost: 80
          }
      ]
    },
    { name: "Pitesti",
      nearby: [
          {
              name: "Craiova",
              cost: 138
          },
          {
              name: "Rimnieu Vikea",
              cost: 97
          },
          {
              name: "Bucharest",
              cost: 101
          }
      ]
    },
    { name: "Sibiu",
      nearby: [
          {
              name: "Oradea",
              cost: 151
          },
          {
              name: "Arad",
              cost: 140
          },
          {
              name: "Fagaras",
              cost: 99
          },
          {
              name: "Rimnieu Vikea",
              cost: 80
          }
      ]
    },
    { name: "Fagaras",
      nearby: [
          {
              name: "Sibiu",
              cost: 99
          },
          {
              name: "Bucharest",
              cost: 211
          }
      ]
    },
    { name: "Bucharest",
      nearby: [
          {
              name: "Pitesti",
              cost: 101
          },
          {
              name: "Giurgiu",
              cost: 90
          },
          {
              name: "Urziceni",
              cost: 85
          },
          {
              name: "Fagaras",
              cost: 211
          }
      ]
    },
    { name: "Giurgiu",
      nearby: [
          {
              name: "Bucharest",
              cost: 90
          }
      ]
    },
    { name: "Urziceni",
      nearby: [
          {
              name: "Bucharest",
              cost: 85
          },
          {
              name: "Hirsova",
              cost: 98
          },
          {
              name: "Vaslui",
              cost: 142
          }
      ]
    },
    { name: "Eforie",
      nearby: [
          {
              name: "Hirsova",
              cost: 86
          }
      ]
    },
    { name: "Vaslui",
      nearby: [
          {
              name: "Urziceni",
              cost: 142
          },
          {
              name: "Iasi",
              cost: 92
          }
      ]
    },
    { name: "Hirsova",
      nearby: [
          {
              name: "Urziceni",
              cost: 98
          },
          {
              name: "Eforie",
              cost: 86
          }
      ]
    },
    { name: "Iasi",
      nearby: [
          {
              name: "Vaslui",
              cost: 92
          },
          {
              name: "Neamt",
              cost: 87
          }
      ]
    },
    { name: "Neamt",
      nearby: [
          {
              name: "Iasi",
              cost: 87
          }
      ]
    }
];

// Implementing Romania as a Map()

let Romania = new Map();

for (let i = 0; i < cities.length; i++) {
    Romania.set(cities[i].name, cities[i].nearby)
}

// searchNodes are created during the algorithm's search.
// this.action = the action taken to reach this city from the previous
//     search node
// this.state = city name
// this.parent = the previous city in the search

class searchNode {
    constructor(action, state, parent) {
        this.action = action;
        this.state = state;
        this.parent = parent;
    }

    // Returns a list of pairs corresponding to
    // the path starting at the top (root) of the tree.
    path() {
        if (this.parent === null) {
            return [this.state, this.action];
        } else {
            return this.parent.path() + " -> " + [this.state, this.action.cost];
        }
    }

    // Returns true if the state occurs anywhere in the path
    // from the root to the node.
    inPath(findState) {
        if (findState == this.state) {
            return true
        }
        else if (this.parent == null) {
            return false;
        }
        else {
            return this.parent.inPath(findState);
        }
    }
}

function breadthFirstSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Queue
    // Actions other than push(n) and shift() are prohibited.
    let fringe = [];
    if (goalTest(initialState)) {
        console.log("Initial state is the goal state.");
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.push(new searchNode(null, initialState, null));
    let expanded = [];
    while (fringe.length !== 0) {
        console.log("Fringe: " + fringe.map(function(city){
                return city.state;
            }));

        // Pop an element out of the queue to expand.
        let parent = fringe.shift();
        console.log("Popped: ", parent.state);
        let newChildStates = [];

        // Child states of the current node
        let actionsList = actions(parent.state);
        console.log("Found " + actionsList.length + " successors of " + parent.state + " : "
            + actionsList.map(function(item){
                return item.name;
            }));

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(parent.state);
        console.log("Expanded list: ", expanded);
        console.log("\n");

        // Create successors of each node and push them onto the fringe.
        for (let i = 0; i < actionsList.length; i++) {
            let newS = successor(parent.state, actionsList[i]);
            let newN = new searchNode(actionsList[i], newS, parent);
            console.log("CURRENT PATH: ", newN.path());

            // If the goal is found,
            // returns the path to the goal.
            if (goalTest(newS)) {
                console.log("FOUND GOAL!", newS);
                return newN.path();
            }

            // If the successor is already expanded,
            // don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1) {
                console.log("Successor " + newS + " of " + parent.state + " already expanded.");
                console.log("Not adding " + newS + " to the fringe.");
                console.log("\n");
            }

            // If the successor is already in the fringe,
            // don't add it to the fringe again.
            else if (fringe.map(function(item){return item.state}).indexOf(newN.state) !== -1) {
                console.log(newS + " is already in the fringe.");
            }

            // Push new successors to the fringe.
            else {
                console.log("Discovered " + newN.state + " with step cost "
                    + actionsList[i].cost + " from " + parent.state);
                console.log("Pushing to fringe: " + newS);
                newChildStates.push(newS);
                fringe.push(newN);
                console.log("Current fringe: " + fringe.map(function(city){
                        return city.state;
                    }));
                console.log("\n");
            }
        }
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


// Arad -> Bucharest
let BFS1 = breadthFirstSearch("Arad", goalTest, actions, successor);
console.log(BFS1);

// Bucharest -> Bucharest
let BFS2 = breadthFirstSearch("Bucharest", goalTest, actions, successor);
console.log(BFS2);