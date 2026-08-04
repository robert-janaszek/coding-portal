export class LRUCache {
  private data: Map<number, number>;
  private size: number = 0;

  constructor(private capacity: number) {
    this.data = new Map();
  }

  get(key: number): number {
    const value = this.data.get(key);
    if (value !== undefined) {
      this.data.delete(key);
      this.data.set(key, value);
    }
    return value ?? -1;
  }
  
  put(key: number, value: number): void {
    if (!this.data.has(key)) {
      if (this.size + 1 > this.capacity) {
        const oldest = this.getOldestKey();
        this.data.delete(oldest);
      } else {
        this.size++;
      }
    }

    if (this.data.has(key)) {
      this.data.delete(key);
    }

    this.data.set(key, value);
  }

  private getOldestKey(): number {
    for (const d of this.data) {
      return d[0];
    }

    return -1;
  }
}
