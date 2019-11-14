import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { orderStatus, orderType, remindStatusOpt } from './config'
import styles from './search.less'
import { RangePickerValue } from 'antd/es/date-picker/interface'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const orderStatusOption = orderStatus.map((item, index) => <Option key={index} value={item.value}>{item.label}</Option>)
const orderTypeOption = orderType.map((item, index) => <Option key={index} value={item.value}>{item.label}</Option>)
const remindStatusOptOption = remindStatusOpt.map((item, index) => <Option key={index} value={item.value}>{item.label}</Option>)

export interface searchItemKey {
  orderId?: string;
  orderStatus?: number;
  dateTime?: RangePickerValue[];
  orderType?: string;
  remindStatus?: string;
  sourceName?: string;
  sourceId?: string;
  phone?: string;
}

export interface searchPropsType {
  searchData: searchItemKey;
  handleSearch: Function;
  handleResetSearch: Function;
  identity: string
}

interface propsType extends searchPropsType, FormComponentProps { }

const OrderListSearch: React.FunctionComponent<propsType> = (props: propsType) => {

  const {
    searchData,
    handleResetSearch,
    handleSearch,
    identity,
    form: {
      getFieldDecorator,
      setFieldsValue,
      getFieldsValue,
      resetFields
    }
  } = props

  /**
   * contructor
   */
  useEffect(() => {
    if (Object.keys(searchData).length) {
      setFieldsValue(searchData)
    }
  }, [])

  function onReset() {
    resetFields()
    handleResetSearch()
  }

  return (
    <div className={styles.formLayout}>
      <Form layout='inline'>
        <FormItem label="订单号">
          {getFieldDecorator('orderId', {})(
            <Input placeholder="请输入订单号" />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator('orderStatus', {})(
            <Select
              placeholder="请选择订单状态"
              style={{ width: '150px' }}
            >
              {orderStatusOption}
            </Select>
          )}
        </FormItem>
        <FormItem label="订单类型">
          {getFieldDecorator('orderType', {})(
            <Select
              placeholder="请选择订单类型"
              style={{ width: '150px' }}
            >
              {orderTypeOption}
            </Select>
          )}
        </FormItem>
        <FormItem label="下单时间">
          {getFieldDecorator('dateTime', {})(
            <RangePicker />
          )}
        </FormItem>
        <FormItem label="买家提醒发货">
          {getFieldDecorator('remindStatus', {})(
            <Select
              placeholder="请选择买家提醒发货"
              style={{ width: '150px' }}
            >
              {remindStatusOptOption}
            </Select>
          )}
        </FormItem>
        <FormItem label="商品标题">
          {getFieldDecorator('sourceName', {})(
            <Input placeholder="请输入商品标题" />
          )}
        </FormItem>
        <FormItem label="商品ID">
          {getFieldDecorator('sourceId', {})(
            <Input placeholder="请输入商品ID" />
          )}
        </FormItem>
        {
          identity === 'self' ?
            <>
              <FormItem label="1688订单号">
                {getFieldDecorator('_1688OrderId', {})(
                  <Input placeholder="请输入1688订单号" />
                )}
              </FormItem>
              <FormItem label="1688订单状态">
                {getFieldDecorator('_1688OrderIdState', {})(
                  <Input placeholder="请输入1688订单状态" />
                )}
              </FormItem>
              <FormItem label="联系电话">
                {getFieldDecorator('phone', {})(
                  <Input placeholder="请输入联系电话" />
                )}
              </FormItem>
            </> : null
        }
        <FormItem>
          <Button type="primary" onClick={() => handleSearch(getFieldsValue())}>查询</Button>
        </FormItem>
        <FormItem>
          <Button type="default" onClick={() => onReset()}>重置</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Form.create<propsType>({})(OrderListSearch)
