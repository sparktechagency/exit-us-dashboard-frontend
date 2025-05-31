import { Button } from 'antd';
import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

export default function PrivacyPolicy() {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const handleOnSave = () => {
        console.log('value');
    };
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
