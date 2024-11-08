import { PenSquareIcon } from '@/components';
import Dialog, { DialogContent } from '@/components/Dialog';
import useThemeStore from '@/store/themeStore';
import { cn } from '@/utils';
import ProfileUpdateForm from './ProfileUpdateForm';

const ProfileInfo = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <div className={cn(isDarkMode && 'dark', 'w-full bg-white-main dark:bg-black-main')}>
            <div className="px-16">
                <div
                    className="relative min-h-[450px] bg-cover bg-center bg-no-repeat rounded-b-3xl"
                    style={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?cs=srgb&dl=pexels-packermann-1666021.jpg&fm=jpg)',
                    }}
                ></div>
                <div className="w-full h-52 bottom-0 flex space-x-4 px-4 bg-transparent">
                    <div className="w-52">
                        <div className="relative mb-16 w-52">
                            <div className="absolute -top-24 left-0 w-52 h-52 p-2 rounded-full bg-white-main dark:bg-black-main">
                                <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-left space-y-4 px-2 py-4">
                        <div className="flex items-center space-x-8">
                            <h3
                                className={cn(
                                    isDarkMode && 'dark',
                                    'text-4xl text-black dark:text-white font-semibold',
                                )}
                            >
                                Yoe Mase
                            </h3>
                            <Dialog>
                                <PenSquareIcon
                                    className="transition-colors duration-150 cursor-pointer hover:text-slate-300 dark:text-white-main"
                                    width="20px"
                                    height="20px"
                                />
                                <DialogContent className="w-auto">
                                    <ProfileUpdateForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div
                            className={cn(
                                isDarkMode && 'dark',
                                'text-md font-medium break-work text-black dark:text-white',
                            )}
                        >
                            Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in,
                            the duo
                        </div>
                    </div>
                    <div className="min-w-[500px] flex items-center space-x-2">
                        <div className="flex justify-center items-center">
                            <div className="w-16 h-16 flex justify-center items-center p-4 text-lg font-bold rounded-full bg-gray-300 dark:bg-[#333333]">
                                <p className='relative text-black dark:text-white after:content-["%"] after:absolute after:-top-2 after:-right-2 after:text-[10px]'>
                                    56
                                </p>
                            </div>
                            <div className="text-xl text-black dark:text-white font-semibold">Average Movie Score</div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="w-16 h-16 flex justify-center items-center p-4 text-lg font-bold rounded-full bg-gray-300 dark:bg-[#333333]">
                                <p className='relative text-black dark:text-white after:content-["%"] after:absolute after:-top-2 after:-right-2 after:text-[10px]'>
                                    0
                                </p>
                            </div>
                            <div className="text-xl text-black dark:text-white font-semibold">Average TV Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
