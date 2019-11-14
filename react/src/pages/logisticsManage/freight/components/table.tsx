import React from 'react';
export const columns = [
  { title: '模板名称', dataIndex: 'name', key: 'name' },
  { title: '最后编辑时间', dataIndex: 'age', key: 'age' },
  {
    dataIndex: '',
    key: 'x',
    render: () => <div><a>复制模板</a>
    <a>修改</a>
    <a>删除</a>
    </div>,
  },
];

export const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];