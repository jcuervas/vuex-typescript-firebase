import { spawn } from 'child_process'
const readline = require("readline");

function spawnProcess (cmd: string, args: string[] = []) {
  return new Promise<void>((resolve, reject) => {
    const childProcess = spawn(cmd, args)
    childProcess.on('stdout', resolve)
    childProcess.on('stderr', err => {
      console.error('[spawn] child errored:', err)
      reject()
    })
    childProcess.stdout.on('data', (data: any) => {
      console.info('[spawn] stdout:', data.toString().replace(/\s+$/g, ''))
    })
    childProcess.stderr.on('error', error => console.error('[spawn] stderr:', error.toString().replace(/\s+$/g, '')))
  })
}

function askForInput(message: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(message, (answer: string) => {
      rl.on('close', () => resolve(answer));
      rl.close()
    })
  })
}

export default {
  spawnProcess,
  askForInput
}
