import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginUser, getInformation } from '@/services/user';
import { getFavoriteMedia } from '@/services/media';
import { TextField } from '@/components';

const schemaForm = z.object({
    username: z.string().trim().min(2, { message: 'Username must be at least 2 characters' }),
    password: z.string().trim().min(2, { message: 'Password must be at least 2 characters' }),
});

type FormFields = z.infer<typeof schemaForm>;

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(schemaForm),
    });
    const navigate = useNavigate();

    const handleSignIn: SubmitHandler<FormFields> = async (data) => {
        try {
            const token = await loginUser(data.username, data.password);
            localStorage.setItem('userToken', token);
            const userInfo = await getInformation(data.username);
            await getFavoriteMedia(userInfo);
            navigate('/');
        } catch (error) {
            alert('Đăng nhập thất bại: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex justify-center items-center  w-full h-full bg-gray-900 bg-opacity-90 p-8 shadow-lg space-y-6"
        >
            <div className="w-full space-y-8">
                <h1 className="text-2xl font-bold text-gray-100 text-center">Sign in</h1>
                <TextField
                    label="Username"
                    error={errors.username?.message}
                    {...register('username')}
                    className="text-white"
                />
                <TextField
                    label="Password"
                    error={errors.password?.message}
                    {...register('password')}
                    className="text-white"
                />
                <div className="text-center">
                    <a href="#" className="text-gray-400 text-sm hover:text-red-500 transition-colors">
                        Forgot your password?
                    </a>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-full text-white font-bold uppercase tracking-wide transition-all ${
                        isSubmitting ? 'bg-red-700 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                    }`}
                >
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default SignInForm;
