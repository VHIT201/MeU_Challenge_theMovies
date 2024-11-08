import * as Components from '../components/components';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginUser, getInformation } from '@/services/user';
import { getFavoriteMedia } from '@/services/media';

const schemaForm = z.object({
    username: z.string().min(2, { message: 'Username must least 2 character' }),
    password: z.string().min(2, { message: 'Password must least 2 character' }),
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
        <Components.Form onSubmit={handleSubmit(handleSignIn)}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="text" placeholder="Username" {...register('username')} />
            {errors.username && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.username.message}</span>
            )}
            <Components.Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.password.message}</span>
            )}
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button disabled={isSubmitting}>{isSubmitting ? 'Loading . . .' : 'Login'}</Components.Button>
        </Components.Form>
    );
};

export default SignInForm;
