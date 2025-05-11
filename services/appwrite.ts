import { Client, Databases, ID, Query } from "react-native-appwrite";
import golfClubs from "../db/seed.json";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const GOLFCLUB_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_GOLFCLUB_COLLECTION_ID!;
const GOLFBALL_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_GOLFBALL_COLLECTION_ID!;
const GOLFCOURSE_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_GOLFCOURSE_COLLECTION_ID!;

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
        GOLFCLUB_COLLECTION_ID,
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
      GOLFCLUB_COLLECTION_ID,
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
      GOLFCLUB_COLLECTION_ID,
      [Query.limit(50), Query.orderAsc("order")],
    );

    console.log("Fetched documents:", response.documents);
    return response.documents as unknown as GolfClub[];
  } catch (error) {
    console.error("Error creating documents", error);
  }
}

export async function getGolfBalls() {
  try {
    let response = await databases.listDocuments(
      DATABASE_ID,
      GOLFBALL_COLLECTION_ID,
      [Query.limit(50), Query.orderAsc("manufacturer"), Query.orderAsc("name")],
    );

    console.log("Fetched documents:", response.documents);
    return response.documents as unknown as GolfBall[];
  } catch (error) {
    console.error("Error creating documents", error);
  }
}

export async function createGolfCourse(golfCourse: GolfCourse) {
  try {
    const document = await databases.createDocument(
      DATABASE_ID,
      GOLFCOURSE_COLLECTION_ID,
      ID.unique(),
      {
        club_name: golfCourse.club_name,
        course_name: golfCourse.course_name,
        location: golfCourse.location
          ? JSON.stringify(golfCourse.location)
          : undefined,
        tees: JSON.stringify(golfCourse.tees),
      },
    );
    console.log("Golf Course created:", document.$id);
    return document;
  } catch (error) {
    console.error("Error creating Golf Course:", error);
    throw error;
  }
}

export async function getGolfCourses(): Promise<GolfCourse[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      GOLFCOURSE_COLLECTION_ID,
      [Query.limit(100)],
    );
    console.log("Fetched Golf Courses:", response.documents.length);
    console.log("Documents", response.documents);
    return response.documents.map((doc) => ({
      id: doc.id,
      club_name: doc.club_name,
      course_name: doc.course_name,
      location: doc.location ? JSON.parse(doc.location) : undefined,
      tees: JSON.parse(doc.tees),
    })) as GolfCourse[];
  } catch (error) {
    console.error("Error fetching Golf Courses:", error);
    throw error;
  }
}
