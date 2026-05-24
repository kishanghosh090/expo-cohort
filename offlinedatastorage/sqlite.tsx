import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync("chai.db");
// SQlite Data Types ->
const HomeScreen = () => {
  const [output, setOutput] = useState();

  const createTable = async () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS Users
        (
          id NTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          age INTEGER
        );
    `);
  };

  const insertData = () => {
    db.runSync(
      `
        INSERT INTO Users (name, age) VALUES 
        (?,?)
      `,
      "kishan",
      20,
    );
  };
  const getDatas = () => {
    db.getAllSync(
      `
        SELECT * FROM Users
      `,
    );
  };

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
