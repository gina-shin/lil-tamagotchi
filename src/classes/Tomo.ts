import type { Activity } from "./Activity";
import type { Food } from "./Food";

export class Tomo {
  _x = 0;
  _y = 0;
  el: HTMLElement;

  constructor(element: HTMLElement) {
    // why does this need to be in a constructor?
    this.el = element;
  }

  set x(value: number) {
    this._x = value;
    this.el.style.left = `${value}px`;
  }
  get x() {
    return this._x;
  }

  set y(value: number) {
    this._y = value;
    this.el.style.top = `${value}px`;
  }
  get y() {
    return this._y;
  }

  friendship = 0;
  health = 50;
  happiness = 50;
  isMaxPlayed = false;
  isMaxPet = false;
  state = "sitting";
  hasWater = false;
  hasFood = false;
  energy = 50;
  type = "hippo";

  isMoving = false;

  pet() {
    if (!this.isMaxPet) {
      this.happiness += 1;
    }
  }

  play(activity: Activity) {
    if (!this.isMaxPlayed) {
      this.happiness += activity.happiness;
      this.friendship += activity.friendship;
      this.energy += activity.energy;
    }
  }

  // this doesn't seem to trigger?
  async feed(food: Food) {
    if (this.x <= food.x) {
      this.energy += food.energy;
  
      this.x += (food.x - this.x) / 100
    } else {
      this.x = 0;
    }
  }

  setIsMaxPlayed() {
    // if activity log/memory has last five events is play, then setIsMaxPlayed?
    // should it have a time component??
  }

  setIsMaxPet() {}

  resetTimesPlayed() {}
  resetTimesPet() {}
}