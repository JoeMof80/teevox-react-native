import React, { createContext, useContext, useState } from "react";

interface PlayContextType {
  selectedCourse: GolfCourse | null;
  selectedBallType: string | null;
  selectedBallNumber: number | null;
  selectedGender: string | null;
  selectedTee: string | null;
  setSelectedCourse: (course: GolfCourse | null) => void;
  setSelectedBallType: (ballType: string | null) => void;
  setSelectedBallNumber: (ballNumber: number | null) => void;
  setSelectedGender: (tee: string | null) => void;
  setSelectedTee: (tee: string | null) => void;
}

const PlayContext = createContext<PlayContextType | undefined>(undefined);

export const PlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
  const [selectedBallType, setSelectedBallType] = useState<string | null>(null);
  const [selectedBallNumber, setSelectedBallNumber] = useState<number | null>(
    null,
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedTee, setSelectedTee] = useState<string | null>(null);

  return (
    <PlayContext.Provider
      value={{
        selectedCourse,
        selectedBallType,
        selectedBallNumber,
        selectedGender,
        selectedTee,
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

export const useGolfContext = () => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("useGolfContext must be used within a GolfProvider");
  }
  return context;
};
