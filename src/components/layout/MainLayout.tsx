import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from './Sidebar';
const { Content } = Layout;

const MainLayout = () => {
  return (
    <ProtectedRoute>
      <Layout
        style={{ minHeight: '100vh' }}
        id='antLayout'
       
      >
        <Sidebar />
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default MainLayout;
