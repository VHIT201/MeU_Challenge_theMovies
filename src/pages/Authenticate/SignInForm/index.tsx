import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginUser, getInformation } from '@/services/user';
import { getFavoriteMedia } from '@/services/media';

const schemaForm = z.object({
    username: z.string().min(2, { message: 'Username must be at least 2 characters' }),
    password: z.string().min(2, { message: 'Password must be at least 2 characters' }),
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
            className="flex flex-col w-full h-full items-center justify-center bg-gray-900 bg-opacity-90 p-8 shadow-lg space-y-6"
        >
            <h1 className="text-2xl font-bold text-gray-100 text-center">Sign in</h1>

            <input
                type="text"
                placeholder="Username"
                {...register('username')}
                className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-full border border-gray-600 focus:border-red-500 outline-none"
            />
            {errors.username && <span className="text-red-500 text-sm font-semibold">{errors.username.message}</span>}

            <input
                type="password"
                placeholder="Password"
                {...register('password')}
                className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-full border border-gray-600 focus:border-red-500 outline-none"
            />
            {errors.password && <span className="text-red-500 text-sm font-semibold">{errors.password.message}</span>}

            <a href="#" className="text-gray-400 text-sm hover:text-red-500 transition-colors">
                Forgot your password?
            </a>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-full text-white font-bold uppercase tracking-wide transition-all ${
                    isSubmitting ? 'bg-red-700 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                }`}
            >
                {isSubmitting ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
};

export default SignInForm;
