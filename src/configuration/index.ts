interface EnvConfig {
    devEndPoint: string;
    prodEndPoint?: string;
}

const envConfig: EnvConfig = {
    devEndPoint: 'https://api.themoviedb.org/3/',
    prodEndPoint: 'https://api.themoviedb.org/3/',
};

const avatarPath = 'https://image.tmdb.org/t/p/w150_and_h150_face';
const imgPath = 'https://image.tmdb.org/t/p/w500';
const backDropPath = 'https://image.tmdb.org/t/p/original//';

const Config = {
    envConfig,
    avatarPath,
    imgPath,
    backDropPath,
};

export default Config;
