import { Berry } from './classes/Food'
import { Tomo } from './classes/Tomo'

import './style.css'

/**
  1. Pet should have a hunger meter and a friendship meter (maybe 5 counts each)
  2. User can water and feed the pet to grow health meter
  3. User can pet or play with the pet to grow the friendship meter (but can't repeat one action too many times)
  4. Pet should have state of sleeping or awake
  5. Pet should move when awake (states? Pacing, rolling, sitting)
  6. Pet should decrease happiness bars and hunger meter over time
**/

const allElements = document.querySelectorAll('[class]')
const elements: Record<string, HTMLElement> = {}
for (let i = 0; i < allElements.length; i++) {
  const domEl = allElements[i]
  const name = domEl.classList[0]

  if (name != null) {
    elements[name] = domEl as HTMLElement
  }
}
elements.berry1 = document.getElementById('berry1')!
elements.berry2 = document.getElementById('berry2')!


// to support debouncing pets? Should this be in pets?
// class Memory {
// 	event: 'pet' | 'play'
// 	timestamp: Date
// }

const tomo = new Tomo(elements.tomo);
const berry1 = new Berry(elements.berry1);
const berry2 = new Berry(elements.berry2);
const actions = {
  feed: false,
}

tomo.x = 0
berry1.x = innerWidth / 2
berry1.y = 50
berry2.x = 200
berry2.y = 100

berry2.el.style.backgroundColor = 'blue'
berry2.el.style.scale = '1.3 1.3';
berry2.el.style.rotate = '23deg';
berry2.el.style.borderRadius = '500px'

elements['feed-button'].addEventListener('click', () => {
  console.log('feed button clicked');
  actions.feed = true;
});

// we don't need to use zeno
// ALL animations should be done in the loop

const loop = () => {
  if (actions.feed) {
    // separate the logic of the animation from the logic of the action
    tomo.feed(berry1); // this is starting all over again over and over
  }

  requestAnimationFrame(loop);
}

loop();

