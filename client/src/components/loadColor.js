// JavaScript source code
import React from "react";

// Function takes in the palette value and returns the selected
// palette for the user.
// Light = 0, Dark = 1, CB Light = 2, CB Dark = 3
// Default is 0.
async function loadColors(palette) {
    // Strings
    // addC = add button, removeC = remove button
    // extendC = extend entry button
    // bg
    var addC, removeC, extendC, bgC, ebgC;

    // Switch statement handles color assignment
    switch (0) {
        case 1:
            addC = "#04b964";
            removeC = "#b90904";
            extendC = "#b3b3b3";
            bgC = "#282828";
            ebgC = "#404040";
            break;
        case 2:
            addC = "#56b3e9";
            removeC = "#e69f00";
            extendC = "#cc79a7";
            bgC = "#faf9ec";
            ebgC = "#feffec";
            break;
        case 3:
            addC = "#db5f00";
            removeC = "#0071b2";
            extendC = "#cc79a7";
            bgC = "#282828";
            ebgC = "#404040";
            break;
        default:
            addC = "#4aeea0";
            removeC = "#ee4e4a";
            extendC = "#b3b3b3";
            bgC = "#faf9ec";
            ebgC = "#feffec";
            break;
    }

    return addC, removeC, extendC, bgC, ebgC; 
}
