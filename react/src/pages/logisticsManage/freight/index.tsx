import React  from 'react';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import {
    columns,data
} from './components/table.tsx'
import { Radio,
        Button,
        Icon,
        Table
    } 
    from 'antd';
    
export default (): React.ReactNode => (

    // <PageHeaderWrapper>
    //     <div className={styles.freight}>运费模板</div>
    // </PageHeaderWrapper>

    <div className={styles.freight}>
        <div className={styles.freightTop}>
            <p><strong>店铺计费方式</strong><a>店铺计费规则说明</a></p>
            <Radio.Group name="radiogroup" defaultValue={0}>
            <Radio className={styles.addShop} value={0}>添加商品加运费
            <Icon type="question-circle" /></Radio></Radio.Group>
            <Button type="primary" className={styles.addbtn}>新增运费模板</Button>
        </div>
        <div className={styles.freightMain}>
            <p>配送运费明细</p>
            <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
            />
        </div>
    </div>
    
    
)