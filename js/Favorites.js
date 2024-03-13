// classe que vai conter a logica dos dados
//como os dados serão estruturados 
export class Favorites {
    //super passa o valor para esse root
    constructor(root){
    //esse root pega valor que vem da classe FavoritesView
 //e acresenta o id 
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
         this.entries= [
            {
                login: 'danilojssantos',
                name: 'Danilo Joaquim',
                public_repos: '76',
                fallowers: '12000'
            },
            {
                login: 'danilojssantos',
                name: 'Luke Skywalker',
                public_repos: '80',
                fallowers: '13000'
            }
          ]
    }
}

//classe que vai criar a visualização do HTML 

export class FavoritesView extends Favorites {
    //receber o valor que vem do new
    constructor(root) {
    //super faz a ligação de uma classe na outra 
    //vai charmar o constructor e passando para outra classe
        super(root)
    //pega dentro do App o valor tbody
    //pega valor de todas as linha (tr)
        this.tbody = this.root.querySelector('table tbody')
        //console.log(this.root)
        this.update()
    }
    //
    update(){
      this.removeAllTr()

    
      this.entries.forEach(user => {
        //retornando tr criado pela dom 
        const row = this.createRow()
        //faz e pesquisa para mudar a foto  
        row.querySelector('.user img').src=`https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Image do ${user.name}`
        row.querySelector('.user p').textContent = user.name 
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.fallowers
        
        // e uma funcção da dom que recebe o elemeto HTML 
        this.tbody.append(row)
       
      })

     

    }

    createRow(){
        //cria o elemento html na dom 
        const tr = document.createElement('tr')
        tr.innerHTML = `
       
                  <td class="user">
                      <img src="https://avatars.githubusercontent.com/u/29332671?s=400&u=ed3eddbec138f2813df42ae998e42e3d36ef242b&v=4" 
                      alt="Foto do danilo">
                      <a href="https://github.com/danilojssantos" target="_blank">
                          <p>Danilo Joaquim</p>
                          <span>danilojsantos</span>
                          
                      </a>
                  </td>
                  <td class="repositories">76</td>
                  <td class="followers">9589</td>
                  <td class="remove">&times;</td>
  
  
                
        
        `

         return tr

    }

    removeAllTr(){
    //pega dentro do App o valor tbody
        
    //pega valor de todas as linha (tr)
    //ele e um arraylike e por isso pode ter algumas funcionlidade
    // foreEach para cada tr que tiver ele vai executar uma função
        this.tbody.querySelectorAll('tr')
        .forEach((tr)=> {
            //responsavel para remover todos tr (linhas)
            tr.remove()
        })

    }
}