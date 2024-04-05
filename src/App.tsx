import { ConfigProvider } from 'antd';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#5c3ca8',
            triggerBg: '#876cc1',
            bodyBg: '#e9e5f5',
            lightSiderBg: '#5c3ca8',
            lightTriggerBg: '#e9e5f5',
          },
        },
      }}
    >
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </ConfigProvider>
  );
}

export default App;
