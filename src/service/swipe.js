export default function swipetd() {
  const swipeli = document.querySelectorAll('.clearstyle .ivu-table-row');
  for (let i = 0; i < swipeli.length; i++) {
    const newtd = document.createElement('td');
    let currentswipe;
    newtd.style.height = '48px';
    newtd.style.display = 'none';
    newtd.style.backgroundColor = 'red';
    swipeli[i].appendChild(newtd);
    swipeli[i].addEventListener('touchstart', (event) => {
      currentswipe = event.changedTouches[0].clientX;
    }, { passive: false });
    swipeli[i].addEventListener('touchmove', (event) => {
      swipeli[i].lastChild.style.display = '';
      swipeli[i].lastChild.innerHTML = '<div style="color: white; text-align: center" class="">删除</div>';
      const eventmove = currentswipe - event.touches[0].clientX;
      const eventend = swipeli[i].lastChild.lastChild.style.width + eventmove;
      if (eventend > 60) {
        swipeli[i].lastChild.lastChild.style.width = '60px';
      } else if (eventend < -60) {
        swipeli[i].lastChild.lastChild.style.display = 'none';
      } else if (eventend > -60) {
        swipeli[i].lastChild.lastChild.style.display = '';
        swipeli[i].lastChild.lastChild.style.width = `${swipeli[i].lastChild.lastChild.style.width + eventmove}px`;
      }
      // currentswipe = event.touches[0].clientX;
    }, { passive: false });
    swipeli[i].addEventListener('touchend', (event) => {
    }, { passive: false });
  }
}
