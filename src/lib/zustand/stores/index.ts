import { create } from "zustand";

interface ContactModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

interface RoadmapModalStore {
  isModalOpen: boolean;
  activeCityId: string | null;
  openModal: (cityId: string) => void;
  closeModal: () => void;
}

export const useRoadmapModalStore = create<RoadmapModalStore>((set) => ({
  isModalOpen: false,
  activeCityId: null,
  openModal: (cityId: string) => set({ isModalOpen: true, activeCityId: cityId }),
  closeModal: () => set({ isModalOpen: false, activeCityId: null }),
}));
