import { ComponentProps } from '@/types';

export interface FilmItemProps extends ComponentProps {
    id: number;
    name: string;
    title: string;
    poster_path: string;
    media_type: string;
}
