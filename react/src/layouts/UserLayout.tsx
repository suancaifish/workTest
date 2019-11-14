import { MenuDataItem, getMenuData } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';

import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './UserLayout.less';
import FooterLayout from './footerLayout'
import logo from '../assets/img/loginLogo.png'

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.FunctionComponent<UserLayoutProps> = props => {

  const {
    children,
  } = props;

  return (
    <DocumentTitle
      title="登录"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <img src={logo} alt="logo" />
            <span>商家管理后台</span>
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <FooterLayout />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
