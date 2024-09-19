import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { LoaderContainer, LoaderItem } from './Loader-styled'

export const Loader = ({ fontSize }: { fontSize?: number }) => (
  <LoaderContainer>
    <LoaderItem>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: fontSize ?? 24 }} spin />
        }
      />
    </LoaderItem>
  </LoaderContainer>
)
