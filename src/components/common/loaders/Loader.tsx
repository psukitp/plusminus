import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loader.less'

export const Loader = () => <div className='loader-container'>
    <div className='loader-item'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
</div>