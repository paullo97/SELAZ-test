import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {
  constructor() { }

  setItem(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error storing data for key ${key}: ${error}`);
    }
  }

  getItem(key: string): T | null {
    const serializedData = localStorage.getItem(key);
    if (serializedData) {
      try {
        return JSON.parse(serializedData);
      } catch (error) {
        console.error(`Error retrieving data for key ${key}: ${error}`);
      }
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

    /**
   * Remove um item de uma lista armazenada no localStorage com base em um identificador único.
   * @param key Chave do localStorage onde a lista está armazenada.
   * @param id Identificador do item a ser removido.
   */
    removeItemArray(key: string, id: any): void {
      const list = this.getItem(key);

      // Verifica se a lista existe e é um array
      if (Array.isArray(list)) {
        // Filtra a lista para remover o item com o identificador fornecido
        const updatedList = list.filter((item: any) => item.id !== id);

        // Atualiza o localStorage com a lista filtrada
        this.setItem(key, updatedList as T);
      }
    }
}
