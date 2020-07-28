//Fonction de premier joueur random
let rdmPlayer = () => {
    console.log(Math.floor(Math.random() * 2) + 1)
    return Math.floor(Math.random() * 2) + 1
}

//CONSTANTES
const symboles = {  //Identification du symbole des joueurs
    1: 'X',
    2: 'O'
},
    joueur1 = 1, //Joueurs chiffrés (pour affichage et intéraction avec const symboles)
    joueur2 = 2

//VARIABLES
let cells = document.querySelectorAll('td'), //Récupération des cellules de jeu dans un tableau
    joueurActif = rdmPlayer(), //Indication du premier joueur (appel à fonction aléatoire)
    count = 0, //Compteur de tours de jeu
    game = true

//Affichage du premier joueur
document.querySelector('h1').innerHTML = `C'est au joueur ${joueurActif} de jouer`

//Ajout des actions au clic sur tous les TD
for (let cell of cells) { //On boucle sur chaque cellule
    cell.addEventListener('click', function () { //On écoute le clic
        if (game === true) { //Si le jeu n'est pas fini
            //quand la cellule est cliquée...
            play(this) //On utilise la fonction "play" sur la cellule cliquée
            count++
            if (count >= 5) { //Si le compteur de jeu >=5 alors on a une possibilité de victoire
                endGame(this)
            }
        }
    })
}

//Au clic sur le bouton 'recommencer'
document.querySelector('#reload').addEventListener('click', function(){
    count = 0
    game = true
    for (let cell of cells) {
        cell.innerHTML = ''
        cell.classList = ''
    }
    joueurActif = rdmPlayer()
    document.querySelector('h1').innerHTML = `C'est au joueur ${joueurActif} de jouer`
})

//Fonction permettant de poser une croix ou un rond 
//(avec alternance auto)
let play = elem => { //fonction avec 'elem' comme paramètre pour l'élément cliqué
    if (elem.className === '') { //Si le TD cliqué est nul
        elem.className = "light" //On rajoute une classe pour appliquer du CSS
        elem.innerHTML = symboles[joueurActif] //On insère le symbole du joueur actif
        //On switch le joueur
        if (joueurActif == 1) {
            joueurActif = joueur2
        } else {
            joueurActif = joueur1
        }
    } else { //Si la case n'est pas vide, on affiche du texte
        document.querySelector('h1').innerHTML = 'La case est déjà prise, joue ailleurs'
        return false
    }
    //Si la case était vide, on affiche le joueur qui doit jouer
    document.querySelector('h1').innerHTML = `C'est au joueur ${joueurActif} de jouer`
}

//Fonction déterminant la fin de partie
let endGame = elem => {
    let array = document.querySelectorAll('td') //On récupère les TD dans leur état actuel (remplis ou non)
    let vic = []
    //On pousse dans un nouveau tableau le contenu HTML de chaque TD
    for (test of array) {
        vic.push(test.innerHTML)
    }

    //On regroupe toutes les possibilités dans un objet: les lignes, colonnes et diagonales
    let gridObj = {
        row1: vic.slice(0, 3).toString(),
        row2: vic.slice(3, 6).toString(),
        row3: vic.slice(6, 9).toString(),
        col1: vic[0] + ',' + vic[3] + ',' + vic[6],
        col2: vic[1] + ',' + vic[4] + ',' + vic[7],
        col3: vic[2] + ',' + vic[5] + ',' + vic[8],
        diaDown: vic[0] + ',' + vic[4] + ',' + vic[8],
        diaUp: vic[6] + ',' + vic[4] + ',' + vic[2]
    }

    //On crée les variables pour le joueur 1 et 2
    let p1win = 'X,X,X',
        p2win = 'O,O,O'

    //On teste si la condition de victoire est atteinte
    for (k in gridObj) {
        if (gridObj[k] === p1win) {
            document.querySelector('h1').innerHTML = `Le joueur 1 gagne!`
            game = false
        } else if (gridObj[k] === p2win) {
            document.querySelector('h1').innerHTML = `Le joueur 2 gagne!`
            game = false
        } else if (count === 9 && (gridObj[k] !== p1win || gridObj[k] !== p2win)) {
            //Si pas de victoire et que le compteur à atteint 9 coups alors c'est match nul
            document.querySelector('h1').innerHTML = `Match nul, recommencez!`
            game = false
        }
    }
}