export class Activity {
  energy = 0;
  happiness = 0;
  friendship = 0;

  constructor(energy: number, happiness: number, friendship: number) {
    this.energy = energy;
    this.happiness = happiness;
    this.friendship = friendship;
  }
}

export class Sleep extends Activity {
  constructor() {
    super(-100, -100, -100);
  }
}

export class Pacing extends Activity {
  constructor() {
    super(-10, -10, -10);
  }
}

export class Rolling extends Activity {
  constructor() {
    super(-10, -10, -10);
  }
}

export class Sitting extends Activity {
  constructor() {
    super(-1, -1, -1);
  }
}

export class Soccer extends Activity {
  constructor() {
    super(-10, 50, 50);
  }
}

export class Fetch extends Activity {
  constructor() {
    super(-10, 10, 10);
  }
}