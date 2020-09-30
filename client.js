const socket=io('http://localhost:80');
const form=document.getElementById('send-container');
const messageinput=document.getElementById('message');
const messagecontainer=document.querySelector('.container');
var audio=new Audio('ting.mp3');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const messageinput=message.value;
    append(`You: ${messageinput}`,'right');
    socket.emit('send',messageinput);
    message.value='';
});
const name=prompt("Enter your name")
socket.emit('new-user-joined',name);
function append(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left'){
    audio.play();
    };
}
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
});
socket.on('user-left', name=>{
    append(`${name} left the chat`,'left');
});

