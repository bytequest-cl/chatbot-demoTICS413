const fs = require('node:fs/promises')
const path = require('node:path')
const NodeRSA = require('node-rsa').default

async function main() {
  const outputDir = path.join(__dirname, 'keys')
  await fs.mkdir(outputDir, { recursive: true, mode: 0o700 })

  const privatePath = path.join(outputDir, 'private.pem')
  const publicPath = path.join(outputDir, 'public.pem')
  const key = new NodeRSA({ b: 4096 }, {
    encryptionScheme: { scheme: 'pkcs1_oaep', hash: 'sha256' },
  })

  await fs.writeFile(privatePath, key.exportKey('pkcs8-private-pem'), { flag: 'wx', mode: 0o600 })
  await fs.writeFile(publicPath, key.exportKey('pkcs8-public-pem'), { flag: 'wx', mode: 0o644 })

  console.log('Par RSA de 4096 bits creado en keys/')
  console.log('Llave pública: keys/public.pem')
  console.log('Llave privada: keys/private.pem')
}

main().catch((error) => {
  console.error('No se pudieron crear las llaves:', error.message)
  process.exitCode = 1
})
