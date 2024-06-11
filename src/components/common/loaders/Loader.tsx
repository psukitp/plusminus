import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loader.less'

export const Loader = ({ fontSize }: { fontSize?: number }) => <div className='loader-container'>
    <div className='loader-item' >
        <Spin indicator={<LoadingOutlined style={{ fontSize: fontSize ?? 24 }} spin />} />
    </div>
</div>