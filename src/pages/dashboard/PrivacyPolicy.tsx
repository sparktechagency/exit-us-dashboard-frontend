import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import Loading from '../../components/shared/Loading';
import { useGetDisclaimerQuery, useUpdateDisclaimerMutation } from '../../redux/apiSlice/settings/settings';

export default function PrivacyPolicy() {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const { data, isLoading } = useGetDisclaimerQuery({ query: `?type=privacy` });
    const privacyData = data?.data;

    useEffect(() => {
        if (privacyData) {
            setContent(privacyData?.content);
        }
    }, [privacyData]);

    const [UpdateDisclaimer] = useUpdateDisclaimerMutation();
    const handleUpdate = async () => {
        await UpdateDisclaimer({ payload: { content, type: 'privacy' } }).unwrap();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="">
                <div className="mt-5">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={{ height: 550, theme: 'light', readonly: false }}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                </div>
                <Button
                    block
                    onClick={handleUpdate}
                    className=""
                    style={{
                        marginTop: '16px',
                        padding: '1px',
                        fontSize: '24px',
                        color: '#E2A850',
                        background: '#181c1d',
                        height: '54px',
                        border: '1px solid #ffbc58',
                        borderRadius: 4,
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
