import { useUser } from "@store/store"
import { Input } from "antd"
import './ProfilePage.less'
import { Button } from "@components/common/buttons"

export const ProfilePage = () => {
    const userData = useUser(state => state.data)

    return (<div className="profile">
        <div className="title">Профиль</div>
        <Input
            addonBefore="Имя"
            value={userData.name}
            prefixCls="plusminus" />
        <Input
            addonBefore="Фамилия"
            value={userData.secondName}
            prefixCls="plusminus" />
        <Input
            addonBefore="Логин"
            value={userData.login}
            prefixCls="plusminus" />
        <Input
            addonBefore="Email"
            value={userData.email}
            prefixCls="plusminus" />

        <Button>
            Сохранить
        </Button>
    </div>
    )
}