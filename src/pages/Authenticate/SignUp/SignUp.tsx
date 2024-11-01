import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../network/firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import * as Components from '../components/components';

const schemaForm = z
    .object({
        email: z.string().email({ message: 'Email Invalid' }),
        password: z.string().min(2, { message: 'Password must least 2 character' }),
        confirmPassword: z.string().min(2, { message: 'Password must least 2 character' }),
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
            email: '',
            password: '',
        },
        resolver: zodResolver(schemaForm),
    });

    const handleSignUp: SubmitHandler<FormFields> = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            alert('Sign up success');
        } catch {
            alert('Sign up failed. Please check your credentials.');
        }
    };

    return (
        <Components.Form onSubmit={handleSubmit(handleSignUp)}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <span className="mb-2 text-md text-red-main font-semibold">{errors.email.message}</span>}
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
