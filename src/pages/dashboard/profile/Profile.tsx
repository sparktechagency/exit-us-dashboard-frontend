import { Form, Input } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../../redux/apiSlice/settings/settings';
import Loading from '../../../components/shared/Loading';
import { useEffect } from 'react';
import { imageUrl } from '../../../redux/baseApi/api';

export default function Profile() {
    const { data, isLoading } = useGetProfileQuery(undefined);
    const profileData = data?.data;
    const navigate = useNavigate();

    const [form] = Form.useForm();

    useEffect(() => {
        if (profileData) {
            form.setFieldsValue({
                fullname: profileData?.name,
                email: profileData?.email,
            });
        }
    }, [form, profileData]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="">
            <div className="w-[1035px] mx-auto">
                <div className="flex justify-between space-x-6 mt-12">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={
                                    profileData?.image?.startsWith('http')
                                        ? profileData?.image
                                        : `${imageUrl}${profileData?.image}`
                                }
                                className="border border-[#C68C4E] rounded-full w-24 h-24"
                            />
                        </div>

                        <div>
                            <h3 className="font-medium font-montserrat text-2xl">{profileData?.name}</h3>
                        </div>
                    </div>

                    <div className="flex justify-end mt-auto ">
                        <span
                            className="w-[209px] h-[58px] rounded-2xl text-[20px]  border border-[#C68C4E] flex items-center justify-center space-x-2 cursor-pointer"
                            onClick={() => navigate('/edit-profile')}
                        >
                            <MdOutlineModeEdit className="text-xl mr-2" /> {/* This adds the icon */}
                            Edit Profile
                        </span>
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
                                        readOnly
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
                                        readOnly
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
