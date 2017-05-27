
var fun = false;

const load = () => {
  document.getElementsByClassName('fun-time-button')[0].addEventListener('click', () => makeFun())
}

window.onload = load

function makeFun() {
  console.log('making fun');
  if (fun) {
    document.getElementsByTagName('body')[0].classList.remove('fun');
    fun = false;
  } else {
    document.getElementsByTagName('body')[0].classList.add('fun');
    fun = true;
  }
}
