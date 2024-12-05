export * from "./components";

export type JSONPrimitive = string | number | boolean | Date | null;
export type JSONObject<T> = { [key: string]: JSONValue<T> };
export type JSONInterface<T> = { [P in keyof T]: JSONValue<T[P]> };
export type JSONArray<T> = JSONValue<T>[];
export type JSONValue<T> = JSONPrimitive | JSONObject<T> | JSONInterface<T> | JSONArray<T>;

// stub, subbed out during build process
export function useValue<T extends JSONValue<T>>(name: string): T | undefined {
    return undefined;
}

export { MarginBox } from './components/MarginBox';
export type { MarginBoxPosition } from './components/MarginBox';

