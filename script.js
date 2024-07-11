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
    // // Personal yoinkage
    // console.log(data);


    // Skills
    const skillKeys = Object.keys(data["Skills"]);
    const skillList = document.querySelector(".equip-skills");
    const skillTemplate = skillList.children[0];
    skillKeys.forEach((element) => {
        if (skillKeys.indexOf(element) != 0) {
            const newSkill = skillTemplate.cloneNode(true);
            newSkill.children[0].innerHTML = element;
            newSkill.children[1].innerHTML = data["Skills"][element]["GCP Cost"];
            newSkill.children[2].innerHTML = data["Skills"][element]["Equip Cost"];
            // Rank requirements
            if (data["Skills"][element]["Required PR"] == "None") {
                newSkill.children[3].innerHTML = `There is no rank requirement`;
            } else if (data["Skills"][element]["Required GR"] == "None") {
                newSkill.children[3].innerHTML = `You need PR${data["Skills"][element]["Required PR"]}`;
            } else {
                newSkill.children[3].innerHTML = `You need PR${data["Skills"][element]["Required PR"]} and GR${data["Skills"][element]["Required GR"]}`;
            }
            // Skill requirements
            // Text
            if (data["Skills"][element]["Required PR"] == "None") {
                newSkill.children[4].innerHTML = "It requires"
            } else {
                newSkill.children[4].innerHTML = "Additionally, it requires"
            }
            // Skill list
            newSkill.children[5].innerHTML = "";
            if (data["Skills"][element]["Prerequisite Skills"] != "None") {
                newSkill.children[4].append(":")
                data["Skills"][element]["Prerequisite Skills"].forEach((req) => {
                    const newReq = document.createElement("li");
                    newReq.innerHTML = req;
                    newSkill.children[5].append(newReq);
                })
            } else {
                newSkill.children[4].append(" no additional skills.")
            }
            skillList.append(newSkill);
        } else {
            skillTemplate.children[0].innerHTML = element;
            skillTemplate.children[1].innerHTML = data["Skills"][element]["GCP Cost"];
            skillTemplate.children[2].innerHTML = data["Skills"][element]["Equip Cost"];
            // Rank requirements
            if (data["Skills"][element]["Required PR"] == "None") {
                skillTemplate.children[3].innerHTML = `There is no rank requirement`;
            } else if (data["Skills"][element]["Required GR"] == "None") {
                skillTemplate.children[3].innerHTML = `You need PR${data["Skills"][element]["Required PR"]}`;
            } else {
                skillTemplate.children[3].innerHTML = `You need PR${data["Skills"][element]["Required PR"]} and GR${data["Skills"][element]["Required GR"]}`;
            }
            // Skill requirements
            // Text
            if (data["Skills"][element]["Required PR"] == "None") {
                skillTemplate.children[4].innerHTML = "It requires"
            } else {
                skillTemplate.children[4].innerHTML = "Additionally, it requires"
            }
            // Skill list
            if (data["Skills"][element]["Prerequisite Skills"] != "None") {
                skillTemplate.children[4].append(":")
                data["Skills"][element]["Prerequisite Skills"].forEach((req) => {
                    const newReq = document.createElement("li");
                    newReq.innerHTML = req;
                    skillTemplate.children[5].append(newReq);
                })
            } else {
                skillTemplate.children[4].append(" no additional skills.")
            }
        }
        // Push the GCP costs to the bigFckuckingArray
        bigFckuckingArray.push(data["Skills"][element]["GCP Cost"]);
    })


    // Auto skills
    const autoSkillKeys = [Object.keys(data["Auto Skills"]["Skill Slots"]), Object.keys(data["Auto Skills"]["Skill Cost"]), Object.keys(data["Auto Skills"]["Attack Limit"])];
    const slotList = document.querySelector(".auto-ssu");
    const costList = document.querySelector(".auto-cost");
    const rawCapList = document.querySelector(".auto-raw-cap");
    const autoSkillTemplate = slotList.children[0];
    for (let i = 0; i < autoSkillKeys.length; i++) {
        let autoSkillTarget;
        let dataTarget;
        switch (i) {
            case 0:
                autoSkillTarget = slotList;
                dataTarget = "Skill Slots";
                break;
            case 1:
                autoSkillTarget = costList;
                dataTarget = "Skill Cost";
                break;
            case 2:
                autoSkillTarget = rawCapList;
                dataTarget = "Attack Limit";
                break;
        }
        autoSkillKeys[i].forEach((element) => {
            if (i == 0 && autoSkillKeys[i].indexOf(element) == 0) {
                autoSkillTemplate.children[0].innerHTML = element;
                autoSkillTemplate.children[1].innerHTML = data["Auto Skills"][dataTarget][element]["GCP Cost"];
                data["Auto Skills"][dataTarget][element]["Requirement"].forEach((req) => {
                    const newReq = document.createElement("li");
                    newReq.innerHTML = req;
                    autoSkillTemplate.children[2].append(newReq);
                })
            } else {
                const newAutoSkill = autoSkillTemplate.cloneNode(true);
                newAutoSkill.children[0].innerHTML = element;
                newAutoSkill.children[1].innerHTML = data["Auto Skills"][dataTarget][element]["GCP Cost"];
                newAutoSkill.children[2].innerHTML = "";
                data["Auto Skills"][dataTarget][element]["Requirement"].forEach((req) => {
                    const newReq = document.createElement("li");
                    newReq.innerHTML = req;
                    newAutoSkill.children[2].append(newReq);
                })
                autoSkillTarget.append(newAutoSkill);
            }
            // Push the GCP costs to the bigFckuckingArray
            if (i != 2) {
                bigFckuckingArray.push(data["Auto Skills"][dataTarget][element]["GCP Cost"]);
            } else {
                for (let i = 0; i < 14; i++) {
                    bigFckuckingArray.push(data["Auto Skills"][dataTarget][element]["GCP Cost"]);
                }
            }
        })
    }


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
    document.querySelector(".max-slots").innerHTML = data["Maxed Partner"]["Skill Slots"];
    document.querySelector(".max-cost").innerHTML = data["Maxed Partner"]["Max Cost"];


    // Sum the whole ass huge fucking costs and print the result
    const sum = bigFckuckingArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log(`Total cost for everything is ${sum} GCP, not including Item Set costs (but that's a drop in the bucket compared to the rest)!! 💀💀💀`);
}

