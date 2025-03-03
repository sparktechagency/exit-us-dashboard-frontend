import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#FBB040',
                    },
                    components: {
                        Input: {
                            borderRadius: 40,
                        },
                        Table: {
                            headerColor: '#ffbc58',
                            colorBgContainer: '#181c1d ',
                            colorText: '#ffbc58',
                            headerSplitColor: '',
                        },
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider>
        </>
    );
}

export default App;
