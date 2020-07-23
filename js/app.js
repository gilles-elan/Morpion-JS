const symboles = {  //Identification du symbole des joueurs
    1: 'X',
    2: 'O'
},
    joueur1 = 1,
    joueur2 = 2
let cells = document.querySelectorAll('td'), //Identification des cellules de jeu
    joueurActif = joueur1, //Indication du premier joueur
    count = 0

//Ajout des actions au clic sur tous les TD
for (let cell of cells) {
    cell.addEventListener('click', function () {
        play(this)
        count++
        if (count >= 5) {
            endGame(this)
        }
    })
}

//Fonction permettant de poser une croix ou un rond (avec alternance auto)
let play = elem => {
    if (elem.className === '') {
        elem.className = "light"
        elem.innerHTML = symboles[joueurActif]
        if (joueurActif == 1) {
            joueurActif = joueur2
        } else {
            joueurActif = joueur1
        }
    } else {
        alert('La case est déjà prise, joue ailleurs')
    }
}

//Fonction déterminant la fin de partie
let endGame = elem => {
    let array = document.querySelectorAll('td')
    let vic = []
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
        diaUp: vic[6] + ',' + vic[4] + ',' + vic[2],
    }

    let p1win = 'X,X,X',
        p2win = 'O,O,O'

    for(k in gridObj){
        if(gridObj[k] === p1win){
            console.log('Player 1 wins')
        } else if (gridObj[k] === p2win){
            console.log('Player 2 wins')
        }
    }
}