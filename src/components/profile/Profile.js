import { ClientForm } from "./ClientForm"
import { TrainerForm } from "./TrainerForm"

export const Profile = () => {
  <></>
  const localMogoUser = localStorage.getItem("mogo_user")
  const mogoUserObject = JSON.parse(localMogoUser)

  if (mogoUserObject.trainer) {
    return <TrainerForm />
  } else {
    return <ClientForm />
  }
}