/**
 * Phrase Function
 */


const phrases = [
    "login: user",
    "password: ******",
    "Starting system...",
    "Please wait while the system boots...",
    "Loading configuration files...",
    "Establishing connections...",
    "Starting services...",
    "System boot complete.",
    "Bienvenue, user!"
]


function phraseTerminal() {

    let index = 0

    const interval = setInterval(() => {
        if (index < phrases.length) {
            phraseAnimation(phrases[index])
            index ++
        } else {
            clearInterval(interval)
        }
    }, 2000)

}

function phraseAnimation(phrase) {

    const div = document.getElementById("output");
    const ligne = document.createElement("p")
    let index = 0

    const date = new Date();
    let heure = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let seconde = String(date.getSeconds()).padStart(2, '0');
    ligne.textContent = `${heure}:${minute}:${seconde} `;
    div.appendChild(ligne);
    
    phraseSplit = phrase.split("")
    const interval = setInterval(() => {
        if (index < phraseSplit.length) {
            ligne.textContent = ligne.textContent + phraseSplit[index];

            index ++
        } else{
            clearInterval(interval)
        }
    }, 50)
}

window.onload = phraseTerminal

/**
 *  Input Function 
 */


const input = document.getElementById("commandInput")

const commandes = {
    help: "Commandes disponibles : help, simulation, amaury, home",
    simulation: "Téléportation en cours ...",
    amaury: "...",
    home: "Retour en cours ..."
}

input.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        input.value = null;
        if (command in commandes) {
            phraseAnimation(commandes[command]);
            if (command === "simulation"){
                setTimeout(() => {
                    window.location.href = "./portal.html";
                }, 3000);
            } else if (command === "amaury") {
                console.log("Need to finish"); // Pas fini
            } else if (command === "home") {
                setTimeout(() => {
                    window.location.href = "./index.html"
                }, 3000);
            }
        } else {
            phraseAnimation(`Commande inconnue : '${command}'`)
        }
    }
})

// function amauryCommand() {

// }

/**
 * Fonction amaury a faire
 */