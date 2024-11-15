import { Images } from '@/assets/images';
import { useState } from 'react';

const ImageUploader = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // Xử lý khi người dùng chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <img
                src={imageSrc ?? Images.noImage}
                className="min-h-[200px] max-h-[200px] h-full w-[200px] mt-4 rounded-md"
            />
            <input
                className="w-full mt-2 rounded-md border-none outline-none text-white bg-blue-400"
                type="file"
                placeholder="Change"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUploader;
