import * as admin from 'firebase-admin'
import utils from './utils'
require('dotenv').config()

async function askForInput() {

  const phoneRegex = new RegExp(/^\+[1-9]\d{1,14}$/g)
  const phone = await utils.askForInput("Teléfono: ")
  const phoneNumber = '+' + phone;
  if (!phoneNumber.match(phoneRegex)) {
    console.error("El teléfono no es correcto, ejemplo correcto: 34637513095")
    process.exit(2)
  }

  const emailRegex = new RegExp(/.+\@.+\..+/)
  const email = await utils.askForInput("Email: ");
  if (!email.match(emailRegex)) {
    console.error("El email no es correcto")
    process.exit(2)
  }

  const passwordRegEx = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/g)
  const password = await utils.askForInput("Contraseña: ")
  if (!password.match(passwordRegEx)) {
    console.error("La contraseña no es correcta, debe contener entre 8 y 16 caracteres, numeros y letras minúsculas y mayúsculas")
    process.exit(2)
  }

  const displayName = await utils.askForInput("Nombre y apellidos (opcional): ")
  const photoURL = await utils.askForInput("Imagen de perfil, URL (opcional): ")

  return {
    email,
    phoneNumber,
    password,
    displayName,
    photoURL
  }
}

function createUser (
  email: string,
  phoneNumber: string,
  password: string,
  displayName: string,
  photoURL: string) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })

  const userProperties: admin.auth.CreateRequest = {
    email,
    emailVerified: true,
    phoneNumber: '+' + phoneNumber,
    password,
    displayName,
    photoURL: photoURL || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    disabled: false
  }
  return admin.auth().createUser(userProperties)
}

( async () => {
  const {
    email,
    phoneNumber,
    password,
    displayName,
    photoURL
  } = await askForInput();

  createUser(email, phoneNumber, password, displayName, photoURL)
    .then(result => {
      console.info(result)
    })
    .catch(err => {
      console.error(err)
    })
})()
