import { Reducer } from 'redux';
import { Effect } from 'dva';
import { query } from './service';

import { searchItemKey } from './components/search';
import { CommonUtils } from '@/utils/utils'
import { PaginationConfig } from 'antd/es/pagination'

export interface goodsType {
  goodsImg: string;
  goodsTitle: string;
  goodsId: string;
  price: number;
  number: number;
  rejectStatus: string
}

export interface listType {
  orderId: string;
  createTime: string;
  goods: goodsType[];
  consignee: string;
  phone: string;
  orderPrice: number;
  orderType: number;
  orderStatus: number;
}


export interface StateType {
  searchData: searchItemKey;
  list: listType[];
  pagination: PaginationConfig
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getSearchData: Effect;
    queryList: Effect;
    changePage: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    savePagination: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'orderList',
  state: {
    searchData: {
    },
    list: [],
    pagination: {
      current: 1,
      pageSize: 50,
    }
  },
  effects: {
    * getSearchData({ }, { select, put }) {
      const searchData = yield select(({ orderList }: { orderList: StateType }) => orderList.searchData)
      const pagination = yield select(({ orderList }: { orderList: StateType }) => orderList.pagination)
      const params = CommonUtils.formatParams(searchData, 'beginTime', 'endTime')
      yield put({
        type: 'queryList',
        payload: {
          ...params,
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        }
      })
    },
    * queryList({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: {
          list: data.data.data.map(item => {
            return {
              orderId: item.orderId,
              goods: [{
                goodsImg: item.sourceImg,
                goodsTitle: item.sourceName,
                goodsId: item.sourceId,
                price: item.sourcePrice,
                number: item.sourceNum,
                rejectStatus: '',
              }],
              consignee: item.address.receiverName,
              phone: item.address.receiverTel,
              orderPrice: item.sourcePayPrice,
              orderType: item.orderType,
              orderStatus: item.orderStatus,
              createTime: item.orderTime,
            }
          }),
        }
      })
      yield put({
        type: 'savePagination',
        payload: {
          current: data.data.pageIndex,
          total: data.data.totalCount
        }
      })
    },
    * changePage({ payload }, { put }) {
      yield put({
        type: 'savePagination',
        payload: payload,
      })
      yield put({
        type: 'getSearchData',
        payload: {}
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    savePagination(state = { pagination: { current: 1, pageSize: 50 }, searchData: {}, list: [] }, { payload }) {
      const pagination = Object.assign({}, state.pagination, payload)
      return {
        ...state,
        pagination,
      }
    }
  },
};

export default Model;
