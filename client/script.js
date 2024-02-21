const socket = new WebSocket('ws://localhost:3000');

let name = prompt("Enter Your name")
// console.log(name);
document.getElementById('username').textContent=name;
socket.onopen = function () {
    sendmessage();
}

function sendmessage() {
    const button = document.getElementById('btn');
    button.addEventListener('click', () => {

        let text = document.getElementById('textbox').value;
        socket.send(JSON.stringify({ text, name }));
        document.getElementById('textbox').value = ""
    })
}

socket.onmessage = function (msg) {
    let obj = JSON.parse(msg.data);

    if (obj.name === name) {

        let list = `<div class="right-box">
          <li class="right-text">
              <p>${obj.text}</p>
              <em>You</em>
          </li>
      </div>`
        let div = document.createElement('div');
        div.innerHTML = list;
        document.getElementById('ctbox').appendChild(div)
        document.getElementById('ctbox').scrollTop=document.getElementById('ctbox').scrollHeight
    }
    else {
        let list = `<li class="left-text">
        <p>${obj.text}</p>
        <em>${obj.name}</em>
        </li>`
        let div = document.createElement('div');
        div.innerHTML = list;
        document.getElementById('ctbox').appendChild(div)
        document.getElementById('ctbox').scrollTop=document.getElementById('ctbox').scrollHeight

    }


}
