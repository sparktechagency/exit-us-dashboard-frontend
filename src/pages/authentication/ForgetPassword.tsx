import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useForgetPasswordMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
    const navigate = useNavigate();

    const onFinish = async (values: { email: string }) => {
        try {
            const res = await forgetPassword(values);
            if (res?.data?.success) {
                toast.success('Check your email');

                if (values?.email) {
                    localStorage.setItem('email', JSON.stringify(values.email));
                }
                navigate('/verify-otp');
            } else {
                toast.error(res?.data?.message || 'Email is not verified');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Email is not verified');
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
                    <div className=" space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Forget Password</h1>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block  mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-[#fbb040] !border-none !hover-none"
                                shape="round"
                                htmlType="submit"
                                disabled={isLoading}
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                {isLoading ? 'Processing...' : 'Send Code'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
