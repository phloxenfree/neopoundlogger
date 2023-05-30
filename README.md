# Phlox's NeoPoundLogger
Never lose a pet's info to a trigger-happy refresh again! Logs any desirable pet's info.
### How does it work?
This script will analyse the information provided from the pound adopt page, and log pet info to the console if it matches your specifications. Be sure to change your browser's console settings to "persist," that way the info stays even if you refresh the page! Example from OperaGX:

![OperaGX persist console log.](https://i.imgur.com/8i3GQMk.png)
### Is this against the rules?
It is difficult to ever be certain. However, the script does not perform any actions for you, it only stores information that was already provided to you by Neopets. With the understanding that it does not perform any actions for you, it should be considered 'safe'/'legal,' but use it at your own risk! I'm not responsible for what happens to your account if you use this script.
## Default Specifications
By default, the script looks for pets meeting ___any___ (not all) of the following criteria:
- The pet has a captialised 2-5L name.
- The pet is level 10 or greater.
- The pet is painted. (Excludes basics, white, brown, orange & purple).
- The pet has a combined Strength and Defence score of 60 or over. (The adopt page does not provide HP information.)
- The pet is a Draik or Krawk.
## Making Changes
If you want to change the type of names the script looks for, some RegEx patterns have already been provided and labelled. Simply switch the `const namePattern = cap5L;` line to be equal to a different provided pattern like `capitalised`, which looks for any length capitalised names.

If you want to change the level the script looks for, change `let level = 10;` to the minimum level you wish to look for.

To change which colours the script looks for, add/remove those colours from the `colours` array.

To change which species the script looks for, alter the `species` array. If you don't want to search for a species, simply set it equal to `['None']`. This will also work for the `colours` array, if you aren't looking for a specific colour.

### Finding More Specific Pets
If you want to find a pet that meets ___all___ requirements you specify, you will need to alter the `if` statements in addition to the variables. Example scenario: Looking for a Level 5+ Baby Gelert with a capitalised name and a combined Strength and Defence score of at least 30.
First, alter the variables:
```
    const namePattern = capitalised;
    let level = 5;
    let SD = 30;
    
    let colours = ['Baby'];
    let species = ['Gelert'];
```
Then, move to the `if` statements. Look for the OR operator `||` and switch them to the AND operator `&&`:
```
if (parseInt(L0) >= level && N0.match(namePattern) && colours.indexOf(C0) >= 0 && species.indexOf(S0) >= 0 && P0SD >= SD)
```
```
if (parseInt(L1) >= level && N1.match(namePattern) && colours.indexOf(C1) >= 0 && species.indexOf(S1) >= 0 && P1SD >= SD)
```
```
if (parseInt(L2) >= level && N2.match(namePattern) && colours.indexOf(C2) >= 0 && species.indexOf(S2) >= 0 && P2SD >= SD)
```
### Combination Requirements
You can combine the usage of AND and OR operators to broaden your search. For example: I'm looking for Draiks, but I'm also looking for any capitalised 5L pets, or any painted pets above level 10 and 30SD.

Logic: (painted && level 10+ && SD 30+) || draiks || 5L

Your variables should reflect this, and your first `if` statement should look like:
```
if ((colours.indexOf(C0) >= 0 && parseInt(L0) >= level && P0SD >= SD) || species.indexOf(S0) >= 0 || N0.match(namePattern))
```
Modify the other `if` statements to match, use the appropriate variables for each statement.
