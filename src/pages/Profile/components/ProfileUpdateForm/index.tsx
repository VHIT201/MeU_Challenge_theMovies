import ImageUploader from '../ImageUploader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaForm } from './schema';
import { z } from 'zod';
import { TextAreaField, TextField } from '@/components';

type FormFields = z.infer<typeof schemaForm>;

const ProfileUpdateForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            username: '',
            overview: '',
        },
        resolver: zodResolver(schemaForm),
    });

    const handleSubmitUpdate = () => {};

    return (
        <form className="px-2" onSubmit={handleSubmit(handleSubmitUpdate)}>
            <div className="flex items-center space-x-4">
                <ImageUploader />
                <div className="flex-1 w-full md:min-w-[400px]">
                    <TextField label="Username" error={errors.username?.message} {...register('username')} />
                    <div className="flex flex-col my-4">
                        <textarea
                            {...register('overview')}
                            rows={5}
                            className="p-3 rounded-md border-gray-400 border-[1px] outline-none focus-within:border-blue-400"
                            placeholder="Overview . . ."
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mb-2">
                <button type="submit" className="px-2 py-3 bg-blue-400 rounded-2xl shadow-sm hover:text-white">
                    {isSubmitting ? 'Loading . . . ' : 'Update'}
                </button>
            </div>
        </form>
    );
};

export default ProfileUpdateForm;
