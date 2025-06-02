import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
// import { useGetTermsConditionQuery, useUpdateTermsConditionMutation } from '../../redux/apiSlice/settings/settings';
import Loading from '../../components/shared/Loading';
import { useGetDisclaimerQuery, useUpdateDisclaimerMutation } from '../../redux/apiSlice/settings/settings';

export default function TermsCondition() {
    const { data, isLoading } = useGetDisclaimerQuery({ query: `?type=terms` });
    const termsData = data?.data;

    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (termsData) {
            setContent(termsData?.content);
        }
    }, [termsData]);

    const [UpdateDisclaimer] = useUpdateDisclaimerMutation();
    const handleUpdate = async () => {
        try {
            const res = await UpdateDisclaimer({ payload: { content, type: 'terms' } }).unwrap();
            if (res.success) {
                console.log('Updating success');
            }
        } catch (error) {
            console.error(error);
        }
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
                    // className="font-barlow"
                    style={{
                        marginTop: '16px',
                        padding: '1px',
                        fontSize: '24px',
                        color: 'white',
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
