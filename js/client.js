const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var audio = new Audio('audio.mp3');
const append=(message,position) =>{
    const ele=document.createElement('div');
    ele.innerText=message;
    ele.classList.add('msg');
    ele.classList.add(position);
    messageinput.val="";
    messagecontainer.append(ele);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    append(`you :${messageinput.value}`,'right');
    socket.emit('send',messageinput.value);
})
const Name=prompt("enter your name to join chat");
// append(`${Name} joined the chat`,'right');
socket.emit('new-user-joined',Name);
socket.on('user-joined',Name =>{
    append(`${Name} joined the chat`,'right');
})
socket.on('recieve',data =>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on('left',data =>{
    append(`oops ${data} left the chat`,'right');
})

