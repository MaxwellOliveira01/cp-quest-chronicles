
export abstract class BaseService<T extends { id: number }> {
  protected items: T[] = [];

  getAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find(item => item.id === parseInt(id));
  }

  add(item: Omit<T, 'id'>): T {
    const newItem = { ...item, id: Date.now() } as T;
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, updates: Partial<T>): T | null {
    const index = this.items.findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...updates };
    return this.items[index];
  }

  delete(id: string): boolean {
    const index = this.items.findIndex(item => item.id === parseInt(id));
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  protected setItems(items: T[]): void {
    this.items = items;
  }
}
