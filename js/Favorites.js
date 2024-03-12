// classe que vai conter a logica dos dados
//como os dados serão estruturados 
export class Favorites {
    //super passa o valor para esse root
    constructor(root){
    //esse root pega valor que vem da classe FavoritesView
 //e acresenta o id 
        this.root = document.querySelector(root)
    }
}

//classe que vai criar a visualização do HTML 

export class FavoritesView extends Favorites {
    //receber o valor que vem do new
    constructor(root) {
    //super faz a ligação de uma classe na outra 
    //vai charmar o constructor e passando para outra classe
        super(root)
        //console.log(this.root)
        this.update()
    }
    //
    update(){
      this.removeAllTr()

    }

    removeAllTr(){
    //pega dentro do App o valor tbody
        const tbody = this.root.querySelector('table tbody')
    //pega valor de todas as linha (tr)
    //ele e um arraylike e por isso pode ter algumas funcionlidade
    // foreEach para cada tr que tiver ele vai executar uma função
        tbody.querySelectorAll('tr')
        .forEach((tr)=> {
            //responsavel para remover todos tr (linhas)
            tr.remove()
        })

    }
}