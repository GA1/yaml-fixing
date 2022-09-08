const fs = require('fs')

function getLines(filePath) {
  const text = fs.readFileSync(filePath,'utf8')
  return text.split('\n').filter(line => line !== '\n' && line !== '')
}

function saveString(filePath, stringToSave) {
  fs.writeFile(filePath, stringToSave, (error) => {
    if (error) {
      console.log('ERROR: ' + error)
    } else {
      console.log('SUCCESS SAVING FILE AS: ' + filePath)
    }
  })
}

const lines = getLines('./input.yaml')
// const lines = getLines('./csharp-testing.pt_BR.yaml')
const result = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]


  const lineWithoutWhiteSpace = line.replace(/\s/g, "");
  console.log(line)
  if(lineWithoutWhiteSpace === '-'){
    // do nothing
  } else if(line.includes('type:')){
    result.push(line.replace("type:", "- type:"))
  } else if(line.includes('title:')){
    const lineToPush = line.replace("title: ", "  title: \"") + "\""
    result.push(lineToPush)
  } else if(line.includes('link:')){
    result.push(line.replace("link:", "  link:"))
  } else {
    result.push(line)
  }
}

// console.log(result.join('\n'))
saveString('result.txt', result.join('\n'))

