import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await resetPassword({ token, data: values }).unwrap();
            if (res?.message) {
                toast.success(res?.message || 'reset password successfully');
                navigate('/login');
            } else {
                toast.error(res?.message);
            }
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
                        <div>
                            <span> Confirm Password</span>
                            <Form.Item
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please input confirm password!' }]}
                            >
                                <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                shape="round"
                                className="!bg-[#fbb040] !border-none !hover-none"
                                htmlType="submit"
                                disabled={isLoading}
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                {isLoading ? 'Proccessing...' : 'Update Password'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
