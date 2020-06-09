# :recycle: eColeta
## Repositório contendo o projeto do back-end da aplicação.

## :smiley: A ideia: 
A ideia do eColeta foi criada pela Rocketseat para a semana NextLevel, na qual foi implementado usando as funcionalidades básicas
da Stack: Nodejs, Reactjs e React Native.
O objetivo da aplicação é permitir o cadastro de pontos de coletas de produtos recicláveis, bem como da lista de produtos coletados
por cada um deste pontos. Estas informações seriam, então, disponibilizadas para aquelas pessoas que possuem items recicláveis para
entregar, mas não sabem onde podem levá-los.

##  :sweat_smile: A API:
  Na semana NextLevel, a API foi desenvolvida utilizando o banco de dados sqLite e o Knex.js como querybuilder. Porém, para colocar em
  prática os conceitos sobre o typeorm com postgres, usá-los no meu projeto.
  
  Assim, este projeto utiliza as seguintes tecnologias:
* Nodejs
* Express
* Typescript
* Typeorm
* Postgres
* Tsyringe
  
   
 Além disso, também foram aplicados os conceitos e padrões de desenvolvimento, como:
 
 - [X]  Repositories para acesso ao banco de dados
 - [X]  Services para implementação das regras de negócio
 - [X]  Controllers
 - [X]  DRY
 - [X]  Single Responsability Principle (SOLID - Principles)
 - [X]  Dependecy Inversion (SOLID - Principles)
 - [X]  Injeção automática de dependências
 
 :heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes:
 
 ### As funcionalidades da API:
 1. Cadastrar ponto de coleta: 
  
  <img src="https://github.com/camilaseasky/ecoleta/blob/master/docs/createPoints.png" />
  
  Algumas observações importantes sobre o cadastro de um ponto de coleta: :point_down: 
  
  - [X]  Deve ser enviado um arquivo em image que será a logo exibida na aplicação;
  - [X]  Os itens coletados pelo ponto, devem ter os seus ids enviados através do campo "items" e separados por ",". Observando que os ids dos itens enviados deverão existir na tabela de itens do banco;
  
  2. Visualizar ponto de coleta: 

  <img src="https://github.com/camilaseasky/ecoleta/blob/master/docs/showPoint.png" />
  
  Observações: :point_down: 
  
  - [X]  O id do ponto deve ser enviado como request.params na url;
  - [X]  Serão retornadas as informações do point e também de todos os items coletados por este;

  3. Alterar informações do ponto de coleta: 

  <img src="https://github.com/camilaseasky/ecoleta/blob/master/docs/updatePoint.png" />
  
  Observações: :point_down: 
  
  - [X]  O id do ponto deve ser enviado como request.params na url;
  - [X]  Todos os campos de informações do ponto de coleta poderão ser alterados;
  - [X]  O arquivo de imagem do ponto de coleta poderá ser alterado. Para isto basta selecionar um novo arquivo;
  - [X]  Os itens coletados pelo ponto também poderão ser alterados, enviando novamente os ids dos itens que são coletados no campo items e separados por ','. Observando que os ids dos itens enviados deverão existir na tabela de itens do banco;
  
  4. Deletar um ponto de coleta: 

  <img src="https://github.com/camilaseasky/ecoleta/blob/master/docs/deletePoint.png" />
  
  Observações: :point_down: 
  
  - [X]  O id do ponto deve ser enviado como request.params na url;
  - [X]  Automaticamente, o vínculo dos itens com este ponto de coleta serão excluídos;

  5. Listar os pontos de coleta de determinado estado, cidade e itens informados: 

  <img src="https://github.com/camilaseasky/ecoleta/blob/master/docs/listFilteredPoints.png" />
  
  Observações: :point_down: 
  
  - [X]  Deverão ser informados os valores dos filtros: city, uf e items nos request.query;
  - [X]  Enviar os ids dos itens que se deseja filtrar separados por ',' ;
  
 
 ## :star: O aprendizado:
 
 Além de colocar em prática o uso das tecnologias e conceitos que listei anteriormente, neste projeto me deparei com:
 *  O desafio de usar o relacionamento ManyToMany entre as entities do typeorm. Este tipo de relacionamento foi usado entre as entities points (pontos de coleta) e items (itens coletados por cada ponto). Para isto, usei o recurso de criar uma @joinTable na entity points e uma pivot table somente com as colunas pointsId e itemsId. 
 *  A necessidade de usar seeds no typeorm para a criação dos itens coletados automaticamente. Mas nada que uma pesquisada rápida não resolvesse! 
 
 
 
 
 Status do projeto:    :heavy_check_mark: Concluído
 
  
  
  

