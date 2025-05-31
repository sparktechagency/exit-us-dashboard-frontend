import { useState } from 'react';
import { Form, Input, Button, ConfigProvider } from 'antd';
import { MdModeEditOutline } from 'react-icons/md';

export default function EditProfile() {
    // const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState<string>('');
    const [preview, setPreview] = useState<File | null>(null);

    const [form] = Form.useForm();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setPreview(file);
        }
    };

    return (
        <div className="">
            <div className="w-[1035px] mx-auto">
                <div className="flex justify-between space-x-6 mt-12">
                    <div className="flex items-center gap-4">
                        <div className="relative inline-block w-24 h-24">
                            <img
                                src={imageUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-2 border-[#C68C4E] object-cover"
                            />
                            <label
                                className="absolute bottom-2 -right-1 bg-[#C68C4E] rounded-full p-1 shadow-lg hover:bg-[#b77f3f] transition cursor-pointer"
                                aria-label="Edit profile"
                            >
                                <MdModeEditOutline className="text-white w-5 h-5" />
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>

                        <div>
                            <h3 className="font-medium font-montserrat text-2xl">Ethan Michael</h3>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Form form={form} layout="vertical">
                        <div>
                            <span className=" text-[20px] font-semibold ">Full Name</span>
                            <div className="mt-3 ">
                                <Form.Item name="fullname" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 border border-[#C68C4E] rounded-xl"
                                        placeholder="enter your email"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <span className=" text-[20px] font-semibold ">Email</span>
                            <div className="mt-3">
                                <Form.Item name="email" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 border border-[#C68C4E] rounded-xl"
                                        placeholder="enter your gmail"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <span className=" text-[20px] font-semibold ">Contact Number</span>
                            <div className="mt-3">
                                <Form.Item name="contactNumber" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 border border-[#C68C4E] rounded-xl"
                                        placeholder="contact number"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="mt-6">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultHoverBg: '',

                                            defaultHoverBorderColor: '',
                                            defaultActiveBorderColor: '',
                                            defaultHoverColor: '',
                                            defaultActiveColor: '',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    className="w-full py-6 rounded-sm border !bg-[#C68C4E] text-xl text-white font-semibold mt-5 !border-none"
                                    htmlType="submit"
                                    style={{ background: '#004AAD' }}
                                >
                                    Update Profile
                                </Button>
                            </ConfigProvider>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
