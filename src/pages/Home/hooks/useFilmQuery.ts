// Core
import { useQuery } from '@tanstack/react-query';

// Internal
import { getFilmList } from '@/services/media';
import { FeatureType, MediaType } from '@/types/media/media';

export const useFilmQuery = (type: FeatureType, mediaType: MediaType) => {
    return useQuery({
        queryKey: [type, mediaType],
        queryFn: () => getFilmList({ type, mediaType }),
    });
};
