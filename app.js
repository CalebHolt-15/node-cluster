const cluster = require("cluster")
const express = require("express")
const os = require("os")
const numCPUs = require("os").cpus().length

const app = express()

const numOfCpu = os.cpus().length
// console.log("numOfCpu:", numOfCpu)

app.get("/", (req, res) => {
  for (let i = 0; i < 1e8; i++) {
    ///
  }
  res.send(`Ok... response from ${process.pid}`)
})

//if (MasterProcess) => create new workerProcess as many as the no of cpus present in our processor
if (cluster.isMaster) {
  console.log("master")
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork() //will create new workerProcess//use child processes .fork()
  }
} else {
  // it is a worker process already
  // diffr workers shares the same port
  //diffr pid for each worker
  app.listen(3000, () =>
    console.log(`server ${process.pid} started at port: 3000`)
  )
}

// app.listen(3000, () => console.log("server started at port: 3000"))
