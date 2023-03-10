export type id = string | number;

export interface BasicRepo<T> {
    get: (id: id) => Promise<T>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: id, data: Partial<T>) => Promise<T>;
}

export interface UserRepo<T> extends BasicRepo<T> {
    find: (data: Partial<T>) => Promise<T>;
    destroy: (id: id) => Promise<{ id: id }>;
}

export interface GamesRepo<T> extends BasicRepo<T> {
    getAll: () => Promise<Array<T>>;
    query: (key: string, value: string) => Promise<Array<T>>;
    delete: (id: id) => Promise<id>;
}
