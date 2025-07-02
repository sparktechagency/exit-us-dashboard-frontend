import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useVeryfyOtpMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
    const [veryfyOtp] = useVeryfyOtpMutation();
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const adminEmail = email ? JSON.parse(email) : '';

    const onFinish = async (values: { oneTimeCode: string }) => {
        const data = {
            email: adminEmail,
            oneTimeCode: parseInt(values.oneTimeCode),
        };

        try {
            const res = await veryfyOtp(data);
            if (res?.data?.success) {
                toast.success(res.data.message, {
                    duration: 1000,
                });
                navigate(`/new-password?token=${res.data.data}`);
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.error || 'Something went wrong';
            toast.error(errorMessage);
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        controlHeight: 50,
                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#FBB040',
                },
            }}
        >
            <div className="flex  items-center justify-center h-screen">
                <div className=" w-[660px] rounded-lg p-10 border border-[#FFBC58]">
                    <div className=" space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Verify OTP</h1>
                        <p>
                            We sent a reset link to contact@dscode...com enter 4 digit code that mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto "
                            name="oneTimeCode"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 340,
                                }}
                                className=""
                                // variant="filled"
                                length={4}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Verify OTP Code
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="">Didn't receive the code?</p>
                            <p className="text-primary">Resend code</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
