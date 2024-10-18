//Core
import { Movie } from "../../../../../Types/Types"; 

// Types
export default interface FilmSectionProps {
    // title: string;
    viewMoreLink: string;
    mediaType: string;
    data: Movie[];  
    isLoading: boolean; 
    title: string;
  }
  