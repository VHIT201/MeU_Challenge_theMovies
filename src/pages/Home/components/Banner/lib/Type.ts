import { SwiperData } from "../../../lib/types";
// Component Props
export interface HeaderSwiperProps {
    swipersData: SwiperData[];
    onWatchNow: (id: number) => void;
    onWatchTrailer: (id: number) => void;
  }
  