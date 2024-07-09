// Define some variables
let data;
const bigFckuckingArray = [];

// Fetch JSON data, and run initialRender function once finished
fetch("/pardner.json")
    .then((res) => res.json())
    .then((json) => data = json)
    .then(() => initialRender(data));

function initialRender(data) {
    // Personal yoinkage
    console.log(data);

    // Max stats
    // Sets slot and cost values from JSON data
    document.querySelector(".slots").innerHTML = data["Maxed Partner"]["Skill Slots"];
    document.querySelector(".cost").innerHTML = data["Maxed Partner"]["Max Cost"];

    // Weapon unlocks
    // Create an array of the "Weapons" keys to iterate through
    const weaponUnlockKeys = Object.keys(data["Weapons"]);
    // Find the relevant DOM nodes
    const unlocksList = document.querySelector(".weapon-unlocks");
    const unlockTemplate = unlocksList.children[1];
    // Iterate through the keys to add the needed nodes, and update their values
    weaponUnlockKeys.forEach((element) => {
        // For all elements except the 2nd, create a cloned node
        if (element != "Second") {
            const newUnlock = unlockTemplate.cloneNode(true);
            // Update the cloned node's values
            newUnlock.children[0].innerHTML = element.toLocaleLowerCase();
            newUnlock.children[1].innerHTML = data["Weapons"][element]["GCP Cost"];
            newUnlock.children[2].innerHTML = data["Weapons"][element]["Required PR"];
            // Append it to the ul parent
            unlocksList.append(newUnlock);
        // For the 2nd element, update the unlockTemplate's values
        } else {
            unlockTemplate.children[0].innerHTML = element.toLocaleLowerCase();
            unlockTemplate.children[1].innerHTML = data["Weapons"][element]["GCP Cost"];
            unlockTemplate.children[2].innerHTML = data["Weapons"][element]["Required PR"];
        }
        // Push the GCP costs to the bigFckuckingArray
        bigFckuckingArray.push(data["Weapons"][element]["GCP Cost"]);
    });



    // Sum the whole ass huge fucking costs and print the result
    const sum = bigFckuckingArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log(`Total cost for everything is ${sum} GCP!! 💀`);
}

