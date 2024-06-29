import { useUser } from "@store"
import { ProfileContainer, ProfileInput, Title } from "./ProfilePage-styled"

export const ProfilePage = () => {
    const userData = useUser(state => state.data)

    return (<ProfileContainer>
        <Title>Профиль</Title>
        <div>Когда-то потом можно будет поменять!</div>
        <div>Но не сейчас.</div>
        <ProfileInput
            addonBefore="Имя"
            value={userData.name} />
        <ProfileInput
            addonBefore="Фамилия"
            value={userData.secondName} />
        <ProfileInput
            addonBefore="Логин"
            value={userData.login} />
        <ProfileInput
            addonBefore="Email"
            value={userData.email} />

        {/* <Button>
            Сохранить
        </Button> */}
    </ProfileContainer>
    )
}