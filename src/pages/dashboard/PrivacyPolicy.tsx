import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useGetPrivacyQuery, useUpdatePrivacyMutation } from '../../redux/apiSlice/settings/settings';
import Loading from '../../components/shared/Loading';

export default function PrivacyPolicy() {
    const { data, isLoading } = useGetPrivacyQuery(undefined);
    const [UpdatePrivacy] = useUpdatePrivacyMutation();
    const editor = useRef(null);
    const [content, setContent] = useState('');

    console.log(data?.data?.content);

    useEffect(() => {
        console.log(data?.data?.content);
        if (data?.data?.content) {
            setContent(data?.data?.content);
        }
    }, [data]);

    const handleOnSave = async () => {
        const data = {
            content: content,
            type: 'privacy',
        };
        await UpdatePrivacy(data);
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
                    onClick={handleOnSave}
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
