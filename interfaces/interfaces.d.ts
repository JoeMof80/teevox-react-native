interface GolfClub {
  $id: string;
  label: string;
  name: string;
  category: string;
  order: number;
  selected: boolean;
}

interface GolfBall {
  $id: string;
  manufacturer: string;
  name: string;
  [key: string]: any;
}

interface GolfCourseLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Hole {
  par: number;
  yardage?: number;
  handicap?: number;
}

interface Tee {
  tee_name: string;
  course_rating?: number;
  slope_rating?: number;
  bogey_rating?: number;
  total_yards?: number;
  total_meters?: number;
  number_of_holes: number;
  par_total?: number;
  front_course_rating?: number;
  front_slope_rating?: number;
  front_bogey_rating?: number;
  back_course_rating?: number;
  back_slope_rating?: number;
  back_bogey_rating?: number;
  holes: Hole[];
}

interface Tees {
  female: Tee[];
  male: Tee[];
}

interface GolfCourse {
  id: number;
  club_name: string;
  course_name: string;
  location?: GolfCourseLocation;
  tees: Tees;
}

const exampleCourse: GolfCourse = {
  id: 99,
  club_name: "Murray Golf Club",
  course_name: "Course No. 1",
  location: {
    address: "124 Golf Course Lane, Murray, KY 42071, USA",
    city: "Murray",
    state: "KY",
    country: "United States",
    latitude: 39.621742,
    longitude: -80.34734,
  },
  tees: {
    female: [
      {
        tee_name: "Blue",
        course_rating: 75.7,
        slope_rating: 132,
        bogey_rating: 106.7,
        total_yards: 6348,
        total_meters: 5805,
        number_of_holes: 18,
        par_total: 73,
        front_course_rating: 37.6,
        front_slope_rating: 134,
        front_bogey_rating: 53.4,
        back_course_rating: 38.1,
        back_slope_rating: 129,
        back_bogey_rating: 53.3,
        holes: [
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
        ],
      },
    ],
    male: [
      {
        tee_name: "Blue",
        course_rating: 75.7,
        slope_rating: 132,
        bogey_rating: 106.7,
        total_yards: 6348,
        total_meters: 5805,
        number_of_holes: 18,
        par_total: 73,
        front_course_rating: 37.6,
        front_slope_rating: 134,
        front_bogey_rating: 53.4,
        back_course_rating: 38.1,
        back_slope_rating: 129,
        back_bogey_rating: 53.3,
        holes: [
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
          { par: 4, yardage: 484, handicap: 9 },
          { par: 3, yardage: 189, handicap: 17 },
          { par: 5, yardage: 587, handicap: 2 },
        ],
      },
    ],
  },
};

interface Round {
  courseId: Int;
  holes: Hole[];
  gender: String;
  tee: String;
  start: Date;
  end?: Date;
}

interface Hole {
  strokes: Stroke[];
  par: Int;
  start: Date;
  end?: Date;
}

interface Stroke {
  club?: Club;
  distance?: Int;
  end?: Date;
}

interface Item {
  id: string;
  label: string;
}

interface ConcatenatedBall {
  id: string;
  label: string;
}
