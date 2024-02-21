const WebSocket=require('ws');
const express=require('express');
const app=express();

let server=app.listen(3000,()=>{
    console.log("Server is running on port number 3000");
})

let clientArray=[];
let wss=new WebSocket.Server({server:server});


wss.on('connection',(client)=>{
    clientArray.push(client);
    console.log("new client connected")
    client.on('message',(msg)=>{
        clientArray.forEach((client)=>{
            client.send(msg.toString())
        })
    })
})
  