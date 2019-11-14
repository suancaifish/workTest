/**
 * Routes:
 *   - ./src/pages/Authorized.tsx
 * 
 */

import {
  Button,
  Card,
  Col,
  Form,
  List,
  Row,
  Modal,
  Avatar,
  Spin
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType, listType, goodsType } from './model';
import { GlobalModelState } from '@/models/global'
import styles from './style.less';

import SearchComponent, { searchPropsType } from './components/search';
import TableList, { TableListPropsType, rowConfigType, columnConfigType } from './components/tableList';
import { orderType, orderStatus } from './components/config'

interface orderListProps extends FormComponentProps {
  orderList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  identity: string;
}

interface orderListState {

}

@connect(
  ({
    orderList,
    loading,
    global,
  }: {
    orderList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    global: GlobalModelState
  }) => ({
    orderList,
    loading: loading.models.orderList,
    identity: global.identity,
  }),
)
class OrderList extends Component<
orderListProps,
orderListState
> {

  componentDidMount() {
    this.props.dispatch({
      type: 'orderList/getSearchData',
      payload: {}
    })
  }

  render() {
    const {
      orderList: {
        searchData,
        list,
        pagination,
      },
      loading,
      dispatch,
      identity
    } = this.props;

    const searchProps: searchPropsType = {
      searchData,
      identity,
      handleSearch(searchData: any) {
        dispatch({
          type: 'orderList/save',
          payload: {
            searchData,
          }
        })
        dispatch({
          type: 'orderList/savePagination',
          payload: {
            current: 1,
          }
        })
        dispatch({
          type: 'orderList/getSearchData',
          payload: {}
        })
      },
      handleResetSearch() {
        dispatch({
          type: 'orderList/save',
          payload: {
            searchData: {}
          }
        })
        dispatch({
          type: 'orderList/savePagination',
          payload: {
            current: 1,
          }
        })
        dispatch({
          type: 'orderList/getSearchData',
          payload: {}
        })
      }
    }

    const contextColumn: Array<columnConfigType<listType>> = [
      {
        title: '收货人/联系电话',
        key: 'consignee',
        dataIndex: 'consignee',
        descIndex: 'phone'
      },
      {
        title: '订单金额',
        key: 'orderPrice',
      },
      {
        title: '订单类型',
        key: 'orderType',
        render: (record) => {
          const type = orderType.filter(item => item.value == record.orderType)[0]
          return (
            <span>{type ? type.label : '未知'}</span>
          )
        }
      },
      {
        title: '订单状态',
        key: 'orderStatus',
        render: (record) => {
          const status = orderStatus.filter(item => item.value == record.orderStatus)[0]
          return (
            <span>{status ? status.label : '未知'}</span>
          )
        }
      },
      {
        title: '操作',
        key: 'operation',
        render: (record) => {
          return <span>操作</span>
        }
      }
    ]

    const goodsColumn: Array<columnConfigType<goodsType>> = [
      {
        title: 'ats',
        key: '1',
        avatar: {
          titleIndex: 'goodsTitle',
          descIndex: 'goodsId',
          imgIndex: 'goodsImg'
        }
      },
      {
        title: '价格',
        key: 'price',
      },
      {
        title: '数量',
        key: 'number',
      },
    ]

    const titleRender = (record: listType) => {
      return (
        <div className={styles.listTitle}>
          <span>订单号：{record.orderId}</span>
          <span>下单时间：{record.createTime}</span>
        </div>
      )
    }

    const rowConfig: rowConfigType = {
      title: titleRender,
      contextColumn: contextColumn,
      goodsColumn: goodsColumn,
    }

    const tableListProps: TableListPropsType = {
      rowConfig: rowConfig,
      dataSource: list,
      pagination,
      handlePageSizeChange(current, size) {
        dispatch({
          type: 'orderList/changePage',
          payload: {
            pageSize: size,
            current: current
          }
        })
      },
      handlePageChange(page) {
        dispatch({
          type: 'orderList/changePage',
          payload: {
            current: page
          }
        })
      }
    }

    return (
      <Spin spinning={loading === true}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <SearchComponent {...searchProps} />
          </Card>
          <Card bordered={false}>
            <Row>
              <Button >按搜索结果导出</Button>
              {
                identity === 'self' ?
                  <>
                    <Button>批量订货</Button>
                    <Button>实时同步有赞订单信息</Button>
                  </> :
                  <Button>批量发货</Button>
              }
            </Row>
            <Row>
              <TableList {...tableListProps} />
            </Row>
          </Card>
        </div>
      </Spin>
    );
  }
}

export default Form.create<orderListProps>()(OrderList);
