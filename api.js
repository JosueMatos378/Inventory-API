const express = require("express")
const bodyParser = require("body-parser")
const { Pool } = require("pg")
const cors = require("cors")
const regedit = require("regedit")
const os = require("os")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const obterConfiguracaoRegistro = () => {
  return new Promise((resolve, reject) => {
    const keyPath =
      "HKLM\\SOFTWARE\\WOW6432Node\\TurboPower\\FlashFiler\\Client Configuration"

    regedit.list(keyPath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        const values = result[keyPath]?.values || {}
        const config = {
          user: "postgres", // Mantido como está
          host: values.Server?.value || "", // Ajustado para acessar "Server"
          database: values.Database?.value || "", // Ajustado para acessar "Database"
          password: "#abc123#", // Mantido como está
          port: 5432, // Mantido como está
        }
        resolve(config)
      }
    })
  })
}

const configuracaoInicial = async () => {
  try {
    const configRegistro = await obterConfiguracaoRegistro()
    const pool = new Pool(configRegistro)

    await pool.query("SELECT NOW()")

    return pool
  } catch (error) {
    console.error("Erro na configuração inicial:", error)
    throw error
  }
}

app.get("/invent", async (req, res) => {
  try {
    const pool = await configuracaoInicial()
    const result = await pool.query("SELECT * FROM wshop.invent")
    res.json(result.rows)
  } catch (error) {
    console.error("Erro ao obter dados da tabela:", error)
    res.status(500).json({ error: "Erro ao obter dados da tabela" })
  }
})

app.put("/invent/cdprincipal/:cdprincipal", async (req, res) => {
  const cdprincipal = req.params.cdprincipal

  try {
    if (!req.body || !req.body.qtapurada) {
      res.status(400).json({
        error: 'O corpo da solicitação deve conter a propriedade "qtapurada".',
      })
      return
    }

    const { qtapurada } = req.body

    if (typeof qtapurada !== "number" || isNaN(qtapurada)) {
      res
        .status(400)
        .json({ error: "A quantidade apurada deve ser um número válido." })
      return
    }

    const pool = await configuracaoInicial()
    await pool.query(
      "UPDATE wshop.invent SET qtapurada = $1 WHERE cdprincipal = $2",
      [qtapurada, cdprincipal]
    )

    res.json({ mensagem: "Quantidade apurada atualizada com sucesso!" })
  } catch (error) {
    console.error("Erro ao atualizar quantidade apurada:", error)
    res.status(500).json({ error: "Erro ao atualizar quantidade apurada" })
  }
})

app.listen(port, () => {
  const enderecoIP = getEnderecoIP()
  console.log(`Servidor rodando em http://${enderecoIP}:${port}`)
})

function getEnderecoIP() {
  const interfaces = os.networkInterfaces()
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address
      }
    }
  }
  return "localhost"
}
