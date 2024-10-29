import { Movie } from "../../../types";


export interface SwiperData {
    title: string;
    data: Movie[];
    viewMoreLink: string;
    media_type: string;
    isLoading: boolean
  }
