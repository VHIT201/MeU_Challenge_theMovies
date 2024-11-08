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
            <div
                className="min-h-[200px] h-full w-[200px] mt-4 rounded-3xl"
                style={{
                    backgroundImage:
                        'url(https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=600)',
                }}
            ></div>
            <input
                className="w-full mt-2 rounded-lg border-none outline-none text-white bg-blue-400"
                type="file"
                placeholder="Change"
            />
        </div>
    );
};

export default ImageUploader;
