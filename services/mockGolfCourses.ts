import { fetchGolfCourses } from "./api";

export const USE_MOCK_DATA = false;

export const MOCK_GOLF_COURSES: GolfCourse[] = [
  {
    id: 1,
    club_name: "Mock Portal Club",
    course_name: "Mock Portal Course",
    location: {
      address: "123 Mock Lane",
      city: "Mock City",
      state: "MC",
      country: "Mockland",
      latitude: 40.7128,
      longitude: -74.006,
    },
    tees: {
      female: [],
      male: [
        {
          tee_name: "Blue",
          course_rating: 72.5,
          slope_rating: 130,
          bogey_rating: 98.0,
          total_yards: 6500,
          total_meters: 5944,
          number_of_holes: 18,
          par_total: 72,
          front_course_rating: 36.2,
          front_slope_rating: 128,
          front_bogey_rating: 49.0,
          back_course_rating: 36.3,
          back_slope_rating: 132,
          back_bogey_rating: 49.0,
          holes: [{ par: 4, yardage: 400, handicap: 5 }],
        },
      ],
    },
  },
];

export const MOCK_RECENT_COURSES: GolfCourse[] = [
  {
    id: 2,
    club_name: "Mock Hill Valley Club",
    course_name: "Mock Hill Valley Course",
    location: {
      address: "456 Valley Rd",
      city: "Hill Valley",
      state: "HV",
      country: "Mockland",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    tees: {
      female: [],
      male: [
        {
          tee_name: "Red",
          course_rating: 70.0,
          slope_rating: 125,
          bogey_rating: 95.0,
          total_yards: 6200,
          total_meters: 5670,
          number_of_holes: 18,
          par_total: 71,
          front_course_rating: 35.0,
          front_slope_rating: 123,
          front_bogey_rating: 47.5,
          back_course_rating: 35.0,
          back_slope_rating: 127,
          back_bogey_rating: 47.5,
          holes: [{ par: 5, yardage: 500, handicap: 1 }],
        },
      ],
    },
  },
];

export const fetchFn = (query: string) => async () => {
  if (USE_MOCK_DATA) {
    return new Promise<GolfCourse[]>((resolve, reject) => {
      setTimeout(() => {
        if (query.toLowerCase() === "fail") {
          console.log("Mock rejecting for:", query);
          reject(new Error("Mock fetch failed"));
        } else {
          resolve(MOCK_GOLF_COURSES);
        }
      }, 2000);
    });
  }
  return fetchGolfCourses({ query });
};

export const fetchRecentCourses = async () => {
  if (USE_MOCK_DATA) {
    return new Promise<GolfCourse[]>((resolve) => {
      setTimeout(() => {
        console.log("Fetching mock recent courses");
        resolve(MOCK_RECENT_COURSES);
      }, 2000);
    });
  }
  return fetchGolfCourses({ query: "recent" });
};
