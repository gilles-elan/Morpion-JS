const joueurs = ['X', 'O']
let joueurActif = joueurs[0],
    cells = document.querySelectorAll('td')
// console.log(cells)
for(let cell of cells){
    // console.log(cell)
    cell.addEventListener('click', () => {
        // console.log(this.innerHTML)
        if(joueurActif === joueurs[0]){
            this.innerHTML = joueurs[0]
            joueurActif = joueurs[1]
        } else {
            this.innerHTML = joueurs[1]
            joueurActif = joueurs[0]
        }
    })
}