# Serviço XSJS

Este é um serviço que permite executar **queries** ou **stored procedures** no servidor hanab1.

Serviço foi feito em node e permite ser instalado como serviço do windows.

## Criação dos arquivos base

A execução das **queries** ou **stored procedures** depende dos arquivos **query.xsjs** e **stored_procedure.xsjs**, que são criadas no hana studio.

Os arquivos **.xsjs** estão localizados na pasta **resources**.

## Configuração da Porta

Por padrão o serviço se inicia na **porta 6000**, caso seja necessário alterar, existe o arquivo **.env**, localizado na raiz do serviço, que pode ser editado em algum editor comum de texto.

> Após a modifição da porta é necessário reiniciar o serviço para atualizar a porta.

## Executando Queries

Para executar consultas no hanab1 utilizando o serviço XSJS, é necessário fazer uma requisição **POST**, passando os paramêtros **xsjs** (caminho do xsjs de consulta) e a **query** (consulta que deseja executar)

Exemplo de execução utilizando AJAX

```javascript
const authorization = btoa("SYSTEM" + ":" + "SENHA");
const nodeServiceUrl = "http://localhost:6000/query";

const data = {
  xsjs: "https://hanab1:4300/PortalTeste/query.xsjs",
  query:
    "select 'DocEntry', 'CardCode', 'CardName' from 'SBO_LIPSON_ROTATIVO'.'OINV'"
};

$.ajax({
  timeout: 60000,
  async: false,
  crossDomain: true,
  url: nodeServiceUrl,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${authorization}`
  },
  processData: false,
  data: JSON.stringify(data),
  success: function(result) {
    console.log(result);
  },
  error: function(data, textStatus, errorThrown) {
    console.log("Erro");
  }
});
```

> Dentro da query deve ser usado as aspas simples, internamento o serviço irá substituir por aspas duplas.

## Executando Stored Procedures

Para executar a procedure do hanab1, é necessário que a **stored procedure** criada tenha um variável de saida (**out**) na declaração da stored procedure.

> Stored Procedure deve retornar as informações dentro de **REG**.

Exemplo de Stored Procedure

```sql
CREATE PROCEDURE "SBO_BASE_TEST"."SP_SPS_TESTE"
(
	in cardCode nvarchar(500),
	in cardName nvarchar(500),
	out REG TABLE (
    "CardCode" nvarchar(50),
		"CardName" nvarchar(50)
  )

) LANGUAGE SQLSCRIPT

AS
BEGIN

	REG = select "CardCode", "CardName" from "SBO_LIPSON_ROTATIVO"."OINV";

END;
```

### Sem parâmetros

```javascript
const authorization = btoa("SYSTEM" + ":" + "SENHA");
const nodeServiceUrl = "http://localhost:6000/stored_procedure";

const data = {
  xsjs: "https://hanab1:4300/PortalTeste/stored_procedure.xsjs",
  base: "SBO_NAME_DB",
  name: "SP_NAME_TEST"
};

$.ajax({
  timeout: 60000,
  async: false,
  crossDomain: true,
  url: nodeServiceUrl,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${authorization}`
  },
  processData: false,
  data: JSON.stringify(data),
  success: function(result) {
    console.log(result);
  },
  error: function(data, textStatus, errorThrown) {
    console.log("Erro");
  }
});
```

### Com parâmetros

Adicionar a propriedade **params** com os nomes de um ou mais parâmetros.

> Caso seja apenas um parâmetro, informar um array com um parâmetro.

```javascript
const authorization = btoa("SYSTEM" + ":" + "SENHA");
const nodeServiceUrl = "http://localhost:6000/stored_procedure";

const data = {
  xsjs: "https://hanab1:4300/PortalTeste/stored_procedure.xsjs",
  base: "SBO_NAME_DB",
  name: "SP_NAME_TEST",
  params: ["Param1", "Param2"]
};

$.ajax({
  timeout: 60000,
  async: false,
  crossDomain: true,
  url: nodeServiceUrl,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${authorization}`
  },
  processData: false,
  data: JSON.stringify(data),
  success: function(result) {
    console.log(result);
  },
  error: function(data, textStatus, errorThrown) {
    console.log("Erro");
  }
});
```
