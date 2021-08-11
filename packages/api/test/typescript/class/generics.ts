class Generic<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export class Test {
  make(gen: Generic<boolean>) {
    return gen.value;
  }
}
