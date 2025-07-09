import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation, useVeryfyOtpMutation } from '../../redux/apiSlice/auth/auth';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
    const [forgetPassword] = useForgetPasswordMutation(undefined);
    const [veryfyOtp, { isLoading }] = useVeryfyOtpMutation();
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const adminEmail = email ? JSON.parse(email) : '';

    const handleSendCode = async () => {
        const res = await forgetPassword(adminEmail).unwrap();
        try {
            if (res?.success) {
                toast.success(res?.message || 'Check your email');
            } else {
                toast.error(res?.message || 'failed otp');
            }
        } catch (error) {
            toast.error(res?.data?.message || 'Try again otp failed.');
        }
    };

    const onFinish = async (values: { oneTimeCode: string }) => {
        const data = {
            email: adminEmail,
            oneTimeCode: parseInt(values.oneTimeCode),
        };

        try {
            const res = await veryfyOtp(data).unwrap();
            if (res?.success) {
                toast.success(res.data.message, {
                    duration: 1000,
                });
                navigate(`/new-password?token=${res.data.data}`);
            } else {
                toast.error(res?.message || 'OTP Verify Successfully');
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
                                length={4}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-[#fbb040] !border-none !hover-none"
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                disabled={isLoading}
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                {isLoading ? 'Processing...' : ' Verify OTP Code'}
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="">Didn't receive the code?</p>
                            <p className="text-primary cursor-pointer" onClick={handleSendCode}>
                                Resend code
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
