import { useGetUser, useToggleUserStatus } from "../../repository/hooks"
import { USER_STATUS } from "src/modules/User/domain/model/UserModel"

export const DisplayUserData = () => {
  const {
    data: userData,
    isLoading: getUserLoading,
    error: getUserError,
  } = useGetUser()
  const [
    toggleStatusMutation,
    { data, isLoading, error: toggleMutationError },
  ] = useToggleUserStatus({
    onSuccess: () => {},
  })

  const handleToggleStatus = (props: {
    userId: string
    status: USER_STATUS
  }) => {
    toggleStatusMutation({
      apiParams: {
        userId: props.userId,
      },
      payload: {
        status:
          props.status === USER_STATUS.ACTIVE
            ? USER_STATUS.ACTIVE
            : USER_STATUS.INACTIVE,
      },
    })
  }

  return (
    <div>
      {getUserLoading ? (
        <p> Loading ... </p>
      ) : (
        <div>
          <h1>{userData?.username}</h1>
          <p>{userData?.email}</p>
          <p>{userData?.status}</p>

          <button
            onClick={() => {
              if (userData) {
                handleToggleStatus({
                  userId: userData.uuid,
                  status: userData.status,
                })
              }
            }}
          >
            Toggle User Status
          </button>
        </div>
      )}
    </div>
  )
}
