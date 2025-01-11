import { useUser } from '@entities/user'
import { ProfileContainer, ProfileInput, Title } from './ProfilePage-styled'

const ProfilePage = () => {
  const userData = useUser((state) => state.data)

  return (
    <ProfileContainer>
      <Title>Профиль</Title>
      <div>Когда-то потом можно будет поменять!</div>
      <div>Но не сейчас.</div>
      <ProfileInput value={userData.name} />
      <ProfileInput value={userData.secondName} />
      <ProfileInput value={userData.login} />
      <ProfileInput value={userData.email} />
    </ProfileContainer>
  )
}

export default ProfilePage
