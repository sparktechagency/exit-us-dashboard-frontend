import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            await resetPassword({ token, data: values }).unwrap();
            toast.success('reset password successfully');
            navigate('/login');
        } catch (error: unknown) {
            toast.error((error as any)?.data?.message || (error as Error)?.message || 'Failed to reset password');
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FBB040',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 40,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },

                    Button: {
                        colorPrimaryHover: 'rgb(0,0,0)',
                    },
                },
            }}
        >
            <div className="flex  items-center justify-center h-screen">
                <div className=" w-[660px] rounded-lg  p-10 border border-[#FFBC58]">
                    <div className=" max-w-md mx-auto space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Set a new password</h1>
                        <p>Create a new password. Ensure it differs from previous ones for security</p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="newPassword" className="block  mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="confirmPassword" className="block  mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                shape="round"
                                className="!bg-[#fbb040] !border-none !hover-none"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
