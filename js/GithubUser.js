export class GithubUser{

    static search(username){
        ///essa const passa a valer o valor da url 
        const endpoint = `https://api.github.com/users/${username}`

        //busca na internet as informção 
        //pega os dados em transforma em json 
        return fetch(endpoint).then(data => data.json())
        .then(({login, name, public_repos,followers})=>({
        //nesse then passo oque precisa ser consumido da API 
        //retorna objeto
            login,
            name,
            public_repos,
            followers

        }))
    }
}