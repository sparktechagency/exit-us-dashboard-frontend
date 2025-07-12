import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [rememberMe, setRememberMe] = useState(false);

    const onFinish = async (values: { email: string; password: string }) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await login(payload).unwrap();

            if (response?.success) {
                toast.success('Login Successful', { id: 'login-toast' });
                localStorage.setItem('accessToken', response.data.accessToken);

                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            } else {
                toast.error(response?.message || 'Login failed', { id: 'login-toast' });
            }
        } catch (error: any) {
            // This handles network or server errors
            toast.error(error?.data?.message || 'Login failed', { id: 'login-toast' });
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
            <div className="flex items-center justify-center h-screen ">
                <div className=" w-[650px] rounded-lg  border border-[#FFBC58] p-14 ">
                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Login to Account</h1>
                        <p className="text-lg">Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
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
                            <Input placeholder="Enter your email address" type="email" className=" h-12  px-6 " />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block  mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className=" h-12  px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox
                                    onChange={(e) => setRememberMe(e.target.value)}
                                    checked={rememberMe}
                                    className=" text-lg"
                                >
                                    Remember me
                                </Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-primary text-md hover:text-primary">
                                Forget password
                            </Link>
                        </div>

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
                                {isLoading ? 'processing....' : 'Sign In'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
