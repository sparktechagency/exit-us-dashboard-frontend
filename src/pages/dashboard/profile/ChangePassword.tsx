import { Button, ConfigProvider, Form, Input, Typography } from 'antd';

export default function ChangePassword() {
    //   const navigate = useNavigate();
    //   const [changePassword] = useChangePasswordMutation();

    const [form] = Form.useForm();

    const onFinish = (values: string) => {
        console.log(values);
        form.resetFields();
    };

    return (
        <>
            <div className="mx-auto bg-transparent px-5 flex items-center justify-center mt-28 ">
                <div className="w-full lg:w-2/3 border border-[#0A5239] rounded-xl px-7 pt-16 pb-5 bg-[#F6FFFB]">
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorTextPlaceholder: 'rgba(61,61,61,0.25)',
                                },
                            },
                        }}
                    >
                        <Form form={form} onFinish={onFinish} layout="vertical" className="bg-transparent w-full">
                            <Typography.Title level={4} style={{ color: 'black' }}>
                                Current password
                            </Typography.Title>
                            <Form.Item
                                name="currentPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your current password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-[#E6C379] focus:bg-transparent focus:border-[#E6C379]"
                                />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-[#E6C379] focus:bg-transparent focus:border-[#E6C379]"
                                />
                            </Form.Item>
                            <Typography.Title level={4} style={{ color: 'black' }}>
                                Re-enter new Password
                            </Typography.Title>
                            <Form.Item
                                name="reEnterPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-[#E6C379] focus:bg-transparent focus:border-[#E6C379]"
                                />
                            </Form.Item>
                            <Form.Item>
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
                                        className="w-full py-6 rounded-sm border !bg-[#C68C4E] text-xl text-white font-semibold mt-5"
                                        htmlType="submit"
                                        style={{ background: '#004AAD' }}
                                    >
                                        Change password
                                    </Button>
                                </ConfigProvider>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </>
    );
}
