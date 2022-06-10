import { Request, Response, Router } from "express";
import multer from "multer";
import readline from "readline";
const { hapikey } = require("./Config/config");
import axios from "axios";
import { Readable } from "stream";
const router = Router();
const multerConfig = multer();

//Tipagem dos contatos
interface Contacts {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

//Rota Inicial
router.get("/", (req: Request, res: Response) => {
  //Seria usada para apresentar a quantidade de emails dos usuários cadastrados, porém a API ''get all contacts'' não está funcionando.
  res.status(200).json("Sejam bem vindos!");
});

//Receber dados da lista
//Receber os dados da lista cadastrada.
router.get("/loglist", (req: Request, res: Response) => {
  axios({
    method: "get",
    url: `https://api.hubapi.com/contacts/v1/lists?count=2&hapikey=${hapikey}`,
  })
    .then((response) => {
      res.json({
        "Nome da lista": response.data.lists[0].name,
        ID: response.data.lists[0].listId,
      });
    })
    .catch(() => {
      res.json("Erro ao pegar dados da lista!");
    });
});

//Criar lista no hubspot
router.post("/", (req: Request, res: Response) => {
  axios({
    method: "post",
    url: `https://api.hubapi.com/contacts/v1/lists?hapikey=${hapikey}`,
    data: { name: "Axur List" },
  })
    .then(() => {
      res.status(201).json("Lista criada com sucesso!");
    })
    .catch((error) => {
      console.log("Erro ao cadastrar lista");
      console.log(error);
    });
});

//Enviar usuário para a lista no hubspot
//Está é a função para enviar os usuários cadastrados no hubpost para a lista, porém a API de usuários não está dando o retorno correto.
router.post("/users", (req: Request, res: Response) => {
  axios({
    method: "post",
    url: `https://api.hubapi.com/contacts/v1/lists/${`listId`}/add?hapikey=${hapikey}`,
    data: {
      emails: ["usuário@test.com"], //param-email,
    },
  })
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//Criar usuário no hubspot pelo arquivo CSV.
//Rota para pegar os usuários do arquivo CSV, fazer a leitura linha por linha e enviar para o hubspot.
router.post(
  "/addusercontact",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;
    const buffer = file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const usersLine = readline.createInterface({
      input: readableFile,
    });

    const contacts: Contacts[] = [];

    for await (const user of usersLine) {
      const dataUser = user.split(",");

      contacts.push({
        first_name: dataUser[0],
        last_name: dataUser[1],
        email: dataUser[2],
        gender: dataUser[3],
      });
    }

    for await (let { first_name, last_name, email, gender } of contacts) {
      await axios({
        headers: { "Content-Type": "application/json" },
        method: "post",
        url: `https://api.hubapi.com/contacts/v1/contact/?hapikey=${hapikey}`,
        data: {
          properties: [
            {
              property: "email",
              value: email,
            },
            {
              property: "firstname",
              value: first_name,
            },
            {
              property: "lastname",
              value: last_name,
            },
            {
              property: "gender",
              value: gender,
            },
          ],
        },
      })
        .then(() => {
          console.log("Criando usuário...");
        })
        .catch((error) => {});
    }

    const sendUsersToList = () => {
      //todo
    };

    return res.json(contacts);
  }
);

export { router };
