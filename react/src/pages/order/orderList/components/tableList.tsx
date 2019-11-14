import React from 'react';
import { Avatar, List } from 'antd'
import styles from './tableList.less'
import { listType, goodsType } from '../model'
import { PaginationConfig } from 'antd/es/pagination'

export interface columnConfigType<T> {
  title: string;
  key: string | number;
  dataIndex?: string;
  width?: number;
  descIndex?: string;
  flex?: number;
  render?: (record: T) => React.ReactNode;
  avatar?: {
    imgIndex: string;
    titleIndex: string;
    descIndex: string;
  }
}

export interface rowConfigType {
  title?: (record: listType) => React.ReactNode;
  contextColumn: Array<columnConfigType<listType>>
  goodsColumn: Array<columnConfigType<goodsType>>
}

export interface TableListPropsType {
  rowConfig: rowConfigType;
  dataSource: Array<listType>;
  pagination: PaginationConfig;
  handlePageChange: (page: number, pageSize?: number) => void;
  handlePageSizeChange: (current: number, size: number) => void;
}

function TableList(props: TableListPropsType) {

  const {
    rowConfig: {
      contextColumn,
      goodsColumn,
      title
    },
    dataSource,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = props

  const contextRender = function (data: listType) {
    return contextColumn.map(item => {
      if (item.render) {
        return <div className={styles.contextItem}>{item.render(data)}</div>
      }
      if (item.descIndex) {
        return (
          <div key={item.key} className={styles.contextItem}>
            <div>
              {data[item.dataIndex || item.key]}
            </div>
            <div>
              {data[item.descIndex]}
            </div>
          </div>
        )
      }
      return <div key={item.key} className={styles.contextItem}>{data[item.dataIndex || item.key]}</div>
    })
  }

  const goodsRender = function (data: goodsType) {
    return goodsColumn.map(item => {
      if (item.render) {
        return <div className={styles.goodsItem}>{item.render(data)}</div>;
      }
      if (item.descIndex) {
        return (
          <div key={item.key} className={styles.goodsItem}>
            <div>
              {data[item.dataIndex || item.key]}
            </div>
            <div>
              {data[item.descIndex]}
            </div>
          </div>
        )
      }
      if (item.avatar) {
        return (
          <div className={styles.goodsItem}>
            <List.Item.Meta
              avatar={
                <Avatar shape="square" size={64} src={data[item.avatar.imgIndex]} />
              }
              title={data[item.avatar.titleIndex]}
              description={data[item.avatar.descIndex]}
            />
          </div>
        )
      }
      return <div key={item.key} className={styles.goodsItem}>{data[item.dataIndex || item.key]}</div>
    })
  }

  const ListPaginationProps: PaginationConfig = {
    ...pagination,
    showTotal: (total) => `共${total}条`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['50', '100', '200', '300', '500'],
    onShowSizeChange: (current, size) => handlePageSizeChange(current, size),
    onChange: (page, pageSize) => handlePageChange(page, pageSize)
  }


  return (
    <div className={styles.listWrap}>
      <div className={styles.listHeader}>
        <div className={styles.shop}>商品</div>
        <div>单价</div>
        <div>数量</div>
        <div>收货人/联系电话</div>
        <div>订单金额</div>
        <div>订单类型</div>
        <div>订单状态</div>
        <div>操作</div>
      </div>
      <List
        dataSource={dataSource}
        pagination={ListPaginationProps}
        renderItem={(item) => {
          let titleMessage: React.ReactNode;
          if (title) {
            titleMessage = title(item)
          }
          return (
            <>
              {titleMessage}
              <List.Item key={item.orderId} className={styles.listItem}>
                <div className={styles.goods}>
                  {item.goods.map(good => <div className={styles.goodsWraps}>{goodsRender(good)}</div>)}
                </div>
                <div className={styles.context}>
                  {contextRender(item)}
                </div>
              </List.Item>
            </>
          )
        }}
      />
    </div>
  )
}

export default TableList
