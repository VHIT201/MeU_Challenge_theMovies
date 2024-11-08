import { Link } from 'react-router-dom';
import ProfileInfo from './components';

const ProfilePage = () => {
    return (
        <main className="w-full flex flex-col items-center justify-start">
            <ProfileInfo />
        </main>
    );
};

export default ProfilePage;
