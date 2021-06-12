var inc = 1000;


function clock() {
  var date = new Date();


  var hours = ((date.getHours() + 11) % 12 + 1);
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  
  var hour = hours * 30;
  var minute = minutes * 6;
  var second = seconds * 6;
  
  document.querySelector('.hour').style.transform = `rotate(${hour}deg)`;
  document.querySelector('.minute').style.transform = `rotate(${minute}deg)`;
  document.querySelector('.second').style.transform = `rotate(${second}deg)`;
}

setInterval(clock, inc);