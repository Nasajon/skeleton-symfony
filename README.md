# Projeto

### Apresentação 

Colocar a apresentação aqui.

### Como Iniciar o Projeto

Os projetos da Nasajon utilizam o Docker por padrão, e em sua maioria já possuem todas configurações necessárias para que o ambiente docker seja executado. Os passos descritos abaixo levam em consideração que você já possua o docker e docker-composer  instalados em sua máquina.

Para iniciar o projeto, basta seguir os passos abaixo:

Clone o projeto para a sua máquina:

``` bash
 git clone git@github.com:Nasajon/Projeto
```

Entre na pasta da aplicação

``` bash
 cd Projeto
```

O projeto utiliza o composer para gestão de dependências e nós utilizamos o composer como um container docker. Para saber mais sobre como funciona, você pode ver um exemplo no nosso repositorio [Dockerfiles](https://github.com/Nasajon/Dockerfiles/tree/master/bin "Dockerfiles")

Com o composer disponível, execute o seguinte comando para instalar as bibliotecas:
``` bash
 composer install
```

Instale as dependências de javascript com o Yarn
``` bash
 yarn install
```

Inicie o banco de dados
``` bash
 docker-compose up -d postgres
```

Execute as migrações do banco para que o mesmo fique atualizado
``` bash
docker-compose run --rm app php app/console doctrine:migrations:migrate --no-interaction
```

Execute o transformer do MDA
``` bash
 docker-compose run --rm transformer
```

Inicie os serviços

``` bash
 docker-compose up -d
```

Agora basta acessar: http://localhost no seu navegador! :)
