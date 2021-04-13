import utils from './utils'
import * as admin from 'firebase-admin'
require('dotenv').config()

type Role = 'admin'|'agency'|'client';

async function getUserByEmail(email: string): Promise<admin.auth.UserRecord|null> {
  try {
    return await admin.auth().getUserByEmail(email)
  } catch (e) {
    return null;
  }
}

async function askForUserEmail() {
  const emailRegex = new RegExp(/.+\@.+\..+/)
  const email = await utils.askForInput("Email: ");
  if (!email.match(emailRegex)) {
    console.error("El email no es correcto")
    process.exit(2)
  }
  const user = await getUserByEmail(email)
  if (!user) {
    console.error("El usuario no existe")
    process.exit(2)
  }
  return user;
}
async function askForUserRole(): Promise<Role> {
  const role = await utils.askForInput("Rol a asignar (admin, agency, client):");
  if (!['admin', 'agency', 'client'].includes(role)) {
    console.error("Selecciona un rol válido");
    process.exit(2);
  }
  return role as Role;
}
async function setClaim(uid: string, role: Role) {
  return admin
    .auth()
    .setCustomUserClaims(uid, { [role]: true })
}

(async () => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
  const user = await askForUserEmail();
  const role = await askForUserRole();
  setClaim(user.uid, role)
    .then(() => console.info(`Usuario ${user.email} privilegiado con rol ${role}`))
    .catch(err => console.error(err))
})();
