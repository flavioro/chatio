![Screenshot](https://raw.githubusercontent.com/flavioro/chat.io/master/public/img/chat.io.gif)

Um aplicativo de bate-papo em tempo real criado usando Node.js, Express, Mongoose, Socket.io, Passport, & Redis.

## Index

- [Recursos](#features)
- [Instalação](#installation)
- [Como funciona](#how-it-works)
- [Licença](#license)

## Recursos<a name="features"></a>

- Use Express para Framework da aplicação.
- Gerencie Sessions usando [express-session](https://github.com/expressjs/session) package.
- Autenticação via username e password usando [Passport](https://github.com/jaredhanson/passport).
- As senhas são hash usando [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs) package.
- Autenticação Social via Facebook e Twitter em andamento... [Passport](https://github.com/jaredhanson/passport).
- Real-time comunicação entre o cliente e o server usando [Socket.io](https://github.com/socketio/socket.io).
- Usando [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) e [MongoLab(mLab)](https://mlab.com/) para armazenamento e consulta aos dados.
- Session de armazenando em [MongoDB](https://github.com/mongodb/mongo) usando [connect-mongo](https://github.com/kcbanner/connect-mongo).
- Usando [Redis](https://github.com/antirez/redis) como um Adapter para [Socket.io](https://github.com/socketio/socket.io).
- Log de Erros e Exceções usando [Winston](https://github.com/winstonjs/winston).

## Instalação<a name="installation"></a>

### Executando localmente

Assegure-se de ter [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) installed.

1.  Clone ou Download do repositório

    ```
    $ git clone https://github.com/flavioro/chatio.git
    $ cd chat.io
    ```

2.  Instalar dependências

    ```
    $ npm install
    ```

3.  Edite o arquivo de configuração em _app/config/config.json_ com suas credenciais (veja [Configurações de instalação](#configurations)).
4.  Download e Instalação [Redis](http://redis.io/download).
5.  Execute Redis Server(como Admin)

    ```
    $ redis-server
    ```

6.  Inicie a aplicação

        ```
        $ npm start
        ```

    Sua aplicação deverá ser executada agora em [localhost:3000](http://localhost:3000/).

## Como funciona<a name="how-it-works"></a>

### Configurações de instalação<a name="configurations"></a>

As configurações de desenvolvimento ficam dentro do arquivo _app/config/config.json_ .

#### MongoDB & MongoLab

Você precisa criar um banco de dados no MongoLab, criar um usuário de banco de dados, pegue a `MongoDB URI`, e atribua ao `dbURI`.

#### Session

A sessão precisa de uma sequência aleatória para garantir que o ID da sessão no navegador seja aleatório. Essa sequência aleatória é usada para criptografar o ID da sessão no navegador, _Por que?_ Para impedir a adivinhação do ID da sessão.

#### Schemas

Existem dois schemas; users and rooms.

Cada user tem um username, password, ID social e imagem. Se o usuário estiver conectado via nome de usuário e senha, o ID social deverá ser nulo e, se estiver conectado através de uma conta social, a senha será nula.

Cada sala tem um título e um conjunto de conexões. Cada item na matriz de conexões representa um usuário conectado através de um soquete exclusivo; objeto composto por _{userId + socketId}_. Ambos juntos são únicos.

### Models<a name="models"></a>

Cada model envolve o objeto Mongoose Model, substitui e fornece alguns métodos. Existem dois models; User and Room.

### Session<a name="session"></a>

É melhor gerenciar a sessão nos aplicativos Express usando o pacote [express-session](https://github.com/expressjs/session). Os dados da sessão são armazenados localmente no seu computador. Os dados da sessão serão excluídos após o logout.

### Autenticação de usuário<a name="auth"></a>

O usuário pode fazer login usando um nome de usuário e senha. A autenticação do usuário é feita usando o [Passport](https://github.com/jaredhanson/passport). O Passport possui documentação e passo a passo (http://passportjs.org/docs/) sobre como implementar cada forma de autenticação.

### Sockets<a name="sockets"></a>

Ter uma conexão ativa e aberta entre o cliente e o servidor para que o cliente possa enviar e receber dados. Isso permite a comunicação em tempo real usando soquetes TCP. Isso é possível por [Socket.io](https://github.com/socketio/socket.io).

O cliente começa conectando-se ao servidor por meio de um soquete. Quando as conexões forem bem-sucedidas, o cliente e o servidor poderão emitir e ouvir eventos.

Existem dois namespaces usados; `/rooms` e `/chatroom`.

### Log<a name="logger"></a>

Para monitorar seu aplicativo. [Winston](https://github.com/winstonjs/winston) pode registrar e capturar exceções não capturadas. Todos os logs são exibidos no console e salvos no arquivo _debug.log_.

## Licença <a name="license"></a>

Construído sob [MIT](http://www.opensource.org/licenses/mit-license.php) license.
