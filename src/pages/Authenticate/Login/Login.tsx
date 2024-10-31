import * as Components from '../components/components';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schemaForm = z.object({
    email: z.string().email({ message: 'Email Invalid' }),
    password: z.string().min(2, { message: 'Password must least 2 character' }),
});

type FormFields = z.infer<typeof schemaForm>;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(schemaForm),
    });
    const navigate = useNavigate();

    const handleSignIn: SubmitHandler<FormFields> = (data) => {
        if (data.email === 'admin@gmail.com' && data.password === 'admin') {
            navigate('/home');
        } else {
            alert('Sign in failed. Please check your credentials.');
        }
    };

    return (
        <Components.Form onSubmit={handleSubmit(handleSignIn)}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" {...register('email')} />
            {errors.email && <span className="mb-2 text-md text-red-main font-semibold">{errors.email.message}</span>}
            <Components.Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.password.message}</span>
            )}
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button disabled={isSubmitting}>{isSubmitting ? 'Loading . . .' : 'Login'}</Components.Button>
        </Components.Form>
    );
};

export { LoginForm };
