import React, { createContext, useContext, useState } from "react";

interface PlayContextType {
  liveRound: Round | null;
  selectedCourse: GolfCourse | null;
  selectedBallType: string | null;
  selectedBallNumber: number | null;
  selectedGender: "male" | "female" | null;
  selectedTee: string | null;
  setLiveRound: (round: Round | null) => void;
  setSelectedCourse: (course: GolfCourse | null) => void;
  setSelectedBallType: (ballType: string | null) => void;
  setSelectedBallNumber: (ballNumber: 1 | 2 | 3 | 4 | null) => void;
  setSelectedGender: (gender: "male" | "female" | null) => void;
  setSelectedTee: (tee: string | null) => void;
}

const PlayContext = createContext<PlayContextType | undefined>(undefined);

export const PlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liveRound, setLiveRound] = useState<Round | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
  const [selectedBallType, setSelectedBallType] = useState<string | null>(null);
  const [selectedBallNumber, setSelectedBallNumber] = useState<
    1 | 2 | 3 | 4 | null
  >(null);
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | null
  >(null);
  const [selectedTee, setSelectedTee] = useState<string | null>(null);

  return (
    <PlayContext.Provider
      value={{
        liveRound,
        selectedCourse,
        selectedBallType,
        selectedBallNumber,
        selectedGender,
        selectedTee,
        setLiveRound,
        setSelectedCourse,
        setSelectedBallType,
        setSelectedBallNumber,
        setSelectedGender,
        setSelectedTee,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("useGolfContext must be used within a GolfProvider");
  }
  return context;
};
