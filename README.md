<h1>O Desafio</h1>

Você é um programador backend que já trabalha a muito tempo na área e, apesar de trabalhar duro durante a semana, seu hobby preferido sempre foi avaliar filmes. Tendo feito isso durante anos, suas anotações começaram a se perder entre os arquivos de um computador e outro e você teve a brilhante ideia de organizá-las numa api simples, de modo que pudesse sempre voltar e encontrar facilmente suas anotações sobre os filmes já vistos.

No intuito de desenvolver a api, como qualquer bom programador, você ficou com preguiça de preencher repetidamente uma infinidade de dados sobre cada filme assistido e resolveu simplificar a vida integrando com um serviço já existente ([The Open Movie Database](https://www.omdbapi.com/)).

Entre todas as suas anotações de filmes, encontramos também um esboço da api que você irá montar.

Começando por uma rota de criação de anotações: nela, a ideia é integrar com a api do OMDB e salvar todas as informações que julgar relevante para o banco de dados, trazendo obrigatoriamente a data de lançamento (campo "Released" da api do OMDB) e avaliação (campo "imdbRating" da api do OMDB), em conjunto com o "body" abaixo.

    Endpoint: '/movie-reviews'
    Método: 'POST'
    Body: {
    "title": string; // título é o que será usado para buscar as demais informações no OMDB
    "notes": string; // minhas anotações
    } 

Uma sugestão é usar o seguinte endpoint do OMDB para buscar as informações extras sobre o título em questão:

    ```curl --location 'http://www.omdbapi.com/?apikey=aa9290ba&t=assassins%2Bcreed'```

Em seguida, uma rota para listar as suas anotações. Nesta rota, você mesmo deixou como futura melhoria os filtros na query e a ordenação:

    ```Endpoint: '/movie-reviews'
    Método: 'GET'
    ```
    
<h1>Opcional</h1>

Ter a capacidade de ordenar por data de lançamento e avaliação, de maneira ascendente ou descendente.
Capacidade de filtrar as suas anotações por título, atores ou diretores (caso preciso, incluir os demais campos no banco de dados).

Listar uma anotação específica:

    ```Endpoint: '/movie-reviews/:id'
    Método: 'GET'
    Atualizar uma anotação:```

Atualizar uma anotação:

    ```Endpoint: '/movie-reviews/:id'
    Método: 'PUT'
    Deletar uma anotação:```
Deletar uma anotação:

    ```Endpoint: '/movie-reviews/:id'
    Método: 'DELETE'
       ```
 <h1>Extra</h1>      
    ```
    TODO: Colocar paginação nas rotas de listagens
    TODO: Ter uma boa documentação de todas as rotas da api e disponibilizá-las no endpoint "/docs"
    TODO: Disponibilizar a api na internet. Para isso, gostaria de contar as visualizações que cada uma das minhas anotações vêm tendo. Criar também uma outra rota de listagem pra mostrar as mais visualizadas.```

Instruções de como gerar a chave de API

Você pode gerar a sua chave de api diretamente no site do [OMDB Api Keys](https://www.omdbapi.com/apikey.aspx). Um email de confirmação deve chegar na sua conta com as credenciais e você só precisa clicar no link para ativá-las.

Caso queira utilizar a nossa:

    ```apikey: aa9290ba```

<h1>Requisitos do projeto</h1>

API Rest em Typescript desenvolvida utilizando o framework NestJS
Utilização do Typeorm para se comunicar com o banco de dados
Banco de dados MySQL

<h1>O que nós ficaríamos felizes de ver em seu teste</h1>

Testes unitários
Body, query e params com algum tipo de validação
Documentação de todos os endpoints da api
Prettier e eslint configurados no projeto

<h1>O que nos impressionaria<h1/>

Testes de integração
Aplicação facilmente rodável usando docker-compose
Tratamento de erros bem estruturado
Uso adequado (caso necessário) de interceptors e guards
Uso de repositórios para se comunicar com o banco

<h1>O que nós não gostaríamos</h1>

Descobrir que não foi você quem fez seu teste
Ver commits grandes, sem muita explicação nas mensagens em seu repositório
Encontrar um um commit com as dependências de NPM

<h1>O que avaliaremos de seu teste</h1>

Histórico de commits do git
As instruções de como rodar o projeto
Organização, semântica, estrutura, legibilidade, manutenibilidade do seu código
Alcance dos objetivos propostos
