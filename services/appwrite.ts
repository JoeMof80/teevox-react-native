import { Client, Databases, ID, Query } from "react-native-appwrite";
import golfClubs from "../db/seed.json";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const GOLFCLUBS_COLLECTION =
  process.env.EXPO_PUBLIC_APPWRITE_GOLFCLUBS_COLLECTION!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.josmo.teevox");

const databases = new Databases(client);

export async function addGolfClubs() {
  try {
    const promises = golfClubs.map((golfClub) =>
      databases.createDocument(
        DATABASE_ID,
        GOLFCLUBS_COLLECTION,
        ID.unique(),
        golfClub,
      ),
    );

    const createdDocuments = await Promise.all(promises);
    console.log("Created documents:", createdDocuments);
    return createdDocuments;
  } catch (error) {
    console.error("Error creating documents", error);
  }
}

export async function updateGolfClub(golfClub: GolfClub) {
  try {
    let response = await databases.updateDocument(
      DATABASE_ID,
      GOLFCLUBS_COLLECTION,
      golfClub.$id,
      { selected: !golfClub.selected },
    );

    console.log("Updated documents:", response);
    return response as unknown as GolfClub;
  } catch (error) {
    console.error("Error creating documents", error);
  }
}

export async function getGolfClubs() {
  try {
    let response = await databases.listDocuments(
      DATABASE_ID,
      GOLFCLUBS_COLLECTION,
      [Query.limit(50), Query.orderAsc("order")],
    );

    console.log("Fetched documents:", response.documents);
    return response.documents as unknown as GolfClub[];
  } catch (error) {
    console.error("Error creating documents", error);
  }
}
