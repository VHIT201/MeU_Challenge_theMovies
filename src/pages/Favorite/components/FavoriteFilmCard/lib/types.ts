import { ComponentProps } from '@/types';
import { MediaType } from '@/types/media/media';

export interface FavoriteCardProps extends ComponentProps {
    id: string;
    backdrop_path: string;
    title: string;
    overview: string;
    genre_names: Array<string | undefined>;
    mediaType: MediaType;
}
