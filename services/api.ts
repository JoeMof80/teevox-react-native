export const GOLF_COURSE_CONFIG = {
  BASE_URL: "https://api.golfcourseapi.com",
  API_KEY: process.env.EXPO_PUBLIC_GOLF_COURSE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Key ${process.env.EXPO_PUBLIC_GOLF_COURSE_API_KEY}`,
  },
};

export const fetchGolfCourses = async ({
  query,
}: {
  query: string;
}): Promise<GolfCourse[]> => {
  const endpoint = `${
    GOLF_COURSE_CONFIG.BASE_URL
  }/v1/search?search_query=${encodeURIComponent(query)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: GOLF_COURSE_CONFIG.headers,
  });

  console.log("Response:", response);

  if (!response.ok) {
    console.log("Failed to fetch golf courses:", response.status);
    // @ts-ignore
    throw new Error("Failed to fetch golf courses", response.statusText);
  }
  console.log("Golf courses fetched");

  const data = await response.json();
  return data.courses;
};
