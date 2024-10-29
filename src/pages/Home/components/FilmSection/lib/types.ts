//Core
import { Movie } from "../../../../../types"; 

// Types
export default interface FilmSectionProps {
    // title: string;
    viewMoreLink: string;
    mediaType: string;
    data: Movie[];  
    isLoading: boolean; 
    title: string;
  }
  