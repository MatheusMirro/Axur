# Axur

Aplicação desenvolvida com a API do [Hubspot](https://www.hubspot.com).

## Instalação

Use o gerenciador de pacotes NPM para instalar as dependências da aplicação.
```bash
npm install ou npm i
```

## Usage


É recomendado que siga as instruções de rotas para que a aplicação seja apresentada de maneira correta.
Ao instalar as dependências, vá até o documento config.ts e insira sua API KEY.

Após isso, é necessário que insira o documento Contatos.csv no aplicativo insomnia (recomendado) da seguinte maneira:
![axurgif](https://user-images.githubusercontent.com/47016580/172970361-1530d8f4-aea5-41e8-b9a9-55b755584496.gif)

```python
O passo seguinte é acessar as rotas corretamente, começando por:
POST na rota "/" para criar uma lista no hubspot.
------
GET na rota "/loglist" para ter acesso ao nome da sua lista criada e o ID.
------
Após receber os dados da sua lista criada, vá até:
POST na rota "/users" e substitua a flag "${`listId`}" pelo ID da sua lista criada.
------
Por último e após adicionar o arquivo Contatos.csv no inomnia, dê um:
POST na rota "/addusercontact" para que o código leia os dados do arquivo e crie os contatos no hubspot.
```

## Erro no retorno da API
Dentro do proposto não foi possível finalizar duas etapas do projeto:

1º Enviar os contatos criados pela API para a lista criada.

2º  A listagem com a quantidade de emails iguais cadastrados.

Houve um problema no retorno da API ao tentar receber o acesso dos usuários criados, não obtendo êxito na conclusão da aplicação.

OBS: Será aberto um ticket informando o problema para os desenvolvedores dentro do fórum da comunidade.

## License
[MIT](https://choosealicense.com/licenses/mit/)

