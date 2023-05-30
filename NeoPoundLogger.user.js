// ==UserScript==
// @name      Neopets Pound Logger
// @version    1.0
// @author phloxenfree
// @homepage https://github.com/phloxenfree
// @description  Never lose a pet's info to a trigger-happy refresh again! Logs any desirable pet's info.
// @match   *://www.neopets.com/pound/adopt.phtml
// @downloadURL  https://github.com/phloxenfree/neopoundlogger/raw/main/NeoPoundLogger.user.js
// ==/UserScript==

(function() {
    // Regex Patterns - USER PAY ATTENTION TO THESE
    const cap5L = /^[A-Z][a-z]{1,4}$/; // 2-5L Capitalised
    const lower5L = /^[a-z]{2,5}$/; // 2-5L No-caps
    const anyCase5L = /^[a-zA-Z]{2,5}$/; // 2-5L Any case
    const capitalised = /^[A-Z][a-z]*$/; // Capitalised name of any length
    const lower = /^[a=z]*$/; // Lowercase name of any length

    // USER MAKE EDITS HERE!!!!!!!
    const namePattern = cap5L; // Change cap5L to one of the patterns above (ex: capitalised) if desired, or if you know what you're doing, specify your own RegEx
    let level = 12 // Search is inclusive of whatever you put here
    let SD = 60; // Sum of Strength & Defence you want to search for (inclusive)

    // What colours are you searching for? Solid colours excluded by default.
    let colours = ['8-Bit', 'Agueena', 'Alien', 'Apple', 'Asparagus', 'Aubergine', 'Avocado', 'Baby', 'Biscuit',
                   'Blueberry', 'Burlap', 'Camouflage', 'Candy', 'Carrot', 'Checkered', 'Chocolate', 'Chokato',
                   'Christmas', 'Clay', 'Cloud', 'Coconut', 'Custard', 'Darigan', 'Desert', 'Dimensional',
                   'Disco', 'Durian', 'Elderly Boy', 'Elderly Girl', 'Electric', 'Eventide', 'Faerie', 'Fire',
                   'Garlic', 'Ghost', 'Glowing', 'Gold', 'Gooseberry', 'Grape', 'Grey', 'Halloween', 'Ice',
                   'Invisible', 'Island', 'Jelly', 'Juppie Swirl', 'Lemon', 'Lime', 'Magma', 'Mallow', 'Maractite',
                   'Maraquan', 'Marble', 'Mosaic', 'MSP', 'Mutant', 'Oil Paint', 'Onion', 'Origami', 'Pastel',
                   'Pea', 'Peach', 'Pear', 'Pepper', 'Pineapple', 'Pink', 'Pirate', 'Plum', 'Plushie', 'Polkadot',
                   'Quiguki Boy', 'Quiguki Girl', 'Rainbow', 'Relic', 'Robot', 'Royal Boy', 'Royal Girl', 'Shadow',
                   'Silver', 'Sketch', 'Skunk', 'Snot', 'Snow', 'Speckled', 'Split', 'Sponge', 'Spotted', 'Sroom',
                   'Starry', 'Stealthy', 'Steampunk', 'Strawberry', 'Striped', 'Swamp Gas', 'Thornberry', 'Tomato',
                   'Toy', 'Transparent', 'Tyrannian', 'Ummagine', 'Usuki Boy', 'Usuki Girl', 'Valentine', 'Water',
                   'Woodland', 'Wraith', 'Zombie'];

    // What species are you searching for?
    let species = ['Draik', 'Krawk'];

    // END OF REQUIRED USER EDITS!!!!!!!

    // Create pet variables
    let N0 = null;
    let N1 = null;
    let N2 = null;
    let C0 = null;
    let C1 = null;
    let C2 = null;
    let L0 = null;
    let L1 = null;
    let L2 = null;
    let S0 = null;
    let S1 = null;
    let S2 = null;
    let STR0 = null;
    let STR1 = null;
    let STR2 = null;
    let DEF0 = null;
    let DEF1 = null;
    let DEF2 = null;
    let searchLink = "https://www.neopets.com/pound/adopt.phtml?search=";

    // Attempt to set values, this may fail bc sometimes not all 3 pets are loaded
    try {
        N0 = document.getElementById('pet0_name').innerHTML;
    } catch {
    }
    try {
        N1 = document.getElementById('pet1_name').innerHTML;
    } catch {
    }
    try {
        N2 = document.getElementById('pet2_name').innerHTML;
    } catch {
    }

    try {
        C0 = document.getElementById('pet0_color').innerHTML;
    } catch {
    }
    try {
        C1 = document.getElementById('pet1_color').innerHTML;
    } catch {
    }
    try {
        C2 = document.getElementById('pet2_color').innerHTML;
    } catch {
    }

    try {
        L0 = document.getElementById('pet0_level').innerHTML;
    } catch {
    }
    try {
        L1 = document.getElementById('pet1_level').innerHTML;
    } catch {
    }
    try {
        L2 = document.getElementById('pet2_level').innerHTML;
    } catch {
    }


    try {
        S0 = document.getElementById('pet0_species').innerHTML;
    } catch {
    }
    try {
        S1 = document.getElementById('pet1_species').innerHTML;
    } catch {
    }
    try {
        S2 = document.getElementById('pet2_species').innerHTML;
    } catch {
    }

    try {
        STR0 = document.getElementById('pet0_str').innerHTML;
        STR0 = parseInt(STR0);
    } catch {
    }
    try {
        STR1 = document.getElementById('pet1_str').innerHTML;
        STR1 = parseInt(STR1);
    } catch {
    }
    try {
        STR2 = document.getElementById('pet2_str').innerHTML;
        STR2 = parseInt(STR2);
    } catch {
    }

    try {
        DEF0 = document.getElementById('pet0_def').innerHTML;
        DEF0 = parseInt(DEF0);
    } catch {
    }
    try {
        DEF1 = document.getElementById('pet1_def').innerHTML;
        DEF1 = parseInt(DEF1);
    } catch {
    }
    try {
        DEF2 = document.getElementById('pet2_def').innerHTML;
        DEF2 = parseInt(DEF2);
    } catch {
    }

    let P0SD = STR0 + DEF0;
    let P1SD = STR1 + DEF1;
    let P2SD = STR2 + DEF2;

    // CHECK PET 0
    try {
        if (parseInt(L0) >= level || N0.match(namePattern) || colours.indexOf(C0) >= 0 || species.indexOf(S0) >= 0 || P0SD >= SD) {
            console.log(N0 + " the " + C0.toUpperCase() + " " + S0 + "\nLevel: " + L0 + "\nSD: " + P0SD + "\nSearch Link: " + searchLink + N0);
        }
    }
    catch {
    }

    // CHECK PET 1
    try {
        if (parseInt(L1) >= level || N1.match(namePattern) || colours.indexOf(C1) >= 0 || species.indexOf(S1) >= 0 || P1SD >= SD) {
            console.log(N1 + " the " + C1.toUpperCase() + " " + S1 + "\nLevel: " + L1 + "\nSD: " + P1SD + "\nSearch Link: " + searchLink + N1);
        }
    }
    catch {
    }

    // CHECK PET 2
    try {
        if (parseInt(L2) >= level || N2.match(namePattern) || colours.indexOf(C2) >= 0 || species.indexOf(S2) >= 0 || P2SD >= SD) {
            console.log(N2 + " the " + C2.toUpperCase() + " " + S2 + "\nLevel: " + L2 + "\nSD: " + P2SD + "\nSearch Link: " + searchLink + N2);
        }
    }
    catch {
    }
})();