import { GithubUser } from "./GithubUser.js"
// classe que vai conter a logica dos dados
//como os dados serão estruturados 
export class Favorites {
    //super passa o valor para esse root
    constructor(root){
    //esse root pega valor que vem da classe FavoritesView
 //e acresenta o id 
        this.root = document.querySelector(root)
        this.load()

        GithubUser.search('danilojssantos').then(user =>console.log(user))
    }

    load(){
         this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
         
    }

    save(){
            //salva no local stroge e transfor JSON em string
        localStorage.setItem('@github-favorites', JSON.stringify(this.entries))

    }

    async add(username){
        // valida se algo der errado entra no erro
        try{

          const userExists = this.entries.find(entry => entry.login === username)

          if(userExists){
            throw new Error('Usuario Ja Cadastrado')
          }

          const user = await GithubUser.search(username)

          if(user.login === undefined){
            throw new Error('Usuario Não encontrado')
          }

          this.entries =[user, ...this.entries]
          //reescreve com um novo array
          this.update()
          //salva no local storage 
          this.save()

        }catch(error){
            alert(error.message)
        }
        

        
    }

    delete(user){
       
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    //paga o antigo array e coloca um novo array 
        this.entries = filteredEntries
        this.update()
        this.save()
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
        this.onadd()
    }
   


    onadd(){
        //addButton seleciona o valor class do button  
        //rooot e tem valor id app
        const addButton = this.root.querySelector('.search button')  
        addButton.onclick = () => {
            //pega valor que esta dentro da input
           
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }
    update(){
      this.removeAllTr()

        
      this.entries.forEach(user => {
        //retornando tr criado pela dom 
        const row = this.createRow()
        //faz e pesquisa para mudar a foto  
        row.querySelector('.user img').src=`https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Image do ${user.name}`
        row.querySelector('.user a').src=`https://github.com/${user.login}`
        row.querySelector('.user p').textContent = user.name 
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.fallowers
        //onclick dispara um evento unico de click na aplicação
        //caso app precisa mais evento de click addEventListener
        row.querySelector('.remove').onclick = ()=>{
            //recebe 0 confirm 
            const isOk = confirm('Tem certeza que deseja deletar essa linha?')
            
            if (isOk) {

        //função delete vem dentro das classe que manipula os dados 
                this.delete(user)
            }
            
        }
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
   
    this.tbody.querySelectorAll('tr').forEach((tr) => {
            //responsavel para remover todos tr (linhas)
            tr.remove()
        })

    }
}