'use client';
import AccountSidebar from '../Common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import DashboardContent from './DashboardContent';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import Breadcrumbs from '@/Utils/CommonComponents/Breadcrumb';
import WrapperComponent from '@/Components/Widgets/WrapperComponent';

const AccountDashboard = () => {
  return (
    <>
      <div className='d-none d-lg-block'>
        <Breadcrumbs title={'Dashboard'} subNavigation={[{ name: 'Dashboard' }]} />
      </div>
      <WrapperComponent classes={{ sectionClass: 'dashboard-section section-b-space user-dashboard-section', fluidClass: 'container' }} customCol={true}>
        <div className='d-none d-lg-block col-lg-3'>
          <AccountSidebar tabActive={'dashboard'} />
        </div>
        <Col xxl={9} lg={8} className='col-12'>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <DashboardContent />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountDashboard;
