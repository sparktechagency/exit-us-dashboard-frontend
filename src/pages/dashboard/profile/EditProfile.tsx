import { useEffect, useState } from 'react';
import { Form, Input, Button, ConfigProvider } from 'antd';
import { MdModeEditOutline } from 'react-icons/md';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlice/settings/settings';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/shared/Loading';
import toast from 'react-hot-toast';

export default function EditProfile() {
    const [UpdateProfile] = useUpdateProfileMutation();
    const { data, isLoading, refetch } = useGetProfileQuery(undefined);
    const editData = data?.data;
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                fullname: editData?.name,
                email: editData?.email,
            });
            setPreview(editData?.image.startsWith('http') ? editData?.image : `${imageUrl}${editData?.image}`);
        }
    }, [form, editData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];

        if (file) {
            setImageUrl(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFinish = async (values: { fullname: string; email: string }) => {
        const formData = new FormData();
        formData.append('name', values.fullname);
        formData.append('email', values.email);
        if (imageUrl) {
            formData.append('image', imageUrl);
        }

        try {
            await UpdateProfile(formData);
            refetch();
            toast.success('profile update successfully');
            navigate('/profile');
        } catch (error) {
            const errorMessage = (error as { message?: string })?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="">
            <div className="w-[1035px] mx-auto">
                <div className="flex justify-between space-x-6 mt-12">
                    <div className="flex items-center gap-4">
                        <div className="relative inline-block ">
                            {preview ? (
                                <img src={preview} alt="pic" className="w-32 h-32 rounded-full" />
                            ) : (
                                <div className="">
                                    <span className=""></span>
                                    <span className="text-[#636363]">Upload Image</span>
                                </div>
                            )}
                            <label
                                className="absolute bottom-5 right-1 bg-[#C68C4E] rounded-full p-1 shadow-lg hover:bg-[#b77f3f] transition cursor-pointer"
                                aria-label="Edit profile"
                            >
                                <MdModeEditOutline className="text-white w-5 h-5" />
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>

                        <div>
                            <h3 className="font-medium font-montserrat text-2xl">{editData?.name}</h3>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Form form={form} layout="vertical" onFinish={onFinish}>
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

                        {/* <div>
                            <span className=" text-[20px] font-semibold ">Contact Number</span>
                            <div className="mt-3">
                                <Form.Item name="contactNumber" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 border border-[#C68C4E] rounded-xl"
                                        placeholder="contact number"
                                    />
                                </Form.Item>
                            </div>
                        </div> */}

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
