import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import userAxios from '@/network/userAxios';

// Schema definition using zod
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

    // Function to capitalize the first letter of each word
    const capitalizePlaceholder = (text: string) => text.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

    return (
        <form
            onSubmit={handleSubmit(handleSignUp)}
            className="relative flex h-full flex-col gap-6 p-8 w-full max-w-md mx-auto bg-gray-900 shadow-lg items-center justify-center"
        >
            <h1 className="text-2xl font-bold text-white text-center">Create Account</h1>

            {['username', 'email', 'firstName', 'lastName', 'password', 'confirmPassword'].map((field, idx) => (
                <div key={idx} className="w-full flex flex-col gap-1 relative">
                    <label className="block text-gray-400 mb-1 capitalize text-left pl-2 w-full">
                        {capitalizePlaceholder(field.replace('confirmPassword', 'Confirm Password'))}
                    </label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        {...register(field as keyof FormFields)}
                        placeholder={capitalizePlaceholder(
                            field.replace('confirmPassword', 'Confirm Password').replace(/([A-Z])/g, ' $1'),
                        )}
                        className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-full border border-gray-600 focus:border-red-500 outline-none"
                    />
                    {errors[field as keyof FormFields] && (
                        <span className="absolute top-full left-2 mt-1 text-xs text-red-400">
                            {errors[field as keyof FormFields]?.message}
                        </span>
                    )}
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
