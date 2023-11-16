let currentPlayer = 1;
let player1Current = 0;
let player2Current = 0;

function rollDice() {
    let nombre_des = document.getElementsByClassName("newdes").length;
    let total = 0;

    for (let compteur1 = 0; compteur1 < nombre_des; compteur1++) {
        let nombre = Math.floor(Math.random() * 6) + 1;
        const element = document.querySelector("img#des" + compteur1).setAttribute("src", "assets/des" + nombre + ".png");
        total = total + nombre;
    }

    console.log("Joueur " + currentPlayer + " a lancé les dés. Total: " + total);

    if (total === 1) {
        console.log("Joueur " + currentPlayer + " a obtenu un 1 et a perdu son tour!");
        // Le joueur a obtenu un 1, réinitialiser le total actuel et changer de joueur
        if (currentPlayer === 1) {
            player1Current = 0;
            document.querySelector(".player1 .current span").textContent = player1Current;
        } else {
            player2Current = 0;
            document.querySelector(".player2 .current span").textContent = player2Current;
        }
        switchPlayer();
    } else {
        // Mettre à jour le total actuel du joueur en cours
        if (currentPlayer === 1) {
            player1Current += total;
            document.querySelector(".player1 .current span").textContent = player1Current;
        } else {
            player2Current += total;
            document.querySelector(".player2 .current span").textContent = player2Current;
        }
    }
}


function hold() {
    // Ajouter le total actuel au total global du joueur en cours
    const globalElement = document.querySelector(".player" + currentPlayer + " .global");
    const currentElement = document.querySelector(".player" + currentPlayer + " .current span");

    let globalScore = parseInt(globalElement.textContent);
    let currentTotal = currentPlayer === 1 ? player1Current : player2Current;

    globalScore += currentTotal;
    console.log("Joueur " + currentPlayer + " envoie " + currentTotal + " au total global. Nouveau total global: " + globalScore);
    globalElement.textContent = globalScore;

    // Vérifier si le joueur a gagné
    if (globalScore >= 100) {
        alert("Joueur " + currentPlayer + " a gagné!");
        // Réinitialiser le jeu
        resetGame();
    } else {
        // Réinitialiser le total actuel et passer au joueur suivant
        if (currentPlayer === 1) {
            player1Current = 0;
            document.querySelector(".player1 .current span").textContent = player1Current;
        } else {
            player2Current = 0;
            document.querySelector(".player2 .current span").textContent = player2Current;
        }
        switchPlayer();
    }
}


function switchPlayer() {
    console.log("Passer au joueur suivant.");
    // Changer de joueur
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Mettre à jour l'affichage pour indiquer le joueur en cours
    document.querySelectorAll(".player").forEach(player => player.classList.remove("active"));
    document.querySelector(".player" + currentPlayer).classList.add("active");

    // Masquer tous les indicateurs actifs
    document.querySelectorAll(".activeIndicateur").forEach(indicator => indicator.style.display = 'none');

    // Afficher l'indicateur actif du joueur en cours
    document.querySelector(".player" + currentPlayer + "Indicateur").style.display = 'inline-block';


    // Ajouter d'autres éléments de mise à jour de l'interface utilisateur au besoin
}

function resetGame() {
    console.log("Nouvelle partie commencée");
    // Réinitialiser le jeu à zéro
    currentPlayer = 1;
    player1Current = 0;
    player2Current = 0;

    document.querySelectorAll(".global, .current span").forEach(element => (element.textContent = "0"));

    // Réinitialiser l'affichage pour le joueur actif
    document.querySelectorAll(".player").forEach(player => player.classList.remove("active"));
    document.querySelector(".player1").classList.add("active");
}
