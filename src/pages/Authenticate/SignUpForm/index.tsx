import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import userAxios from '@/network/userAxios';
import { TextField } from '@/components';

// Schema definition using zod
const schemaForm = z
    .object({
        username: z.string().trim().min(1, { message: 'Username is required' }),
        email: z.string().trim().email({ message: 'Invalid email format' }),
        password: z.string().trim().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().trim().min(6, { message: 'Password must be at least 6 characters' }),
        firstName: z.string().trim().min(1, { message: 'First name is required' }),
        lastName: z.string().trim().min(1, { message: 'Last name is required' }),
        role: z.string().trim().min(1, { message: 'Role is required' }),
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
        <form
            onSubmit={handleSubmit(handleSignUp)}
            className="relative flex h-full flex-col gap-6 p-8 w-full max-w-md mx-auto bg-gray-900 shadow-lg items-center justify-center"
        >
            <h1 className="text-2xl font-bold text-white text-center">Create Account</h1>

            {['username', 'email', 'firstName', 'lastName', 'password', 'confirmPassword'].map((field, idx) => (
                <div key={idx} className="w-full flex flex-col gap-1 relative">
                    <TextField
                        className="text-white"
                        label={field}
                        error={errors[field as keyof FormFields]?.message}
                        {...register(field as keyof FormFields)}
                    />
                </div>
            ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition disabled:bg-gray-600"
            >
                {isSubmitting ? 'Loading...' : 'Sign Up'}
            </button>
        </form>
    );
};

export { SignUpForm };
