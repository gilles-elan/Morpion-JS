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
        if(count>=5){
            endGame(this)
        }
    })
}

//Fonction permettant de poser une croix ou un rond (avec alternance auto)
let play = elem => {
    if(elem.className === ''){
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

}