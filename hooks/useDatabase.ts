import { useState, useEffect, useCallback } from "react";
import * as SQLite from "expo-sqlite";

// Singleton database instance
let dbInstance: SQLite.SQLiteDatabase | null = null;

export const useDatabase = (
  initialData: {
    category: string;
    label: string;
    name: string;
    selected: boolean;
  }[],
) => {
  const [records, setRecords] = useState<any[]>([]); // Raw records from DB
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize database
  const initializeDatabase = useCallback(async () => {
    if (dbInstance) {
      return dbInstance; // Reuse existing instance
    }

    try {
      dbInstance = await SQLite.openDatabaseAsync("teevox.db");

      // Check if table exists
      let tableExists = false;
      try {
        await dbInstance.getFirstAsync("SELECT 1 FROM golfclubs LIMIT 1");
        tableExists = true;
      } catch (error) {
        tableExists = false;
      }

      // Setup table and insert initial data if needed
      if (!tableExists) {
        await dbInstance.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS golfclubs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            label TEXT NOT NULL,
            name TEXT NOT NULL,
            selected INTEGER DEFAULT 0
          );
        `);
        console.log("Database and table initialized successfully");

        await insertMultipleRecords(dbInstance, initialData);
      }

      return dbInstance;
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }, [initialData]); // Dependency on initialData

  // Insert multiple records
  const insertMultipleRecords = async (
    db: SQLite.SQLiteDatabase,
    records: {
      category: string;
      label: string;
      name: string;
      selected: boolean;
    }[],
  ) => {
    try {
      await db.withTransactionAsync(async () => {
        for (const record of records) {
          await db.runAsync(
            "INSERT INTO golfclubs (category, label, name, selected) VALUES (?, ?, ?, ?)",
            [
              record.category,
              record.label,
              record.name,
              record.selected ? 1 : 0,
            ],
          );
        }
      });
      console.log("Multiple records inserted successfully");
    } catch (error) {
      console.error("Error inserting multiple records:", error);
      throw error;
    }
  };

  // Fetch all records
  const getAllRecords = useCallback(async (db: SQLite.SQLiteDatabase) => {
    try {
      const allRecords = await db.getAllAsync("SELECT * FROM golfclubs");
      return allRecords;
    } catch (error) {
      console.error("Error fetching records:", error);
      throw error;
    }
  }, []);

  // Update selected value
  const updateSelected = useCallback(async (id: number, selected: boolean) => {
    if (!dbInstance) {
      throw new Error("Database not initialized");
    }
    try {
      const result = await dbInstance.runAsync(
        "UPDATE golfclubs SET selected = ? WHERE id = ?",
        [selected ? 1 : 0, id],
      );
      console.log("Selected value updated, changes affected:", result.changes);
      // Refresh records after update
      const updatedRecords = await getAllRecords(dbInstance);
      setRecords(updatedRecords);
      return result.changes as number;
    } catch (error) {
      console.error("Error updating selected value:", error);
      throw error;
    }
  }, []);

  // New function to drop the table
  const dropTable = useCallback(async () => {
    if (!dbInstance) {
      throw new Error("Database not initialized");
    }
    try {
      await dbInstance.execAsync("DROP TABLE IF EXISTS golfclubs");
      console.log("Golfclubs table dropped successfully");
      // After dropping, reinitialize to recreate the table and insert initial data
      await initializeDatabase();
      const updatedRecords = await getAllRecords(dbInstance);
      setRecords(updatedRecords);
    } catch (error) {
      console.error("Error dropping table:", error);
      throw error;
    }
  }, [initializeDatabase]);

  // Setup effect
  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      try {
        const db = await initializeDatabase();
        const allRecords = await getAllRecords(db);
        if (isMounted) {
          setRecords(allRecords);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Database setup failed:", error);
      }
    };

    setup();

    return () => {
      isMounted = false;
      // Optional: Only close if explicitly needed
      // if (dbInstance) {
      //   dbInstance.closeAsync().then(() => (dbInstance = null));
      // }
    };
  }, [initializeDatabase, getAllRecords]);

  return {
    db: dbInstance,
    records,
    updateSelected,
    dropTable,
    isInitialized,
  };
};
