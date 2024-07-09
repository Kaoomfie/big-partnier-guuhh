// Collapsiple content button logic
const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
    });
}


// Define some variables
let data;
const bigFckuckingArray = [];

// Fetch JSON data, and run initialRender function once finished
fetch("https://kaoomfie.github.io/big-partnier-guuhh/pardner.json")
    .then((res) => res.json())
    .then((json) => data = json)
    .then(() => initialRender(data));

function initialRender(data) {
    // Personal yoinkage
    console.log(data);


    // Skills



    // Auto skills



    // Item sets
    const itemSetKeys = [Object.keys(data["Items"]["Normal"]), Object.keys(data["Items"]["Urgent"])]
    const normalList = document.querySelector(".normal-sets");
    const urgentList = document.querySelector(".urgent-sets");
    const itemSetTemplate = normalList.children[0];
    for (let i = 0; i < itemSetKeys.length; i++) {
        // Normal
        if (i == 0) {
            itemSetKeys[i].forEach((element) => {
                if (itemSetKeys[i].indexOf(element) != 0) {
                    const newItemSet = itemSetTemplate.cloneNode(true);
                    newItemSet.children[0].innerHTML = element;
                    newItemSet.children[1].innerHTML = data["Items"]["Normal"][element]["GCP Cost"];
                    newItemSet.children[2].innerHTML = "";
                    data["Items"]["Normal"][element]["Items"].forEach((item) => {
                        const newItem = document.createElement("li");
                        newItem.innerHTML = item;
                        newItemSet.children[2].append(newItem);
                    })
                    normalList.append(newItemSet);
                } else {
                    itemSetTemplate.children[0].innerHTML = element;
                    itemSetTemplate.children[1].innerHTML = data["Items"]["Normal"][element]["GCP Cost"];
                    data["Items"]["Normal"][element]["Items"].forEach((item) => {
                        const newItem = document.createElement("li");
                        newItem.innerHTML = item;
                        itemSetTemplate.children[2].append(newItem);
                    })
                }
            })
        // Urgent
        } else if (i == 1) {
            itemSetKeys[i].forEach((element) => {
                urgentList.children[0].children[0].innerHTML = element;
                urgentList.children[0].children[1].innerHTML = data["Items"]["Urgent"][element]["GCP Cost"];
                data["Items"]["Urgent"][element]["Items"].forEach((item) => {
                    const newItem = document.createElement("li");
                    newItem.innerHTML = item;
                    urgentList.children[0].children[2].append(newItem);
                })
            })
        }
    }


    // Weapon unlocks
    // Create an array of the "Weapons" keys to iterate through
    const weaponUnlockKeys = Object.keys(data["Weapons"]);
    // Find the relevant DOM nodes
    const unlocksList = document.querySelector(".weapon-unlocks");
    const unlockTemplate = unlocksList.children[1];
    // Iterate through the keys to add the needed nodes, and update their values
    weaponUnlockKeys.forEach((element) => {
        // For all elements except the 2nd, create a cloned node
        // if (element != "Second") {
        if (weaponUnlockKeys.indexOf(element) != 0) {
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


    // Max stats
    // Sets slot and cost values from JSON data
    document.querySelector(".slots").innerHTML = data["Maxed Partner"]["Skill Slots"];
    document.querySelector(".cost").innerHTML = data["Maxed Partner"]["Max Cost"];


    // Sum the whole ass huge fucking costs and print the result
    const sum = bigFckuckingArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log(`Total cost for everything is ${sum} GCP!! 💀`);
}

