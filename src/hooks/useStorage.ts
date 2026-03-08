import { openDB, type IDBPDatabase } from 'idb';
import type { YearCompassData, Photo } from '../types/yearCompass';

const DB_NAME = 'yearcompass-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('compass-data')) {
          db.createObjectStore('compass-data', { keyPath: 'year' });
        }
        if (!db.objectStoreNames.contains('photos')) {
          const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
          photoStore.createIndex('sectionId', 'sectionId', { unique: false });
          photoStore.createIndex('year', 'year', { unique: false });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveCompassData(data: YearCompassData): Promise<void> {
  const db = await getDB();
  await db.put('compass-data', data);
}

export async function loadCompassData(year: number): Promise<YearCompassData | undefined> {
  const db = await getDB();
  return db.get('compass-data', year);
}

export async function getAllYears(): Promise<number[]> {
  const db = await getDB();
  const all = await db.getAll('compass-data');
  return all.map((d: YearCompassData) => d.year).sort((a, b) => b - a);
}

export async function savePhoto(photo: Photo & { year: number }): Promise<void> {
  const db = await getDB();
  await db.put('photos', photo);
}

export async function loadPhotosForYear(year: number): Promise<Photo[]> {
  const db = await getDB();
  const index = db.transaction('photos').store.index('year');
  return index.getAll(year);
}

export async function deletePhoto(photoId: string): Promise<void> {
  const db = await getDB();
  await db.delete('photos', photoId);
}
