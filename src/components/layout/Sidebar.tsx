import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Space } from 'antd';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import {
  logoutAndClearPersistedState,
  selectCurrentUser,
} from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { adminPaths } from '../../routes/admin.routes';
import { managerPaths } from '../../routes/manager.routes';
import { sellerPaths } from '../../routes/seller.routes';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
  SELLER: 'seller',
} as const;

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { data: myData } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logoutAndClearPersistedState());
  };
  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.MANAGER:
      sidebarItems = sidebarItemsGenerator(managerPaths, userRole.MANAGER);
      break;
    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, userRole.SELLER);
      break;
    default:
      break;
  }

  return (
    <Sider
      width='250'
      id='antdSidebar'
      breakpoint='lg'
      collapsedWidth='0'
      style={{ backgroundColor: '#5c3ca8' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Eye Glass
      </div>
      <div className='flex justify-center my-5'>
        <Space size={24}>
          <Avatar size={90} shape='circle' icon={<UserOutlined />} />
        </Space>
      </div>
      <div className='bg-[--light-purple] w-[90%] rounded-lg py-3 px-2 flex items-center flex-col mx-auto'>
        <h2 className='text-white font-bold text-center'>
          {myData?.data?.name?.firstName} {myData?.data?.name?.lastName}
        </h2>
        <p className='my-2 text-white font-bold'>{myData?.data?.username}</p>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
      <div className='text-right mx-3 my-3'>
        <button
          onClick={handleLogout}
          className='text-white border px-3 rounded-md py-1'
        >
          Logout
        </button>
      </div>
    </Sider>
  );
};

export default Sidebar;
