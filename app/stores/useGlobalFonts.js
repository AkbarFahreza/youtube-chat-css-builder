import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoogleFonts = create(
  persist(
    (set) => ({
      fonts: [],
      isLoaded: false,
      setFonts: (fonts) => set({ fonts, isLoaded: true }),
    }),
    {
      name: "google-fonts-cache", // localStorage key
    }
  )
);
