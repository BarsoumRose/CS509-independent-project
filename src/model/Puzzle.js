const puzzleInformation =    // Mock object with easy to win game!
{
  "name": "Configuration 1",
  "board" : {
     "rows" : "2",
     "columns" : "4",
     "target" : "B",
     "destination" : {
       "row" : "3",
       "column" : "1"
     },
     "exit" : {
       "start"    : "1",
       "end"      : "2"
     },
     "finalMove" : "Down"
  },
  "pieces" : [
    { "label" : "A",
      //"isWinner" : "false",
      "width" : "1",
      "height" : "1", 
      "initial": "true", 
      "color": "red"
    },
    { "label" : "B",
      //"isWinner" : "true",
      "width" : "1",
      "height" : "1",
      "initial": "false", 
    },
    { "label" : "C",
     // "isWinner" : "false",
      "width" : "1",
      "height" : "1",
      "initial": "true", 
      "color": "red"
    },
    { "label" : "D",
      //"isWinner" : "false",
      "width" : "1",
      "height" : "1", 
      "initial": "true",
      "color": "orange"
      
    },
    { "label" : "E",
      //"isWinner" : "false",
      "width" : "1",
      "height" : "1",
      "initial": "false",

    },
    { "label" : "F",
      //"isWinner" : "false",
      "width" : "1",
      "height" : "1", 
      "initial": "false",
    },
    { "label" : "G",
      //"isWinner" : "false",
      "width" : "1",
      "height" : "1", 
      "initial": "true",
      "color": "orange"
    },
    { "label" : "H",
      //x"isWinner" : "false",
      "width" : "1",
      "height" : "1", 
      "initial": "false",
    },
  ],
  "locations" : [
    { "piece" : "A",
      "location" : {
         "row"    : "0", 
         "column" : "0" 
      }
    },
    { "piece" : "B",
      "location" : {
         "row"    : "0", 
         "column" : "1" 
      }
    },
    { "piece" : "C",
      "location" : {
         "row"    : "0", 
         "column" : "2" 
      }
    },
    { "piece" : "D",
      "location" : {
         "row"    : "0", 
         "column" : "3" 
      }
    },
    { "piece" : "E",
      "location" : {
         "row"    : "1", 
         "column" : "0" 
      }
    },
    { "piece" : "F",
      "location" : {
         "row"    : "1", 
         "column" : "1" 
      }
    },
    { "piece" : "G",
      "location" : {
         "row"    : "1", 
         "column" : "2" 
      }
    },
    { "piece" : "H",
      "location" : {
         "row"    : "1", 
         "column" : "3" 
      }
    },
  ]
};


// const puzzleInformation =    // Mock object with easy to win game
// {
//   "name": "TestPuzzle 4x5",
//   "board" : {
//      "rows" : "5",
//      "columns" : "4",
//      "target" : "B",
//      "destination" : {
//        "row" : "3",
//        "column" : "1"
//      },
//      "exit" : {
//        "start"    : "1",
//        "end"      : "2"
//      },
//      "finalMove" : "Down"
//   },
//   "pieces" : [
//     { "label" : "A",
//       "isWinner" : "false",
//       "width" : "1",
//       "height" : "2"
//     },
//     { "label" : "B",
//       "isWinner" : "true",
//       "width" : "2",
//       "height" : "2"
//     },
//   ],
//   "locations" : [
//     { "piece" : "A",
//       "location" : {
//          "row"    : "0", 
//          "column" : "0" 
//       }
//     },
//     { "piece" : "B",
//       "location" : {
//          "row"    : "0", 
//          "column" : "1" 
//       }
//     }
//   ]
// };

export { puzzleInformation };