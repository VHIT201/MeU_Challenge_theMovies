import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Components from '../components/components';
import userAxios from '@/network/userAxios';

const schemaForm = z
    .object({
        username: z.string().min(1, { message: 'Username is required' }),
        email: z.string().email({ message: 'Invalid email format' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
        role: z.string().min(1, { message: 'Role is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof schemaForm>;

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            role: 'user',
        },
        resolver: zodResolver(schemaForm),
    });

    const handleSignUp: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await userAxios.post('/identityusers/register', {
                username: data.username,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                email: data.email,
            });
            console.log('Response:', response);
            alert('Sign up successful');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Components.Form onSubmit={handleSubmit(handleSignUp)}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" {...register('username')} placeholder="Username" />
            {errors.username && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.username.message}</span>
            )}
            <Components.Input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <span className="mb-2 text-md text-red-main font-semibold">{errors.email.message}</span>}
            <Components.Input type="text" {...register('firstName')} placeholder="First Name" />
            {errors.firstName && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.firstName.message}</span>
            )}
            <Components.Input type="text" {...register('lastName')} placeholder="Last Name" />
            {errors.lastName && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.lastName.message}</span>
            )}
            <Components.Input type="password" {...register('password')} placeholder="Password" />
            {errors.password && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.password.message}</span>
            )}
            <Components.Input type="password" {...register('confirmPassword')} placeholder="Confirm Password" />
            {errors.confirmPassword && (
                <span className="mb-2 text-md text-red-main font-semibold">{errors.confirmPassword.message}</span>
            )}
            <Components.Button disabled={isSubmitting}>{isSubmitting ? 'Loading . . .' : 'Sign Up'}</Components.Button>
        </Components.Form>
    );
};

export { SignUpForm };
