export interface FilmSlideProps {
    id?: number;
    title: string | undefined;
    description: string | undefined;
    backgroundImage?: string;
    posterImage?: string | undefined;
    media_type?: string;
    onWatchNow: () => void; // Change this to a function prop
    onWatchTrailer?: () => void; // Keep this as is
  }